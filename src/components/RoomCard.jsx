import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Maximize, 
  Users, 
  Bed, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Eye, 
  Crown,
  Play
} from 'lucide-react';

export default function RoomCard({ 
  room, 
  nights, 
  currency, 
  onSelectRoom, 
  onBookRoom 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  // Currency is strictly in Pakistani Rupees (PKR)
  const currencySymbol = 'Rs. ';
  const clientRatePerNight = room.clientRate;
  const agentCommissionPerNight = Math.round(room.clientRate * (room.agentCommissionPct / 100));
  const agentNetPerNight = clientRatePerNight - agentCommissionPerNight;

  const totalClientPrice = clientRatePerNight * nights;
  const totalAgentCommission = agentCommissionPerNight * nights;
  const totalAgentNet = totalClientPrice - totalAgentCommission;

  return (
    <div className="luxury-card-white group relative flex flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/35 shadow-lg shadow-black/5 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/15 transition-all duration-300 bg-white text-slate-800">
      {/* Top Image Showcase */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={room.images[currentImageIndex]}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25"></div>

        {/* Carousel Controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 border border-[#D4AF37]/40 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-[#D4AF37] hover:text-white hover:scale-110 transition-all shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 border border-[#D4AF37]/40 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-[#D4AF37] hover:text-white hover:scale-110 transition-all shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex
                      ? 'w-5 bg-[#D4AF37]'
                      : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Room Caption Tag */}
            {room.imageLabels && (
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-[#D4AF37]/40 max-w-[70%] truncate shadow-sm">
                {room.imageLabels[currentImageIndex]}
              </div>
            )}
          </>
        )}

        {/* Floating Category Pill in Light Gold */}
        <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-extrabold tracking-wider text-[#8C6207] backdrop-blur-md border border-[#D4AF37]/40 shadow-sm">
            {room.category}
          </span>
          {room.instantConfirmation && (
            <span className="hidden sm:flex items-center gap-1 rounded-full bg-emerald-50/95 px-2.5 py-1 text-[10px] font-bold text-emerald-700 backdrop-blur-md border border-emerald-300/60 shadow-sm">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Instant Confirm
            </span>
          )}
        </div>

        {/* Live Availability Pill & Video Badge */}
        <div className="absolute right-3.5 top-3.5 flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207] backdrop-blur-md border border-[#D4AF37]/40 shadow-sm">
            {room.availableRooms} {room.availableRooms === 1 ? 'Suite Left' : 'Suites Left'}
          </span>
          {room.videos && room.videos.length > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-red-600 to-rose-700 px-2.5 py-1 text-[10px] font-extrabold text-white backdrop-blur-md shadow-md">
              <Play className="h-2.5 w-2.5 fill-current" />
              {room.videos.length} Video Tours
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 bg-white">
        {/* Hotel & Rating Header */}
        <div className="mb-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-[#8C6207]" />
            <span className="font-semibold text-slate-700">{room.city}, {room.country}</span>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-[#FFF4D4] px-2 py-0.5 font-bold text-[#8C6207] border border-[#D4AF37]/35">
            <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span>{room.rating}</span>
            <span className="text-slate-500 font-normal">({room.reviewsCount})</span>
          </div>
        </div>

        {/* Hotel Brand Label in Light Gold */}
        <div className="text-[11px] uppercase tracking-widest text-[#8C6207] font-extrabold mb-1">
          {room.hotel}
        </div>

        {/* Suite Name in Serif Typography */}
        <h3 
          onClick={() => onSelectRoom(room)}
          className="font-serif text-2xl font-bold tracking-tight text-slate-900 transition-colors hover:text-[#8C6207] cursor-pointer line-clamp-1"
        >
          {room.name}
        </h3>

        {/* Architectural Specs Row */}
        <div className="my-3.5 grid grid-cols-3 gap-2 border-y border-[#D4AF37]/20 py-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5 text-[#8C6207]" />
            <span className="font-medium text-slate-800">{room.sizeSqFt} sq ft</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-[#8C6207]" />
            <span className="font-medium text-slate-800">Up to {room.maxAdults} Guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5 text-[#8C6207]" />
            <span className="truncate font-medium text-slate-800">{room.bedType.split('+')[0]}</span>
          </div>
        </div>

        {/* Perks Highlights */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((amenity, idx) => (
            <span 
              key={idx}
              className="rounded-lg bg-[#FAF9F5] px-2.5 py-1 text-[11px] text-slate-700 border border-[#D4AF37]/25 font-medium shadow-sm"
            >
              • {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <button
              onClick={() => onSelectRoom(room)}
              className="text-[11px] text-[#8C6207] hover:text-slate-950 hover:underline px-1 py-1 font-bold"
            >
              +{room.amenities.length - 3} more perks
            </button>
          )}
        </div>

        {/* B2B Agent Commission Matrix in White & Royal Gold */}
        <div className="mt-auto rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EC] to-[#F5EED9] p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2.5">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Client Quoted Rate
              </div>
              <div className="text-base font-extrabold text-slate-900">
                {currencySymbol}{clientRatePerNight.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ nt</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Wholesale Net Cost
              </div>
              <div className="text-sm font-semibold text-slate-700">
                {currencySymbol}{agentNetPerNight.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ nt</span>
              </div>
            </div>
          </div>

          {/* Commission Calculation & Stay Total */}
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF4D4] text-[#8C6207] border border-[#D4AF37]/30">
                <TrendingUp className="h-3 w-3" />
              </span>
              <div>
                <span className="text-xs font-extrabold text-[#8C6207]">
                  +{currencySymbol}{totalAgentCommission.toLocaleString()} Commission
                </span>
                <span className="ml-1 text-[10px] font-bold text-slate-600">
                  ({room.agentCommissionPct}%)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-600">
                {nights} {nights === 1 ? 'Nt' : 'Nts'}: <strong className="text-slate-950 font-bold">{currencySymbol}{totalClientPrice.toLocaleString()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onSelectRoom(room)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-[#D4AF37]/45 bg-white px-3 py-2.5 text-xs font-bold text-[#8C6207] transition-all hover:border-[#D4AF37] hover:bg-[#FFFDF7] shadow-sm"
          >
            <Eye className="h-3.5 w-3.5 text-[#8C6207]" />
            <span>Suite Spec</span>
          </button>

          <button
            onClick={() => onBookRoom(room)}
            className="gold-btn flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold shadow-md shadow-[#D4AF37]/20"
          >
            <span>Book for Client</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
