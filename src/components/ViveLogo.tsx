import React from 'react';

interface ViveLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  inverted?: boolean;
  className?: string;
}

export const ViveLogo: React.FC<ViveLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  inverted = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision SVG replica of the uploaded VIVE emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Blue leaf gradient */}
            <linearGradient id="blueLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4FB9EE" />
              <stop offset="50%" stopColor="#1C86D0" />
              <stop offset="100%" stopColor="#0B5696" />
            </linearGradient>
            
            {/* Black leaf gradient */}
            <linearGradient id="blackLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#383838" />
              <stop offset="60%" stopColor="#1B1B1B" />
              <stop offset="100%" stopColor="#0A0A0A" />
            </linearGradient>

            {/* Sun orb glow */}
            <radialGradient id="sunGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#E2F4FD" />
              <stop offset="100%" stopColor="#87CDF8" />
            </radialGradient>
          </defs>

          {/* Infinity loop background shape */}
          <path
            d="M 28 50 C 12 36, 6 64, 28 64 C 40 64, 48 54, 50 50 C 52 54, 60 64, 72 64 C 94 64, 88 36, 72 36 C 60 36, 52 46, 50 50 C 48 46, 40 36, 28 36 Z"
            stroke={inverted ? "rgba(255,255,255,0.22)" : "#E2E5E8"}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Sun Rays */}
          <g stroke="#56B9F2" strokeWidth="2.5" strokeLinecap="round">
            <line x1="50" y1="21" x2="50" y2="14" />
            <line x1="43" y1="23" x2="38" y2="18" />
            <line x1="57" y1="23" x2="62" y2="18" />
            <line x1="38" y1="28" x2="31" y2="25" />
            <line x1="62" y1="28" x2="69" y2="25" />
            <line x1="36" y1="34" x2="29" y2="34" />
            <line x1="64" y1="34" x2="71" y2="34" />
          </g>

          {/* Sun Orb / Person Head */}
          <circle cx="50" cy="30" r="7.5" fill="url(#sunGlow)" />

          {/* Left Wing / Cyan Leaf of the V */}
          <path
            d="M 48 76 C 47 70, 31 52, 33 34 C 41 38, 48 50, 48 76 Z"
            fill="url(#blueLeafGrad)"
          />
          <path
            d="M 46 72 C 45 66, 38 52, 39 40 C 42 45, 46 56, 46 72 Z"
            fill="#80CEF8"
            opacity="0.5"
          />

          {/* Right Wing / Black Leaf of the V */}
          <path
            d="M 52 76 C 53 70, 69 52, 67 34 C 59 38, 52 50, 52 76 Z"
            fill="url(#blackLeafGrad)"
          />
          <path
            d="M 54 72 C 55 66, 62 52, 61 40 C 58 45, 54 56, 54 72 Z"
            fill="#555555"
            opacity="0.4"
          />

          {/* Center stem point connecting the V base */}
          <path
            d="M 46 72 C 48 78, 52 78, 54 72 Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-tight leading-none font-sans ${textSizes[size]} ${
            inverted ? 'text-white' : 'text-[#15342C]'
          }`}
        >
          VIVEPANYA
        </span>
        {showSubtitle && (
          <span
            className={`text-[9px] font-semibold tracking-wider uppercase leading-tight mt-0.5 ${
              inverted ? 'text-emerald-200/80' : 'text-[#647C74]'
            }`}
          >
            E-mart Private Ltd.
          </span>
        )}
      </div>
    </div>
  );
};
