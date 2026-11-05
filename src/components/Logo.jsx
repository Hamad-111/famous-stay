import React from 'react';

export default function Logo({ size = 'default', showBadge = true, className = '' }) {
  // Size variants
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Heraldic Luxury Golden Emblem */}
      <div className="relative group cursor-pointer flex-shrink-0">
        {/* Ambient Backlight Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#E5C07B]/40 to-[#3B82F6]/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Main Emblem Container */}
        <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF8E7] via-[#E5C07B] to-[#996D14] p-[1.5px] shadow-xl shadow-[#020712]/80 ${
          isLarge ? 'h-14 w-14' : isSmall ? 'h-9 w-9' : 'h-12 w-12'
        }`}>
          {/* Inner Sapphire Blue Medallion */}
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-gradient-to-b from-[#0B1A3E] to-[#040A18] p-1.5 overflow-hidden">
            {/* Custom Luxury Crest SVG: Crown, Key & Arch Emblem */}
            <svg 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full drop-shadow-[0_2px_4px_rgba(229,192,123,0.35)]"
            >
              <defs>
                <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9EB" />
                  <stop offset="35%" stopColor="#F5DE9B" />
                  <stop offset="70%" stopColor="#E5C07B" />
                  <stop offset="100%" stopColor="#B3851E" />
                </linearGradient>
                <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Royal Architectural Octagonal Arch Outline */}
              <path 
                d="M24 3L39 10V25C39 33.5 32.5 41 24 44C15.5 41 9 33.5 9 25V10L24 3Z" 
                stroke="url(#goldLinear)" 
                strokeWidth="1.75" 
                fill="#07132D" 
                fillOpacity="0.6"
              />

              {/* Inner Sacred Geometry Border */}
              <path 
                d="M24 7L35.5 12.5V24C35.5 30.5 30.5 36.5 24 39C17.5 36.5 12.5 30.5 12.5 24V12.5L24 7Z" 
                stroke="url(#goldLinear)" 
                strokeWidth="0.75" 
                strokeDasharray="2 1.5"
                opacity="0.8"
              />

              {/* The Crossed Golden Master Key (Symbol of Room Booking & Concierge Access) */}
              <path 
                d="M17 31L29 19M29 19L26 16M29 19L31 21M30 18L33 15" 
                stroke="url(#goldLinear)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <circle 
                cx="16" 
                cy="32" 
                r="3" 
                stroke="url(#goldLinear)" 
                strokeWidth="1.75" 
              />

              {/* Royal Mughal-Inspired 5-Point Crown at the Top */}
              <path 
                d="M16 19L19 14L24 17L29 14L32 19H16Z" 
                fill="url(#goldLinear)" 
                opacity="0.95"
              />
              <circle cx="16" cy="19" r="0.8" fill="#FFF" />
              <circle cx="19" cy="14" r="0.9" fill="#FFF" />
              <circle cx="24" cy="17" r="1.1" fill="#FFF" />
              <circle cx="29" cy="14" r="0.9" fill="#FFF" />
              <circle cx="32" cy="19" r="0.8" fill="#FFF" />

              {/* Star of Distinction (Authenticity Mark) */}
              <path 
                d="M24 23L24.8 25.2L27 25.5L25.3 27L25.8 29.2L24 28L22.2 29.2L22.7 27L21 25.5L23.2 25.2L24 23Z" 
                fill="#FFF9EB" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-serif font-extrabold tracking-widest text-slate-900 ${
            isLarge ? 'text-3xl' : isSmall ? 'text-xl' : 'text-2xl'
          }`}>
            FAMOUS<span className="gold-gradient-text ml-0.5">STAY</span>
          </span>

          {showBadge && (
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#FFFDF5] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#8C6207] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
              PAKISTAN B2B
            </span>
          )}
        </div>

        <p className="hidden sm:flex text-[10px] uppercase font-bold tracking-wider text-slate-500 items-center gap-1.5">
          <span>Hotel Agent Reservation Network</span>
          <span className="text-[#D4AF37]">•</span>
          <span className="text-[#8C6207] font-semibold">DTS & TAAP Verified</span>
        </p>
      </div>
    </div>
  );
}

