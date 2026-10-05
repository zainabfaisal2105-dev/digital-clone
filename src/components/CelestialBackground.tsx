import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

interface CelestialBackgroundProps {
  children: React.ReactNode;
}

export const CelestialBackground: React.FC<CelestialBackgroundProps> = ({ children }) => {
  const [showFullArt, setShowFullArt] = useState(false);
  const [ambientGlow, setAmbientGlow] = useState(true);

  return (
    <div className="relative min-h-screen w-full bg-[#090c12] text-slate-100 font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Primary Background Artwork from image */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: showFullArt ? 0.95 : 0.42,
        }}
      >
        <img
          src="/celestial_bg_1790424535844.jpg"
          alt="Celestial Starlight Canvas"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // fallback to vertical wallpaper if panoramic fails
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('celestial_vertical')) {
              target.src = '/celestial_vertical_bg_1790424549420.jpg';
            }
          }}
        />
        {/* Soft vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090c12]/80 via-transparent to-[#090c12]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#090c12]/40 to-[#090c12]" />
      </div>

      {/* SVG Celestial Star String Overlay matching user picture */}
      {ambientGlow && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-75">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="starlightLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Draped curved starlight trails */}
            <path
              d="M 120 180 Q 280 420 540 380 T 960 450"
              fill="none"
              stroke="url(#starlightLine)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className="animate-pulse"
              style={{ animationDuration: '6s' }}
            />
            <path
              d="M 220 220 Q 380 460 620 410 T 1100 480"
              fill="none"
              stroke="url(#starlightLine)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />

            {/* Prominent Cross-Star (Top Left) */}
            <g transform="translate(180, 160)" filter="url(#glow)">
              <line x1="-24" y1="0" x2="24" y2="0" stroke="#ffffff" strokeWidth="1.8" />
              <line x1="0" y1="-24" x2="0" y2="24" stroke="#ffffff" strokeWidth="1.8" />
              <line x1="-12" y1="-12" x2="12" y2="12" stroke="#e0e7ff" strokeWidth="0.8" />
              <line x1="-12" y1="12" x2="12" y2="-12" stroke="#e0e7ff" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
            </g>

            {/* Prominent Cross-Star (Right Mid) */}
            <g transform="translate(980, 440)" filter="url(#glow)">
              <line x1="-30" y1="0" x2="30" y2="0" stroke="#ffffff" strokeWidth="2" />
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#ffffff" strokeWidth="2" />
              <line x1="-15" y1="-15" x2="15" y2="15" stroke="#e0e7ff" strokeWidth="0.9" />
              <line x1="-15" y1="15" x2="15" y2="-15" stroke="#e0e7ff" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>

            {/* Hanging Thread 1 with beads and charms */}
            <g transform="translate(180, 160)">
              <line x1="0" y1="24" x2="0" y2="180" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="1 3" />
              <circle cx="0" cy="70" r="2.5" fill="#ffffff" />
              <circle cx="0" cy="110" r="1.5" fill="#94a3b8" />
              <circle cx="0" cy="140" r="2.5" fill="#ffffff" />
              {/* Dangling star charm */}
              <polygon
                points="0,180 2.5,186 9,186 4,190 6,196 0,192 -6,196 -4,190 -9,186 -2.5,186"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
              />
            </g>

            {/* Hanging Thread 2 */}
            <g transform="translate(420, 390)">
              <line x1="0" y1="0" x2="0" y2="140" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="1 3" />
              <circle cx="0" cy="40" r="2" fill="#ffffff" />
              <circle cx="0" cy="85" r="3" fill="#ffffff" />
              <circle cx="0" cy="115" r="1.5" fill="#cbd5e1" />
              {/* Crescent moon charm */}
              <path
                d="M -2,140 A 5,5 0 0,0 4,146 A 4,4 0 0,1 -2,140 Z"
                fill="#ffffff"
              />
            </g>

            {/* Hanging Thread 3 under right cross star */}
            <g transform="translate(980, 440)">
              <line x1="0" y1="30" x2="0" y2="240" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="1 3" />
              <circle cx="0" cy="70" r="2.5" fill="#ffffff" />
              <circle cx="0" cy="130" r="1.5" fill="#94a3b8" />
              <circle cx="0" cy="180" r="3" fill="#ffffff" />
              {/* Dangling star at bottom */}
              <polygon
                points="0,240 3,247 11,247 5,252 7,260 0,255 -7,260 -5,252 -11,247 -3,247"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
            </g>
          </svg>
        </div>
      )}

      {/* Floating Background Ambient Switcher */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-[#121722]/80 backdrop-blur-md border border-slate-700/50 rounded-full px-3 py-1.5 shadow-xl text-xs text-slate-300">
        <button
          onClick={() => setShowFullArt(!showFullArt)}
          className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors cursor-pointer"
          title="Toggle Celestial Background Artwork Intensity"
        >
          {showFullArt ? <EyeOff className="w-3.5 h-3.5 text-indigo-400" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showFullArt ? 'Dim Art' : 'Full Art'}</span>
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setAmbientGlow(!ambientGlow)}
          className={`flex items-center gap-1 hover:text-indigo-300 transition-colors cursor-pointer ${ambientGlow ? 'text-indigo-400' : 'text-slate-400'}`}
          title="Toggle Constellation Threads & Glints"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stars</span>
        </button>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};
