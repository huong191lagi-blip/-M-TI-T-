import React, { useState, useEffect, useMemo } from 'react';
import { SYLLABLE_WORDS } from '../data/syllableData';
import { parseIpaToPhonemes, isVowelPhoneme, getPhonemeClassification } from '../utils/phonemeParser';
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
  Flame,
  Search,
  Filter,
  Layers,
  Award,
  BookOpen,
  Zap,
  Info,
  Check,
  X
} from 'lucide-react';

interface SoundAnalysisGameViewProps {
  onCompleteGame: (points: number) => void;
}

interface WordGameItem {
  id: string;
  word: string;
  ipa: string;
  meaningVi: string;
  category: 'cvc' | 'part1' | 'part2' | 'part3' | 'part4';
  categoryLabel: string;
  phonemes: string[];
}

// Curated 1-syllable words for initial warm-up
const FOUNDATIONAL_WORDS: WordGameItem[] = [
  { id: 'found_1', word: 'cat', ipa: '/kæt/', meaningVi: 'con mèo', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['k', 'æ', 't'] },
  { id: 'found_2', word: 'ship', ipa: '/ʃɪp/', meaningVi: 'con tàu', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['ʃ', 'ɪ', 'p'] },
  { id: 'found_3', word: 'pen', ipa: '/pen/', meaningVi: 'cây bút', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['p', 'e', 'n'] },
  { id: 'found_4', word: 'sun', ipa: '/sʌn/', meaningVi: 'mặt trời', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['s', 'ʌ', 'n'] },
  { id: 'found_5', word: 'dog', ipa: '/dɒɡ/', meaningVi: 'con chó', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['d', 'ɒ', 'ɡ'] },
  { id: 'found_6', word: 'tree', ipa: '/triː/', meaningVi: 'cái cây', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['t', 'r', 'iː'] },
  { id: 'found_7', word: 'rain', ipa: '/reɪn/', meaningVi: 'cơn mưa', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['r', 'eɪ', 'n'] },
  { id: 'found_8', word: 'book', ipa: '/bʊk/', meaningVi: 'quyển sách', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['b', 'ʊ', 'k'] },
  { id: 'found_9', word: 'fish', ipa: '/fɪʃ/', meaningVi: 'con cá', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['f', 'ɪ', 'ʃ'] },
  { id: 'found_10', word: 'blue', ipa: '/bluː/', meaningVi: 'màu xanh', category: 'cvc', categoryLabel: 'Căn bản (1 âm tiết)', phonemes: ['b', 'l', 'uː'] }
];

// Combine foundational words with the 200 multisyllabic words
const ALL_GAME_WORDS: WordGameItem[] = [
  ...FOUNDATIONAL_WORDS,
  ...SYLLABLE_WORDS.map((w) => {
    let cat: 'part1' | 'part2' | 'part3' | 'part4' = 'part1';
    let catLabel = 'Phần I (Từ 1–50)';
    if (w.id > 150) {
      cat = 'part4';
      catLabel = 'Phần IV (Từ 151–200)';
    } else if (w.id > 100) {
      cat = 'part3';
      catLabel = 'Phần III (Từ 101–150)';
    } else if (w.id > 50) {
      cat = 'part2';
      catLabel = 'Phần II (Từ 51–100)';
    }

    return {
      id: `syllable_${w.id}`,
      word: w.word,
      ipa: w.ipa,
      meaningVi: w.meaningVi,
      category: cat,
      categoryLabel: catLabel,
      phonemes: parseIpaToPhonemes(w.ipa)
    };
  })
];

