import React, { useState, useEffect, useMemo } from 'react';
import { DragDropExercise } from '../types';
import { DRAG_DROP_EXERCISES, SYLLABLE_DRAG_DROP_EXERCISES, FOUNDATIONAL_EXERCISES } from '../data/dragDropData';
import { SpeechService, SoundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Layers,
  Puzzle,
  BookOpen,
  Search,
  Filter,
  Flame,
  Check
} from 'lucide-react';
import { SyllableAnalysisView } from './SyllableAnalysisView';

interface DragDropViewProps {
  onCompleteExercise: (points: number) => void;
}

export const DragDropView: React.FC<DragDropViewProps> = ({ onCompleteExercise }) => {
  const [practiceMode, setPracticeMode] = useState<'syllables' | 'ipa'>('syllables');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'part1' | 'part2' | 'part3' | 'part4' | 'basic'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [placedSlots, setPlacedSlots] = useState<(string | null)[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; phoneme: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [completedWordIds, setCompletedWordIds] = useState<Set<string>>(new Set());

  // Filter exercises based on category and search query
  const filteredExercises = useMemo(() => {
    let pool: DragDropExercise[] = [];
    if (selectedCategory === 'all') {
      pool = DRAG_DROP_EXERCISES;
    } else if (selectedCategory === 'part1') {
      pool = SYLLABLE_DRAG_DROP_EXERCISES.slice(0, 50);
    } else if (selectedCategory === 'part2') {
      pool = SYLLABLE_DRAG_DROP_EXERCISES.slice(50, 100);
    } else if (selectedCategory === 'part3') {
      pool = SYLLABLE_DRAG_DROP_EXERCISES.slice(100, 150);
    } else if (selectedCategory === 'part4') {
      pool = SYLLABLE_DRAG_DROP_EXERCISES.slice(150, 200);
    } else if (selectedCategory === 'basic') {
      pool = FOUNDATIONAL_EXERCISES;
    }

    if (!searchQuery.trim()) return pool;

    const q = searchQuery.toLowerCase().trim();
    return pool.filter(
      (ex) =>
        ex.word.toLowerCase().includes(q) ||
        ex.meaningVi.toLowerCase().includes(q) ||
        ex.ipaFull.toLowerCase().includes(q)
    );
  }, [selectedCategory, searchQuery]);

  const currentExercise = filteredExercises[exerciseIndex] || filteredExercises[0];

  // Initialize slots and tile pool when current exercise changes
  useEffect(() => {
    if (currentExercise) {
      setPlacedSlots(new Array(currentExercise.correctPhonemes.length).fill(null));
      // Shuffle tile pool
      const pool = currentExercise.tilePool
        .map((p, idx) => ({
          id: `tile_${idx}_${p}_${Date.now()}`,
          phoneme: p
        }))
        .sort(() => Math.random() - 0.5);

      setAvailableTiles(pool);
      setIsCompleted(false);
      setIsCorrect(null);
      setShowHint(false);
    }
  }, [exerciseIndex, currentExercise]);

  // Jump from Syllable Analysis to IPA card matching for a specific word
  const handleOpenWordInIpa = (targetWord: string) => {
    setPracticeMode('ipa');
    setSelectedCategory('all');
    setSearchQuery('');

    // Find the matching exercise in DRAG_DROP_EXERCISES
    const foundIdx = DRAG_DROP_EXERCISES.findIndex(
      (ex) => ex.word.toLowerCase() === targetWord.toLowerCase()
    );
    if (foundIdx !== -1) {
      setExerciseIndex(foundIdx);
    } else {
      setExerciseIndex(0);
    }
  };

  const handlePlayWord = () => {
    if (!currentExercise) return;
    SoundEffects.playClick();
    SpeechService.speak(currentExercise.word, { rate: 0.85 });
  };

  const handlePlayPhoneme = (phoneme: string) => {
    SoundEffects.playClick();
    SpeechService.playIPAPhoneme(phoneme);
  };

  // Place tile into the first available empty slot
  const handleSelectTile = (tile: { id: string; phoneme: string }) => {
    if (isCompleted) return;

    handlePlayPhoneme(tile.phoneme);

    const firstEmptyIndex = placedSlots.findIndex((slot) => slot === null);
    if (firstEmptyIndex === -1) return; // All slots full

    const newSlots = [...placedSlots];
    newSlots[firstEmptyIndex] = tile.phoneme;
    setPlacedSlots(newSlots);

    // Remove tile from available pool
    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));

    // Auto-check if all slots are filled
    if (firstEmptyIndex === currentExercise.correctPhonemes.length - 1) {
      checkSolution(newSlots);
    }
  };

  // Remove tile from slot and return it to available pool
  const handleRemoveFromSlot = (slotIndex: number) => {
    if (isCompleted) return;

    const phoneme = placedSlots[slotIndex];
    if (!phoneme) return;

    SoundEffects.playClick();
    const newSlots = [...placedSlots];
    newSlots[slotIndex] = null;
    setPlacedSlots(newSlots);

    setAvailableTiles((prev) => [...prev, { id: `returned_${Date.now()}_${phoneme}`, phoneme }]);
    setIsCorrect(null);
  };

  // Check assembled phonemes vs correct phonemes
  const checkSolution = (slots: (string | null)[]) => {
    const isAllCorrect = slots.every((p, idx) => p === currentExercise.correctPhonemes[idx]);

    setIsCompleted(true);
    setIsCorrect(isAllCorrect);

    if (isAllCorrect) {
      SoundEffects.playCorrect();
      setStreakCount((prev) => prev + 1);
      setCompletedWordIds((prev) => new Set([...prev, currentExercise.id]));
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 }
      });
      onCompleteExercise(25);
    } else {
      SoundEffects.playWrong();
      setStreakCount(0);
    }
  };

  // Reset current puzzle
  const handleResetCurrent = () => {
    if (!currentExercise) return;
    setPlacedSlots(new Array(currentExercise.correctPhonemes.length).fill(null));
    const pool = currentExercise.tilePool
      .map((p, idx) => ({
        id: `tile_${idx}_${p}_${Date.now()}`,
        phoneme: p
      }))
      .sort(() => Math.random() - 0.5);
    setAvailableTiles(pool);
    setIsCompleted(false);
    setIsCorrect(null);
    setShowHint(false);
  };

  // Next exercise
  const handleNext = () => {
    if (exerciseIndex < filteredExercises.length - 1) {
      setExerciseIndex((prev) => prev + 1);
    } else {
      setExerciseIndex(0);
    }
  };

  // Previous exercise
  const handlePrev = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex((prev) => prev - 1);
    } else {
      setExerciseIndex(filteredExercises.length - 1);
    }
  };

  return (
    <div id="drag-drop-view-container" className="max-w-5xl mx-auto space-y-6">
      {/* Top Mode Switcher */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            id="tab-mode-syllables"
            onClick={() => {
              SoundEffects.playClick();
              setPracticeMode('syllables');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              practiceMode === 'syllables'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Phân Tích Âm Tiết (200 Từ)
          </button>

          <button
            id="tab-mode-ipa"
            onClick={() => {
              SoundEffects.playClick();
              setPracticeMode('ipa');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              practiceMode === 'ipa'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            Ghép Thẻ Phiên Âm IPA (200 Từ)
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 px-2">
          <span>Đã ghép chuẩn:</span>
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black">
            {completedWordIds.size} từ
          </span>
          {streakCount > 0 && (
            <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-black flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-600" />
              Chuỗi {streakCount}
            </span>
          )}
        </div>
      </div>

      {practiceMode === 'syllables' ? (
        <SyllableAnalysisView
          onCompleteExercise={onCompleteExercise}
          onOpenDragDropForWord={handleOpenWordInIpa}
        />
      ) : (
        <div className="space-y-6">
          {/* Header & 200 Words Part Filter */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                    MỨC TỐI ĐA 200 TỪ ĐA ÂM TIẾT
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Từ {exerciseIndex + 1} / {filteredExercises.length}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                  Ghép Thẻ Phiên Âm IPA Đa Âm Tiết
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Chạm hoặc kéo các thẻ âm vị IPA cỡ lớn bên dưới vào các ô trống để tạo phiên âm hoàn chỉnh.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm từ vựng (VD: teacher, candle)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setExerciseIndex(0);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 font-medium"
                />
              </div>
            </div>

            {/* Part Selection Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-indigo-600" />
                Lọc theo phần:
              </span>
              {[
                { id: 'all', label: 'Tất cả (200+ từ)' },
                { id: 'part1', label: 'Phần I (Từ 1–50)' },
                { id: 'part2', label: 'Phần II (Từ 51–100)' },
                { id: 'part3', label: 'Phần III (Từ 101–150)' },
                { id: 'part4', label: 'Phần IV (Từ 151–200)' },
                { id: 'basic', label: 'Từ Cơ Bản (CVC)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id as any);
                    setExerciseIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Puzzle Card */}
          {currentExercise ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs space-y-8">
              {/* Navigation Bar between Words */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xs sm:text-sm">
                    {exerciseIndex + 1} / {filteredExercises.length}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-500">
                    Cấp độ: {currentExercise.level === 'easy' ? 'Dễ' : currentExercise.level === 'medium' ? 'Trung bình' : 'Nâng cao'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-bold active:scale-95"
                    title="Từ trước"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Trước</span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-bold active:scale-95"
                    title="Từ sau"
                  >
                    <span>Sau</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Word Display & Audio Player */}
              <div className="bg-gradient-to-br from-indigo-50/70 via-slate-50 to-emerald-50/40 border border-indigo-100 rounded-3xl p-6 sm:p-8 text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                    {currentExercise.word}
                  </h2>
                  <button
                    id="btn-play-exercise-word"
                    onClick={handlePlayWord}
                    className="p-3.5 sm:p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md active:scale-95"
                    title="Nghe phát âm chuẩn của từ"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-base sm:text-xl text-slate-700 font-bold">
                  Nghĩa tiếng Việt: <span className="text-slate-900">{currentExercise.meaningVi}</span>
                </p>

                <p className="text-xs sm:text-sm text-indigo-700 font-bold pt-1">
                  👇 Chạm các thẻ âm IPA bên dưới để ghép đúng thứ tự vào các ô trống:
                </p>
              </div>

              {/* Target Phoneme Drop Slots (Extra Large & Highly Visible) */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap py-6 px-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-400 select-none">/</span>

                  {placedSlots.map((phoneme, slotIdx) => (
                    <div
                      key={slotIdx}
                      id={`target-slot-${slotIdx}`}
                      onClick={() => handleRemoveFromSlot(slotIdx)}
                      className={`min-w-[66px] h-20 sm:min-w-[82px] sm:h-24 md:min-w-[94px] md:h-28 px-3 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                        phoneme
                          ? isCompleted
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-md'
                              : 'bg-rose-50 border-rose-500 text-rose-800 shadow-md'
                            : 'bg-white border-indigo-500 text-indigo-800 shadow-md ring-2 ring-indigo-500/20'
                          : 'bg-white/90 border-slate-300 text-slate-400 border-dashed hover:border-indigo-400 hover:bg-indigo-50/20'
                      }`}
                    >
                      {phoneme ? (
                        <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono select-none">
                          {phoneme}
                        </span>
                      ) : (
                        <span className="text-sm sm:text-base font-mono font-bold text-slate-300 select-none">
                          {slotIdx + 1}
                        </span>
                      )}
                    </div>
                  ))}

                  <span className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-400 select-none">/</span>
                </div>

                {placedSlots.some((p) => p !== null) && !isCompleted && (
                  <div className="text-center">
                    <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                      💡 Mẹo: Chạm vào bất kỳ ô đã ghép nào để gỡ thẻ ra
                    </span>
                  </div>
                )}
              </div>

              {/* Available Phoneme Tiles Pool (Extra Large Size) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-700">
                  <span>Kho thẻ âm có sẵn (chạm để ghép):</span>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1.5 transition-colors text-xs sm:text-sm"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                  </button>
                </div>

                {showHint && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm sm:text-base text-amber-950 animate-fade-in font-medium space-y-1">
                    <span className="font-bold block">💡 Hướng dẫn & gợi ý:</span>
                    <p>{currentExercise.hintVi}</p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap min-h-[96px] p-5 sm:p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  {availableTiles.length > 0 ? (
                    availableTiles.map((tile) => (
                      <button
                        key={tile.id}
                        id={`phoneme-tile-${tile.id}`}
                        onClick={() => handleSelectTile(tile)}
                        className="min-w-[68px] h-20 sm:min-w-[82px] sm:h-24 md:min-w-[92px] md:h-26 px-4 rounded-2xl bg-white hover:bg-indigo-600 border-2 border-indigo-200 hover:border-indigo-600 text-slate-900 hover:text-white font-black font-mono text-2xl sm:text-3xl md:text-4xl shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                      >
                        {tile.phoneme}
                      </button>
                    ))
                  ) : (
                    <span className="text-sm sm:text-base text-slate-400 font-semibold">
                      Đã ghép hết các thẻ vào ô trống!
                    </span>
                  )}
                </div>
              </div>

              {/* Evaluation Banner & Actions */}
              {isCompleted && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
                  {isCorrect ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-emerald-950">
                            Chính xác tuyệt vời! +25 Điểm EXP
                          </h4>
                          <p className="text-sm sm:text-base text-emerald-800 font-semibold">
                            Phiên âm chuẩn: <span className="font-mono font-black text-emerald-950 text-base sm:text-lg">{currentExercise.ipaFull}</span>
                          </p>
                        </div>
                      </div>
                      <button
                        id="btn-next-dragdrop"
                        onClick={handleNext}
                        className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                      >
                        Từ tiếp theo
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-sm">
                          !
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-rose-950">
                            Chưa chính xác, hãy thử lại!
                          </h4>
                          <p className="text-sm sm:text-base text-rose-800 font-semibold">
                            Đáp án đúng là: <span className="font-mono font-black text-rose-950 text-base sm:text-lg">{currentExercise.ipaFull}</span>
                          </p>
                        </div>
                      </div>
                      <button
                        id="btn-retry-dragdrop"
                        onClick={handleResetCurrent}
                        className="px-5 py-3 rounded-2xl bg-white hover:bg-rose-100 text-rose-800 font-black text-sm sm:text-base flex items-center justify-center gap-2 border border-rose-300 transition-all active:scale-95 shadow-xs"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Thử lại
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
              <p className="text-base text-slate-600 font-semibold">
                Không tìm thấy từ nào phù hợp với từ khóa tìm kiếm "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
