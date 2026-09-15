import React, { useState } from 'react';
import { ArticulationGuide } from '../types';
import { Volume2, Activity, Wind, Smile, Maximize2, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface MouthDiagramProps {
  articulation: ArticulationGuide;
  symbol: string;
}

export const MouthDiagram: React.FC<MouthDiagramProps> = ({ articulation, symbol }) => {
  // Check if this sound has specific verified anatomical images (such as /e/)
  const isSoundE = symbol === 'e' || symbol === 'ɛ';
  const hasImages = isSoundE || Boolean(articulation.sagittalColorImageUrl || articulation.sagittalImageUrl || articulation.lipsImageUrl);

  const [viewMode, setViewMode] = useState<'lips' | 'sagittal'>('lips');
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  // For /e/, verified anatomical assets for front lips and sagittal tongue position
  const sagittalImg = articulation.sagittalColorImageUrl || (isSoundE ? '/images/ipa_e_sagittal_color.svg' : undefined);
  const lipsImg = articulation.lipsImageUrl || (isSoundE ? '/images/ipa_e_front_lips.svg' : undefined);

  // Compute SVG coordinates dynamically for fallback/other sounds
  const getTonguePath = () => {
    const { tonguePosition, tongueHeight } = articulation;
    const startX = 65;
    const startY = 160;
    const endX = 180;
    const endY = 150;

    let peakX = 120;
    let peakY = 110;
    if (tonguePosition === 'front') peakX = 150;
    if (tonguePosition === 'back') peakX = 90;
    if (tongueHeight === 'high') peakY = 85;
    if (tongueHeight === 'low') peakY = 135;

    let tipX = 175;
    let tipY = 125;
    if (tonguePosition === 'front' && tongueHeight === 'high') {
      tipX = 170;
      tipY = 100;
    } else if (tonguePosition === 'back') {
      tipX = 165;
      tipY = 135;
    }

    return `M ${startX} ${startY} Q ${peakX} ${peakY} ${tipX} ${tipY} Q ${endX} ${endY} ${startX} ${startY}`;
  };

  const getJawOffset = () => {
    switch (articulation.jawOpening) {
      case 'open': return 24;
      case 'half-open': return 16;
      case 'half-closed': return 8;
      case 'closed': default: return 0;
    }
  };

  const currentImageSrc = viewMode === 'lips' ? lipsImg : sagittalImg;

  return (
    <div id="mouth-diagram-container" className="bg-slate-50 text-slate-800 rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-col items-center">
      {/* Header & Mode Switcher */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              {hasImages ? (
                <>
                  <span>Hình ảnh giải phẫu âm /{symbol}/</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 normal-case">
                    Chuẩn quốc tế IPA
                  </span>
                </>
              ) : (
                <span>Mô phỏng khẩu hình âm /{symbol}/</span>
              )}
            </h4>
            {hasImages && (
              <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                Khuôn môi thực tế & Hình ảnh giải phẫu vị trí lưỡi
              </p>
            )}
          </div>
        </div>

        {/* View Switcher Tabs - Only Khuôn môi & Vị trí lưỡi */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl border border-slate-300/60 overflow-x-auto text-xs">
          {hasImages ? (
            <>
              <button
                id="btn-view-lips-img"
                onClick={() => setViewMode('lips')}
                className={`px-3.5 py-1.5 font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'lips'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smile className="w-4 h-4 text-pink-500" />
                Khuôn môi
              </button>

              <button
                id="btn-view-sagittal-img"
                onClick={() => setViewMode('sagittal')}
                className={`px-3.5 py-1.5 font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'sagittal'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4 text-indigo-500" />
                Hình ảnh vị trí lưỡi
              </button>
            </>
          ) : (
            <>
              <button
                id="btn-view-lips"
                onClick={() => setViewMode('lips')}
                className={`px-3.5 py-1.5 font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'lips'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smile className="w-4 h-4 text-pink-500" />
                Khuôn môi
              </button>

              <button
                id="btn-view-sagittal"
                onClick={() => setViewMode('sagittal')}
                className={`px-3.5 py-1.5 font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'sagittal'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4 text-indigo-500" />
                Vị trí lưỡi
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Image or Diagram Area */}
      <div className="relative w-full max-w-xl aspect-[16/11] my-3 flex items-center justify-center bg-white rounded-2xl border border-slate-200 overflow-hidden group shadow-2xs">
        {hasImages ? (
          /* REAL EDUCATIONAL IMAGE DISPLAY */
          <div className="relative w-full h-full flex items-center justify-center p-2 bg-slate-50/70">
            {viewMode === 'lips' && lipsImg && (
              <img
                src={lipsImg}
                alt={`Hình ảnh khuôn môi âm /${symbol}/ nhìn thẳng và vị trí lưỡi`}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.01]"
              />
            )}

            {viewMode === 'sagittal' && sagittalImg && (
              <img
                src={sagittalImg}
                alt={`Hình ảnh giải phẫu vị trí lưỡi âm /${symbol}/`}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.01]"
              />
            )}

            {/* Zoom / Fullscreen Button */}
            <button
              id="btn-zoom-image"
              onClick={() => setIsZoomOpen(true)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 shadow-sm backdrop-blur-xs transition-all"
              title="Phóng to hình ảnh"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-2 left-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-xs text-slate-700 pointer-events-none">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {viewMode === 'lips' && 'Khuôn môi nhìn thẳng: Môi thả lỏng, hơi bè sang 2 bên, răng lộ nhẹ, đầu lưỡi chạm chân răng dưới.'}
                {viewMode === 'sagittal' && 'Hình ảnh vị trí lưỡi: Thân lưỡi vồng giữa-trước, đầu lưỡi hạ thấp chạm chân răng dưới, hàm mở vừa.'}
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline font-medium">Nhấn phóng to để xem chi tiết</span>
            </div>
          </div>
        ) : (
          /* FALLBACK INTERACTIVE SVG SIMULATION (for other sounds without images) */
          viewMode === 'sagittal' ? (
            <svg viewBox="0 0 240 190" className="w-full h-full select-none">
              <defs>
                <linearGradient id="tongueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
                <linearGradient id="airGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Nasal Cavity */}
              <path
                d="M 60 40 Q 120 20 180 50 L 195 90 L 175 90 Q 130 50 60 70 Z"
                fill="#334155"
                opacity="0.4"
              />
              <text x="110" y="38" fill="#94a3b8" fontSize="8" fontWeight="500">Khoang mũi</text>

              {/* Palate */}
              <path
                d="M 70 85 Q 120 70 170 88"
                fill="none"
                stroke="#64748b"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 70 85 Q 65 95 68 102"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text x="115" y="65" fill="#cbd5e1" fontSize="8">Vòm họng</text>

              {/* Upper Teeth & Lip */}
              <path
                d="M 180 65 Q 190 75 195 88 L 188 96 L 180 96 Z"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              <path
                d="M 175 88 Q 198 88 198 94 Q 185 96 175 94 Z"
                fill="#f43f5e"
              />

              {/* Lower Teeth & Lip */}
              <g transform={`translate(0, ${getJawOffset()})`}>
                <path
                  d="M 175 125 Q 198 125 198 119 Q 185 117 175 119 Z"
                  fill="#f43f5e"
                />
                <path
                  d="M 180 120 L 188 120 L 192 128 L 180 128 Z"
                  fill="#e2e8f0"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              </g>

              {/* Throat */}
              <path
                d="M 50 145 L 50 175 Q 55 180 65 175 L 65 145 Z"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {articulation.vocalCords === 'voiced' && (
                <g className="animate-pulse">
                  <circle cx="58" cy="160" r="8" fill="#38bdf8" opacity="0.3" />
                  <path d="M 54 156 Q 58 150 62 156 Q 58 162 54 168" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <text x="15" y="163" fill="#38bdf8" fontSize="8" fontWeight="bold">Rung</text>
                </g>
              )}

              {/* Tongue */}
              <path
                d={getTonguePath()}
                fill="url(#tongueGrad)"
                stroke="#e11d48"
                strokeWidth="2"
                className="transition-all duration-300 ease-out"
              />
              <text x="100" y="145" fill="#ffffff" fontSize="9" fontWeight="bold" opacity="0.9">Lưỡi</text>
            </svg>
          ) : (
            <div className="flex flex-col items-center justify-center p-4 w-full h-full">
              <svg viewBox="0 0 200 120" className="w-44 h-28">
                {articulation.lipShape === 'spread' && (
                  <path
                    d="M 20 60 Q 100 20 180 60 Q 100 100 20 60 Z"
                    fill="#f43f5e"
                    stroke="#fda4af"
                    strokeWidth="3"
                  />
                )}
                {articulation.lipShape === 'round' && (
                  <ellipse
                    cx="100"
                    cy="60"
                    rx="45"
                    ry="38"
                    fill="#f43f5e"
                    stroke="#fda4af"
                    strokeWidth="3"
                  />
                )}
                {articulation.lipShape === 'neutral' && (
                  <path
                    d="M 35 60 Q 100 35 165 60 Q 100 85 35 60 Z"
                    fill="#f43f5e"
                    stroke="#fda4af"
                    strokeWidth="3"
                  />
                )}
                <ellipse cx="100" cy="60" rx="45" ry="16" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
          )
        )}
      </div>

      {/* Articulation Metrics Badges */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs mt-1">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center text-center">
          <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            Vị trí thân lưỡi
          </span>
          <span className="font-bold text-indigo-700">
            {articulation.tonguePosition === 'front' ? 'Trước (Front)' : articulation.tonguePosition === 'back' ? 'Sau (Back)' : 'Giữa (Central)'}
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center text-center">
          <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
            <Smile className="w-3.5 h-3.5 text-pink-600" />
            Độ cao của lưỡi
          </span>
          <span className="font-bold text-pink-700">
            {articulation.tongueHeight === 'high' ? 'Cao (High)' : articulation.tongueHeight === 'low' ? 'Thấp (Low)' : 'Vừa (Mid / Giữa)'}
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center text-center">
          <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
            <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            Dây thanh quản
          </span>
          <span className={`font-bold ${articulation.vocalCords === 'voiced' ? 'text-sky-700' : 'text-amber-700'}`}>
            {articulation.vocalCords === 'voiced' ? 'Hữu thanh (Rung)' : 'Vô thanh (Gió)'}
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center text-center">
          <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
            <Wind className="w-3.5 h-3.5 text-emerald-600" />
            Độ mở hàm
          </span>
          <span className="font-bold text-emerald-700">
            {articulation.jawOpening === 'open' ? 'Mở rộng' : articulation.jawOpening === 'half-open' ? 'Mở nửa rộng' : articulation.jawOpening === 'half-closed' ? 'Mở vừa (~12mm)' : 'Khép'}
          </span>
        </div>
      </div>

      {/* Fullscreen Image Zoom Modal */}
      {isZoomOpen && currentImageSrc && (
        <div 
          id="image-zoom-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col items-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Chi tiết hình ảnh giải phẫu âm /{symbol}/
              </h3>
              <button
                id="btn-close-zoom"
                onClick={() => setIsZoomOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-auto max-h-[75vh] w-full p-2 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={currentImageSrc}
                alt={`Chi tiết giải phẫu âm /${symbol}/`}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="w-full text-center mt-3 text-xs text-slate-500 font-medium">
              Sơ đồ giải phẫu học cơ quan phát âm chuẩn IPA giúp người học định hình chính xác vị trí lưỡi, môi và khoang miệng.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

