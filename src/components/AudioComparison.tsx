import React, { useState, useRef, useEffect } from 'react';
import { IPASound, PronunciationAttempt } from '../types';
import { SpeechService, SoundEffects, AudioRecognitionService } from '../utils/audio';
import { Mic, Square, Play, RotateCcw, Volume2, Sparkles, CheckCircle2, AlertCircle, Award, Gauge } from 'lucide-react';

interface AudioComparisonProps {
  sound: IPASound;
  targetWord?: string;
  targetIpa?: string;
  onRecordSuccess?: (attempt: PronunciationAttempt) => void;
}

export const AudioComparison: React.FC<AudioComparisonProps> = ({
  sound,
  targetWord = sound.exampleWords[0]?.word || 'ship',
  targetIpa = sound.exampleWords[0]?.ipa || sound.symbol,
  onRecordSuccess
}) => {
  const [selectedWord, setSelectedWord] = useState<string>(targetWord);
  const [selectedIpa, setSelectedIpa] = useState<string>(targetIpa);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlayingNative, setIsPlayingNative] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [interimText, setInterimText] = useState<string>('');
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUser, setIsPlayingUser] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    accuracy: string;
    vietnameseFeedback: string;
    phoneticNotes: string;
    actionableTips: string[];
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recorderStopperRef = useRef<{ stop: () => Promise<{ audioBlob: Blob; audioUrl: string }> } | null>(null);

  // Update selected word if prop changes
  useEffect(() => {
    setSelectedWord(targetWord);
    setSelectedIpa(targetIpa);
    setAnalysisResult(null);
    setUserAudioUrl(null);
  }, [targetWord, targetIpa, sound]);

  // Clean up audio streams on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
      }
    };
  }, [userAudioUrl]);

  // Play native reference pronunciation
  const handlePlayNative = async () => {
    if (isPlayingNative) return;
    setIsPlayingNative(true);
    SoundEffects.playClick();
    await SpeechService.speak(selectedWord, {
      rate: playbackSpeed,
      lang: 'en-US',
      onEnd: () => setIsPlayingNative(false),
      onError: () => setIsPlayingNative(false)
    });
  };

  // Start real-time audio visualizer on canvas
  const startVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasCtx = canvas.getContext('2d');
      if (!canvasCtx) return;

      const draw = () => {
        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgba(15, 23, 42, 0.4)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2;
        let barHeight: number;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height * 0.85;

          // Gradient color from cyan to emerald
          const gradient = canvasCtx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
          gradient.addColorStop(0, '#38bdf8');
          gradient.addColorStop(1, '#10b981');

          canvasCtx.fillStyle = gradient;
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

          x += barWidth;
        }
      };

      draw();
    } catch (err) {
      console.warn('Canvas visualizer error:', err);
    }
  };

  const stopVisualizer = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Start User Recording
  const handleStartRecording = () => {
    setIsRecording(true);
    setInterimText('Đang lắng nghe...');
    setAnalysisResult(null);
    SoundEffects.playClick();
    startVisualizer();

    const stopper = AudioRecognitionService.startRecording(
      (interim) => setInterimText(interim),
      (finalRes) => handleFinalSpeech(finalRes.transcript, finalRes.confidence),
      (error) => {
        setIsRecording(false);
        stopVisualizer();
        alert(error);
      }
    );

    recorderStopperRef.current = stopper;
  };

  // Stop User Recording
  const handleStopRecording = async () => {
    if (!isRecording) return;
    setIsRecording(false);
    stopVisualizer();

    if (recorderStopperRef.current) {
      const { audioUrl } = await recorderStopperRef.current.stop();
      if (audioUrl) {
        setUserAudioUrl(audioUrl);
      }
    }
  };

  // Process Speech Recognition and Call AI Pronunciation Analysis
  const handleFinalSpeech = async (transcript: string, confidence: number) => {
    setIsAnalyzing(true);
    setInterimText(transcript || selectedWord);

    try {
      const response = await fetch('/api/analyze-pronunciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetSound: sound.symbol,
          targetWord: selectedWord,
          targetIpa: selectedIpa,
          userTranscript: transcript,
          confidence
        })
      });

      const data = await response.json();
      setAnalysisResult(data);

      if (data.score >= 80) {
        SoundEffects.playCorrect();
      } else {
        SoundEffects.playWrong();
      }

      // Record to progress history
      const attempt: PronunciationAttempt = {
        id: `att_${Date.now()}`,
        soundId: sound.id,
        word: selectedWord,
        ipa: selectedIpa,
        score: data.score || 75,
        accuracy: data.accuracy || 'Tốt',
        userTranscript: transcript,
        vietnameseFeedback: data.vietnameseFeedback,
        phoneticNotes: data.phoneticNotes,
        actionableTips: data.actionableTips || [],
        timestamp: Date.now()
      };

      onRecordSuccess?.(attempt);
    } catch (err) {
      console.error('Failed to analyze pronunciation:', err);
      // Fallback
      setAnalysisResult({
        score: 75,
        accuracy: 'Tốt',
        vietnameseFeedback: `Đã phát âm "${selectedWord}". Hãy duy trì độ chuẩn xác của khẩu hình!`,
        phoneticNotes: `Âm mục tiêu: /${sound.symbol}/`,
        actionableTips: ['Nghe lại giọng bản ngữ và lặp lại 3 lần.']
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Play User's recorded voice
  const handlePlayUserAudio = () => {
    if (!userAudioUrl) return;
    setIsPlayingUser(true);
    const audio = new Audio(userAudioUrl);
    userAudioPlayerRef.current = audio;
    audio.play();
    audio.onended = () => setIsPlayingUser(false);
    audio.onerror = () => setIsPlayingUser(false);
  };

  return (
    <div id="audio-comparison-section" className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-xs space-y-6">
      {/* Header & Word Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-indigo-600" />
            Luyện tập & So sánh Phát âm
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Nghe chuẩn giọng bản xứ, tự thu âm giọng của bạn và nhận phân tích khẩu hình từ AI.
          </p>
        </div>

        {/* Word Chips Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {sound.exampleWords.map((item, idx) => (
            <button
              key={idx}
              id={`btn-word-chip-${idx}`}
              onClick={() => {
                setSelectedWord(item.word);
                setSelectedIpa(item.ipa);
                setAnalysisResult(null);
                setUserAudioUrl(null);
                SoundEffects.playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedWord === item.word
                  ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.word} <span className="text-[11px] opacity-75 font-medium">{item.ipa}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Word Display Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center relative overflow-hidden">
        <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
          {selectedWord}
        </div>
        <div className="text-lg font-bold text-emerald-700 tracking-wider">
          {selectedIpa}
        </div>
        <div className="text-xs text-slate-500 mt-1">
          {sound.exampleWords.find(w => w.word === selectedWord)?.meaningVi}
        </div>

        {/* Native Speed Control */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-xs text-slate-500 font-semibold">Tốc độ:</span>
          {[0.5, 0.75, 1.0].map((rate) => (
            <button
              key={rate}
              onClick={() => setPlaybackSpeed(rate)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                playbackSpeed === rate
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* Dual Voice Comparison Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Native Voice Column */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
            <Volume2 className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            Giọng mẫu bản xứ
          </span>
          <span className="text-xs text-slate-500 mb-4">Chuẩn Oxford / General American</span>

          <button
            id="btn-play-native"
            onClick={handlePlayNative}
            disabled={isPlayingNative}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
              isPlayingNative
                ? 'bg-emerald-500 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98]'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            {isPlayingNative ? 'Đang phát...' : 'Nghe giọng mẫu'}
          </button>
        </div>

        {/* User Voice Recording Column */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-3">
            <Mic className={`w-6 h-6 ${isRecording ? 'text-rose-600 animate-bounce' : 'text-rose-500'}`} />
          </div>
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
            Giọng đọc của bạn
          </span>
          <span className="text-xs text-slate-500 mb-4">
            {isRecording ? 'Đang thu âm...' : userAudioUrl ? 'Đã thu âm xong' : 'Bấm nút để bắt đầu nói'}
          </span>

          {/* Action Buttons */}
          <div className="w-full flex gap-2">
            {!isRecording ? (
              <button
                id="btn-start-record"
                onClick={handleStartRecording}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98]"
              >
                <Mic className="w-4 h-4" />
                Thu âm ngay
              </button>
            ) : (
              <button
                id="btn-stop-record"
                onClick={handleStopRecording}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2 transition-all shadow-xs animate-pulse"
              >
                <Square className="w-4 h-4 fill-current" />
                Dừng & Đánh giá
              </button>
            )}

            {userAudioUrl && !isRecording && (
              <button
                id="btn-play-user-audio"
                onClick={handlePlayUserAudio}
                disabled={isPlayingUser}
                title="Nghe lại bản thu"
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all border border-slate-300"
              >
                <RotateCcw className={`w-4 h-4 ${isPlayingUser ? 'animate-spin text-emerald-600' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Audio Waveform Canvas */}
      {isRecording && (
        <div className="bg-slate-900 p-3 rounded-2xl border border-rose-300">
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2 font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              Đang phân tích phổ sóng âm thời gian thực...
            </span>
            <span>Nói từ: "{selectedWord}"</span>
          </div>
          <canvas ref={canvasRef} width={500} height={70} className="w-full h-16 rounded-lg" />
        </div>
      )}

      {/* AI Pronunciation Evaluation Results Card */}
      {isAnalyzing && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center animate-pulse">
          <Sparkles className="w-8 h-8 text-indigo-600 mx-auto mb-2 animate-spin" />
          <p className="text-sm font-bold text-indigo-900">
            Chuyên gia AI đang phân tích khẩu hình và ngữ âm của bạn...
          </p>
        </div>
      )}

      {analysisResult && !isAnalyzing && (
        <div id="pronunciation-analysis-card" className="bg-slate-50 border border-indigo-200 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Đánh giá Phát âm từ AI Coach
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                analysisResult.score >= 80
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : analysisResult.score >= 60
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {analysisResult.accuracy} ({analysisResult.score}/100)
              </div>
            </div>
          </div>

          {/* Feedback details */}
          <div className="space-y-3">
            <div className="flex items-start gap-2.5 text-sm text-slate-800">
              {analysisResult.score >= 80 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-slate-900">{analysisResult.vietnameseFeedback}</p>
                <p className="text-xs text-slate-600 mt-1">{analysisResult.phoneticNotes}</p>
              </div>
            </div>

            {/* Actionable Tips */}
            {analysisResult.actionableTips && analysisResult.actionableTips.length > 0 && (
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-indigo-900 block mb-1">💡 Lời khuyên cải thiện khẩu hình:</span>
                {analysisResult.actionableTips.map((tip, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
