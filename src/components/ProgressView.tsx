import React from 'react';
import { UserProgress, IPASound } from '../types';
import { IPA_SOUNDS, CATEGORY_METADATA } from '../data/ipaData';
import { Flame, Trophy, CheckCircle2, TrendingUp, Mic, Award, Bookmark, Calendar, ArrowUpRight, Zap, Sparkles } from 'lucide-react';

interface ProgressViewProps {
  progress: UserProgress;
  onSelectSoundById: (soundId: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onSelectSoundById
}) => {
  const totalSounds = IPA_SOUNDS.length; // 44
  const masteredCount = progress.masteredSoundIds.length;
  const masteryPercentage = Math.round((masteredCount / totalSounds) * 100);

  // Calculate category masteries
  const categories = [
    { key: 'monophthong_short', name: 'Nguyên âm ngắn', color: 'emerald' },
    { key: 'monophthong_long', name: 'Nguyên âm dài', color: 'indigo' },
    { key: 'diphthong', name: 'Nguyên âm đôi', color: 'purple' },
    { key: 'consonant_voiceless', name: 'Phụ âm vô thanh', color: 'amber' },
    { key: 'consonant_voiced', name: 'Phụ âm hữu thanh', color: 'sky' }
  ] as const;

  // Find weak / unmastered sounds for recommendations
  const unmasteredSounds = IPA_SOUNDS.filter(s => !progress.masteredSoundIds.includes(s.id));

  // Average pronunciation score from attempts
  const avgScore = progress.attempts.length > 0
    ? Math.round(progress.attempts.reduce((acc, curr) => acc + curr.score, 0) / progress.attempts.length)
    : 0;

  return (
    <div id="progress-view-container" className="max-w-4xl mx-auto space-y-6">
      {/* Top Hero Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Streak Card */}
        <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Chuỗi học
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Flame className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {progress.streak} <span className="text-sm font-semibold text-amber-600">ngày</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Duy trì đều đặn</p>
          </div>
        </div>

        {/* Total Mastered Sounds */}
        <div className="bg-white border border-emerald-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Đã thành thạo
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {masteredCount} <span className="text-sm font-semibold text-emerald-600">/ 44 âm</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Đạt {masteryPercentage}% toàn bảng</p>
          </div>
        </div>

        {/* Average Pronunciation Score */}
        <div className="bg-white border border-indigo-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Điểm phát âm TB
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {avgScore > 0 ? avgScore : '--'} <span className="text-sm font-semibold text-indigo-600">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {progress.attempts.length} lượt ghi âm
            </p>
          </div>
        </div>

        {/* Total Points */}
        <div className="bg-white border border-purple-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Tổng điểm EXP
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {progress.totalPoints}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Cấp độ học viên tích cực</p>
          </div>
        </div>
      </div>

      {/* Today's Goal Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">Tiến độ hôm nay</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Ngày {new Date().toLocaleDateString('vi-VN')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Âm đã luyện</div>
            <div className="text-xl font-extrabold text-emerald-700 mt-1">
              {progress.todayProgress.soundsPracticed.length} / 5
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Phân tích âm vị</div>
            <div className="text-xl font-extrabold text-indigo-700 mt-1">
              {progress.todayProgress.quizzesCompleted} / 3
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Kéo thả phiên âm</div>
            <div className="text-xl font-extrabold text-purple-700 mt-1">
              {progress.todayProgress.dragDropsCompleted} / 3
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Điểm hôm nay</div>
            <div className="text-xl font-extrabold text-amber-600 mt-1">
              +{progress.todayProgress.pointsEarned} EXP
            </div>
          </div>
        </div>
      </div>

      {/* Category Mastery Distribution */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Tiến độ làm chủ 5 nhóm âm IPA
        </h3>

        <div className="space-y-3.5">
          {categories.map((cat) => {
            const catSounds = IPA_SOUNDS.filter(s => s.category === cat.key);
            const masteredInCat = catSounds.filter(s => progress.masteredSoundIds.includes(s.id)).length;
            const pct = Math.round((masteredInCat / catSounds.length) * 100);

            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>{cat.name} ({masteredInCat}/{catSounds.length} âm)</span>
                  <span className="font-mono text-slate-500">{pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Sounds to Practice Next */}
      {unmasteredSounds.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Gợi ý các âm cần chinh phục tiếp theo
            </h3>
            <span className="text-xs text-slate-500 font-medium">Chạm để luyện ngay</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {unmasteredSounds.slice(0, 6).map((sound) => (
              <button
                key={sound.id}
                onClick={() => onSelectSoundById(sound.id)}
                className="bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-400 p-4 rounded-2xl text-center group transition-all"
              >
                <span className="text-2xl font-extrabold text-indigo-700 group-hover:text-indigo-800 block mb-1">
                  /{sound.symbol}/
                </span>
                <span className="text-xs font-bold text-slate-800 block truncate">
                  {sound.exampleWords[0]?.word}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {sound.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Pronunciation Recordings Log */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Mic className="w-5 h-5 text-rose-500" />
          Lịch sử phát âm gần đây
        </h3>

        {progress.attempts.length > 0 ? (
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {progress.attempts.slice().reverse().map((att) => (
              <div
                key={att.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">{att.word}</span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">{att.ipa}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      att.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {att.score} điểm ({att.accuracy})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{att.vietnameseFeedback}</p>
                </div>

                <div className="text-[11px] text-slate-400 shrink-0">
                  {new Date(att.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            Bạn chưa thực hiện lượt thu âm nào. Hãy vào bảng IPA chọn một âm để thử giọng nhé!
          </div>
        )}
      </div>
    </div>
  );
};
