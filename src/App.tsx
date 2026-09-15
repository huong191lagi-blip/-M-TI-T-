import React, { useState, useEffect } from 'react';
import { IPASound, UserProgress, PronunciationAttempt, ReminderSettings } from './types';
import { IPA_SOUNDS } from './data/ipaData';
import { IPAChart } from './components/IPAChart';
import { SoundDetailModal } from './components/SoundDetailModal';
import { SoundAnalysisGameView } from './components/SoundAnalysisGameView';
import { DragDropView } from './components/DragDropView';
import { ProgressView } from './components/ProgressView';
import { SmartReminderModal } from './components/SmartReminderModal';
import { SoundEffects } from './utils/audio';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Puzzle,
  TrendingUp,
  Bell,
  Flame,
  Volume2,
  VolumeX,
  Layers,
  CheckCircle2,
  Mic,
  Award
} from 'lucide-react';

const STORAGE_KEY_PROGRESS = 'ipa_master_user_progress';
const STORAGE_KEY_REMINDER = 'ipa_master_reminder_settings';

const INITIAL_PROGRESS: UserProgress = {
  masteredSoundIds: ['short_i', 'cons_p'],
  savedSoundIds: ['cons_theta', 'short_ae'],
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalPoints: 120,
  todayProgress: {
    date: new Date().toISOString().split('T')[0],
    soundsPracticed: ['short_i', 'cons_p'],
    quizzesCompleted: 1,
    dragDropsCompleted: 2,
    pointsEarned: 45
  },
  attempts: [
    {
      id: 'att_sample_1',
      soundId: 'short_i',
      word: 'ship',
      ipa: '/ʃɪp/',
      score: 92,
      accuracy: 'Xuất sắc',
      vietnameseFeedback: 'Phát âm rất tốt! Âm /ɪ/ ngắn gọn dứt khoát và chuẩn xác.',
      phoneticNotes: 'Khẩu hình chuẩn 0.2s',
      actionableTips: ['Duy trì độ mở miệng vừa phải.'],
      timestamp: Date.now() - 3600000
    }
  ]
};

