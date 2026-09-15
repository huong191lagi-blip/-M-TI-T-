import React, { useState, useMemo } from 'react';
import { SyllableAnalysisWord } from '../types';
import { SYLLABLE_WORDS } from '../data/syllableData';
import { SpeechService, SoundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Volume2,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  BookOpen,
  Search,
  Filter,
  Layers,
  Table as TableIcon,
  Gamepad2,
  Check,
  Award,
  Hash,
  Puzzle
} from 'lucide-react';

interface SyllableAnalysisViewProps {
  onCompleteExercise: (points: number) => void;
  onOpenDragDropForWord?: (word: string) => void;
}

export const SyllableAnalysisView: React.FC<SyllableAnalysisViewProps> = ({
  onCompleteExercise,
  onOpenDragDropForWord
}) => {
  const [activeSubMode, setActiveSubMode] = useState<'practice' | 'table'>('practice');
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  // Practice state
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedWordIds, setCompletedWordIds] = useState<Set<number>>(new Set());

  // Filtered words based on part & search
  const filteredWords = useMemo(() => {
    return SYLLABLE_WORDS.filter((item) => {
      const matchPart = selectedPart === 'all' || item.part === selectedPart;
      const matchSearch =
        !searchQuery.trim() ||
        item.word.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.meaningVi.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.id.toString() === searchQuery.trim();
      return matchPart && matchSearch;
    });
  }, [selectedPart, searchQuery]);

  const currentWord: SyllableAnalysisWord | undefined = filteredWords[currentWordIndex] || filteredWords[0];

  // Options pool generation for the current word
  const vowelOptions = useMemo(() => {
    if (!currentWord) return [];
    const correct = currentWord.visibleVowels;
    // Pick 3 distractors from words in the same part
    const samePart = SYLLABLE_WORDS.filter((w) => w.id !== currentWord.id && w.visibleVowels !== correct);
    const shuffled = [...samePart].sort(() => Math.random() - 0.5);
    const distractors = Array.from(new Set(shuffled.map((w) => w.visibleVowels))).slice(0, 3);
    return [correct, ...distractors].sort(() => Math.random() - 0.5);
  }, [currentWord?.id]);

  const ruleOptions = useMemo(() => {
    if (!currentWord) return [];
    const correct = currentWord.appliedRule;
    const samePart = SYLLABLE_WORDS.filter((w) => w.id !== currentWord.id && w.appliedRule !== correct);
    const shuffled = [...samePart].sort(() => Math.random() - 0.5);
    const distractors = Array.from(new Set(shuffled.map((w) => w.appliedRule))).slice(0, 3);
    return [correct, ...distractors].sort(() => Math.random() - 0.5);
  }, [currentWord?.id]);

  const countOptions = useMemo(() => {
    if (!currentWord) return [2, 3, 4, 5];
    const options = [2, 3, 4, 5];
    if (!options.includes(currentWord.syllableCount)) {
      options.push(currentWord.syllableCount);
    }
    return options.sort((a, b) => a - b);
  }, [currentWord?.id]);

  // Reset answer when changing word
  const handleSelectWord = (wordItem: SyllableAnalysisWord) => {
    const idx = filteredWords.findIndex((w) => w.id === wordItem.id);
    if (idx !== -1) {
      setCurrentWordIndex(idx);
      resetAnswers();
      setActiveSubMode('practice');
    }
  };

  const resetAnswers = () => {
    setSelectedVowel(null);
    setSelectedRule(null);
    setSelectedCount(null);
    setIsEvaluated(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  const handlePlayWord = (text?: string) => {
    const target = text || currentWord?.word;
    if (!target) return;
    SoundEffects.playClick();
    SpeechService.speak(target, { rate: 0.85 });
  };

  // Evaluate student's selection
  const handleCheckAnswer = () => {
    if (!currentWord) return;
    if (!selectedVowel || !selectedRule || selectedCount === null) return;

    const correct =
      selectedVowel === currentWord.visibleVowels &&
      selectedRule === currentWord.appliedRule &&
      selectedCount === currentWord.syllableCount;

    setIsEvaluated(true);
    setIsCorrect(correct);

    if (correct) {
      SoundEffects.playCorrect();
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.65 }
      });
      setCompletedWordIds((prev) => new Set([...prev, currentWord.id]));
      onCompleteExercise(20);
    } else {
      SoundEffects.playWrong();
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setCurrentWordIndex(0);
    }
    resetAnswers();
  };

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1);
    } else {
      setCurrentWordIndex(filteredWords.length - 1);
    }
    resetAnswers();
  };

  return (
    <div id="syllable-analysis-container" className="space-y-6">
      {/* Top Banner & Guide */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-700 font-bold text-xs">
                200 TỪ ĐA ÂM TIẾT
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Đã hoàn thành: <span className="text-indigo-700 font-bold">{completedWordIds.size}</span>/200 từ
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              Phân Tích Âm Tiết & Quy Tắc Phát Âm
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
              Theo đúng hướng dẫn chuẩn 5 cột: Xác định <span className="font-bold text-slate-800">Cột 3 (Nguyên âm nhìn thấy)</span>,{' '}
              <span className="font-bold text-slate-800">Cột 4 (Quy tắc áp dụng)</span> và{' '}
              <span className="font-bold text-slate-800">Cột 5 (Số âm tiết thực tế)</span>.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl shrink-0 border border-slate-200">
            <button
              onClick={() => setActiveSubMode('practice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubMode === 'practice'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Luyện Kéo Thả
            </button>
            <button
              onClick={() => setActiveSubMode('table')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              Bảng Tra Cứu (200 Từ)
            </button>
          </div>
        </div>

        {/* Part Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            Chọn Phần:
          </span>
          <button
            onClick={() => {
              setSelectedPart('all');
              setCurrentWordIndex(0);
              resetAnswers();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPart === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            Tất cả 200 từ
          </button>
          {[
            { part: 1, label: 'Phần I: Cặp nguyên âm & Y (1–50)' },
            { part: 2, label: 'Phần II: Đuôi -le & Y (51–100)' },
            { part: 3, label: 'Phần III: E câm & Đuôi kép (101–150)' },
            { part: 4, label: 'Phần IV: Đa âm tiết (151–200)' }
          ].map((tab) => (
            <button
              key={tab.part}
              onClick={() => {
                setSelectedPart(tab.part);
                setCurrentWordIndex(0);
                resetAnswers();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPart === tab.part
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: INTERACTIVE PRACTICE (DRAG & DROP / CARD MATCHING)               */}
      {/* ========================================================================= */}
      {activeSubMode === 'practice' && currentWord && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-7">
          {/* Navigation bar between words */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xs">
                STT #{currentWord.id}
              </span>
              <span className="text-xs font-bold text-slate-600">
                {currentWord.partTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevWord}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1 text-xs font-bold"
                title="Từ trước"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Trước</span>
              </button>
              <span className="text-xs text-slate-500 font-semibold px-2">
                {currentWordIndex + 1} / {filteredWords.length}
              </span>
              <button
                onClick={handleNextWord}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1 text-xs font-bold"
                title="Từ sau"
              >
                <span>Sau</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Word Card */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-slate-50 to-emerald-50/40 border border-indigo-100 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden space-y-4">
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                {currentWord.word}
              </h3>
              <button
                id={`btn-play-word-${currentWord.id}`}
                onClick={() => handlePlayWord()}
                className="p-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md active:scale-95"
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-base sm:text-lg font-bold text-indigo-700">
              <span className="font-mono bg-white px-4 py-1.5 rounded-full border border-indigo-100 shadow-xs text-lg sm:text-xl font-bold">
                {currentWord.ipa}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-800 text-base sm:text-lg font-bold">{currentWord.meaningVi}</span>
            </div>

            {onOpenDragDropForWord && (
              <div className="pt-1 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onOpenDragDropForWord(currentWord.word)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
                >
                  <Puzzle className="w-4 h-4 text-indigo-600" />
                  <span>Ghép thẻ phiên âm IPA cho từ "{currentWord.word}"</span>
                </button>
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-600 font-semibold pt-1">
              👇 Chọn/ghép các thẻ phù hợp vào 3 ô phân tích bên dưới:
            </p>
          </div>

          {/* 3 Drop Slots for Columns 3, 4, 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Slot 1: Vowels / Vowel Pairs */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-700">
                    Cột 3: Nguyên âm nhìn thấy
                  </span>
                  {selectedVowel && (
                    <button
                      onClick={() => setSelectedVowel(null)}
                      className="text-xs text-slate-400 hover:text-rose-600 font-bold"
                    >
                      Bỏ chọn
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">Nguyên âm đơn hoặc cặp nguyên âm</p>
              </div>

              <div
                className={`min-h-[76px] rounded-2xl border-2 flex items-center justify-center p-3 text-center transition-all ${
                  selectedVowel
                    ? isEvaluated
                      ? selectedVowel === currentWord.visibleVowels
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                        : 'bg-rose-50 border-rose-500 text-rose-800 shadow-sm'
                      : 'bg-white border-indigo-500 text-indigo-900 font-black shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/80 border-dashed border-slate-300 text-slate-400 text-sm font-semibold'
                }`}
              >
                {selectedVowel ? (
                  <span className="text-2xl sm:text-3xl font-black font-mono">{selectedVowel}</span>
                ) : (
                  <span>Chọn thẻ Cột 3 bên dưới</span>
                )}
              </div>
            </div>

            {/* Slot 2: Applied Rule */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-700">
                    Cột 4: Quy tắc áp dụng
                  </span>
                  {selectedRule && (
                    <button
                      onClick={() => setSelectedRule(null)}
                      className="text-xs text-slate-400 hover:text-rose-600 font-bold"
                    >
                      Bỏ chọn
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">Nguyên âm đôi, Y cuối, E câm, -le...</p>
              </div>

              <div
                className={`min-h-[76px] rounded-2xl border-2 flex items-center justify-center p-3 text-center transition-all ${
                  selectedRule
                    ? isEvaluated
                      ? selectedRule === currentWord.appliedRule
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                        : 'bg-rose-50 border-rose-500 text-rose-800 shadow-sm'
                      : 'bg-white border-indigo-500 text-indigo-900 font-bold shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/80 border-dashed border-slate-300 text-slate-400 text-sm font-semibold'
                }`}
              >
                {selectedRule ? (
                  <span className="text-sm sm:text-base font-bold leading-snug">{selectedRule}</span>
                ) : (
                  <span>Chọn thẻ Cột 4 bên dưới</span>
                )}
              </div>
            </div>

            {/* Slot 3: Actual Syllable Count */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-700">
                    Cột 5: Chốt số âm tiết
                  </span>
                  {selectedCount !== null && (
                    <button
                      onClick={() => setSelectedCount(null)}
                      className="text-xs text-slate-400 hover:text-rose-600 font-bold"
                    >
                      Bỏ chọn
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">Số âm tiết phát âm thực tế</p>
              </div>

              <div
                className={`min-h-[76px] rounded-2xl border-2 flex items-center justify-center p-3 text-center transition-all ${
                  selectedCount !== null
                    ? isEvaluated
                      ? selectedCount === currentWord.syllableCount
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                        : 'bg-rose-50 border-rose-500 text-rose-800 shadow-sm'
                      : 'bg-white border-indigo-500 text-indigo-900 font-bold shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/80 border-dashed border-slate-300 text-slate-400 text-sm font-semibold'
                }`}
              >
                {selectedCount !== null ? (
                  <span className="text-2xl sm:text-3xl font-black text-indigo-700">
                    {selectedCount} âm tiết
                  </span>
                ) : (
                  <span>Chọn thẻ Cột 5 bên dưới</span>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Card Options Pool */}
          <div className="space-y-6 pt-3 border-t border-slate-100">
            {/* Vowel Options */}
            <div className="space-y-2.5">
              <span className="text-sm sm:text-base font-bold text-slate-800 block">
                1. Chọn Nguyên âm / Cặp nguyên âm nhìn thấy (Cột 3):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {vowelOptions.map((vowel, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      SoundEffects.playClick();
                      setSelectedVowel(vowel);
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 text-base sm:text-xl md:text-2xl font-black font-mono transition-all text-center active:scale-95 ${
                      selectedVowel === vowel
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    {vowel}
                  </button>
                ))}
              </div>
            </div>

            {/* Rule Options */}
            <div className="space-y-2.5">
              <span className="text-sm sm:text-base font-bold text-slate-800 block">
                2. Chọn Quy tắc áp dụng (Cột 4):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ruleOptions.map((rule, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      SoundEffects.playClick();
                      setSelectedRule(rule);
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 text-sm sm:text-base font-bold transition-all text-left leading-relaxed active:scale-95 ${
                      selectedRule === rule
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    {rule}
                  </button>
                ))}
              </div>
            </div>

            {/* Count Options */}
            <div className="space-y-2.5">
              <span className="text-sm sm:text-base font-bold text-slate-800 block">
                3. Chốt số âm tiết thực tế (Cột 5):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {countOptions.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      SoundEffects.playClick();
                      setSelectedCount(count);
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 text-base sm:text-xl font-black transition-all text-center active:scale-95 ${
                      selectedCount === count
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    {count} âm tiết
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Check Answer */}
          {!isEvaluated ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 py-2"
              >
                <HelpCircle className="w-4 h-4" />
                {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý tách âm'}
              </button>

              <button
                id="btn-check-syllables"
                onClick={handleCheckAnswer}
                disabled={!selectedVowel || !selectedRule || selectedCount === null}
                className={`px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                  selectedVowel && selectedRule && selectedCount !== null
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-5 h-5" />
                Kiểm tra kết quả
              </button>
            </div>
          ) : null}

          {/* Hint Card */}
          {showHint && !isEvaluated && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 animate-fade-in space-y-1">
              <span className="font-bold block">💡 Gợi ý tách âm tiết:</span>
              <p>
                Từ <span className="font-bold">{currentWord.word}</span> được phân tách là:{' '}
                <span className="font-bold text-amber-950 font-mono">{currentWord.syllablesDisplay}</span>.
              </p>
            </div>
          )}

          {/* Evaluation Outcome Card */}
          {isEvaluated && (
            <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
              {isCorrect ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 md:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-emerald-950">
                          Chính xác hoàn hảo! +20 Điểm EXP
                        </h4>
                        <p className="text-xs text-emerald-800 font-medium">
                          Bạn đã phân tích chính xác nguyên âm, quy tắc và số âm tiết của từ.
                        </p>
                      </div>
                    </div>

                    <button
                      id="btn-next-syllable-word"
                      onClick={handleNextWord}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                    >
                      Từ tiếp theo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-white/80 rounded-2xl p-4 border border-emerald-200 text-xs space-y-2 text-emerald-950">
                    <div className="flex flex-wrap gap-4 font-semibold">
                      <span>
                        Tách âm tiết: <span className="font-mono font-bold text-emerald-700">{currentWord.syllablesDisplay}</span>
                      </span>
                      <span>
                        Cột 3: <span className="font-mono font-bold">{currentWord.visibleVowels}</span>
                      </span>
                      <span>
                        Cột 4: <span className="font-bold">{currentWord.appliedRule}</span>
                      </span>
                      <span>
                        Cột 5: <span className="font-bold text-emerald-800">{currentWord.syllableCount} âm tiết</span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 md:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-base">
                        !
                      </div>
                      <div>
                        <h4 className="text-base font-black text-rose-950">
                          Chưa chính xác, hãy xem phân tích mẫu
                        </h4>
                        <p className="text-xs text-rose-800 font-medium">
                          Xem kỹ đáp án chuẩn bên dưới để ghi nhớ quy tắc ngữ âm.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={resetAnswers}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1.5 border border-rose-300 transition-all active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Thử lại
                    </button>
                  </div>

                  <div className="bg-white/80 rounded-2xl p-4 border border-rose-200 text-xs space-y-1.5 text-rose-950">
                    <p>
                      • <span className="font-bold">Cột 3 (Nguyên âm):</span>{' '}
                      <span className="font-mono font-bold text-rose-700">{currentWord.visibleVowels}</span>
                    </p>
                    <p>
                      • <span className="font-bold">Cột 4 (Quy tắc):</span>{' '}
                      <span className="font-bold text-rose-800">{currentWord.appliedRule}</span>
                    </p>
                    <p>
                      • <span className="font-bold">Cột 5 (Số âm tiết):</span>{' '}
                      <span className="font-bold text-rose-800">{currentWord.syllableCount} âm tiết</span> ({currentWord.syllablesDisplay})
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: FULL 200 WORDS REFERENCE TABLE (5 COLUMNS)                       */}
      {/* ========================================================================= */}
      {activeSubMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
          {/* Search & Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Bảng Chuẩn 200 Từ Đa Âm Tiết (5 Cột)
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm từ vựng hoặc STT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-black">
                  <th className="py-3.5 px-3 w-14 text-center">STT</th>
                  <th className="py-3.5 px-4 min-w-[170px]">Cột 2: Từ vựng</th>
                  <th className="py-3.5 px-4 min-w-[150px]">Cột 3: Nguyên âm nhìn thấy</th>
                  <th className="py-3.5 px-4 min-w-[260px]">Cột 4: Quy tắc áp dụng</th>
                  <th className="py-3.5 px-3 w-28 text-center">Cột 5: Số âm</th>
                  <th className="py-3.5 px-3 w-40 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWords.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-indigo-50/40 transition-colors group"
                  >
                    <td className="py-3.5 px-3 text-center font-bold text-slate-600">
                      #{item.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-base text-slate-900">
                              {item.word}
                            </span>
                            <button
                              onClick={() => handlePlayWord(item.word)}
                              className="p-1 rounded-md text-slate-400 hover:text-indigo-600 transition-colors"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600">
                            <span className="font-mono text-indigo-700 font-bold">{item.ipa}</span> • {item.meaningVi}
                          </div>
                          <div className="text-xs text-emerald-700 font-mono font-bold">
                            {item.syllablesDisplay}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-indigo-900">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-sm sm:text-base inline-block">
                        {item.visibleVowels}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium leading-relaxed text-xs sm:text-sm">
                      {item.appliedRule}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.syllableCount} âm
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleSelectWord(item)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-all shadow-xs"
                          title="Luyện phân tích âm tiết"
                        >
                          Phân tích
                        </button>
                        {onOpenDragDropForWord && (
                          <button
                            onClick={() => onOpenDragDropForWord(item.word)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1"
                            title="Ghép thẻ phiên âm IPA"
                          >
                            <Puzzle className="w-3.5 h-3.5" />
                            Ghép IPA
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
