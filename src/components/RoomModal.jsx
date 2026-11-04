import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Maximize, 
  Users, 
  Bed, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Clock, 
  Award, 
  ArrowRight,
  TrendingUp,
  Share2,
  Calendar,
  Play,
  Camera,
  Film,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function RoomModal({ 
  room, 
  nights, 
  currency, 
  onClose, 
  onBookNow 
}) {
  const [viewMode, setViewMode] = useState(room?.videos?.length > 0 ? 'videos' : 'photos');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  if (!room) return null;

  // Currency is strictly in Pakistani Rupees (PKR)
  const currencySymbol = 'Rs. ';
  const clientRatePerNight = room.clientRate;
  const agentCommissionPerNight = Math.round(room.clientRate * (room.agentCommissionPct / 100));
  const agentNetPerNight = clientRatePerNight - agentCommissionPerNight;

  const totalClientPrice = clientRatePerNight * nights;
  const totalAgentCommission = agentCommissionPerNight * nights;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-[#D4AF37]/45 bg-white text-slate-800 shadow-2xl shadow-[#D4AF37]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur-md border border-[#D4AF37]/40 transition-colors hover:text-white hover:bg-[#D4AF37] shadow-sm"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Media Header / Switcher when videos are available */}
          {room.videos && room.videos.length > 0 && (
            <div className="bg-gradient-to-r from-[#FFFDF8] via-white to-[#FAF6EC] px-6 py-3 border-b border-[#D4AF37]/25 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('photos')}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    viewMode === 'photos'
                      ? 'gold-btn text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
                  }`}
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>5 Real Photos</span>
                </button>

                <button
                  onClick={() => setViewMode('videos')}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    viewMode === 'videos'
                      ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md'
                      : 'text-rose-700 hover:text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{room.videos?.length || 10} Video Tours</span>
                </button>
              </div>

              <span className="text-[11px] text-emerald-700 font-bold hidden sm:inline">
                Direct Managed by Agent Mohsin (0314 3292778)
              </span>
            </div>
          )}

          {/* VIEW MODE 1: PHOTOS */}
          {viewMode === 'photos' && (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black sm:aspect-[21/9]">
              <img
                src={room.images[selectedPhotoIndex]}
                alt={room.name}
                className="h-full w-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

              {/* Thumbnail Navigation Strip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-black/70 backdrop-blur-md p-2 rounded-2xl border border-white/15">
                <div className="flex gap-2 overflow-x-auto pb-0.5">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative h-12 w-16 sm:h-14 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                        idx === selectedPhotoIndex
                          ? 'border-[#D4AF37] scale-105 shadow-lg shadow-[#D4AF37]/40 ring-1 ring-[#D4AF37]'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Photo Caption Pill */}
                <div className="hidden sm:block text-right pr-2">
                  <div className="text-[10px] uppercase font-bold text-[#F7E5A9] tracking-wider">
                    Photo {selectedPhotoIndex + 1} of {room.images.length}
                  </div>
                  <div className="text-xs font-bold text-white max-w-[200px] truncate">
                    {room.imageLabels ? room.imageLabels[selectedPhotoIndex] : `View ${selectedPhotoIndex + 1}`}
                  </div>
                </div>
              </div>

              {/* Inclusions Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {room.isExclusiveFlagship ? (
                  <span className="rounded-full bg-gradient-to-r from-[#FFF5D0] via-[#D4AF37] to-[#B8860B] px-3.5 py-1 text-xs font-extrabold text-slate-950 shadow-lg flex items-center gap-1.5 border border-white">
                    <Award className="h-3.5 w-3.5" />
                    Famous Stay Flagship Residence
                  </span>
                ) : (
                  <span className="rounded-full bg-white/95 px-3.5 py-1 text-xs font-extrabold text-[#8C6207] border border-[#D4AF37]/50 shadow-lg">
                    {room.category}
                  </span>
                )}
                <span className="flex items-center gap-1 rounded-full bg-emerald-50/95 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-300/60 shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  100% Real Verified Photos
                </span>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: VIDEOS */}
          {viewMode === 'videos' && room.videos && (
            <div className="relative aspect-[16/9] w-full bg-black sm:aspect-[21/9] flex flex-col justify-between">
              <video
                key={room.videos[selectedVideoIndex].url}
                src={room.videos[selectedVideoIndex].url}
                poster={room.videos[selectedVideoIndex].thumbnail}
                controls
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-contain"
              />

              {/* Floating Sound Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold backdrop-blur-md border shadow-lg transition-all ${
                  isMuted 
                    ? 'bg-white/95 text-[#8C6207] border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-white' 
                    : 'bg-emerald-600 text-white border-emerald-400'
                }`}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-rose-500" />
                    <span>🔊 Tap for Sound</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-white animate-bounce" />
                    <span>Sound On</span>
                  </>
                )}
              </button>

              {/* Video Playlist Selector Strip */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3 bg-black/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 z-10">
                <div className="flex gap-2 overflow-x-auto pb-0.5">
                  {room.videos.map((vid, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVideoIndex(idx)}
                      className={`relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                        idx === selectedVideoIndex
                          ? 'border-[#D4AF37] scale-105 shadow-lg shadow-[#D4AF37]/40 ring-1 ring-[#D4AF37]'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={vid.thumbnail} alt={vid.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="h-3.5 w-3.5 text-white fill-current" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="hidden sm:block text-right pr-2">
                  <div className="text-[10px] uppercase font-bold text-[#F7E5A9] tracking-wider">
                    Tour {selectedVideoIndex + 1} of {room.videos.length}
                  </div>
                  <div className="text-xs font-bold text-white max-w-[220px] truncate">
                    {room.videos[selectedVideoIndex].title}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details Section */}
          <div className="p-6 sm:p-8 bg-white">
            {/* Header Info */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D4AF37]/25 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6207]">
                  <span>{room.hotel}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{room.city}, {room.country}</span>
                  </div>
                </div>
                <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {room.name}
                </h2>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1 text-[#8C6207] font-bold">
                    <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{room.rating}</span>
                    <span className="font-normal text-slate-500">({room.reviewsCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>View: <strong className="text-slate-800">{room.view}</strong></span>
                  <span>•</span>
                  <span>Floor: <strong className="text-slate-800">{room.floor}</strong></span>
                </div>
              </div>

              {/* Live Agent Commission Highlight Card */}
              <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#FFFDF8] to-[#FFF4D4] p-4 text-right shadow-sm">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#8C6207]">
                  Agent Commission ({room.agentCommissionPct}%)
                </div>
                <div className="text-2xl font-extrabold text-[#8C6207]">
                  +{currencySymbol}{totalAgentCommission.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-600">
                  For {nights} {nights === 1 ? 'night' : 'nights'} stay
                </div>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="my-6 grid grid-cols-2 gap-4 rounded-2xl border border-[#D4AF37]/25 bg-[#FAF7EE] p-5 sm:grid-cols-4 text-xs">
              <div>
                <span className="text-slate-500">Dimensions:</span>
                <div className="mt-1 flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <Maximize className="h-4 w-4 text-[#8C6207]" />
                  <span>{room.sizeSqM} m² / {room.sizeSqFt} sq ft</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500">Occupancy:</span>
                <div className="mt-1 flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <Users className="h-4 w-4 text-[#8C6207]" />
                  <span>Max {room.maxAdults} Adults, {room.maxChildren} Child</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500">Bedding:</span>
                <div className="mt-1 flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <Bed className="h-4 w-4 text-[#8C6207]" />
                  <span className="truncate">{room.bedType}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500">Check-in / Out:</span>
                <div className="mt-1 flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <Clock className="h-4 w-4 text-[#8C6207]" />
                  <span>15:00 / 12:00</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6207]">
                Suite Overview & Architectural Highlights
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {room.description}
              </p>
            </div>

            {/* Inclusions & VIP Amenities */}
            <div className="mb-6">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#8C6207]">
                VIP Amenities & Inclusions (Guaranteed for Your Clients):
              </h4>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {room.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-[#D4AF37]/25 bg-[#FAF9F5] p-3 text-xs shadow-sm">
                    <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF4D4] text-[#8C6207] border border-[#D4AF37]/30">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Pitching Points */}
            <div className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#FFFDF8] to-[#FAF5E6] p-4 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-[#8C6207]">
                <Award className="h-4 w-4 text-[#8C6207]" />
                <span>Agent Sales Tip for this Suite:</span>
              </div>
              <p className="mt-1.5 text-slate-600 leading-normal">
                High client retention score (98%). Recommended for high-net-worth honeymooners, executive privacy retreats, or VIP leisure travelers seeking guaranteed butler attention and fast-track airport arrangements.
              </p>
            </div>

            {/* Bottom Booking Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/25 pt-6">
              <div>
                <div className="text-xs text-slate-500">
                  Total for {nights} {nights === 1 ? 'Night' : 'Nights'}:
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold text-slate-950">
                    {currencySymbol}{totalClientPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#8C6207] font-bold">
                    (+{currencySymbol}{totalAgentCommission.toLocaleString()} Net Profit)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href={`https://wa.me/923143292778?text=${encodeURIComponent(`Hello Mohsin, I am inquiring about booking ${room.name} at ${room.hotel} for ${nights} nights.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 px-3.5 py-2.5 text-xs font-bold text-emerald-800 hover:bg-[#25D366] hover:text-slate-950 transition-all shadow-sm"
                  title="Ask Mohsin on WhatsApp"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                  </svg>
                  <span>WhatsApp Mohsin</span>
                </a>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onBookNow(room);
                  }}
                  className="gold-btn flex items-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 text-xs font-bold shadow-md shadow-[#D4AF37]/20"
                >
                  <span>Proceed to Book</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