const INITIAL_REMINDER: ReminderSettings = {
  enabled: true,
  preferredTime: '20:00',
  dailySoundGoal: 3,
  pushSubscribed: false
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'chart' | 'sound_analysis' | 'dragdrop' | 'progress'>('chart');
  const [selectedSound, setSelectedSound] = useState<IPASound | null>(null);
  const [isReminderOpen, setIsReminderOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // User Progress State
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (saved) {
      try {
        const parsed: UserProgress = JSON.parse(saved);
        const todayStr = new Date().toISOString().split('T')[0];

        // Check streak and day transition
        if (parsed.todayProgress?.date !== todayStr) {
          const lastDate = new Date(parsed.lastActiveDate);
          const currentDate = new Date(todayStr);
          const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

          const newStreak = diffDays === 1 ? parsed.streak + 1 : diffDays === 0 ? parsed.streak : 1;

          parsed.streak = newStreak;
          parsed.lastActiveDate = todayStr;
          parsed.todayProgress = {
            date: todayStr,
            soundsPracticed: [],
            quizzesCompleted: 0,
            dragDropsCompleted: 0,
            pointsEarned: 0
          };
        }
        return parsed;
      } catch (e) {
        return INITIAL_PROGRESS;
      }
    }
    return INITIAL_PROGRESS;
  });

  // Reminder Settings State
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REMINDER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_REMINDER;
      }
    }
    return INITIAL_REMINDER;
  });

  // Save progress to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  }, [progress]);

  // Save reminder settings to LocalStorage
  const handleSaveReminderSettings = (newSettings: ReminderSettings) => {
    setReminderSettings(newSettings);
    localStorage.setItem(STORAGE_KEY_REMINDER, JSON.stringify(newSettings));
  };

  // Toggle Sound Mastery
  const handleToggleMaster = (soundId: string) => {
    setProgress((prev) => {
      const isAlready = prev.masteredSoundIds.includes(soundId);
      const newMastered = isAlready
        ? prev.masteredSoundIds.filter(id => id !== soundId)
        : [...prev.masteredSoundIds, soundId];

      const pointsDelta = isAlready ? -20 : 20;

      return {
        ...prev,
        masteredSoundIds: newMastered,
        totalPoints: Math.max(0, prev.totalPoints + pointsDelta),
        todayProgress: {
          ...prev.todayProgress,
          soundsPracticed: Array.from(new Set([...prev.todayProgress.soundsPracticed, soundId])),
          pointsEarned: prev.todayProgress.pointsEarned + (isAlready ? 0 : 20)
        }
      };
    });
  };

  // Toggle Save Sound
  const handleToggleSave = (soundId: string) => {
    setProgress((prev) => {
      const isSaved = prev.savedSoundIds.includes(soundId);
      return {
        ...prev,
        savedSoundIds: isSaved
          ? prev.savedSoundIds.filter(id => id !== soundId)
          : [...prev.savedSoundIds, soundId]
      };
    });
  };

  // Record a new Pronunciation Attempt
  const handleRecordSuccess = (attempt: PronunciationAttempt) => {
    setProgress((prev) => {
      const points = attempt.score >= 80 ? 25 : 10;
      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        attempts: [...prev.attempts, attempt],
        todayProgress: {
          ...prev.todayProgress,
          soundsPracticed: Array.from(new Set([...prev.todayProgress.soundsPracticed, attempt.soundId])),
          pointsEarned: prev.todayProgress.pointsEarned + points
        }
      };
    });
  };

  // Handle Sound Analysis Game Completion
  const handleCompleteSoundAnalysis = (points: number) => {
    setProgress((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      todayProgress: {
        ...prev.todayProgress,
        quizzesCompleted: prev.todayProgress.quizzesCompleted + 1,
        pointsEarned: prev.todayProgress.pointsEarned + points
      }
    }));
  };

  // Handle Drag & Drop Completion
  const handleCompleteDragDrop = (points: number) => {
    setProgress((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      todayProgress: {
        ...prev.todayProgress,
        dragDropsCompleted: prev.todayProgress.dragDropsCompleted + 1,
        pointsEarned: prev.todayProgress.pointsEarned + points
      }
    }));
  };

  // Open sound detail by ID
  const handleSelectSoundById = (soundId: string) => {
    const found = IPA_SOUNDS.find(s => s.id === soundId);
    if (found) {
      setSelectedSound(found);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-indigo-50/30 to-amber-50/40 text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => setActiveTab('chart')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-sky-200 group-hover:scale-105 transition-transform">
              <span className="font-black text-lg tracking-wider drop-shadow-xs">IPA</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  IPA Master
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Chuẩn Quốc Tế
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Luyện phát âm & Khẩu hình chi tiết</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              id="nav-tab-chart"
              onClick={() => {
                setActiveTab('chart');
                SoundEffects.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'chart'
                  ? 'bg-white text-indigo-600 shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Bảng 44 Âm IPA
            </button>

            <button
              id="nav-tab-sound-analysis"
              onClick={() => {
                setActiveTab('sound_analysis');
                SoundEffects.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'sound_analysis'
                  ? 'bg-white text-emerald-600 shadow-xs border border-emerald-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-500" />
              Game Phân tích âm (Nguyên âm & Phụ âm)
            </button>

            <button
              id="nav-tab-dragdrop"
              onClick={() => {
                setActiveTab('dragdrop');
                SoundEffects.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'dragdrop'
                  ? 'bg-white text-sky-600 shadow-xs border border-sky-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Puzzle className="w-4 h-4 text-sky-500" />
              Kéo thả & Âm tiết (200 từ)
            </button>

            <button
              id="nav-tab-progress"
              onClick={() => {
                setActiveTab('progress');
                SoundEffects.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'progress'
                  ? 'bg-white text-amber-600 shadow-xs border border-amber-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-amber-500" />
              Tiến độ học tập
            </button>
          </nav>

          {/* Right Action Icons & Streak */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak Flame */}
            <div
              id="streak-badge"
              onClick={() => setActiveTab('progress')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold cursor-pointer hover:bg-amber-100 transition-all shadow-xs"
              title={`Chuỗi ${progress.streak} ngày liên tiếp`}
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{progress.streak} ngày</span>
            </div>

            {/* Smart Reminder Button */}
            <button
              id="btn-open-reminder"
              onClick={() => setIsReminderOpen(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all relative border border-slate-200 shadow-xs"
              title="Cài đặt nhắc nhở thông minh"
            >
              <Bell className="w-4 h-4" />
              {reminderSettings.enabled && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 ring-2 ring-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Bottom-bar Navigation (shown on small screens) */}
        <div className="md:hidden flex items-center justify-around bg-white border-t border-slate-200 p-2 shadow-sm">
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-2.5 rounded-xl ${
              activeTab === 'chart' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Bảng IPA
          </button>
          <button
            onClick={() => setActiveTab('sound_analysis')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-2.5 rounded-xl ${
              activeTab === 'sound_analysis' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'text-slate-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            Phân tích âm
          </button>
          <button
            onClick={() => setActiveTab('dragdrop')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-2.5 rounded-xl ${
              activeTab === 'dragdrop' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'text-slate-600'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            Kéo thả
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-2.5 rounded-xl ${
              activeTab === 'progress' ? 'text-indigo-600 bg-indigo-50 font-bold' : 'text-slate-600'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Tiến độ
          </button>
        </div>
      </header>

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'chart' && (
          <div className="space-y-6 animate-fade-in">
            {/* Friendly Hero Banner for Beginners */}
            <div className="bg-gradient-to-br from-indigo-50/90 via-sky-50/70 to-white border border-indigo-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
              <div className="max-w-2xl space-y-2.5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Phương pháp ngữ âm chuẩn quốc tế
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Làm chủ 44 âm IPA tiếng Anh với khẩu hình thực tế & AI Coach
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Chạm vào bất kỳ ký tự âm nào để mở sơ đồ giải phẫu vòm họng chi tiết, nghe phát âm chuẩn bản ngữ và tự thu âm để nhận đánh giá phân tích từ AI.
                </p>
              </div>

              {/* Quick Summary Pill */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Đã thuộc: {progress.masteredSoundIds.length}/44 âm
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Chuỗi học: {progress.streak} ngày
                </span>
              </div>
            </div>

            {/* Interactive IPA Chart */}
            <IPAChart
              onSelectSound={(sound) => setSelectedSound(sound)}
              masteredSoundIds={progress.masteredSoundIds}
              savedSoundIds={progress.savedSoundIds}
            />
          </div>
        )}

        {activeTab === 'sound_analysis' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Game Phân Tích Âm: Phân Biệt Nguyên Âm & Phụ Âm
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Lắng nghe, quan sát từ vựng và phân tách từng âm vị IPA cấu tạo nên từ để phân biệt chính xác Nguyên âm (Vowel) và Phụ âm (Consonant).
              </p>
            </div>
            <SoundAnalysisGameView onCompleteGame={handleCompleteSoundAnalysis} />
          </div>
        )}

        {activeTab === 'dragdrop' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">Thử thách Kéo thả Phiên âm</h2>
              <p className="text-sm text-slate-500">
                Lắp ghép các mảnh âm IPA đúng thứ tự để tạo nên phiên âm chuẩn của từ vựng tiếng Anh.
              </p>
            </div>
            <DragDropView onCompleteExercise={handleCompleteDragDrop} />
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">Báo cáo & Đánh giá Tiến độ</h2>
              <p className="text-sm text-slate-500">
                Theo dõi sự tiến bộ hàng ngày, chuỗi thói quen và lịch sử phân tích phát âm từ AI.
              </p>
            </div>
            <ProgressView
              progress={progress}
              onSelectSoundById={handleSelectSoundById}
            />
          </div>
        )}
      </main>

      {/* Sound Detail Modal */}
      {selectedSound && (
        <SoundDetailModal
          sound={selectedSound}
          onClose={() => setSelectedSound(null)}
          isMastered={progress.masteredSoundIds.includes(selectedSound.id)}
          isSaved={progress.savedSoundIds.includes(selectedSound.id)}
          onToggleMaster={handleToggleMaster}
          onToggleSave={handleToggleSave}
          onRecordSuccess={handleRecordSuccess}
        />
      )}

      {/* Smart Reminder Modal */}
      <SmartReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        settings={reminderSettings}
        onSaveSettings={handleSaveReminderSettings}
        streak={progress.streak}
        masteredCount={progress.masteredSoundIds.length}
      />
    </div>
  );
}
