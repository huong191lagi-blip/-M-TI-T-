import React, { useState } from 'react';
import { IPASound } from '../types';
import { IPA_SOUNDS } from '../data/ipaData';
import { VIETNAMESE_SOUND_GUIDES, VietnameseSoundGuide } from '../data/vietnameseGuideData';
import { VietnameseGuideCard } from './VietnameseGuideCard';
import { BookOpen, Sparkles, Layers, ArrowRight, Volume2 } from 'lucide-react';
import { SpeechService, SoundEffects } from '../utils/audio';

interface VietnameseGuideBoardViewProps {
  onSelectSound: (sound: IPASound) => void;
}

export const VietnameseGuideBoardView: React.FC<VietnameseGuideBoardViewProps> = ({
  onSelectSound
}) => {
  const [selectedPage, setSelectedPage] = useState<1 | 2 | 3 | 4>(1);

  const handleCardClick = (guide: VietnameseSoundGuide) => {
    const matchedSound = IPA_SOUNDS.find(
      (s) => s.id === guide.soundId || s.symbol === guide.symbol
    );
    if (matchedSound) {
      onSelectSound(matchedSound);
    }
  };

  // Group guides by pages matching the 4 uploaded photos:
  const page1ShortVowels = [
    VIETNAMESE_SOUND_GUIDES['short_ae'],
    VIETNAMESE_SOUND_GUIDES['short_schwa'],
    VIETNAMESE_SOUND_GUIDES['short_o'],
    VIETNAMESE_SOUND_GUIDES['short_u'],
    VIETNAMESE_SOUND_GUIDES['short_i'],
    VIETNAMESE_SOUND_GUIDES['short_e'],
    VIETNAMESE_SOUND_GUIDES['short_wedge'],
  ];

  const page1LongVowels = [
    VIETNAMESE_SOUND_GUIDES['long_a'],
    VIETNAMESE_SOUND_GUIDES['long_er'],
    VIETNAMESE_SOUND_GUIDES['long_o'],
    VIETNAMESE_SOUND_GUIDES['long_u'],
    VIETNAMESE_SOUND_GUIDES['long_i']
  ];

  const page2Diphthongs = [
    VIETNAMESE_SOUND_GUIDES['diph_ia'],
    VIETNAMESE_SOUND_GUIDES['diph_ea'],
    VIETNAMESE_SOUND_GUIDES['diph_ua'],
    VIETNAMESE_SOUND_GUIDES['diph_ei'],
    VIETNAMESE_SOUND_GUIDES['diph_ai'],
    VIETNAMESE_SOUND_GUIDES['diph_oi'],
    VIETNAMESE_SOUND_GUIDES['diph_ou'],
    VIETNAMESE_SOUND_GUIDES['diph_au']
  ];

  const page3ConsonantsRow1 = [
    VIETNAMESE_SOUND_GUIDES['cons_m'],
    VIETNAMESE_SOUND_GUIDES['cons_n'],
    VIETNAMESE_SOUND_GUIDES['cons_l'],
    VIETNAMESE_SOUND_GUIDES['cons_h'],
    VIETNAMESE_SOUND_GUIDES['cons_f'],
    VIETNAMESE_SOUND_GUIDES['cons_v'],
    VIETNAMESE_SOUND_GUIDES['cons_p']
  ];

  const page3ConsonantsRow2 = [
    VIETNAMESE_SOUND_GUIDES['cons_t'],
    VIETNAMESE_SOUND_GUIDES['cons_k'],
    VIETNAMESE_SOUND_GUIDES['cons_b'],
    VIETNAMESE_SOUND_GUIDES['cons_d'],
    VIETNAMESE_SOUND_GUIDES['cons_g'],
    VIETNAMESE_SOUND_GUIDES['cons_s'],
    VIETNAMESE_SOUND_GUIDES['cons_z']
  ];

  const page4ConsonantsRow1 = [
    VIETNAMESE_SOUND_GUIDES['cons_sh'],
    VIETNAMESE_SOUND_GUIDES['cons_ch'],
    VIETNAMESE_SOUND_GUIDES['cons_j'],
    VIETNAMESE_SOUND_GUIDES['cons_zh'],
    VIETNAMESE_SOUND_GUIDES['cons_ng'],
    VIETNAMESE_SOUND_GUIDES['cons_r'],
    VIETNAMESE_SOUND_GUIDES['cons_y']
  ];

  const page4ConsonantsRow2 = [
    VIETNAMESE_SOUND_GUIDES['cons_w'],
    VIETNAMESE_SOUND_GUIDES['cons_theta'],
    VIETNAMESE_SOUND_GUIDES['cons_eth']
  ];

  return (
    <div className="space-y-6">
      {/* Navigation tabs between 4 pages */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90 max-w-3xl mx-auto shadow-xs">
        <button
          onClick={() => setSelectedPage(1)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            selectedPage === 1
              ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Ảnh 1: Nguyên âm đơn</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">
            12 âm
          </span>
        </button>

        <button
          onClick={() => setSelectedPage(2)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            selectedPage === 2
              ? 'bg-white text-rose-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Ảnh 2: Nguyên âm đôi</span>
          <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full">
            8 âm
          </span>
        </button>

        <button
          onClick={() => setSelectedPage(3)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            selectedPage === 3
              ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Ảnh 3: Phụ âm (Phần 1)</span>
          <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded-full">
            14 âm
          </span>
        </button>

        <button
          onClick={() => setSelectedPage(4)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            selectedPage === 4
              ? 'bg-white text-purple-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Ảnh 4: Phụ âm (Phần 2)</span>
          <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">
            10 âm
          </span>
        </button>
      </div>

      {/* ======================= PAGE 1: NGUYÊN ÂM ĐƠN ======================= */}
      {selectedPage === 1 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
          {/* Top Green Banner from Image 1 */}
          <div className="bg-[#a8d5ba] border border-[#81b29a] text-slate-900 text-center py-3.5 px-4 rounded-2xl shadow-xs">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Cách đọc các âm thanh tương tự trong tiếng việt
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
              So sánh trực quan cơ chế khẩu hình, độ mở hàm và vị trí lưỡi theo cách đọc tiếng Việt
            </p>
          </div>

          {/* Row 1: Nguyên âm ngắn (Red Badges) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                1. Nhóm Nguyên Âm Ngắn (Thả lỏng, ngắt âm nhanh dứt khoát)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
              {page1ShortVowels.map((guide) => (
                <VietnameseGuideCard
                  key={guide.soundId}
                  guide={guide}
                  symbol={guide.symbol}
                  onSelect={() => handleCardClick(guide)}
                  compact
                />
              ))}
            </div>
          </div>

          {/* Row 2: Nguyên âm dài (Green Badges) */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3b7a36]"></span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                2. Nhóm Nguyên Âm Dài (Ngân dài âm, cong lưỡi hoặc chu tròn môi)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {page1LongVowels.map((guide) => (
                <VietnameseGuideCard
                  key={guide.soundId}
                  guide={guide}
                  symbol={guide.symbol}
                  onSelect={() => handleCardClick(guide)}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= PAGE 2: NGUYÊN ÂM ĐÔI ======================= */}
      {selectedPage === 2 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
          {/* Top Maroon Banner from Image 2 */}
          <div className="bg-[#8b0000] text-white text-center py-3.5 px-4 rounded-2xl shadow-sm">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              2 nguyên đơn ngắn kết hợp để tạo thành 1 nguyên âm đôi
            </h2>
          </div>

          {/* Orange Rule Banner from Image 2 */}
          <div className="bg-[#f97316] text-white text-center py-3 px-4 rounded-2xl shadow-sm">
            <p className="text-base sm:text-xl font-extrabold tracking-wide flex items-center justify-center gap-2">
              <span>Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau</span>
            </p>
          </div>

          {/* Combination Formula Panels from Image 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Group 1: ends in /ə/ (ə = ờ) */}
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div className="flex flex-col gap-1 text-sm font-black font-mono text-purple-800">
                <span className="bg-white px-2 py-0.5 rounded border border-pink-200">i</span>
                <span className="bg-white px-2 py-0.5 rounded border border-pink-200">e</span>
                <span className="bg-white px-2 py-0.5 rounded border border-pink-200">ʊ</span>
              </div>
              <div className="text-pink-600 font-bold text-lg">➔</div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-pink-300 font-black text-rose-700 shadow-xs text-sm">
                ə = ờ
              </div>
              <div className="text-xs text-slate-500 font-semibold max-w-[120px]">
                Tạo /ɪə/, /eə/, /ʊə/
              </div>
            </div>

            {/* Group 2: ends in /i/ */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div className="flex flex-col gap-1 text-sm font-black font-mono text-indigo-800">
                <span className="bg-white px-2 py-0.5 rounded border border-purple-200">e</span>
                <span className="bg-white px-2 py-0.5 rounded border border-purple-200">a</span>
                <span className="bg-white px-2 py-0.5 rounded border border-purple-200">ɔ</span>
              </div>
              <div className="text-purple-600 font-bold text-lg">➔</div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-purple-300 font-black text-indigo-700 shadow-xs text-sm">
                i
              </div>
              <div className="text-xs text-slate-500 font-semibold max-w-[120px]">
                Tạo /eɪ/, /aɪ/, /ɔɪ/
              </div>
            </div>

            {/* Group 3: ends in /ʊ/ */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div className="flex flex-col gap-1 text-sm font-black font-mono text-amber-800">
                <span className="bg-white px-2 py-0.5 rounded border border-amber-200">ə</span>
                <span className="bg-white px-2 py-0.5 rounded border border-amber-200">a</span>
              </div>
              <div className="text-amber-600 font-bold text-lg">➔</div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-300 font-black text-amber-800 shadow-xs text-sm">
                ʊ
              </div>
              <div className="text-xs text-slate-500 font-semibold max-w-[120px]">
                Tạo /əʊ/, /aʊ/
              </div>
            </div>
          </div>

          {/* 8 Diphthong Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3.5">
            {page2Diphthongs.map((guide) => (
              <VietnameseGuideCard
                key={guide.soundId}
                guide={guide}
                symbol={guide.symbol}
                onSelect={() => handleCardClick(guide)}
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* ======================= PAGE 3: PHỤ ÂM PHẦN 1 ======================= */}
      {selectedPage === 3 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
          {/* Top Green Banner from Image 3 */}
          <div className="bg-[#a8d5ba] border border-[#81b29a] text-slate-900 text-center py-3.5 px-4 rounded-2xl shadow-xs">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Cách đọc các phụ âm tương tự trong tiếng việt
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
              Phần 1: Nhóm phụ âm môi, lưỡi, mũi và các âm bật hơi cơ bản
            </p>
          </div>

          {/* Row 1: /m/, /n/, /l/, /h/, /f/, /v/, /p/ */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-600">Hàng 1: Âm mũi, bên, xát & bật môi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
              {page3ConsonantsRow1.map((guide) => (
                <VietnameseGuideCard
                  key={guide.soundId}
                  guide={guide}
                  symbol={guide.symbol}
                  onSelect={() => handleCardClick(guide)}
                  compact
                />
              ))}
            </div>
          </div>

          {/* Row 2: /t/, /k/, /b/, /d/, /g/, /s/, /z/ */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-600">Hàng 2: Âm bật hơi mạnh, âm tắc và âm xát gió</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
              {page3ConsonantsRow2.map((guide) => (
                <VietnameseGuideCard
                  key={guide.soundId}
                  guide={guide}
                  symbol={guide.symbol}
                  onSelect={() => handleCardClick(guide)}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= PAGE 4: PHỤ ÂM PHẦN 2 ======================= */}
      {selectedPage === 4 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
          {/* Top Green Banner from Image 4 */}
          <div className="bg-[#a8d5ba] border border-[#81b29a] text-slate-900 text-center py-3.5 px-4 rounded-2xl shadow-xs">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Cách đọc các phụ âm tương tự trong tiếng việt
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
              Phần 2: Phụ âm vòm, tròn môi và các âm kẹp lưỡi đặc trưng tiếng Anh
            </p>
          </div>

          {/* Row 1: /ʃ/, /tʃ/, /dʒ/, /ʒ/, /ŋ/, /r/, /j/ */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-600">Hàng 1: Âm chu tròn môi & âm vòm mềm</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
              {page4ConsonantsRow1.map((guide) => (
                <VietnameseGuideCard
                  key={guide.soundId}
                  guide={guide}
                  symbol={guide.symbol}
                  onSelect={() => handleCardClick(guide)}
                  compact
                />
              ))}
            </div>
          </div>

          {/* Row 2: /w/, /θ/, /ð/ */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-600">
                Hàng 2: Âm bán nguyên âm /w/ và cặp âm thè lưỡi /θ/ - /ð/ (Không có trong tiếng Việt)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 max-w-2xl gap-3.5">
              {page4ConsonantsRow2.map((guide) => (
                <VietnameseGuideCard
                  key={guide.soundId}
                  guide={guide}
                  symbol={guide.symbol}
                  onSelect={() => handleCardClick(guide)}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
