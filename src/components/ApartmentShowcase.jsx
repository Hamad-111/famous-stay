import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  Maximize, 
  Users, 
  Bed, 
  TrendingUp, 
  ArrowRight, 
  Eye, 
  ShieldCheck, 
  CheckCircle2,
  Crown,
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Phone,
  Film,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Grid,
  Columns,
  Layers,
  Tv,
  SlidersHorizontal,
  Radio,
  Video,
  RotateCcw
} from 'lucide-react';

/* 
  Individual Hover/Touch Video Frame Component:
  - Displays high-definition preview of the room.
  - Live progress scrubber tracking currentTime / duration.
  - Live status beacon (LIVE • 01 vs FRAME 01).
  - Desktop: Plays smoothly on mouse hover or runs continuously if isGlobalLive.
  - Mobile: Plays on tap/touch with instant visual feedback.
  - Local Audio toggle button directly on the frame.
  - Quick action buttons: "Focus" in top cinema screen, and "Cinema" fullscreen theater modal.
*/
function HoverVideoFrame({ 
  video, 
  index, 
  isActive, 
  isGlobalLive, 
  onSelect, 
  onOpenCinema 
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLocalMuted, setIsLocalMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // If global wall live mode is on, keep playing continuously
  useEffect(() => {
    if (isGlobalLive) {
      if (videoRef.current) {
        videoRef.current.muted = isLocalMuted;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isGlobalLive, isLocalMuted]);

  const startPlayback = () => {
    if (videoRef.current) {
      videoRef.current.muted = isLocalMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const stopPlayback = () => {
    if (isGlobalLive) return; // Keep playing if global live mode is active
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isLocalMuted;
    setIsLocalMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 1.0;
        startPlayback();
      }
    }
  };

  const handleTouchToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        startPlayback();
      } else {
        stopPlayback();
      }
    }
  };

  return (
    <div
      onMouseEnter={startPlayback}
      onMouseLeave={stopPlayback}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        isActive
          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/70 shadow-xl shadow-[#D4AF37]/25 scale-[1.01] bg-[#FFFDF7]'
          : isPlaying
          ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-[1.008] bg-white'
          : 'border-[#D4AF37]/30 hover:border-[#D4AF37] bg-white shadow-sm hover:shadow-md'
      }`}
    >
      {/* Video Container Frame */}
      <div 
        onClick={handleTouchToggle}
        className="relative aspect-[16/10] w-full overflow-hidden bg-black cursor-pointer select-none"
      >
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          muted={isLocalMuted}
          loop
          playsInline
          preload="none"
          onTimeUpdate={handleTimeUpdate}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dynamic Progress Scrubber Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-20">
          <div 
            className="h-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFF5D0] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top-Left Live Status Beacon */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none">
          {isPlaying ? (
            <span className="flex items-center gap-1.5 rounded-full bg-red-600/95 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              <span>LIVE • 0{index + 1}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-black/80 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-[#F7E5A9] border border-[#E5C07B]/40 shadow-sm">
              <Play className="h-2 w-2 fill-current text-[#E5C07B]" />
              FRAME {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          )}
        </div>

        {/* Top-Right Quick Action Icons (Audio Toggle & Fullscreen Modal) */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
          {isPlaying && (
            <button
              onClick={handleToggleMute}
              className={`flex h-6 w-6 items-center justify-center rounded-lg backdrop-blur-md transition-all ${
                !isLocalMuted 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-black/70 hover:bg-black/90 text-white border border-white/20'
              }`}
              title={isLocalMuted ? "Unmute this frame" : "Mute audio"}
            >
              {!isLocalMuted ? <Volume2 className="h-3 w-3 animate-pulse" /> : <VolumeX className="h-3 w-3 text-slate-300" />}
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenCinema(index);
            }}
            className="flex h-6 w-6 items-center justify-center rounded-lg bg-black/70 hover:bg-[#D4AF37] hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all shadow-sm"
            title="Expand into Cinema Theater Lightbox"
          >
            <Maximize2 className="h-3 w-3" />
          </button>
        </div>

        {/* Hover / Tap Hint when Idle */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:opacity-0 pointer-events-none">
            <div className="flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-bold text-[#F7E5A9] border border-[#D4AF37]/60 shadow-lg">
              <Play className="h-3 w-3 fill-current text-[#D4AF37]" />
              <span className="hidden sm:inline">Hover to Stream</span>
              <span className="sm:hidden">Tap to Stream</span>
            </div>
          </div>
        )}

        {/* Room Label Strip at Bottom */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
          <span className="rounded-lg bg-black/85 backdrop-blur-md px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white border border-white/10 truncate max-w-[70%]">
            {video.room}
          </span>
          <span className="rounded-md bg-emerald-500/20 backdrop-blur-md px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
            1080p
          </span>
        </div>
      </div>

      {/* Frame Card Details */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C6207]">
              Tour {index + 1} • {video.tag}
            </span>
            {video.category && (
              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                {video.category}
              </span>
            )}
          </div>
          <h4 className="mt-1 text-[11px] sm:text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#8C6207] transition-colors" title={video.title}>
            {video.title}
          </h4>
          {video.feature && (
            <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-1">
              {video.feature}
            </p>
          )}
        </div>

        {/* Card Actions */}
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(index);
            }}
            className="flex items-center justify-center gap-1 rounded-xl border border-[#D4AF37]/40 bg-[#FFFDF7] hover:bg-[#D4AF37] hover:text-white text-slate-800 py-1.5 px-2 text-[10px] font-bold transition-all shadow-sm group/btn"
            title="Focus this video in the primary upper player"
          >
            <Play className="h-2.5 w-2.5 text-[#8C6207] group-hover/btn:text-white fill-current" />
            <span>Focus</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenCinema(index);
            }}
            className="gold-btn flex items-center justify-center gap-1 rounded-xl py-1.5 px-2 text-[10px] font-bold text-slate-950 transition-all shadow-sm"
            title="Launch Fullscreen Cinema Theater"
          >
            <Maximize2 className="h-2.5 w-2.5" />
            <span>Cinema</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/*
  Synchronous Quad-Vision Split Screen (4 concurrent live streams):
  - 4 video streams playing simultaneously side-by-side in a 2x2 luxury command matrix.
  - Camera HUD overlay on each quadrant (CAM 01 // MAIN SALON, CAM 02 // MASTER SUITE, etc.)
  - Master audio channel switcher (listen to CAM 01, 02, 03, or 04).
  - Slot selector beneath each quadrant to swap in any of the 15 rooms.
  - Preset switcher: "Salons & Living", "Master Suites", "Panoramic & Baths", "Ambiance & Night".
*/
function QuadVideoWall({ 
  videos, 
  quadIndices, 
  onSetQuadIndex, 
  onOpenCinema,
  onApplyPreset 
}) {
  const [audioChannel, setAudioChannel] = useState(0); // 0, 1, 2, 3
  const [isAllMuted, setIsAllMuted] = useState(true);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const videoRefs = [ref0, ref1, ref2, ref3];

  // Update audio states across the 4 quadrant videos
  useEffect(() => {
    videoRefs.forEach((ref, idx) => {
      if (ref.current) {
        if (isAllMuted) {
          ref.current.muted = true;
        } else {
          ref.current.muted = idx !== audioChannel;
          if (idx === audioChannel) {
            ref.current.volume = 1.0;
          }
        }
        ref.current.play().catch(() => {});
      }
    });
  }, [audioChannel, isAllMuted, quadIndices]);

  const handleSelectAudioChannel = (channelIdx) => {
    if (isAllMuted) {
      setIsAllMuted(false);
      setAudioChannel(channelIdx);
    } else if (audioChannel === channelIdx) {
      setIsAllMuted(true);
    } else {
      setAudioChannel(channelIdx);
    }
  };

  const presets = [
    { label: "Grand Salons (1-4)", indices: [0, 1, 2, 3] },
    { label: "Master Suites (5-8)", indices: [4, 5, 6, 7] },
    { label: "VIP Features (9-12)", indices: [8, 9, 10, 11] },
    { label: "Night & Ambiance (12-15)", indices: [11, 12, 13, 14] }
  ];

  return (
    <div className="rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] p-3 sm:p-6 text-white shadow-2xl shadow-[#D4AF37]/20">
      {/* Top HUD Control Bar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <div>
            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#F7E5A9] uppercase flex items-center gap-1.5">
              <span>QUAD-VISION COMMAND WALL</span>
              <span className="text-emerald-400">• 4 SYNC FEEDS LIVE</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300">
              4 Concurrent 1080p Video Feeds • Click Any Quadrant to Focus Sound
            </div>
          </div>
        </div>

        {/* Audio Channel Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1">
            Audio Feed:
          </span>
          {[0, 1, 2, 3].map((ch) => {
            const isListening = !isAllMuted && audioChannel === ch;
            return (
              <button
                key={ch}
                onClick={() => handleSelectAudioChannel(ch)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-mono font-bold transition-all border ${
                  isListening
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/15'
                }`}
              >
                {isListening ? <Volume2 className="h-3 w-3 animate-pulse" /> : <VolumeX className="h-3 w-3 text-slate-400" />}
                <span>CAM 0{ch + 1}</span>
              </button>
            );
          })}

          <button
            onClick={() => setIsAllMuted(!isAllMuted)}
            className={`rounded-lg px-2 py-1 text-[10px] font-mono font-bold transition-all border ${
              isAllMuted
                ? 'bg-red-500/30 text-rose-300 border-red-500/40'
                : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
            }`}
          >
            {isAllMuted ? "ALL MUTED" : "MUTE ALL"}
          </button>
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-mono text-[#E5C07B] uppercase tracking-wider shrink-0">
          Presets:
        </span>
        {presets.map((preset, pIdx) => {
          const isPresetActive = JSON.stringify(quadIndices) === JSON.stringify(preset.indices);
          return (
            <button
              key={pIdx}
              onClick={() => onApplyPreset(preset.indices)}
              className={`rounded-xl px-3 py-1 text-[10px] sm:text-xs font-bold transition-all border shrink-0 ${
                isPresetActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 border-white font-extrabold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/15'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* 2x2 Synchronous Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {quadIndices.map((videoIndex, qIdx) => {
          const video = videos[videoIndex] || videos[0];
          const isListening = !isAllMuted && audioChannel === qIdx;

          return (
            <div
              key={qIdx}
              className={`group relative flex flex-col rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                isListening
                  ? 'border-emerald-500 ring-2 ring-emerald-500/60 shadow-xl shadow-emerald-500/20'
                  : 'border-[#D4AF37]/50 hover:border-[#D4AF37] bg-slate-900/80 shadow-md'
              }`}
            >
              {/* Video Player */}
              <div 
                onClick={() => handleSelectAudioChannel(qIdx)}
                className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden"
              >
                <video
                  ref={videoRefs[qIdx]}
                  key={video.url}
                  src={video.url}
                  poster={video.thumbnail}
                  muted={isAllMuted || audioChannel !== qIdx}
                  autoPlay
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* HUD Camera Watermark (Top Left) */}
                <div className="absolute top-2 left-2 z-10 pointer-events-none flex items-center gap-1.5">
                  <span className="rounded-md bg-black/85 backdrop-blur-md px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#F7E5A9] border border-white/20">
                    CAM 0{qIdx + 1} // {video.room.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-red-600/90 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                    REC
                  </span>
                </div>

                {/* Fullscreen Expand Button (Top Right) */}
                <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                  {isListening && (
                    <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-[9px] font-mono font-bold text-slate-950 flex items-center gap-1 shadow-md">
                      <Volume2 className="h-3 w-3 animate-pulse" />
                      <span>AUDIO ACTIVE</span>
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCinema(videoIndex);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/75 hover:bg-[#D4AF37] hover:text-slate-950 text-white backdrop-blur-md border border-white/25 transition-all shadow-md"
                    title="Open in Fullscreen Cinema"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Bottom HUD Bar */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
                  <span className="rounded-md bg-black/85 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-white border border-white/10 truncate max-w-[70%]">
                    {video.title}
                  </span>
                  <span className="rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/50 px-1.5 py-0.5 text-[8px] font-mono font-bold text-[#F7E5A9]">
                    1080P 60FPS
                  </span>
                </div>
              </div>

              {/* Quadrant Source Switcher Bar */}
              <div className="p-2 sm:p-2.5 bg-slate-950/90 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider shrink-0">
                    Slot 0{qIdx + 1} Stream:
                  </span>
                  <select
                    value={videoIndex}
                    onChange={(e) => onSetQuadIndex(qIdx, parseInt(e.target.value, 10))}
                    className="rounded-lg bg-white/10 border border-white/20 text-white text-[11px] font-semibold py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] max-w-[180px] sm:max-w-[240px] truncate"
                  >
                    {videos.map((v, vIdx) => (
                      <option key={vIdx} value={vIdx} className="bg-slate-900 text-white">
                        {vIdx + 1}. {v.room} — {v.tag}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => onOpenCinema(videoIndex)}
                  className="rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-slate-950 text-slate-200 px-2.5 py-1 text-[10px] font-bold transition-all shrink-0 border border-white/15"
                >
                  Cinema View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*
  Panoramic Reel Carousel:
  - Horizontal smooth scrolling reel showing video frames with left/right golden arrow navigation.
  - Touch swipe enabled.
*/
function PanoramicReelCarousel({ 
  videos, 
  activeVideoIndex, 
  isGlobalLive, 
  onSelect, 
  onOpenCinema 
}) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Arrow Buttons */}
      <div className="hidden sm:flex items-center gap-2 absolute -top-12 right-0 z-10">
        <button
          onClick={scrollLeft}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-white hover:bg-[#D4AF37] hover:text-white text-[#8C6207] transition-all shadow-sm"
          aria-label="Previous reel"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollRight}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-white hover:bg-[#D4AF37] hover:text-white text-[#8C6207] transition-all shadow-sm"
          aria-label="Next reel"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Fluid Horizontal Scroll Strip */}
      <div
        ref={scrollContainerRef}
        className="-mx-3.5 px-3.5 sm:mx-0 sm:px-0 flex items-stretch gap-3.5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin"
      >
        {videos.map((vid, idx) => (
          <div key={idx} className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start">
            <HoverVideoFrame
              video={vid}
              index={vid.originalIndex ?? idx}
              isActive={activeVideoIndex === (vid.originalIndex ?? idx)}
              isGlobalLive={isGlobalLive}
              onSelect={onSelect}
              onOpenCinema={onOpenCinema}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/*
  Fullscreen Ultra-HD Video Cinema Theater Modal:
  - 1080p full-screen theater view with sound default ON.
  - Floating left/right navigation arrows.
  - Keyboard navigation: Left/Right arrows, Esc to close.
  - WhatsApp CTA prefilled with video title & room details for Host Mohsin (0314 3292778).
  - Bottom thumbnail strip to switch between all 15 videos without closing theater.
*/
function VideoCinemaModal({ 
  videos, 
  currentIndex, 
  onClose, 
  onNavigate, 
  onBookApartment,
  apartment 
}) {
  const currentVideo = videos[currentIndex] || videos[0];
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex === 0 ? videos.length - 1 : currentIndex - 1));
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex === videos.length - 1 ? 0 : currentIndex + 1));
      }
      if (e.key.toLowerCase() === 'm') {
        setIsMuted((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, onClose, onNavigate]);

  // Sync mute state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) {
        videoRef.current.volume = 1.0;
      }
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex, isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  const whatsappMessage = `Hello Mohsin, I am watching the 1080p video tour of ${apartment?.name || 'this luxury suite'} (${apartment?.hotel || 'Famous Stay Partner Hotel'}) - Tour #${currentIndex + 1}: ${currentVideo.room} (${currentVideo.title}). I would like to check availability and book it for my client.`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative flex flex-col items-center justify-between max-w-6xl w-full h-full max-h-[96vh] bg-slate-950 rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl shadow-[#D4AF37]/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-slate-900/90 text-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-3 py-1 text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-wider shrink-0 shadow-sm">
              <Film className="h-3 w-3" />
              <span>Tour {currentIndex + 1} of {videos.length}</span>
            </span>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs text-[#E5C07B] font-bold uppercase tracking-wider truncate">
                {currentVideo.room} • {currentVideo.tag}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate max-w-[220px] sm:max-w-md">
                {currentVideo.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold transition-all border ${
                isMuted
                  ? 'bg-red-500/20 text-rose-300 border-red-500/40'
                  : 'bg-emerald-600 text-white border-emerald-400'
              }`}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 animate-pulse" />}
              <span className="hidden sm:inline">{isMuted ? "Unmute" : "Sound ON"}</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Cinema"
              title="Close Cinema (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Central Stage: High-Def Video Player + Left/Right Nav */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden bg-black">
          <video
            ref={videoRef}
            key={currentVideo.url}
            src={currentVideo.url}
            poster={currentVideo.thumbnail}
            controls
            autoPlay
            loop
            playsInline
            preload="auto"
            className="max-h-full max-w-full aspect-[16/9] object-contain"
          />

          {/* Left Arrow Button */}
          <button
            onClick={() => onNavigate((currentIndex === 0 ? videos.length - 1 : currentIndex - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/75 border border-[#D4AF37]/60 text-white hover:bg-[#D4AF37] hover:text-slate-950 transition-all shadow-xl z-20"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => onNavigate((currentIndex === videos.length - 1 ? 0 : currentIndex + 1))}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/75 border border-[#D4AF37]/60 text-white hover:bg-[#D4AF37] hover:text-slate-950 transition-all shadow-xl z-20"
            aria-label="Next video"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Bottom Bar: Thumbnail Strip + Host Mohsin Inquiry CTA */}
        <div className="w-full flex flex-col gap-3 p-3 sm:p-4 bg-slate-900/95 border-t border-white/10">
          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-thin">
            {videos.map((v, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(idx)}
                  className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    isSelected
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/70 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={v.thumbnail} alt={v.room} className="h-full w-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white font-mono text-center truncate py-0.5">
                    {idx + 1}. {v.room}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left w-full sm:w-auto">
              <div className="text-xs text-[#E5C07B] font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span>
                <span>VIP Agents: Mohsin (0314 3292778) • Arsalan Jutt (+92 318 0985887)</span>
              </div>
              <div className="text-[11px] text-slate-300">
                1080p Verified Walkthrough • Press Left/Right arrows to explore all 15 rooms
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/923143292778?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 px-3.5 py-2 text-xs font-extrabold transition-all shadow-md"
              >
                <img src="/agent-mohsin.jpg" alt="Mohsin" className="h-4 w-4 rounded-full object-cover object-[center_18%]" />
                <span>WhatsApp Mohsin</span>
              </a>

              <a
                href={`https://wa.me/923180985887?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 px-3.5 py-2 text-xs font-extrabold transition-all shadow-md"
              >
                <img src="/agent-arsalan.jpg" alt="Arsalan" className="h-4 w-4 rounded-full object-cover object-[center_20%]" />
                <span>WhatsApp Arsalan</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onBookApartment(apartment);
                }}
                className="flex-1 sm:flex-initial gold-btn flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-slate-950"
              >
                <span>Book Penthouse</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApartmentShowcase({
  apartment,
  nights = 1,
  onSelectApartment,
  onBookApartment
}) {
  // Default to 'all' so the 5 trending photos portfolio and 15 video walkthroughs are both visible
  const [mediaMode, setMediaMode] = useState('all'); // 'all' | 'photos' | 'videos'
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(null);
  const [lightboxVideoIndex, setLightboxVideoIndex] = useState(null); // Fullscreen video modal
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Multi-frame showroom state
  const [showLayout, setShowLayout] = useState('grid'); // 'grid' | 'quad' | 'carousel'
  const [isWallLive, setIsWallLive] = useState(false); // Global video wall continuous playback
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'salons' | 'suites' | 'kitchen' | 'foyers'
  const [quadIndices, setQuadIndices] = useState([0, 1, 2, 3]); // 4 feeds for Quad-Vision

  if (!apartment) return null;

  const photos = apartment.images || [
    "/apartment/trending-living-media.jpg",
    "/apartment/trending-terrace-bbq.jpg",
    "/apartment/trending-lounge-dining.jpg",
    "/apartment/trending-mirror-foyer.jpg",
    "/apartment/trending-terrace-night.jpg"
  ];

  const labels = apartment.imageLabels || [
    "Grand Executive Salon with 85\" Smart TV & Fluted Acoustic Wall",
    "Open-Air Rooftop Sky Terrace with Barbecue & Mountain Views",
    "Sculpted Wave Ambient LED Lounge with Custom Velvet Sectional",
    "Arched Backlit Vanity Mirror & Exotic Palm Entrance Foyer",
    "Panoramic Twilight Skyline over Margalla Mountain Range"
  ];

  // Keyboard navigation for Fullscreen Lightbox (Photos)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxPhotoIndex === null) return;
      if (e.key === 'Escape') setLightboxPhotoIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotoIndex, photos.length]);

  const rawVideos = apartment.videos || [
    {
      url: "/apartment/videos/video-tour-1.mp4",
      title: "Emerald Executive Salon & Media Wall Tour",
      room: "Emerald Salon",
      thumbnail: "/apartment/emerald-living-main.jpg",
      tag: "Main Salon",
      category: "salons",
      feature: "85\" 4K TV • Italian Velvet Lounge"
    },
    {
      url: "/apartment/videos/video-tour-2.mp4",
      title: "Blush Rose Master King Suite Walkthrough",
      room: "Master Suite 1",
      thumbnail: "/apartment/master-bedroom-blush.jpg",
      tag: "King Bed",
      category: "suites",
      feature: "King Bed • Walk-in Dressing Suite"
    },
    {
      url: "/apartment/videos/video-tour-3.mp4",
      title: "Noir Charcoal Master Suite Tour",
      room: "Master Suite 2",
      thumbnail: "/apartment/charcoal-bedroom-suite.jpg",
      tag: "Charcoal Bed",
      category: "suites",
      feature: "Noir Luxury Finishes • Ensuite Bath"
    },
    {
      url: "/apartment/videos/video-tour-4.mp4",
      title: "Beige Marble Lounge & Arched Mirrors",
      room: "Marble Lounge",
      thumbnail: "/apartment/beige-marble-salon.jpg",
      tag: "2nd Salon",
      category: "salons",
      feature: "Italian Marble • Arched Mirrors"
    },
    {
      url: "/apartment/videos/video-tour-5.mp4",
      title: "Full Penthouse Walkthrough & Dual Salons",
      room: "Complete Tour",
      thumbnail: "/apartment/emerald-lounge-art.jpg",
      tag: "Full Walkthrough",
      category: "salons",
      feature: "3,200 sq ft Panoramic Living Flow"
    },
    {
      url: "/apartment/videos/video-tour-6.mp4",
      title: "Executive Entry Foyer & Lighting Walkthrough",
      room: "Entry Foyer",
      thumbnail: "/apartment/emerald-living-main.jpg",
      tag: "Foyer & Sconces",
      category: "foyers",
      feature: "Crystal Sconces • Keycard Security"
    },
    {
      url: "/apartment/videos/video-tour-7.mp4",
      title: "Gourmet Kitchen & Dining Suite Tour",
      room: "Dining & Kitchen",
      thumbnail: "/apartment/beige-marble-salon.jpg",
      tag: "Gourmet Kitchen",
      category: "kitchen",
      feature: "Quartz Island • Espresso Bar"
    },
    {
      url: "/apartment/videos/video-tour-8.mp4",
      title: "Master Dressing & Built-in Wardrobes",
      room: "Dressing Suite",
      thumbnail: "/apartment/master-bedroom-blush.jpg",
      tag: "Walk-in Wardrobe",
      category: "suites",
      feature: "LED Lit Mirrors • Soft-close Joinery"
    },
    {
      url: "/apartment/videos/video-tour-9.mp4",
      title: "Architectural Ceiling & Ambient Cove Lighting",
      room: "Ceiling & Ambiance",
      thumbnail: "/apartment/emerald-lounge-art.jpg",
      tag: "Cove Lighting",
      category: "salons",
      feature: "Multi-Zone Warm Dimmers"
    },
    {
      url: "/apartment/videos/video-tour-10.mp4",
      title: "Grand Panoramic Penthouse View & Living Flow",
      room: "Grand Suite",
      thumbnail: "/apartment/charcoal-bedroom-suite.jpg",
      tag: "Panoramic Living",
      category: "salons",
      feature: "Floor-to-Ceiling Windows • Margalla Hills"
    },
    {
      url: "/apartment/videos/video-tour-11.mp4",
      title: "Designer Bath Suite & Rain Shower Walkthrough",
      room: "Master Bath Suite",
      thumbnail: "/apartment/emerald-living-main.jpg",
      tag: "Luxury Bath",
      category: "foyers",
      feature: "Rain Shower • Marble Vanity"
    },
    {
      url: "/apartment/videos/video-tour-12.mp4",
      title: "VIP Executive Corridor & Architectural Details",
      room: "Executive Hall",
      thumbnail: "/apartment/beige-marble-salon.jpg",
      tag: "Private Corridor",
      category: "foyers",
      feature: "Art Gallery Wall • Recessed LEDs"
    },
    {
      url: "/apartment/videos/video-tour-13.mp4",
      title: "Second Marble Vanity & Guest Powder Suite",
      room: "Guest Powder Room",
      thumbnail: "/apartment/master-bedroom-blush.jpg",
      tag: "Powder Suite",
      category: "foyers",
      feature: "Golden Faucets • Guest Powder Room"
    },
    {
      url: "/apartment/videos/video-tour-14.mp4",
      title: "Smart Media Console & 4K Surround Sound Setup",
      room: "Media Console",
      thumbnail: "/apartment/emerald-lounge-art.jpg",
      tag: "Smart 4K Media",
      category: "salons",
      feature: "Dolby Atmos • High-Speed Fiber WiFi"
    },
    {
      url: "/apartment/videos/video-tour-15.mp4",
      title: "Full 360 Penthouse Walkthrough & Night Lighting",
      room: "Night Ambiance",
      thumbnail: "/apartment/charcoal-bedroom-suite.jpg",
      tag: "Night Lighting",
      category: "suites",
      feature: "Evening Mood Lighting • City Views"
    }
  ];

  // Enrich with originalIndex to ensure selections map back reliably
  const enrichedVideos = rawVideos.map((v, i) => ({
    ...v,
    category: v.category || 'salons',
    feature: v.feature || '1080p Ultra-HD Walkthrough',
    originalIndex: i
  }));

  const filteredVideos = enrichedVideos.filter((v) => 
    selectedCategory === 'all' ? true : v.category === selectedCategory
  );

  const categories = [
    { id: 'all', label: 'All Rooms', count: enrichedVideos.length },
    { id: 'salons', label: 'Salons & Lounges', count: enrichedVideos.filter(v => v.category === 'salons').length },
    { id: 'suites', label: 'Master Suites', count: enrichedVideos.filter(v => v.category === 'suites').length },
    { id: 'kitchen', label: 'Dining & Kitchen', count: enrichedVideos.filter(v => v.category === 'kitchen').length },
    { id: 'foyers', label: 'Baths & Foyers', count: enrichedVideos.filter(v => v.category === 'foyers').length },
  ];

  // Ensure autoplay triggers reliably on video change
  useEffect(() => {
    if (videoRef.current && (mediaMode === 'videos' || mediaMode === 'all')) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (!isMuted) {
            setIsMuted(true);
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [activeVideoIndex, mediaMode, isMuted]);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleSelectVideo = (index) => {
    setActiveVideoIndex(index);
    if (mediaMode !== 'videos') {
      setMediaMode('videos');
    }
    const cinemaEl = document.getElementById('primary-cinema-player');
    if (cinemaEl) {
      cinemaEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSetQuadIndex = (quadSlot, targetIndex) => {
    setQuadIndices((prev) => {
      const next = [...prev];
      next[quadSlot] = targetIndex;
      return next;
    });
  };

  const handleApplyPreset = (indices) => {
    setQuadIndices(indices);
  };

  return (
    <div 
      id="apartment-video-showcase"
      className="relative mb-14 overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/45 bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#FAF7EE] p-3.5 sm:p-8 shadow-2xl shadow-[#D4AF37]/15 scroll-mt-24 text-slate-800"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]"></div>
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#10B981]/10 blur-[140px]"></div>

      {/* Top Header Row with Media Switcher */}
      <div className="relative z-10 mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4AF37]/25 pb-4 sm:pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white px-3 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>🔥 #1 Trending Penthouse</span>
            </span>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#FFFDF7] px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8C6207] shadow-sm">
              <Crown className="h-3.5 w-3.5 text-[#B8860B]" />
              <span>Host Mohsin: 0314 3292778</span>
            </div>
          </div>

          <h2 className="mt-2.5 font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {apartment.name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <MapPin className="h-3.5 w-3.5 text-[#8C6207]" />
              {apartment.city}, Pakistan (Diplomatic Zone)
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1 font-bold text-[#8C6207]">
              <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              5.0 Exceptional (380+ Bookings)
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>15 HD Video Frames with Multi-Frame Show</span>
            </span>
          </div>
        </div>

        {/* Media Selector Tabs + Pricing */}
        <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
          {/* Media Mode Pill Switcher */}
          <div className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-white p-1 border border-[#D4AF37]/35 shadow-sm">
            <button
              onClick={() => setMediaMode('all')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all ${
                mediaMode === 'all'
                  ? 'gold-btn text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>All Media</span>
            </button>

            <button
              onClick={() => {
                setMediaMode('photos');
                const el = document.getElementById('apartment-photos-portfolio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all ${
                mediaMode === 'photos'
                  ? 'bg-[#FFFDF7] text-[#8C6207] border border-[#D4AF37]/50 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
              }`}
            >
              <Camera className="h-3 w-3 text-[#8C6207]" />
              <span>5 Photos</span>
            </button>

            <button
              onClick={() => {
                setMediaMode('videos');
                const el = document.getElementById('primary-cinema-player');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all ${
                mediaMode === 'videos'
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white shadow-md shadow-rose-900/20'
                  : 'text-rose-700 hover:text-rose-900 hover:bg-rose-50'
              }`}
            >
              <Play className="h-3 w-3 fill-current" />
              <span>15 Videos</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </button>
          </div>

          <div className="bg-white sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-[#D4AF37]/25 sm:border-0 text-left sm:text-right shadow-sm sm:shadow-none">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Wholesale Rate {nights > 1 ? `(${nights} Nights Total)` : 'per Night'}
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950">
              Rs. {(apartment.clientRate * nights).toLocaleString()}
              {nights > 1 ? (
                <span className="text-xs font-sans font-normal text-slate-500"> (Rs. {apartment.clientRate.toLocaleString()} / nt)</span>
              ) : (
                <span className="text-xs font-sans font-normal text-slate-500"> / nt</span>
              )}
            </div>
            <div className="text-xs font-bold text-emerald-700 mt-0.5">
              +Rs. {(apartment.clientRate * nights * 0.18).toLocaleString()} Net Agent Profit (18%)
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: STYLISH & UNIQUE 5-PHOTO ARCHITECTURAL BENTO PORTFOLIO */}
      {(mediaMode === 'all' || mediaMode === 'photos') && (
        <div id="apartment-photos-portfolio" className="relative z-10 mb-8 sm:mb-10 animate-in fade-in duration-300 scroll-mt-24">
          <div className="mb-3.5 sm:mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8C6207]">
                <Camera className="h-3.5 w-3.5" />
                <span>Verified Residence Gallery • 5 Masterpiece Perspectives</span>
              </div>
              <h3 className="mt-1 font-serif text-xl sm:text-3xl font-bold text-slate-900">
                Architectural Photography Portfolio
              </h3>
              <p className="mt-0.5 text-[11px] sm:text-xs text-slate-600">
                Tap any room perspective to view in high definition or launch the fullscreen interactive lightbox.
              </p>
            </div>

            <button
              onClick={() => setLightboxPhotoIndex(activePhotoIndex)}
              className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/50 bg-white hover:bg-[#D4AF37] hover:text-white text-[#8C6207] px-3.5 py-1.5 sm:py-2 text-xs font-bold transition-all shadow-sm group"
            >
              <Maximize2 className="h-3.5 w-3.5 text-[#8C6207] group-hover:text-white" />
              <span>Open 5-Photo High-Res Lightbox</span>
            </button>
          </div>

          {/* 5-Photo Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4">
            {/* Main Featured Photo (Left 7 Cols) */}
            <div
              onClick={() => setLightboxPhotoIndex(activePhotoIndex)}
              className="group relative lg:col-span-7 aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/50 bg-black cursor-pointer shadow-xl shadow-[#D4AF37]/15"
            >
              <img
                src={photos[activePhotoIndex]}
                alt={labels[activePhotoIndex]}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none"></div>

              {/* Top Status & Zoom Badges */}
              <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 z-10 pointer-events-none">
                <span className="flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8C6207] border border-[#D4AF37]/50 shadow-md">
                  <Sparkles className="h-3 w-3 text-[#B8860B]" />
                  <span>Main View • Photo {activePhotoIndex + 1} of 5</span>
                </span>
              </div>

              <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-10 pointer-events-none">
                <span className="flex items-center gap-1 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/20">
                  <Maximize2 className="h-3 w-3 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Tap for Fullscreen</span>
                  <span className="sm:hidden">Zoom</span>
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-end justify-between z-10 pointer-events-none">
                <div className="rounded-xl border border-[#D4AF37]/40 bg-white/95 px-3 py-2 backdrop-blur-md max-w-[85%] shadow-md">
                  <div className="text-[9px] uppercase font-bold text-[#8C6207] tracking-wider">
                    {apartment.hotel || 'Famous Stay Partner Hotel'} • {apartment.city}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {labels[activePhotoIndex]}
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Companion Bento Tiles (Right 5 Cols in 2x2 Grid) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2 sm:gap-3">
              {photos.map((pUrl, idx) => {
                if (idx === activePhotoIndex) return null;
                return (
                  <div
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 bg-black cursor-pointer transition-all hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20"
                  >
                    <img
                      src={pUrl}
                      alt={labels[idx]}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>

                    {/* Tile Room Caption */}
                    <div className="absolute bottom-1.5 sm:bottom-2 left-2 right-2 pointer-events-none">
                      <span className="block truncate text-[10px] sm:text-[11px] font-bold text-white group-hover:text-[#F7E5A9] transition-colors">
                        {labels[idx]}
                      </span>
                    </div>

                    <div className="absolute top-1.5 right-1.5 rounded-md bg-white/90 backdrop-blur-md px-1.5 py-0.5 text-[8px] font-bold text-[#8C6207] border border-[#D4AF37]/40 shadow-sm">
                      View #{idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Golden Section Divider between Photos and Videos when 'all' is active */}
      {mediaMode === 'all' && (
        <div className="relative z-10 my-6 sm:my-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]/10"></div>
          <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#8C6207] shadow-sm">
            <Film className="h-3.5 w-3.5 text-rose-600" />
            <span>15 HD Video Walkthroughs • Sound & Multi-Frame Lounge</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]/10"></div>
        </div>
      )}

      {/* SECTION 2: 15 HD VIDEO TOURS CINEMA PLAYER & MULTI-FRAME SHOWROOM */}
      {(mediaMode === 'all' || mediaMode === 'videos') && (
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 animate-in fade-in duration-300">
          {/* SECTION A: Primary Cinema Player + Side Playlist */}
          <div id="primary-cinema-player" className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 scroll-mt-28">
            {/* Main Cinema Video Player Container (Left 8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-2.5 sm:gap-3">
              <div className="group relative rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/50 bg-black overflow-hidden shadow-xl shadow-[#D4AF37]/15">
                {/* HTML5 Autoplaying Video */}
                <video
                  ref={videoRef}
                  key={rawVideos[activeVideoIndex].url}
                  src={rawVideos[activeVideoIndex].url}
                  poster={rawVideos[activeVideoIndex].thumbnail}
                  controls
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  className="w-full aspect-[16/10] sm:aspect-[16/9] object-contain bg-black"
                />

                {/* Floating Status Badge (Top-Left) */}
                <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 z-20 pointer-events-none max-w-[50%]">
                  <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg truncate">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                    <span className="sm:hidden">Tour {activeVideoIndex + 1}/{rawVideos.length}</span>
                    <span className="hidden sm:inline">CINEMA • TOUR {activeVideoIndex + 1}/{rawVideos.length}</span>
                  </span>
                </div>

                {/* Floating Controls (Top-Right): Sound Toggle & Cinema Modal Button */}
                <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={toggleSound}
                    className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold backdrop-blur-md transition-all shadow-md border ${
                      isMuted
                        ? 'bg-white/95 text-[#8C6207] border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-white'
                        : 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-500'
                    }`}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5 text-rose-500" />
                        <span>🔊 Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5 text-white animate-bounce" />
                        <span>Sound ON</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setLightboxVideoIndex(activeVideoIndex)}
                    className="flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold bg-black/75 text-white hover:bg-[#D4AF37] hover:text-slate-950 border border-white/25 backdrop-blur-md transition-all shadow-md"
                    title="Open Fullscreen Cinema Theater"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Theater</span>
                  </button>
                </div>

                {/* Video Title Bar at Bottom of Screen */}
                <div className="p-2.5 sm:p-4 bg-gradient-to-r from-white via-[#FFFDF7] to-white border-t border-[#D4AF37]/30 flex items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-rose-600 border border-red-500/30">
                      <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current ml-0.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] uppercase font-bold text-[#8C6207] tracking-wider truncate">
                        Room {activeVideoIndex + 1} of {rawVideos.length}: {rawVideos[activeVideoIndex].room}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {rawVideos[activeVideoIndex].title}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600" />
                      <span>1080p</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Jump Bar with Edge-to-Edge Touch Scroll */}
              <div className="-mx-3.5 px-3.5 sm:mx-0 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
                <span className="text-[10px] sm:text-xs font-bold text-[#8C6207] uppercase tracking-wider shrink-0 mr-0.5">
                  Jump Room:
                </span>
                {rawVideos.map((vid, idx) => {
                  const isSelected = activeVideoIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectVideo(idx)}
                      className={`flex items-center gap-1 sm:gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold transition-all border shrink-0 ${
                        isSelected
                          ? 'gold-btn text-slate-950 border-white shadow-md shadow-[#D4AF37]/20 scale-[1.02]'
                          : 'bg-white text-slate-700 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-slate-900 hover:bg-[#FFFDF7]'
                      }`}
                    >
                      <Play className={`h-2.5 w-2.5 ${isSelected ? 'fill-current text-slate-950' : 'text-[#8C6207]'}`} />
                      <span>{idx + 1}. {vid.room}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Playlist Sidebar (Right 4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C6207] px-1 flex items-center justify-between">
                <span>All {rawVideos.length} Room Walkthroughs:</span>
                <span className="text-[11px] text-emerald-700 font-bold">Auto-Looping</span>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto max-h-[320px] lg:max-h-[460px] pr-1 scrollbar-thin">
                {rawVideos.map((vid, vIdx) => {
                  const isActive = activeVideoIndex === vIdx;
                  return (
                    <button
                      key={vIdx}
                      onClick={() => handleSelectVideo(vIdx)}
                      className={`group flex items-center gap-2.5 sm:gap-3 rounded-2xl p-2 sm:p-2.5 text-left transition-all border ${
                        isActive
                          ? 'border-[#D4AF37] bg-[#FFFBF0] shadow-md ring-2 ring-[#D4AF37]/50'
                          : 'border-[#D4AF37]/25 bg-white hover:bg-[#FFFDF7] hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <div className="relative h-12 w-16 sm:h-14 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[#D4AF37]/30">
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full shadow-md ${
                            isActive 
                              ? 'bg-[#D4AF37] text-white animate-pulse' 
                              : 'bg-white/90 text-slate-900 group-hover:bg-[#D4AF37] group-hover:text-white'
                          }`}>
                            <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current ml-0.5" />
                          </span>
                        </div>
                        {isActive && (
                          <span className="absolute top-1 left-1 rounded bg-red-600 px-1 py-0.2 text-[8px] font-extrabold text-white">
                            PLAYING
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] sm:text-[10px] font-extrabold text-[#8C6207] uppercase tracking-wider truncate">
                            Tour {vIdx + 1} • {vid.tag}
                          </span>
                          {isActive && (
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                          )}
                        </div>
                        <div className={`text-[11px] sm:text-xs font-bold line-clamp-1 mt-0.5 ${isActive ? 'text-slate-950 font-extrabold' : 'text-slate-800 group-hover:text-slate-950'}`}>
                          {vid.title}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-emerald-700 mt-0.5 font-semibold">
                          {isActive ? '● Live on Screen' : '▶ Click to Play'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION B: ADVANCED MULTI-FRAME SHOWROOM WITH MULTI-VIEW LAYOUTS */}
          <div className="pt-6 border-t-2 border-[#D4AF37]/30">
            {/* Showroom Header & Control Center */}
            <div className="mb-5 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8C6207]">
                  <Film className="h-3.5 w-3.5 text-rose-600" />
                  <span>Ultra-Luxe Interactive Multi-Frame Showroom</span>
                </div>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Multiple Frame Video Showroom
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Switch between the <span className="font-bold text-slate-900">15-Frame Grid Wall</span>, synchronous <span className="font-bold text-slate-900">4-Split Quad-Vision</span>, or the <span className="font-bold text-slate-900">Panoramic Reel Strip</span>. Hover or tap to stream any room walkthrough in 1080p.
                </p>
              </div>

              {/* Showroom Global Controls: Layout Mode + Play All Live Toggle */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Global Live Wall Toggle */}
                <button
                  onClick={() => setIsWallLive(!isWallLive)}
                  className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all shadow-md border ${
                    isWallLive
                      ? 'bg-red-600 text-white border-red-500 shadow-red-600/25 ring-2 ring-red-400/50'
                      : 'bg-white hover:bg-[#FFFDF7] text-[#8C6207] border-[#D4AF37]/60'
                  }`}
                  title="Toggle all video frames to play simultaneously"
                >
                  {isWallLive ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-current" />
                      <span>⏸ Hover Stream Mode</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current text-[#D4AF37]" />
                      <span>▶ Stream All Frames Live</span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </>
                  )}
                </button>

                {/* Layout Mode Switcher */}
                <div className="inline-flex items-center rounded-2xl bg-white p-1 border border-[#D4AF37]/50 shadow-sm">
                  <button
                    onClick={() => setShowLayout('grid')}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      showLayout === 'grid'
                        ? 'gold-btn text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
                    }`}
                    title="15-Frame Grid Wall"
                  >
                    <Grid className="h-3.5 w-3.5" />
                    <span>Grid Wall (15)</span>
                  </button>

                  <button
                    onClick={() => setShowLayout('quad')}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      showLayout === 'quad'
                        ? 'bg-gradient-to-r from-slate-900 to-slate-950 text-[#F7E5A9] border border-[#D4AF37]/50 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
                    }`}
                    title="Synchronous Quad-Vision (4 Simultaneous Feeds)"
                  >
                    <Tv className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Quad-Vision (4-in-1)</span>
                  </button>

                  <button
                    onClick={() => setShowLayout('carousel')}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      showLayout === 'carousel'
                        ? 'gold-btn text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
                    }`}
                    title="Panoramic Reel Filmstrip"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Panoramic Reel</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Chips Bar */}
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#D4AF37]/20 pb-3">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none w-full">
                <span className="text-[10px] sm:text-xs font-bold text-[#8C6207] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                  <SlidersHorizontal className="h-3 w-3" />
                  <span>Filter:</span>
                </span>
                {categories.map((cat) => {
                  const isCatSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] sm:text-xs font-bold transition-all border shrink-0 ${
                        isCatSelected
                          ? 'gold-btn text-slate-950 border-white shadow-md'
                          : 'bg-white hover:bg-[#FFFDF7] text-slate-700 border-[#D4AF37]/35 hover:border-[#D4AF37]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-extrabold ${
                        isCatSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE LAYOUT RENDERING */}
            {showLayout === 'grid' && (
              <div className="animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
                  {filteredVideos.map((vid) => (
                    <HoverVideoFrame
                      key={vid.originalIndex}
                      video={vid}
                      index={vid.originalIndex}
                      isActive={activeVideoIndex === vid.originalIndex}
                      isGlobalLive={isWallLive}
                      onSelect={handleSelectVideo}
                      onOpenCinema={setLightboxVideoIndex}
                    />
                  ))}
                </div>
              </div>
            )}

            {showLayout === 'quad' && (
              <div className="animate-in fade-in duration-300">
                <QuadVideoWall
                  videos={rawVideos}
                  quadIndices={quadIndices}
                  onSetQuadIndex={handleSetQuadIndex}
                  onOpenCinema={setLightboxVideoIndex}
                  onApplyPreset={handleApplyPreset}
                />
              </div>
            )}

            {showLayout === 'carousel' && (
              <div className="animate-in fade-in duration-300">
                <PanoramicReelCarousel
                  videos={filteredVideos}
                  activeVideoIndex={activeVideoIndex}
                  isGlobalLive={isWallLive}
                  onSelect={handleSelectVideo}
                  onOpenCinema={setLightboxVideoIndex}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULL-SCREEN ULTRA-HD PHOTO LIGHTBOX MODAL */}
      {lightboxPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxPhotoIndex(null)}
        >
          <div 
            className="relative flex flex-col items-center justify-center max-w-5xl w-full h-full max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between pb-3 px-2 text-white">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-[#E5C07B] text-[#061026] px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider">
                  <Camera className="h-3 w-3" />
                  Photo {lightboxPhotoIndex + 1} of {photos.length}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
                  {labels[lightboxPhotoIndex]}
                </span>
              </div>

              <button
                onClick={() => setLightboxPhotoIndex(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Image with Prev / Next Navigation */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden rounded-2xl border border-[#E5C07B]/40 bg-black">
              <img
                src={photos[lightboxPhotoIndex]}
                alt={labels[lightboxPhotoIndex]}
                className="max-h-full max-w-full object-contain select-none"
              />

              {/* Prev Button */}
              <button
                onClick={() => setLightboxPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/70 border border-[#E5C07B]/50 text-white hover:bg-[#E5C07B] hover:text-[#061026] transition-all shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={() => setLightboxPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/70 border border-[#E5C07B]/50 text-white hover:bg-[#E5C07B] hover:text-[#061026] transition-all shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip + Book CTA */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 px-2">
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
                {photos.map((pUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxPhotoIndex(idx)}
                    className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      lightboxPhotoIndex === idx
                        ? 'border-[#E5C07B] ring-2 ring-[#E5C07B]/60 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={pUrl} alt={labels[idx]} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/923143292778?text=${encodeURIComponent(`Hello Mohsin, I am viewing the photos of ${apartment.name} (${apartment.hotel || 'Famous Stay Partner Hotel'}). I would like to book it for my client.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[#061026] px-4 py-2 text-xs font-bold transition-all shadow-md"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                  </svg>
                  <span>Inquire</span>
                </a>
                <button
                  onClick={() => {
                    setLightboxPhotoIndex(null);
                    onBookApartment(apartment);
                  }}
                  className="flex-1 sm:flex-initial gold-btn flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN ULTRA-HD VIDEO CINEMA THEATER MODAL */}
      {lightboxVideoIndex !== null && (
        <VideoCinemaModal
          videos={rawVideos}
          currentIndex={lightboxVideoIndex}
          onClose={() => setLightboxVideoIndex(null)}
          onNavigate={(idx) => setLightboxVideoIndex(idx)}
          onBookApartment={onBookApartment}
          apartment={apartment}
        />
      )}

      {/* SECTION C: CLEAR & PROMINENT AGENT MOHSIN VERIFIED HOST PROFILE */}
      <div className="relative z-10 mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#FFFDF8] via-[#FFFFFF] to-[#FAF5E6] p-4 sm:p-8 shadow-xl shadow-[#D4AF37]/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left w-full sm:w-auto">
            {/* Clear & Large Agent Photos (Dual Agents) */}
            <div className="flex items-center -space-x-4 shrink-0">
              <div className="relative">
                <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/35 shadow-xl bg-slate-100">
                  <img
                    src="/agent-mohsin.jpg"
                    alt="Agent Mohsin - Verified Host"
                    className="h-full w-full object-cover object-[center_18%]"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#25D366] border-2 border-white shadow-lg" title="Mohsin Active">
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                </span>
              </div>

              <div className="relative z-10">
                <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-[#25D366] ring-4 ring-[#25D366]/35 shadow-xl bg-slate-100">
                  <img
                    src="/agent-arsalan.jpg"
                    alt="Agent Arsalan Jutt - Second Agent"
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#25D366] border-2 border-white shadow-lg" title="Arsalan Active">
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                </span>
              </div>
            </div>

            {/* Clear Agent Details & Credentials */}
            <div className="space-y-1.5 w-full">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-white px-3 py-0.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8C6207] shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified Direct Reservation Desk</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                Agent Mohsin & Agent Arsalan Jutt
              </h3>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs text-slate-600">
                <a
                  href="https://wa.me/923143292778"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-[#8C6207] text-xs sm:text-sm bg-white px-2.5 sm:px-3 py-1 rounded-xl border border-[#D4AF37]/40 shadow-sm hover:border-[#25D366] transition-colors"
                >
                  Mohsin: 📞 0314 3292778
                </a>
                <a
                  href="https://wa.me/923180985887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-emerald-700 text-xs sm:text-sm bg-white px-2.5 sm:px-3 py-1 rounded-xl border border-[#25D366]/40 shadow-sm hover:border-[#25D366] transition-colors"
                >
                  Arsalan: 📞 +92 318 0985887
                </a>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-[#8C6207] font-bold hidden sm:inline">
                  ⭐ 5.0 VIP Host Rating
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-xl pt-0.5 leading-relaxed">
                Directly manages keycard handover, 24/7 VIP check-in, Margalla Hills penthouse view access, and complimentary Prado airport transfers for your distinguished guests.
              </p>
            </div>
          </div>

          {/* Action CTAs: Full-width on mobile */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <a
              href={`https://wa.me/923143292778?text=${encodeURIComponent(`Hello Mohsin, I want to book ${apartment.name} (${apartment.hotel || 'Famous Stay Partner Hotel'}) for my client.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 w-full sm:w-auto"
            >
              <img src="/agent-mohsin.jpg" alt="Mohsin" className="h-5 w-5 rounded-full object-cover object-[center_18%]" />
              <span>WhatsApp Mohsin (0314 3292778)</span>
            </a>

            <a
              href={`https://wa.me/923180985887?text=${encodeURIComponent(`Hello Arsalan, I want to book ${apartment.name} (${apartment.hotel || 'Famous Stay Partner Hotel'}) for my client.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 w-full sm:w-auto"
            >
              <img src="/agent-arsalan.jpg" alt="Arsalan" className="h-5 w-5 rounded-full object-cover object-[center_20%]" />
              <span>WhatsApp Arsalan (+92 318 0985887)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Architectural Features Ribbon & Highlights */}
      <div className="relative z-10 mt-6 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4 border-y border-[#D4AF37]/25 py-3.5 sm:py-4 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] shrink-0 border border-[#D4AF37]/30">
            <Maximize className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] uppercase font-bold text-slate-500">Total Space</div>
            <div className="font-bold text-slate-900 text-[11px] sm:text-xs truncate">3,200 sq ft</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] shrink-0 border border-[#D4AF37]/30">
            <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] uppercase font-bold text-slate-500">Master Bedding</div>
            <div className="font-bold text-slate-900 text-[11px] sm:text-xs truncate">2 King Suites</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] shrink-0 border border-[#D4AF37]/30">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] uppercase font-bold text-slate-500">Capacity</div>
            <div className="font-bold text-slate-900 text-[11px] sm:text-xs truncate">Up to 5 VIP Guests</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#25D366]/15 text-emerald-700 shrink-0 border border-[#25D366]/30">
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] uppercase font-bold text-slate-500">Direct Concierge</div>
            <div className="font-bold text-emerald-700 text-[11px] sm:text-xs truncate">Mohsin & Arsalan</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Row: Instant Booking & WhatsApp (Mobile Stacked) */}
      <div className="relative z-10 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
          <span className="font-bold text-[#8C6207] text-[11px] sm:text-xs">Inclusions:</span>
          <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] sm:text-[11px] border border-[#D4AF37]/30 text-slate-800 shadow-sm">
            • 4K Smart TVs
          </span>
          <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] sm:text-[11px] border border-[#D4AF37]/30 text-slate-800 shadow-sm">
            • Gourmet Kitchen
          </span>
          <span className="rounded-lg bg-white px-2 py-0.5 text-[10px] sm:text-[11px] border border-[#D4AF37]/30 text-slate-800 shadow-sm">
            • Prado Airport Transfer
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Direct WhatsApp Inquiry for This Apartment */}
          <a
            href={`https://wa.me/923143292778?text=${encodeURIComponent(`Hello Mohsin, I want to book ${apartment.name} (${apartment.hotel || 'Famous Stay Partner Hotel'}) in ${apartment.city} for my client. Please share availability.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 px-3.5 py-3 text-xs font-bold text-emerald-800 hover:bg-[#25D366] hover:text-slate-950 transition-all shadow-sm w-full sm:w-auto"
          >
            <img src="/agent-mohsin.jpg" alt="Mohsin" className="h-4 w-4 rounded-full object-cover object-[center_18%]" />
            <span>Ask Mohsin</span>
          </a>

          <a
            href={`https://wa.me/923180985887?text=${encodeURIComponent(`Hello Arsalan, I want to book ${apartment.name} (${apartment.hotel || 'Famous Stay Partner Hotel'}) in ${apartment.city} for my client. Please share availability.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 px-3.5 py-3 text-xs font-bold text-emerald-800 hover:bg-[#25D366] hover:text-slate-950 transition-all shadow-sm w-full sm:w-auto"
          >
            <img src="/agent-arsalan.jpg" alt="Arsalan" className="h-4 w-4 rounded-full object-cover object-[center_20%]" />
            <span>Ask Arsalan</span>
          </a>

          {/* Suite Spec Modal */}
          <button
            onClick={() => onSelectApartment(apartment)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-white px-4 py-3 text-xs font-bold text-[#8C6207] hover:bg-[#FFFDF7] hover:border-[#D4AF37] transition-all w-full sm:w-auto shadow-sm"
          >
            <Eye className="h-4 w-4 text-[#8C6207]" />
            <span>Interactive Media Spec</span>
          </button>

          {/* Book Now Button */}
          <button
            onClick={() => onBookApartment(apartment)}
            className="gold-btn flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-bold shadow-xl shadow-[#D4AF37]/25 w-full sm:w-auto"
          >
            <span>Book Apartment for Client</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
