import React from 'react';
import { VietnameseSoundGuide } from '../data/vietnameseGuideData';
import { SpeechService, SoundEffects } from '../utils/audio';
import { Volume2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface VietnameseGuideCardProps {
  guide: VietnameseSoundGuide;
  symbol: string;
  onSelect?: () => void;
  compact?: boolean;
}

export const VietnameseGuideCard: React.FC<VietnameseGuideCardProps> = ({
  guide,
  symbol,
  onSelect,
  compact = false
}) => {
  const handlePlaySound = (e: React.MouseEvent) => {
    e.stopPropagation();
    SoundEffects.playClick();
    SpeechService.playIPAPhoneme(guide.soundId, guide.symbol);
  };

  // Header background color according to the user's 4 images:
  const getHeaderBg = () => {
    switch (guide.headerColor) {
      case 'red':
        return 'bg-[#dc2626] text-white';
      case 'green':
        return 'bg-[#3b7a36] text-white';
      case 'blue':
        return 'bg-[#1d6fa5] text-white';
      case 'purple':
        return 'bg-[#6b21a8] text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  const getBorderColor = () => {
    switch (guide.headerColor) {
      case 'red':
        return 'border-red-200/80 hover:border-red-400';
      case 'green':
        return 'border-emerald-200/80 hover:border-emerald-400';
      case 'blue':
        return 'border-sky-200/80 hover:border-sky-400';
      case 'purple':
        return 'border-purple-200/80 hover:border-purple-400';
      default:
        return 'border-slate-200';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative flex flex-col items-center bg-white rounded-2xl border transition-all duration-200 ${getBorderColor()} ${
        onSelect ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''
      } ${compact ? 'p-2.5 sm:p-3' : 'p-4 sm:p-5'}`}
    >
      {/* 1. Teacher Mouth & Face Video Simulation Frame */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-2 border border-slate-700 shadow-inner flex items-center justify-between relative overflow-hidden mb-2.5">
        {/* US Flag badge in top left */}
        <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] text-white/90 font-medium">
          <span>🇺🇸</span>
          <span className="text-[8px] font-mono">US</span>
        </div>

        {/* Left: 3/4 Face Profile Silhouette */}
        <div className="w-16 h-12 flex items-center justify-center relative">
          <svg viewBox="0 0 60 50" className="w-full h-full text-slate-300 drop-shadow">
            {/* Female profile face outline */}
            <path
              d="M 12 10 Q 20 5 28 8 Q 32 15 32 20 Q 35 22 36 25 Q 32 28 35 32 Q 33 36 30 38 Q 28 45 20 48 L 10 48 Z"
              fill="#e2e8f0"
              opacity="0.85"
            />
            {/* Hair */}
            <path
              d="M 10 8 Q 16 3 24 5 Q 26 12 25 24 Q 20 28 15 35 Q 12 40 10 46 Z"
              fill="#334155"
            />
            {/* Eye */}
            <circle cx="27" cy="18" r="1.5" fill="#1e293b" />
            {/* Eyebrow */}
            <path d="M 24 15 Q 27 14 30 16" stroke="#1e293b" strokeWidth="1" fill="none" />
            {/* Nose & lips profile */}
            <path d="M 32 21 L 35 25 L 32 27 L 34 31 L 31 34" stroke="#94a3b8" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Center/Right: Detailed Lips Shape View */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-9 bg-slate-950/80 rounded-lg border border-slate-700/80 flex items-center justify-center p-1 relative">
            {/* Stylized realistic lips */}
            <svg viewBox="0 0 50 30" className="w-full h-full">
              {/* Upper lip */}
              <path
                d={
                  guide.symbol.includes('u') || guide.symbol.includes('ʊ') || guide.symbol.includes('ɔ') || guide.symbol === 'w' || guide.symbol === 'ʃ'
                    ? "M 15 14 Q 25 9 35 14 Q 25 12 15 14 Z" // rounded
                    : guide.symbol === 'æ' || guide.symbol === 'a' || guide.symbol === 'ɑː'
                    ? "M 10 10 Q 25 5 40 10 Q 25 9 10 10 Z" // open wide
                    : "M 12 13 Q 25 9 38 13 Q 25 11 12 13 Z"
                }
                fill="#f87171"
              />
              {/* Inner mouth darkness / teeth */}
              <ellipse
                cx="25"
                cy="15"
                rx={
                  guide.symbol === 'æ' || guide.symbol === 'ɑː'
                    ? "12"
                    : guide.symbol.includes('u') || guide.symbol === 'w'
                    ? "5"
                    : "9"
                }
                ry={
                  guide.symbol === 'æ' || guide.symbol === 'ɑː'
                    ? "7"
                    : guide.symbol.includes('u') || guide.symbol === 'w'
                    ? "5"
                    : "3"
                }
                fill="#450a0a"
              />
              {/* Teeth / tongue visibility */}
              {guide.symbol === 'θ' || guide.symbol === 'ð' ? (
                // Tongue between teeth
                <ellipse cx="25" cy="15" rx="6" ry="3" fill="#fda4af" />
              ) : (
                <path d="M 18 13 Q 25 13 32 13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              )}
              {/* Lower lip */}
              <path
                d={
                  guide.symbol.includes('u') || guide.symbol.includes('ʊ') || guide.symbol.includes('ɔ') || guide.symbol === 'w' || guide.symbol === 'ʃ'
                    ? "M 15 16 Q 25 21 35 16 Q 25 17 15 16 Z"
                    : guide.symbol === 'æ' || guide.symbol === 'ɑː'
                    ? "M 10 20 Q 25 26 40 20 Q 25 21 10 20 Z"
                    : "M 12 17 Q 25 21 38 17 Q 25 18 12 17 Z"
                }
                fill="#ef4444"
              />
            </svg>
          </div>
        </div>

        {/* Right side phonetic symbol badge in blue/black box */}
        <div className="w-9 h-9 rounded-lg bg-sky-600 border border-sky-400/80 flex items-center justify-center text-white font-black text-sm shadow-xs">
          {guide.displaySymbol || guide.symbol}
        </div>
      </div>

      {/* 2. Distinctive Rounded Badge: / symbol / */}
      <div
        className={`w-full py-2 px-3 rounded-xl font-black text-center text-lg sm:text-xl tracking-wider shadow-sm flex items-center justify-center gap-2 ${getHeaderBg()}`}
      >
        <span>/ {guide.displaySymbol || guide.symbol} /</span>
        <button
          onClick={handlePlaySound}
          title="Nghe phát âm chuẩn bản ngữ"
          className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all ml-1"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Diphthong SubTag e.g. "ə = ờ" */}
      {guide.diphthongSubTag && (
        <div className="mt-1 bg-yellow-300 text-amber-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-2xs border border-yellow-400">
          {guide.diphthongSubTag}
        </div>
      )}

      {/* Diphthong composition formula e.g. [ e ] + [ i ] */}
      {guide.isDiphthong && guide.firstSound && guide.secondSound && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
          <span className="bg-white px-1.5 py-0.5 rounded shadow-2xs text-indigo-700 font-mono">
            {guide.firstSound}
          </span>
          <span>+</span>
          <span className="bg-white px-1.5 py-0.5 rounded shadow-2xs text-indigo-700 font-mono">
            {guide.secondSound}
          </span>
        </div>
      )}

      {/* Connecting Vertical Stem */}
      <div className="w-0.5 h-3 bg-slate-300 my-0.5"></div>

      {/* 3. The Characteristic Rounded Guidance Card from the User's Photos */}
      <div className="w-full bg-[#fff7ed] border border-amber-300/90 rounded-2xl p-3 sm:p-3.5 shadow-xs flex flex-col justify-between flex-1 text-slate-800 text-xs sm:text-sm leading-relaxed">
        <div>
          {/* Main instruction text with highlighted bold/red letters */}
          <div className="font-medium text-slate-800 text-center sm:text-left">
            {guide.isDiphthong ? (
              <p className="font-semibold text-slate-800">
                Há miệng đọc âm đứng trước{' '}
                <span className="font-black text-blue-700 text-sm">{guide.firstSound}</span>
                {' - '}
                khép miệng đọc âm đứng sau{' '}
                <span className="font-black text-rose-700 text-sm">{guide.secondSound}</span>
              </p>
            ) : (
              <p>
                {guide.leadingText && <span>{guide.leadingText} </span>}
                {guide.vietnameseSound && (
                  <span
                    className={`font-black text-base mx-0.5 ${
                      guide.vietnameseSoundColor === 'blue' ? 'text-blue-700' : 'text-red-600'
                    }`}
                  >
                    {guide.vietnameseSound}
                  </span>
                )}
                {guide.trailingText && <span> {guide.trailingText} </span>}
                {guide.highlightedPhrase && (
                  <span
                    className={`font-extrabold ${
                      guide.isUnderline ? 'underline underline-offset-2' : ''
                    } ${
                      guide.highlightedPhrase.includes('bật') || guide.highlightedPhrase.includes('cong') || guide.highlightedPhrase.includes('kéo')
                        ? 'text-red-600'
                        : 'text-slate-900'
                    }`}
                  >
                    {guide.highlightedPhrase}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Anatomical positioning notes */}
        {!compact && (
          <div className="mt-3 bg-white/90 rounded-xl p-2.5 border border-amber-200 text-[11px] space-y-1 text-slate-600">
            <div>
              <strong className="text-slate-900">Khuôn môi: </strong>
              {guide.lipShapeDesc}
            </div>
            <div>
              <strong className="text-slate-900">Vị trí lưỡi: </strong>
              {guide.tonguePositionDesc}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
