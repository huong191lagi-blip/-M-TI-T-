import React, { useState } from 'react';
import { IPASound, PronunciationAttempt } from '../types';
import { MouthDiagram } from './MouthDiagram';
import { AudioComparison } from './AudioComparison';
import { VietnameseGuideCard } from './VietnameseGuideCard';
import { getVietnameseSoundGuide } from '../data/vietnameseGuideData';
import { SpeechService, SoundEffects } from '../utils/audio';
import { X, Volume2, Bookmark, CheckCircle, BookOpen, AlertTriangle, ArrowRight, Mic, Sparkles, Image as ImageIcon } from 'lucide-react';

interface SoundDetailModalProps {
  sound: IPASound | null;
  onClose: () => void;
  isMastered: boolean;
  isSaved: boolean;
  onToggleMaster: (soundId: string) => void;
  onToggleSave: (soundId: string) => void;
  onRecordSuccess: (attempt: PronunciationAttempt) => void;
}

export const SoundDetailModal: React.FC<SoundDetailModalProps> = ({
  sound,
  onClose,
  isMastered,
  isSaved,
  onToggleMaster,
  onToggleSave,
  onRecordSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'practice' | 'minimalPairs'>('guide');

  if (!sound) return null;

  const handlePlaySymbol = (e: React.MouseEvent) => {
    e.stopPropagation();
    SoundEffects.playClick();
    SpeechService.playIPAPhoneme(sound.id, sound.symbol, sound.exampleWords[0]?.word);
  };

  const handlePlayWord = (word: string) => {
    SoundEffects.playClick();
    SpeechService.speak(word, { rate: 0.85 });
  };

  return (
    <div id="sound-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-200/90 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="p-5 md:px-7 md:py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-3xl font-black text-indigo-700 shadow-xs">
              /{sound.symbol}/
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">{sound.name}</h2>
                <button
                  onClick={handlePlaySymbol}
                  title="Nghe phát âm"
                  className="p-1.5 rounded-full bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 shadow-xs transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {sound.categoryNameVi} • {sound.articulation.vocalCords === 'voiced' ? 'Hữu thanh (Rung cổ)' : 'Vô thanh (Thổi hơi)'}
              </span>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(sound.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
              }`}
              title={isSaved ? 'Đã lưu vào danh sách ôn tập' : 'Lưu để ôn lại'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => onToggleMaster(sound.id)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                isMastered
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isMastered ? 'Đã thành thạo' : 'Đánh dấu đã học'}
            </button>

            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border border-slate-200 ml-1 shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-6 pt-2 border-b border-slate-200 bg-slate-50/50">
          <button
            id="tab-guide"
            onClick={() => setActiveTab('guide')}
            className={`pb-3 px-4 text-xs md:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Khẩu hình & Hướng dẫn
          </button>

          <button
            id="tab-practice"
            onClick={() => setActiveTab('practice')}
            className={`pb-3 px-4 text-xs md:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'practice'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            Luyện nói & So sánh
          </button>

          {sound.minimalPairs && sound.minimalPairs.length > 0 && (
            <button
              id="tab-minimal-pairs"
              onClick={() => setActiveTab('minimalPairs')}
              className={`pb-3 px-4 text-xs md:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'minimalPairs'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Cặp âm dễ nhầm ({sound.minimalPairs.length})
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-5 md:p-7 overflow-y-auto space-y-6 flex-1 bg-white">
          {activeTab === 'guide' && (() => {
            const vnGuide = getVietnameseSoundGuide(sound.id) || getVietnameseSoundGuide(sound.symbol);

            return (
              <div className="space-y-6 animate-fade-in">
                {/* 1. Header Banner matching the corresponding image */}
                {vnGuide ? (
                  <div className="space-y-3">
                    {vnGuide.page === 1 && (
                      <div className="bg-[#a8d5ba] border border-[#81b29a] text-slate-900 text-center py-2.5 px-4 rounded-2xl shadow-xs">
                        <h3 className="text-base sm:text-lg font-black">
                          Cách đọc các âm thanh tương tự trong tiếng việt
                        </h3>
                        <p className="text-xs text-slate-700 font-medium">
                          Bảng nguyên âm đơn: So sánh khẩu hình và cách đọc trực quan theo tiếng Việt
                        </p>
                      </div>
                    )}

                    {vnGuide.page === 2 && (
                      <div className="space-y-2">
                        <div className="bg-[#8b0000] text-white text-center py-2.5 px-4 rounded-2xl shadow-xs">
                          <h3 className="text-base sm:text-lg font-black">
                            2 nguyên đơn ngắn kết hợp để tạo thành 1 nguyên âm đôi
                          </h3>
                        </div>
                        <div className="bg-[#f97316] text-white text-center py-2 px-3 rounded-xl shadow-xs text-xs sm:text-sm font-extrabold">
                          Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau
                        </div>
                      </div>
                    )}

                    {(vnGuide.page === 3 || vnGuide.page === 4) && (
                      <div className="bg-[#a8d5ba] border border-[#81b29a] text-slate-900 text-center py-2.5 px-4 rounded-2xl shadow-xs">
                        <h3 className="text-base sm:text-lg font-black">
                          Cách đọc các phụ âm tương tự trong tiếng việt
                        </h3>
                        <p className="text-xs text-slate-700 font-medium">
                          Đối chiếu phụ âm tiếng Anh với các âm quen thuộc trong tiếng Việt
                        </p>
                      </div>
                    )}

                    {/* 2. The Exact Visual Card from the Image */}
                    <div className="max-w-lg mx-auto">
                      <VietnameseGuideCard guide={vnGuide} symbol={sound.symbol} />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-2xl text-center text-sm text-slate-600">
                    Đang tải nội dung hướng dẫn...
                  </div>
                )}

                {/* 3. Anatomical Mouth & Tongue Diagram (Accurate lips and tongue position preserved) */}
                <div className="pt-2">
                  <MouthDiagram articulation={sound.articulation} symbol={sound.symbol} />
                </div>

                {/* 4. Example Words Grid */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Từ vựng mẫu chứa âm /{sound.symbol}/:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {sound.exampleWords.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handlePlayWord(item.word)}
                        className="bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl p-3 cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {item.word}
                          </div>
                          <div className="text-xs text-indigo-600 font-mono font-semibold">{item.ipa}</div>
                          <div className="text-[11px] text-slate-500">{item.meaningVi}</div>
                        </div>
                        <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {activeTab === 'practice' && (
            <AudioComparison
              sound={sound}
              onRecordSuccess={onRecordSuccess}
            />
          )}

          {activeTab === 'minimalPairs' && sound.minimalPairs && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 mb-2 font-medium">
                Luyện tập phân biệt các cặp từ chỉ khác nhau duy nhất một âm để nâng cao phản xạ nghe và phát âm chuẩn xác.
              </div>
              {sound.minimalPairs.map((pair, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Word A */}
                    <div
                      onClick={() => handlePlayWord(pair.wordA)}
                      className="bg-white hover:bg-indigo-50/30 p-4 rounded-xl border border-slate-200 hover:border-indigo-400 cursor-pointer transition-all text-center group shadow-2xs"
                    >
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        /{pair.soundA}/
                      </span>
                      <div className="text-xl font-black text-slate-900 mt-2 group-hover:text-indigo-600">
                        {pair.wordA}
                      </div>
                      <div className="text-xs font-mono font-bold text-indigo-600">{pair.ipaA}</div>
                      <div className="text-xs text-slate-500 mt-1">{pair.meaningA}</div>
                    </div>

                    {/* Word B */}
                    <div
                      onClick={() => handlePlayWord(pair.wordB)}
                      className="bg-white hover:bg-pink-50/30 p-4 rounded-xl border border-slate-200 hover:border-pink-400 cursor-pointer transition-all text-center group shadow-2xs"
                    >
                      <span className="text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                        /{pair.soundB}/
                      </span>
                      <div className="text-xl font-black text-slate-900 mt-2 group-hover:text-pink-600">
                        {pair.wordB}
                      </div>
                      <div className="text-xs font-mono font-bold text-pink-600">{pair.ipaB}</div>
                      <div className="text-xs text-slate-500 mt-1">{pair.meaningB}</div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{pair.distinctionTip}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
