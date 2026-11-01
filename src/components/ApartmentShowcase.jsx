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
  Volume2,
  VolumeX,
  Phone,
  Film
} from 'lucide-react';

/* 
  Individual Hover Video Frame Component:
  - Displays high-definition preview of the room.
  - Automatically plays when the user moves their mouse over the frame.
  - Pauses and resets when mouse leaves.
  - Clicking sets it as the primary cinema player video.
*/
function HoverVideoFrame({ video, index, isActive, onSelect }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(index)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
        isActive
          ? 'border-[#E5C07B] ring-2 ring-[#E5C07B]/70 shadow-2xl shadow-[#E5C07B]/30 scale-[1.02] bg-[#0E2355]'
          : isPlaying
          ? 'border-[#E5C07B] shadow-2xl shadow-black/90 scale-[1.02] bg-[#0A1A40]'
          : 'border-[#E5C07B]/25 hover:border-[#E5C07B]/70 bg-[#061026]/90'
      }`}
    >
      {/* Video Container Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Live Status Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          {isPlaying ? (
            <span className="flex items-center gap-1.5 rounded-full bg-red-600/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
              Live Playing
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#F7E5A9] border border-[#E5C07B]/35">
              <Play className="h-2.5 w-2.5 fill-current text-[#E5C07B]" />
              Frame {index + 1}
            </span>
          )}
        </div>

        {/* Play Icon / Hover Overlay when inactive */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity group-hover:opacity-0 pointer-events-none">
            <div className="flex items-center gap-1.5 rounded-full bg-[#061026]/90 px-3 py-1 text-[11px] font-bold text-[#F7E5A9] border border-[#E5C07B]/50 shadow-lg">
              <Play className="h-3 w-3 fill-current text-[#E5C07B]" />
              <span>Hover to Play</span>
            </div>
          </div>
        )}

        {/* Room Label Strip */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
          <span className="rounded-lg bg-black/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-white/10 truncate max-w-[70%]">
            {video.room}
          </span>
          <span className="rounded-md bg-emerald-500/20 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
            1080p HD
          </span>
        </div>
      </div>

      {/* Frame Card Details */}
      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#E5C07B]">
            Tour {index + 1} • {video.tag}
          </div>
          <h4 className="mt-1 text-xs font-bold text-white line-clamp-1 group-hover:text-[#F7E5A9] transition-colors">
            {video.title}
          </h4>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#E5C07B]/15 text-[10px]">
          <span className="text-blue-300/80">
            {isPlaying ? '▶ Hovering (Streaming)' : 'Place mouse to preview'}
          </span>
          <span className="font-bold text-[#E5C07B] flex items-center gap-1 group-hover:text-white transition-colors">
            <span>Play in Cinema</span>
            <ArrowRight className="h-3 w-3" />
          </span>
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
  // Default to 'videos' so walkthroughs play right on the front dashboard
  const [mediaMode, setMediaMode] = useState('videos'); // 'videos' | 'photos'
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  if (!apartment) return null;

  const photos = apartment.images || [
    "/apartment/emerald-living-main.jpg",
    "/apartment/master-bedroom-blush.jpg",
    "/apartment/charcoal-bedroom-suite.jpg",
    "/apartment/emerald-lounge-art.jpg",
    "/apartment/beige-marble-salon.jpg"
  ];

  const labels = apartment.imageLabels || [
    "Emerald Executive Salon & Media Wall",
    "Blush Rose Master King Suite",
    "Noir Charcoal Second Suite",
    "Velvet Lounge & Gold Art",
    "Beige Marble Lounge & Arched Mirrors"
  ];

  const videos = apartment.videos || [
    {
      url: "/apartment/videos/video-tour-1.mp4",
      title: "Emerald Executive Salon & Media Wall Tour",
      room: "Emerald Salon",
      thumbnail: "/apartment/emerald-living-main.jpg",
      tag: "Main Salon"
    },
    {
      url: "/apartment/videos/video-tour-2.mp4",
      title: "Blush Rose Master King Suite Walkthrough",
      room: "Master Suite 1",
      thumbnail: "/apartment/master-bedroom-blush.jpg",
      tag: "King Bed"
    },
    {
      url: "/apartment/videos/video-tour-3.mp4",
      title: "Noir Charcoal Master Suite Tour",
      room: "Master Suite 2",
      thumbnail: "/apartment/charcoal-bedroom-suite.jpg",
      tag: "Charcoal Bed"
    },
    {
      url: "/apartment/videos/video-tour-4.mp4",
      title: "Beige Marble Lounge & Arched Mirrors",
      room: "Marble Lounge",
      thumbnail: "/apartment/beige-marble-salon.jpg",
      tag: "2nd Salon"
    },
    {
      url: "/apartment/videos/video-tour-5.mp4",
      title: "Full Penthouse Walkthrough & Dual Salons",
      room: "Complete Tour",
      thumbnail: "/apartment/emerald-lounge-art.jpg",
      tag: "Full Walkthrough"
    },
    {
      url: "/apartment/videos/video-tour-6.mp4",
      title: "Executive Entry Foyer & Lighting Walkthrough",
      room: "Entry Foyer",
      thumbnail: "/apartment/emerald-living-main.jpg",
      tag: "Foyer & Sconces"
    },
    {
      url: "/apartment/videos/video-tour-7.mp4",
      title: "Gourmet Kitchen & Dining Suite Tour",
      room: "Dining & Kitchen",
      thumbnail: "/apartment/beige-marble-salon.jpg",
      tag: "Gourmet Kitchen"
    },
    {
      url: "/apartment/videos/video-tour-8.mp4",
      title: "Master Dressing & Built-in Wardrobes",
      room: "Dressing Suite",
      thumbnail: "/apartment/master-bedroom-blush.jpg",
      tag: "Walk-in Wardrobe"
    },
    {
      url: "/apartment/videos/video-tour-9.mp4",
      title: "Architectural Ceiling & Ambient Cove Lighting",
      room: "Ceiling & Ambiance",
      thumbnail: "/apartment/emerald-lounge-art.jpg",
      tag: "Cove Lighting"
    },
    {
      url: "/apartment/videos/video-tour-10.mp4",
      title: "Grand Panoramic Penthouse View & Living Flow",
      room: "Grand Suite",
      thumbnail: "/apartment/charcoal-bedroom-suite.jpg",
      tag: "Panoramic Living"
    },
    {
      url: "/apartment/videos/video-tour-11.mp4",
      title: "Designer Bath Suite & Rain Shower Walkthrough",
      room: "Master Bath Suite",
      thumbnail: "/apartment/emerald-living-main.jpg",
      tag: "Luxury Bath"
    },
    {
      url: "/apartment/videos/video-tour-12.mp4",
      title: "VIP Executive Corridor & Architectural Details",
      room: "Executive Hall",
      thumbnail: "/apartment/beige-marble-salon.jpg",
      tag: "Private Corridor"
    },
    {
      url: "/apartment/videos/video-tour-13.mp4",
      title: "Second Marble Vanity & Guest Powder Suite",
      room: "Guest Powder Room",
      thumbnail: "/apartment/master-bedroom-blush.jpg",
      tag: "Powder Suite"
    },
    {
      url: "/apartment/videos/video-tour-14.mp4",
      title: "Smart Media Console & 4K Surround Sound Setup",
      room: "Media Console",
      thumbnail: "/apartment/emerald-lounge-art.jpg",
      tag: "Smart 4K Media"
    },
    {
      url: "/apartment/videos/video-tour-15.mp4",
      title: "Full 360 Penthouse Walkthrough & Night Lighting",
      room: "Night Ambiance",
      thumbnail: "/apartment/charcoal-bedroom-suite.jpg",
      tag: "Night Lighting"
    }
  ];

  // Ensure autoplay triggers reliably on video change
  useEffect(() => {
    if (videoRef.current && mediaMode === 'videos') {
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

  return (
    <div 
      id="apartment-video-showcase"
      className="relative mb-14 overflow-hidden rounded-3xl border-2 border-[#E5C07B]/40 bg-gradient-to-b from-[#091738] via-[#07132F] to-[#040A18] p-5 sm:p-8 shadow-2xl shadow-[#020712]/90 scroll-mt-24"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#E5C07B]/10 blur-[120px]"></div>
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#10B981]/10 blur-[140px]"></div>

      {/* Top Header Row with Media Switcher */}
      <div className="relative z-10 mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#E5C07B]/20 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5C07B]/40 bg-[#0B1A3E] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#F7E5A9] shadow-sm">
            <Crown className="h-3.5 w-3.5 text-[#E5C07B]" />
            <span>Featured Luxury Penthouse • Direct Host: Agent Mohsin (0314 3292778)</span>
          </div>

          <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {apartment.name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-blue-200">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <MapPin className="h-4 w-4 text-[#E5C07B]" />
              {apartment.city}, Pakistan (Diplomatic & Executive Zone)
            </span>
            <span className="text-blue-400/40">•</span>
            <span className="flex items-center gap-1 font-bold text-[#F7E5A9]">
              <Star className="h-4 w-4 fill-[#E5C07B] text-[#E5C07B]" />
              5.0 Exceptional (380+ Verified Bookings)
            </span>
            <span className="text-blue-400/40">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>15 HD Video Frames with Hover-to-Play</span>
            </span>
          </div>
        </div>

        {/* Media Selector Tabs + Pricing */}
        <div className="flex flex-col sm:items-end gap-3">
          {/* Media Mode Pill Switcher */}
          <div className="inline-flex items-center rounded-2xl bg-[#061026] p-1.5 border border-[#E5C07B]/30 shadow-lg">
            <button
              onClick={() => setMediaMode('videos')}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mediaMode === 'videos'
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white shadow-lg shadow-rose-900/50'
                  : 'text-rose-300 hover:text-white hover:bg-rose-950/30'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{videos.length} Video Tours (Active)</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>

            <button
              onClick={() => setMediaMode('photos')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mediaMode === 'photos'
                  ? 'gold-btn text-[#061026] shadow-md'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Camera className="h-3.5 w-3.5" />
              <span>5 Real Photos</span>
            </button>
          </div>

          <div className="text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200/80">
              Wholesale Rate {nights > 1 ? `(${nights} Nights Total)` : 'per Night'}
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F7E5A9]">
              Rs. {(apartment.clientRate * nights).toLocaleString()}
              {nights > 1 ? (
                <span className="text-xs font-sans font-normal text-blue-200/80"> (Rs. {apartment.clientRate.toLocaleString()} / nt)</span>
              ) : (
                <span className="text-xs font-sans font-normal text-blue-200/80"> / nt</span>
              )}
            </div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">
              +Rs. {(apartment.clientRate * nights * 0.18).toLocaleString()} Net Agent Profit (18%)
            </div>
          </div>
        </div>
      </div>

      {/* MODE 1: 15 HD VIDEO TOURS CINEMA PLAYER (PRIMARY FRONT DASHBOARD VIEW) */}
      {mediaMode === 'videos' && (
        <div className="relative z-10 flex flex-col gap-8 animate-in fade-in duration-300">
          {/* SECTION A: Primary Cinema Player + Side Playlist */}
          <div id="primary-cinema-player" className="grid grid-cols-1 lg:grid-cols-12 gap-5 scroll-mt-28">
            {/* Main Cinema Video Player Container (Left 8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="group relative rounded-2xl sm:rounded-3xl border-2 border-[#E5C07B]/50 bg-black overflow-hidden shadow-2xl shadow-black/80">
                {/* HTML5 Autoplaying Video */}
                <video
                  ref={videoRef}
                  key={videos[activeVideoIndex].url}
                  src={videos[activeVideoIndex].url}
                  poster={videos[activeVideoIndex].thumbnail}
                  controls
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  className="w-full aspect-[16/10] sm:aspect-[16/9] object-contain bg-black"
                />

                {/* Floating Status Badge (Top-Left) */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-20 pointer-events-none">
                  <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 backdrop-blur-md px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
                    CINEMA STAGE • TOUR {activeVideoIndex + 1}/{videos.length}
                  </span>
                  <span className="hidden sm:inline-flex rounded-full bg-[#061026]/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-[#F7E5A9] border border-[#E5C07B]/40">
                    {videos[activeVideoIndex].room}
                  </span>
                </div>

                {/* Floating Sound Toggle Button (Top-Right) */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={toggleSound}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold backdrop-blur-md transition-all shadow-xl border ${
                      isMuted
                        ? 'bg-[#061026]/90 text-[#F7E5A9] border-[#E5C07B]/50 hover:bg-[#E5C07B] hover:text-[#061026]'
                        : 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-500'
                    }`}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="h-4 w-4 text-red-400" />
                        <span>🔊 Tap to Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4 text-white animate-bounce" />
                        <span>Sound ON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Video Title Bar at Bottom of Screen */}
                <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#061026] via-[#091738] to-[#061026] border-t border-[#E5C07B]/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#E5C07B] tracking-wider">
                        Currently Playing Video {activeVideoIndex + 1} of {videos.length}
                      </div>
                      <div className="text-sm font-bold text-white line-clamp-1">
                        {videos[activeVideoIndex].title}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>1080p Real Video</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Jump Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider shrink-0 mr-1">
                  Jump To Room:
                </span>
                {videos.map((vid, idx) => {
                  const isSelected = activeVideoIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectVideo(idx)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border shrink-0 ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FFF5D0] via-[#E5C07B] to-[#C49824] text-[#061026] border-white shadow-md shadow-[#E5C07B]/30 scale-[1.03]'
                          : 'bg-[#061026]/90 text-blue-200 border-[#E5C07B]/25 hover:border-[#E5C07B]/60 hover:text-white hover:bg-[#0B1E48]'
                      }`}
                    >
                      <Play className={`h-3 w-3 ${isSelected ? 'fill-current text-[#061026]' : 'text-[#E5C07B]'}`} />
                      <span>{idx + 1}. {vid.room}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Playlist Sidebar (Right 4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#F7E5A9] px-1 flex items-center justify-between">
                <span>Room Walkthrough Playlist:</span>
                <span className="text-[11px] text-emerald-400 font-bold">{videos.length} Videos</span>
              </div>

              <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
                {videos.map((vid, vIdx) => {
                  const isActive = activeVideoIndex === vIdx;
                  return (
                    <button
                      key={vIdx}
                      onClick={() => handleSelectVideo(vIdx)}
                      className={`group flex items-center gap-3 rounded-2xl p-2.5 text-left transition-all border ${
                        isActive
                          ? 'border-[#E5C07B] bg-[#0E2458] shadow-xl shadow-[#E5C07B]/20 ring-2 ring-[#E5C07B]/50'
                          : 'border-[#E5C07B]/20 bg-[#061026]/90 hover:bg-[#0B1E48] hover:border-[#E5C07B]/50'
                      }`}
                    >
                      <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/20">
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full shadow-md ${
                            isActive 
                              ? 'bg-[#E5C07B] text-[#061026] animate-pulse' 
                              : 'bg-white/85 text-[#061026] group-hover:bg-[#E5C07B]'
                          }`}>
                            <Play className="h-3 w-3 fill-current ml-0.5" />
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
                          <span className="text-[10px] font-extrabold text-[#E5C07B] uppercase tracking-wider">
                            Tour {vIdx + 1} • {vid.tag}
                          </span>
                          {isActive && (
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
                          )}
                        </div>
                        <div className={`text-xs font-bold line-clamp-1 mt-0.5 ${isActive ? 'text-white' : 'text-blue-100 group-hover:text-white'}`}>
                          {vid.title}
                        </div>
                        <div className="text-[10px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                          <span>{isActive ? '● Live on Screen' : '▶ Click to Play Now'}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION B: MULTIPLE VIDEO FRAMES (HOVER TO PLAY ON MOUSE OVER) */}
          <div className="pt-6 border-t border-[#E5C07B]/20">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#E5C07B]">
                  <Film className="h-4 w-4" />
                  <span>Interactive Multi-Frame Gallery</span>
                </div>
                <h3 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
                  Multi-Frame Room Video Tours <span className="text-[#E5C07B] font-normal text-lg sm:text-xl">(Hover Mouse to Play)</span>
                </h3>
                <p className="mt-1 text-xs text-blue-200">
                  Move your mouse cursor over any frame below to stream the video walkthrough live. Click any card to launch in the main cinema screen.
                </p>
              </div>

              <span className="rounded-full bg-[#0E2458] border border-[#E5C07B]/30 px-3.5 py-1.5 text-xs font-bold text-[#F7E5A9]">
                {videos.length} HD Video Frames Available
              </span>
            </div>

            {/* Grid of 15 Video Frames */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
              {videos.map((vid, idx) => (
                <HoverVideoFrame
                  key={idx}
                  video={vid}
                  index={idx}
                  isActive={activeVideoIndex === idx}
                  onSelect={handleSelectVideo}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: 5-PHOTO BENTO MOSAIC SHOWCASE */}
      {mediaMode === 'photos' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 animate-in fade-in duration-300">
          {/* Main Large Hero Photo (Left 7 Cols) */}
          <div 
            onClick={() => onSelectApartment(apartment)}
            className="group relative lg:col-span-7 aspect-[16/10] sm:aspect-[16/11] lg:aspect-auto overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5C07B]/30 bg-black cursor-pointer shadow-xl"
          >
            <img
              src={photos[activePhotoIndex]}
              alt={labels[activePhotoIndex]}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A18]/90 via-[#040A18]/20 to-transparent"></div>

            {/* Current Photo Caption Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="rounded-xl border border-[#E5C07B]/30 bg-[#061026]/90 px-3.5 py-2 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#E5C07B] tracking-wider">
                  Photo {activePhotoIndex + 1} of 5
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {labels[activePhotoIndex]}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectApartment(apartment);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-[#E5C07B]/50 bg-[#0B1E48]/90 px-3.5 py-2 text-xs font-bold text-[#F7E5A9] backdrop-blur-md hover:bg-[#E5C07B] hover:text-[#061026] transition-all shadow-lg"
              >
                <Camera className="h-4 w-4" />
                <span>Full Screen Gallery</span>
              </button>
            </div>
          </div>

          {/* 4 Complementary Room Thumbnails (Right 5 Cols in 2x2 Grid) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {photos.slice(0, 4).map((imgUrl, idx) => {
              const actualIndex = idx === 0 ? 1 : idx === 1 ? 2 : idx === 2 ? 3 : 4;
              const isSelected = activePhotoIndex === actualIndex;
              return (
                <div
                  key={actualIndex}
                  onClick={() => setActivePhotoIndex(actualIndex)}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-[#E5C07B] ring-2 ring-[#E5C07B]/50 shadow-lg shadow-[#E5C07B]/20 scale-[0.98]' 
                      : 'border-[#E5C07B]/20 hover:border-[#E5C07B]/70'
                  }`}
                >
                  <img
                    src={photos[actualIndex]}
                    alt={labels[actualIndex]}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="block truncate text-[10px] sm:text-[11px] font-bold text-white group-hover:text-[#F7E5A9] transition-colors">
                      {labels[actualIndex]}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#E5C07B] shadow-md shadow-[#E5C07B]"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION C: CLEAR & PROMINENT AGENT MOHSIN VERIFIED HOST PROFILE */}
      <div className="relative z-10 mt-10 rounded-3xl border-2 border-[#E5C07B]/50 bg-gradient-to-r from-[#0C1F45] via-[#091738] to-[#061026] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
            {/* Clear & Large Agent Photo */}
            <div className="relative flex-shrink-0">
              <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-3xl overflow-hidden border-2 border-[#E5C07B] ring-4 ring-[#E5C07B]/40 shadow-2xl shadow-[#E5C07B]/25 bg-black">
                <img
                  src="/agent-mohsin.jpg"
                  alt="Agent Mohsin - Verified Host"
                  className="h-full w-full object-cover object-[center_18%]"
                />
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] border-2 border-[#091738] shadow-lg" title="Online on WhatsApp">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </span>
            </div>

            {/* Clear Agent Details & Credentials */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E5C07B]/40 bg-[#061026]/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F7E5A9]">
                <ShieldCheck className="h-4 w-4 text-[#25D366]" />
                <span>Verified Official Host & Exclusive Concierge</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
                Agent Mohsin
              </h3>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-blue-200">
                <span className="font-mono font-bold text-emerald-400 text-base bg-[#061026] px-3 py-1 rounded-xl border border-emerald-500/30">
                  📞 0314 3292778
                </span>
                <span className="text-blue-400/40">•</span>
                <span className="text-blue-100 font-semibold">
                  DTS Reg #ISB-4921
                </span>
                <span className="text-blue-400/40">•</span>
                <span className="text-[#F7E5A9] font-bold">
                  ⭐ 5.0 Host Rating (380+ Verified Bookings)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl pt-1 leading-relaxed">
                Directly manages keycard handover, 24/7 VIP check-in, Margalla Hills penthouse view access, and complimentary Prado airport transfers for your distinguished guests.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20want%20to%20book%20The%20Royal%20Emerald%202BR%20Apartment%20for%20my%20client."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-[#061026] px-6 py-4 text-xs sm:text-sm font-extrabold shadow-xl shadow-[#25D366]/35 transition-all hover:scale-105"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
              </svg>
              <span>WhatsApp Mohsin (0314 3292778)</span>
            </a>

            <a
              href="tel:03143292778"
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#E5C07B]/40 bg-[#061026] hover:bg-[#0E2458] hover:border-[#E5C07B] text-[#F7E5A9] px-5 py-3 text-xs font-bold transition-all"
            >
              <Phone className="h-4 w-4 text-[#E5C07B]" />
              <span>Call Direct: 0314 3292778</span>
            </a>
          </div>
        </div>
      </div>

      {/* Architectural Features Ribbon & Highlights */}
      <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-y border-[#E5C07B]/15 py-4 text-xs">
        <div className="flex items-center gap-2.5 text-blue-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5C07B]/15 text-[#F7E5A9]">
            <Maximize className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-blue-300/70">Total Space</div>
            <div className="font-bold text-white">3,200 sq ft (Dual Salons)</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-blue-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5C07B]/15 text-[#F7E5A9]">
            <Bed className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-blue-300/70">Master Bedding</div>
            <div className="font-bold text-white">2 King Suites + 2 Lounges</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-blue-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5C07B]/15 text-[#F7E5A9]">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-blue-300/70">Capacity</div>
            <div className="font-bold text-white">Up to 5 VIP Guests</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-blue-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-blue-300/70">Direct Concierge</div>
            <div className="font-bold text-emerald-400">Agent Mohsin (0314 3292778)</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Row: Instant Booking & WhatsApp */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-blue-100">
          <span className="font-bold text-[#F7E5A9]">Included with Booking:</span>
          <span className="rounded-lg bg-[#0E2458] px-2.5 py-1 text-[11px] border border-[#E5C07B]/20">
            • 4K Smart TVs in both Salons
          </span>
          <span className="rounded-lg bg-[#0E2458] px-2.5 py-1 text-[11px] border border-[#E5C07B]/20">
            • Dual Master Bathrooms & Gourmet Kitchen
          </span>
          <span className="rounded-lg bg-[#0E2458] px-2.5 py-1 text-[11px] border border-[#E5C07B]/20">
            • Prado Airport Transfer Option
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Direct WhatsApp Inquiry for This Apartment */}
          <a
            href={`https://wa.me/923143292778?text=${encodeURIComponent(`Hello Mohsin, I want to book The Royal Emerald 2BR Apartment in Islamabad for my client. Please share availability.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/50 px-4 py-3 text-xs font-bold text-emerald-300 hover:bg-[#25D366] hover:text-[#061026] transition-all shadow-md"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
            </svg>
            <span>Ask Mohsin on WhatsApp</span>
          </a>

          {/* Suite Spec Modal */}
          <button
            onClick={() => onSelectApartment(apartment)}
            className="flex items-center gap-2 rounded-2xl border border-[#E5C07B]/40 bg-[#0A1A40] px-4 py-3 text-xs font-bold text-[#F7E5A9] hover:bg-[#0E2458] hover:border-[#E5C07B] transition-all"
          >
            <Eye className="h-4 w-4 text-[#E5C07B]" />
            <span>Interactive Media Spec</span>
          </button>

          {/* Book Now Button */}
          <button
            onClick={() => onBookApartment(apartment)}
            className="gold-btn flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-bold shadow-xl shadow-[#E5C07B]/20"
          >
            <span>Book Apartment for Client</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