export const SoundAnalysisGameView: React.FC<SoundAnalysisGameViewProps> = ({ onCompleteGame }) => {
  const [gameMode, setGameMode] = useState<'word_breakdown' | 'quick_reflex'>('word_breakdown');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cvc' | 'part1' | 'part2' | 'part3' | 'part4'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // User's classification per phoneme in current word: key is phoneme index, value is 'vowel' | 'consonant'
  const [userSelections, setUserSelections] = useState<Record<number, 'vowel' | 'consonant'>>({});
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [scoreStreak, setScoreStreak] = useState<number>(0);
  const [completedWordsCount, setCompletedWordsCount] = useState<number>(0);

  // Quick Reflex Mode States
  const [reflexTarget, setReflexTarget] = useState<{
    word: string;
    phoneme: string;
    isVowel: boolean;
    details: ReturnType<typeof getPhonemeClassification>;
  } | null>(null);
  const [reflexFeedback, setReflexFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [reflexScore, setReflexScore] = useState<number>(0);

  // Filtered pool of words
  const filteredWords = useMemo(() => {
    let pool = ALL_GAME_WORDS;
    if (selectedFilter !== 'all') {
      pool = pool.filter((item) => item.category === selectedFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      pool = pool.filter(
        (item) =>
          item.word.toLowerCase().includes(q) ||
          item.meaningVi.toLowerCase().includes(q) ||
          item.ipa.toLowerCase().includes(q)
      );
    }
    return pool;
  }, [selectedFilter, searchQuery]);

  const currentWord = filteredWords[currentIndex] || filteredWords[0];

  // Reset user selections when word changes
  useEffect(() => {
    setUserSelections({});
    setIsEvaluated(false);
  }, [currentIndex, currentWord]);

  // Generate a random phoneme for Quick Reflex Mode
  const generateReflexQuestion = () => {
    const randomWord = ALL_GAME_WORDS[Math.floor(Math.random() * ALL_GAME_WORDS.length)];
    const randomPhoneme = randomWord.phonemes[Math.floor(Math.random() * randomWord.phonemes.length)];
    const isVowel = isVowelPhoneme(randomPhoneme);
    const details = getPhonemeClassification(randomPhoneme);

    setReflexTarget({
      word: randomWord.word,
      phoneme: randomPhoneme,
      isVowel,
      details
    });
    setReflexFeedback(null);
  };

  useEffect(() => {
    if (gameMode === 'quick_reflex' && !reflexTarget) {
      generateReflexQuestion();
    }
  }, [gameMode]);

  const handlePlayWord = () => {
    if (!currentWord) return;
    SoundEffects.playClick();
    SpeechService.speak(currentWord.word, { rate: 0.85 });
  };

  const handlePlayPhoneme = (phoneme: string) => {
    SoundEffects.playClick();
    SpeechService.playIPAPhoneme(phoneme);
  };

  // Toggle selection for a specific phoneme in the word
  const handleSelectPhonemeType = (index: number, type: 'vowel' | 'consonant') => {
    if (isEvaluated) return;
    SoundEffects.playClick();
    setUserSelections((prev) => ({
      ...prev,
      [index]: type
    }));
  };

  // Check user classifications for current word
  const handleCheckSolution = () => {
    if (!currentWord) return;
    
    // Check if user has classified all phonemes
    const allAnswered = currentWord.phonemes.every((_, idx) => userSelections[idx] !== undefined);
    if (!allAnswered) {
      alert('Vui lòng phân loại tất cả các âm của từ trước khi kiểm tra!');
      return;
    }

    const isAllCorrect = currentWord.phonemes.every((phoneme, idx) => {
      const correctType = isVowelPhoneme(phoneme) ? 'vowel' : 'consonant';
      return userSelections[idx] === correctType;
    });

    setIsEvaluated(true);

    if (isAllCorrect) {
      SoundEffects.playCorrect();
      setScoreStreak((prev) => prev + 1);
      setCompletedWordsCount((prev) => prev + 1);
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 }
      });
      onCompleteGame(20);
    } else {
      SoundEffects.playWrong();
      setScoreStreak(0);
    }
  };

  // Reset current word
  const handleResetWord = () => {
    setUserSelections({});
    setIsEvaluated(false);
  };

  // Next word
  const handleNextWord = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Prev word
  const handlePrevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredWords.length - 1);
    }
  };

  // Quick reflex answer
  const handleReflexAnswer = (userChoice: 'vowel' | 'consonant') => {
    if (!reflexTarget || reflexFeedback) return;

    const correctType = reflexTarget.isVowel ? 'vowel' : 'consonant';
    const isCorrect = userChoice === correctType;

    if (isCorrect) {
      SoundEffects.playCorrect();
      setReflexScore((prev) => prev + 10);
      setScoreStreak((prev) => prev + 1);
      setReflexFeedback({
        isCorrect: true,
        message: `Chính xác! Âm /${reflexTarget.phoneme}/ là ${reflexTarget.details.typeNameVi} (${reflexTarget.details.subTypeVi}).`
      });
      onCompleteGame(10);
    } else {
      SoundEffects.playWrong();
      setScoreStreak(0);
      setReflexFeedback({
        isCorrect: false,
        message: `Chưa đúng! Âm /${reflexTarget.phoneme}/ thực chất là ${reflexTarget.details.typeNameVi} (${reflexTarget.details.subTypeVi}).`
      });
    }

    setTimeout(() => {
      generateReflexQuestion();
    }, 1800);
  };

  // Counts of actual vowels and consonants in current word
  const actualVowelCount = useMemo(() => {
    if (!currentWord) return 0;
    return currentWord.phonemes.filter((p) => isVowelPhoneme(p)).length;
  }, [currentWord]);

  const actualConsonantCount = useMemo(() => {
    if (!currentWord) return 0;
    return currentWord.phonemes.length - actualVowelCount;
  }, [currentWord, actualVowelCount]);

  return (
    <div id="sound-analysis-game-container" className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 overflow-x-auto">
          <button
            id="tab-mode-breakdown"
            onClick={() => {
              SoundEffects.playClick();
              setGameMode('word_breakdown');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              gameMode === 'word_breakdown'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Phân Tích Từng Âm Của Từ
          </button>

          <button
            id="tab-mode-reflex"
            onClick={() => {
              SoundEffects.playClick();
              setGameMode('quick_reflex');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              gameMode === 'quick_reflex'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            Phản Xạ Nhanh: Nguyên Âm vs Phụ Âm
          </button>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-black text-slate-700 px-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Đã hoàn thành: {completedWordsCount} từ</span>
          </div>
          {scoreStreak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Chuỗi: {scoreStreak}</span>
            </div>
          )}
        </div>
      </div>

      {gameMode === 'word_breakdown' ? (
        <div className="space-y-6">
          {/* Header & Filter Controls */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs">
                    LUYỆN PHÂN TÍCH ÂM VỊ
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Từ {currentIndex + 1} / {filteredWords.length}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Phân Biệt Nguyên Âm (Vowel) & Phụ Âm (Consonant)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Quan sát từ vựng, nghe phát âm và phân loại từng âm vị IPA cấu tạo nên từ đó.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm từ (VD: teacher, cat)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 font-bold"
                />
              </div>
            </div>

            {/* Filter Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-indigo-600" />
                Chọn danh mục:
              </span>
              {[
                { id: 'all', label: 'Tất cả từ (210+ từ)' },
                { id: 'cvc', label: 'Căn bản (1 âm tiết)' },
                { id: 'part1', label: 'Phần I (Từ 1–50)' },
                { id: 'part2', label: 'Phần II (Từ 51–100)' },
                { id: 'part3', label: 'Phần III (Từ 101–150)' },
                { id: 'part4', label: 'Phần IV (Từ 151–200)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedFilter(tab.id as any);
                    setCurrentIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    selectedFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Word Card */}
          {currentWord && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs space-y-8">
              {/* Navigation Header */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xs sm:text-sm">
                    Từ #{currentIndex + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-500">
                    {currentWord.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevWord}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-bold active:scale-95"
                    title="Từ trước"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Trước</span>
                  </button>
                  <button
                    onClick={handleNextWord}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-bold active:scale-95"
                    title="Từ sau"
                  >
                    <span>Sau</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Word Display & Audio Player */}
              <div className="bg-gradient-to-br from-indigo-50/70 via-slate-50 to-emerald-50/50 border border-indigo-100 rounded-3xl p-6 sm:p-8 text-center space-y-3">
                <div className="flex items-center justify-center gap-4">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                    {currentWord.word}
                  </h2>
                  <button
                    id="btn-play-analysis-word"
                    onClick={handlePlayWord}
                    className="p-3.5 sm:p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md active:scale-95"
                    title="Nghe phát âm chuẩn của từ"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="text-base sm:text-xl text-slate-700 font-bold flex items-center justify-center gap-2 flex-wrap">
                  <span className="font-mono text-indigo-700 font-black px-3 py-1 rounded-xl bg-indigo-100/70 border border-indigo-200">
                    {currentWord.ipa}
                  </span>
                  <span>• {currentWord.meaningVi}</span>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-bold text-slate-600 pt-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    🔵 Số nguyên âm: <strong>{actualVowelCount}</strong>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    🟠 Số phụ âm: <strong>{actualConsonantCount}</strong>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Tổng: <strong>{currentWord.phonemes.length} âm vị</strong>
                  </span>
                </div>
              </div>

              {/* Phoneme Classification Board */}
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-800">
                    👇 Bấm chọn phân loại cho từng âm vị bên dưới:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    (Bạn có thể bấm vào biểu tượng loa của từng âm để nghe rõ âm vị đó)
                  </p>
                </div>

                {/* Phoneme Cards Grid */}
                <div className="flex items-stretch justify-center gap-3 sm:gap-4 flex-wrap p-4 sm:p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  {currentWord.phonemes.map((phoneme, idx) => {
                    const isVowel = isVowelPhoneme(phoneme);
                    const userChoice = userSelections[idx];
                    const isCorrect = userChoice === (isVowel ? 'vowel' : 'consonant');
                    const details = getPhonemeClassification(phoneme);

                    return (
                      <div
                        key={idx}
                        className={`w-32 sm:w-36 rounded-2xl border-2 p-3 flex flex-col items-center justify-between gap-2.5 transition-all shadow-xs ${
                          isEvaluated
                            ? isCorrect
                              ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                              : 'bg-rose-50/80 border-rose-500 shadow-md ring-2 ring-rose-500/20'
                            : userChoice === 'vowel'
                            ? 'bg-blue-50/80 border-blue-500 shadow-sm'
                            : userChoice === 'consonant'
                            ? 'bg-amber-50/80 border-amber-500 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {/* Phoneme Display & Speaker */}
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                            /{phoneme}/
                          </span>
                          <button
                            onClick={() => handlePlayPhoneme(phoneme)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                            title={`Nghe âm /${phoneme}/`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Evaluation Indicator */}
                        {isEvaluated && (
                          <div className="w-full text-center">
                            {isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-lg">
                                <Check className="w-3.5 h-3.5" /> Đúng
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-lg">
                                <X className="w-3.5 h-3.5" /> Sai (là {details.typeNameVi.split(' ')[0]})
                              </span>
                            )}
                          </div>
                        )}

                        {/* Action Toggle Buttons */}
                        <div className="w-full space-y-1.5 pt-1">
                          <button
                            onClick={() => handleSelectPhonemeType(idx, 'vowel')}
                            disabled={isEvaluated}
                            className={`w-full py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                              userChoice === 'vowel'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                            } ${isEvaluated ? 'cursor-default opacity-90' : ''}`}
                          >
                            <span>🔵</span>
                            <span>Nguyên âm</span>
                          </button>

                          <button
                            onClick={() => handleSelectPhonemeType(idx, 'consonant')}
                            disabled={isEvaluated}
                            className={`w-full py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                              userChoice === 'consonant'
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-700'
                            } ${isEvaluated ? 'cursor-default opacity-90' : ''}`}
                          >
                            <span>🟠</span>
                            <span>Phụ âm</span>
                          </button>
                        </div>

                        {/* Details tip when evaluated */}
                        {isEvaluated && (
                          <div className="text-[10px] text-slate-600 text-center font-medium leading-tight pt-1 border-t border-slate-200/80 w-full">
                            {details.subTypeVi}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetWord}
                    className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Làm lại từ này
                  </button>
                </div>

                {!isEvaluated ? (
                  <button
                    onClick={handleCheckSolution}
                    className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm sm:text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Kiểm tra phân tích
                  </button>
                ) : (
                  <button
                    onClick={handleNextWord}
                    className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Từ tiếp theo</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Detailed Educational Breakdown Table after Evaluation */}
              {isEvaluated && (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 animate-fade-in">
                  <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-600" />
                    Giải thích ngữ âm học chi tiết cho từ "{currentWord.word}":
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-2xl border border-blue-200 space-y-2">
                      <span className="text-xs font-black text-blue-800 uppercase tracking-wider block">
                        🔵 Các nguyên âm ({actualVowelCount}):
                      </span>
                      <div className="space-y-2 text-xs sm:text-sm">
                        {currentWord.phonemes
                          .filter((p) => isVowelPhoneme(p))
                          .map((p, i) => {
                            const details = getPhonemeClassification(p);
                            return (
                              <div key={i} className="flex items-start gap-2">
                                <span className="font-mono font-black text-blue-700 text-base">/{p}/:</span>
                                <div>
                                  <span className="font-bold text-slate-800">{details.subTypeVi}</span>
                                  <p className="text-slate-600 text-xs mt-0.5">{details.descriptionVi}</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
                      <span className="text-xs font-black text-amber-800 uppercase tracking-wider block">
                        🟠 Các phụ âm ({actualConsonantCount}):
                      </span>
                      <div className="space-y-2 text-xs sm:text-sm">
                        {currentWord.phonemes
                          .filter((p) => !isVowelPhoneme(p))
                          .map((p, i) => {
                            const details = getPhonemeClassification(p);
                            return (
                              <div key={i} className="flex items-start gap-2">
                                <span className="font-mono font-black text-amber-700 text-base">/{p}/:</span>
                                <div>
                                  <span className="font-bold text-slate-800">{details.subTypeVi}</span>
                                  <p className="text-slate-600 text-xs mt-0.5">{details.descriptionVi}</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* QUICK REFLEX GAME MODE */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 text-center">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
              ⚡ THỬ THÁCH PHẢN XẠ NHANH
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Nguyên Âm Hay Phụ Âm?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Lắng nghe và nhìn âm vị xuất hiện, chọn nhanh đáp án đúng để lập kỷ lục chuỗi thắng!
            </p>
          </div>

          {reflexTarget && (
            <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-50/90 via-slate-50 to-emerald-50/70 border-2 border-indigo-100 rounded-3xl p-8 space-y-6 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Âm vị trong từ: <strong className="text-slate-900 text-sm">"{reflexTarget.word}"</strong>
              </div>

              {/* Target Phoneme */}
              <div className="flex items-center justify-center gap-3">
                <span className="text-6xl sm:text-7xl font-black font-mono text-indigo-900 tracking-tight">
                  /{reflexTarget.phoneme}/
                </span>
                <button
                  onClick={() => handlePlayPhoneme(reflexTarget.phoneme)}
                  className="p-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-95 transition-all"
                  title="Nghe âm"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              {/* Feedback Banner */}
              {reflexFeedback && (
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-black animate-fade-in ${
                    reflexFeedback.isCorrect
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-100 text-rose-900 border border-rose-200'
                  }`}
                >
                  {reflexFeedback.message}
                </div>
              )}

              {/* Two Giant Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => handleReflexAnswer('vowel')}
                  disabled={Boolean(reflexFeedback)}
                  className="py-5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-base sm:text-lg shadow-md transition-all flex flex-col items-center gap-1"
                >
                  <span className="text-2xl">🔵</span>
                  <span>NGUYÊN ÂM</span>
                  <span className="text-[11px] font-medium opacity-80">(Vowel)</span>
                </button>

                <button
                  onClick={() => handleReflexAnswer('consonant')}
                  disabled={Boolean(reflexFeedback)}
                  className="py-5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black text-base sm:text-lg shadow-md transition-all flex flex-col items-center gap-1"
                >
                  <span className="text-2xl">🟠</span>
                  <span>PHỤ ÂM</span>
                  <span className="text-[11px] font-medium opacity-80">(Consonant)</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 font-bold">
                Điểm phản xạ: <span className="text-indigo-700 font-black">{reflexScore}</span> | Chuỗi: <span className="text-amber-700 font-black">{scoreStreak}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
