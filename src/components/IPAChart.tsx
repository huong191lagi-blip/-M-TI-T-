import React, { useState } from 'react';
import { IPASound, SoundCategory } from '../types';
import { IPA_SOUNDS, CATEGORY_METADATA } from '../data/ipaData';
import { VietnameseGuideBoardView } from './VietnameseGuideBoardView';
import { SpeechService, SoundEffects } from '../utils/audio';
import { Volume2, CheckCircle2, Search, Sparkles, Filter, Bookmark, Info, Image as ImageIcon, LayoutGrid } from 'lucide-react';

interface IPAChartProps {
  onSelectSound: (sound: IPASound) => void;
  masteredSoundIds: string[];
  savedSoundIds: string[];
}

export const IPAChart: React.FC<IPAChartProps> = ({
  onSelectSound,
  masteredSoundIds,
  savedSoundIds
}) => {
  const [viewMode, setViewMode] = useState<'vietnamese_guide' | 'grid'>('vietnamese_guide');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Audio quick play
  const handleQuickPlay = (e: React.MouseEvent, sound: IPASound) => {
    e.stopPropagation();
    SoundEffects.playClick();
    SpeechService.playIPAPhoneme(sound.id, sound.symbol, sound.exampleWords[0]?.word);
  };

  // Filter sounds
  const filteredSounds = IPA_SOUNDS.filter((sound) => {
    // Search query
    const matchSearch =
      sound.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sound.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sound.exampleWords.some(w => w.word.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'vowels') return sound.category.includes('monophthong') || sound.category === 'diphthong';
    if (selectedFilter === 'consonants') return sound.category.includes('consonant');
    if (selectedFilter === 'mastered') return masteredSoundIds.includes(sound.id);
    if (selectedFilter === 'saved') return savedSoundIds.includes(sound.id);
    return sound.category === selectedFilter;
  });

  // Group filtered sounds by category for organized display
  const shortVowels = filteredSounds.filter(s => s.category === 'monophthong_short');
  const longVowels = filteredSounds.filter(s => s.category === 'monophthong_long');
  const diphthongs = filteredSounds.filter(s => s.category === 'diphthong');
  const voicelessConsonants = filteredSounds.filter(s => s.category === 'consonant_voiceless');
  const voicedConsonants = filteredSounds.filter(s => s.category === 'consonant_voiced');

  const renderSoundGrid = (sounds: IPASound[], title: string, subtitle: string, badgeBg: string, accentColor: string) => {
    if (sounds.length === 0) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${accentColor}`}></span>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <span className="text-xs text-slate-500 font-semibold">({sounds.length} âm)</span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline font-medium">{subtitle}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {sounds.map((sound) => {
            const isMastered = masteredSoundIds.includes(sound.id);
            const isSaved = savedSoundIds.includes(sound.id);

            return (
              <div
                key={sound.id}
                id={`sound-tile-${sound.id}`}
                onClick={() => onSelectSound(sound)}
                className={`relative group bg-white hover:bg-indigo-50/40 border rounded-2xl p-4 cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex flex-col items-center justify-between text-center overflow-hidden ${
                  isMastered
                    ? 'border-emerald-400/90 bg-emerald-50/30 ring-1 ring-emerald-300/60'
                    : 'border-slate-200/90 hover:border-indigo-300'
                }`}
              >
                {/* Status Badges */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                  {isSaved && (
                    <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  )}
                  {isMastered && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  )}
                </div>

                {/* Big IPA Symbol */}
                <div className="text-3xl font-black text-slate-900 tracking-tight my-1 group-hover:text-indigo-600 transition-colors">
                  /{sound.symbol}/
                </div>

                {/* Example Word */}
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {sound.exampleWords[0]?.word}
                </div>
                <div className="text-[11px] text-slate-500 font-mono font-medium">
                  {sound.exampleWords[0]?.ipa}
                </div>

                {/* Quick Audio Play Trigger */}
                <div className="mt-3 w-full flex items-center justify-center pt-2 border-t border-slate-100">
                  <button
                    onClick={(e) => handleQuickPlay(e, sound)}
                    title={`Nghe phát âm ví dụ "${sound.exampleWords[0]?.word}"`}
                    className="p-1.5 rounded-xl bg-slate-100 group-hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id="ipa-chart-view" className="space-y-6">
      {/* View Switcher: Vietnamese Guide Board (From Images) vs Interactive Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Khẩu hình & Hướng dẫn phát âm chuẩn 44 âm IPA
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Chọn chế độ xem theo bộ ảnh so sánh tiếng Việt hoặc lưới tương tác quốc tế
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 border border-slate-200">
          <button
            onClick={() => setViewMode('vietnamese_guide')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'vietnamese_guide'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Khẩu hình & Hướng dẫn (Ảnh)</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Lưới 44 Âm Quốc Tế</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Vietnamese Guide Board from the 4 Images */}
      {viewMode === 'vietnamese_guide' ? (
        <VietnameseGuideBoardView onSelectSound={onSelectSound} />
      ) : (
        <>
          {/* Search & Filter Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Field */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-sound-search"
                type="text"
                placeholder="Tìm kiếm ký tự IPA (vd: /θ/, /iː/) hoặc từ vựng (cat, ship)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'Tất cả (44 âm)' },
                { id: 'vowels', label: 'Nguyên âm (20)' },
                { id: 'consonants', label: 'Phụ âm (24)' },
                { id: 'mastered', label: `Đã thuộc (${masteredSoundIds.length})` },
                { id: 'saved', label: `Đã lưu (${savedSoundIds.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
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

      {/* Color-Coded Categorized Sounds */}
      <div className="space-y-8">
        {/* Short Monophthongs */}
        {renderSoundGrid(
          shortVowels,
          'Nguyên âm đơn ngắn (Short Monophthongs)',
          'Phát âm dứt khoát trong 0.2 giây',
          'bg-emerald-50 text-emerald-700',
          'bg-emerald-500'
        )}

        {/* Long Monophthongs */}
        {renderSoundGrid(
          longVowels,
          'Nguyên âm đơn dài (Long Monophthongs)',
          'Ngân dài đều đặn có dấu (ː)',
          'bg-indigo-50 text-indigo-700',
          'bg-indigo-600'
        )}

        {/* Diphthongs */}
        {renderSoundGrid(
          diphthongs,
          'Nguyên âm đôi (Diphthongs)',
          'Chuyển động mượt mà từ âm này sang âm khác',
          'bg-purple-50 text-purple-700',
          'bg-purple-600'
        )}

        {/* Voiceless Consonants */}
        {renderSoundGrid(
          voicelessConsonants,
          'Phụ âm vô thanh (Voiceless Consonants)',
          'Không rung cổ họng, chỉ bật hơi gió',
          'bg-amber-50 text-amber-700',
          'bg-amber-500'
        )}

        {/* Voiced Consonants */}
        {renderSoundGrid(
          voicedConsonants,
          'Phụ âm hữu thanh (Voiced Consonants)',
          'Rung mạnh dây thanh quản trong cổ họng',
          'bg-sky-50 text-sky-700',
          'bg-sky-600'
        )}

        {filteredSounds.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-xs">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="font-bold text-slate-700">Không tìm thấy âm IPA phù hợp</p>
            <p className="text-xs text-slate-400 mt-1">Hãy thử xóa từ khóa tìm kiếm hoặc chọn bộ lọc khác.</p>
          </div>
        )}
      </div>
      </>
    )}
    </div>
  );
};
