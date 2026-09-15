// Web Speech and Web Audio API utilities for IPA learning

// Synthetic chime & feedback sound generator
export class SoundEffects {
  private static ctx: AudioContext | null = null;

  private static getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public static playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(659.25, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.25); // G5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.15);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.4);
  }

  public static playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  public static playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  public static playCelebration() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const now = ctx.currentTime + index * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    });
  }
}

// Native Text-to-Speech & Authentic Phoneme Audio Engine
export class SpeechService {
  private static cachedVoices: SpeechSynthesisVoice[] = [];
  private static currentAudio: HTMLAudioElement | null = null;

  public static getVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    if (this.cachedVoices.length === 0) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }
    return this.cachedVoices;
  }

  // Symbol to sound file ID dictionary
  private static symbolToIdMap: Record<string, string> = {
    'ɪ': 'short_i',
    'e': 'short_e',
    'æ': 'short_ae',
    'ʊ': 'short_u',
    'ə': 'short_schwa',
    'ʌ': 'short_wedge',
    'ɒ': 'short_o',
    'iː': 'long_i',
    'uː': 'long_u',
    'ɜː': 'long_er',
    'ɜ:': 'long_er',
    'ɔː': 'long_o',
    'ɔ:': 'long_o',
    'ɑː': 'long_a',
    'ɑ:': 'long_a',
    'i:': 'long_i',
    'u:': 'long_u',
    'eɪ': 'diph_ei',
    'aɪ': 'diph_ai',
    'ɔɪ': 'diph_oi',
    'aʊ': 'diph_au',
    'əʊ': 'diph_ou',
    'oʊ': 'diph_ou',
    'ɪə': 'diph_ia',
    'eə': 'diph_ea',
    'ɛə': 'diph_ea',
    'ʊə': 'diph_ua',
    'p': 'cons_p',
    'b': 'cons_b',
    't': 'cons_t',
    'd': 'cons_d',
    'k': 'cons_k',
    'g': 'cons_g',
    'ɡ': 'cons_g',
    'f': 'cons_f',
    'v': 'cons_v',
    'θ': 'cons_theta',
    'ð': 'cons_eth',
    's': 'cons_s',
    'z': 'cons_z',
    'ʃ': 'cons_sh',
    'ʒ': 'cons_zh',
    'tʃ': 'cons_ch',
    'dʒ': 'cons_j',
    'm': 'cons_m',
    'n': 'cons_n',
    'ŋ': 'cons_ng',
    'h': 'cons_h',
    'l': 'cons_l',
    'r': 'cons_r',
    'w': 'cons_w',
    'j': 'cons_y',
  };

  private static phoneticFallbackWords: Record<string, string> = {
    'short_i': 'it',
    'short_e': 'bed',
    'short_ae': 'cat',
    'short_u': 'good',
    'short_schwa': 'about',
    'short_wedge': 'cup',
    'short_o': 'on',
    'long_i': 'see',
    'long_u': 'blue',
    'long_er': 'bird',
    'long_o': 'door',
    'long_a': 'car',
    'diph_ei': 'day',
    'diph_ai': 'eye',
    'diph_oi': 'boy',
    'diph_au': 'now',
    'diph_ou': 'go',
    'diph_ia': 'ear',
    'diph_ea': 'air',
    'diph_ua': 'tour',
    'cons_p': 'pen',
    'cons_b': 'bad',
    'cons_t': 'tea',
    'cons_d': 'dog',
    'cons_k': 'cat',
    'cons_g': 'go',
    'cons_f': 'fish',
    'cons_v': 'van',
    'cons_theta': 'think',
    'cons_eth': 'this',
    'cons_s': 'see',
    'cons_z': 'zoo',
    'cons_sh': 'she',
    'cons_zh': 'vision',
    'cons_ch': 'cheese',
    'cons_j': 'jump',
    'cons_m': 'man',
    'cons_n': 'no',
    'cons_ng': 'sing',
    'cons_h': 'hat',
    'cons_l': 'leg',
    'cons_r': 'red',
    'cons_w': 'wet',
    'cons_y': 'yes',
  };

  /**
   * Play authentic native IPA phoneme sound file directly from /audio/ipa/<soundId>.mp3
   * Automatically resolves symbol to soundId if symbol is provided.
   * Seamlessly falls back to speech synthesis if audio file cannot be loaded.
   */
  public static async playIPAPhoneme(
    soundIdOrSymbol: string,
    fallbackSymbol?: string,
    exampleWord?: string,
    options?: { onEnd?: () => void; onError?: () => void }
  ): Promise<void> {
    this.stop();

    // Determine canonical soundId
    let soundId = soundIdOrSymbol;
    if (this.symbolToIdMap[soundIdOrSymbol]) {
      soundId = this.symbolToIdMap[soundIdOrSymbol];
    } else if (fallbackSymbol && this.symbolToIdMap[fallbackSymbol]) {
      soundId = this.symbolToIdMap[fallbackSymbol];
    }

    const audioUrl = `/audio/ipa/${soundId}.mp3`;

    try {
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        options?.onEnd?.();
      };

      audio.onerror = () => {
        this.currentAudio = null;
        // Fallback to phonetic speech synthesis
        this.speakPhoneme(soundId, exampleWord, options);
      };

      await audio.play();
    } catch {
      this.currentAudio = null;
      this.speakPhoneme(soundId, exampleWord, options);
    }
  }

  /**
   * Speak phonetic pronunciation preventing browser TTS from reading
   * character names (e.g. reading "theta", "ash", "turned v", "three colon").
   */
  public static speakPhoneme(
    soundIdOrSymbol: string,
    exampleWord?: string,
    options?: { onEnd?: () => void; onError?: () => void }
  ): Promise<void> {
    let soundId = soundIdOrSymbol;
    if (this.symbolToIdMap[soundIdOrSymbol]) {
      soundId = this.symbolToIdMap[soundIdOrSymbol];
    }

    const fallbackWord = exampleWord || this.phoneticFallbackWords[soundId] || soundIdOrSymbol;
    return this.speak(fallbackWord, {
      rate: 0.85,
      pitch: 1.0,
      onEnd: options?.onEnd,
      onError: options?.onError
    });
  }

  public static speak(
    text: string, 
    options?: { 
      rate?: number; 
      pitch?: number; 
      lang?: 'en-US' | 'en-GB';
      onEnd?: () => void;
      onError?: () => void;
    }
  ): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        options?.onEnd?.();
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = options?.pitch || 1.0;
      utterance.lang = options?.lang || 'en-US';

      // Pick best English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        (options?.lang === 'en-GB' ? v.lang.includes('en-GB') : (v.lang.includes('en-US') || v.lang.includes('en'))) &&
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.default)
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        options?.onEnd?.();
        resolve();
      };

      utterance.onerror = () => {
        options?.onError?.();
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  public static stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore audio stop error
      }
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

// Real-time Audio Recorder & Speech-to-Text Recognition
export interface SpeechRecognitionResultData {
  transcript: string;
  confidence: number;
}

export class AudioRecognitionService {
  private static recognition: any = null;
  private static mediaRecorder: MediaRecorder | null = null;
  private static audioChunks: Blob[] = [];

  public static isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition
    );
  }

  public static startRecording(
    onInterim: (text: string) => void,
    onFinal: (result: SpeechRecognitionResultData) => void,
    onError: (err: string) => void
  ): { stop: () => Promise<{ audioBlob: Blob; audioUrl: string }> } {
    this.audioChunks = [];
    let audioStream: MediaStream | null = null;

    // Start Web Speech Recognition
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let recognitionInstance: any = null;

    if (SpeechRec) {
      try {
        recognitionInstance = new SpeechRec();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        recognitionInstance.maxAlternatives = 3;

        recognitionInstance.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          let maxConfidence = 0.8;

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const res = event.results[i];
            if (res.isFinal) {
              finalTranscript += res[0].transcript;
              maxConfidence = res[0].confidence || 0.85;
            } else {
              interimTranscript += res[0].transcript;
            }
          }

          if (interimTranscript) {
            onInterim(interimTranscript);
          }
          if (finalTranscript) {
            onFinal({ transcript: finalTranscript.trim(), confidence: maxConfidence });
          }
        };

        recognitionInstance.onerror = (e: any) => {
          console.warn('Speech recognition error/warning:', e);
          if (e.error === 'not-allowed') {
            onError('Vui lòng cấp quyền micro trên trình duyệt để ghi âm.');
          } else if (e.error === 'no-speech') {
            // handled gracefully
          } else {
            onError(`Lỗi nhận diện âm thanh: ${e.error}`);
          }
        };

        recognitionInstance.start();
        this.recognition = recognitionInstance;
      } catch (err) {
        console.warn('Could not start Web Speech Recognition:', err);
      }
    }

    // Also start MediaRecorder for audio playback
    const recordingPromise = navigator.mediaDevices?.getUserMedia?.({ audio: true })
      .then(stream => {
        audioStream = stream;
        const recorder = new MediaRecorder(stream);
        this.mediaRecorder = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            this.audioChunks.push(e.data);
          }
        };

        recorder.start(100);
        return stream;
      })
      .catch(err => {
        console.warn('MediaRecorder error:', err);
        onError('Không thể truy cập micro. Hãy kiểm tra cài đặt trình duyệt.');
        return null;
      });

    return {
      stop: async () => {
        if (this.recognition) {
          try {
            this.recognition.stop();
          } catch (e) {
            // ignore
          }
          this.recognition = null;
        }

        await recordingPromise;

        return new Promise<{ audioBlob: Blob; audioUrl: string }>((resolve) => {
          if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.onstop = () => {
              const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
              const url = URL.createObjectURL(blob);
              if (audioStream) {
                audioStream.getTracks().forEach(track => track.stop());
              }
              resolve({ audioBlob: blob, audioUrl: url });
            };
            this.mediaRecorder.stop();
          } else {
            const blob = new Blob([], { type: 'audio/webm' });
            resolve({ audioBlob: blob, audioUrl: '' });
          }
        });
      }
    };
  }
}
