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
    <div className={`luxury-card group relative flex flex-col overflow-hidden rounded-3xl border transition-all ${
      room.isExclusiveFlagship 
        ? 'border-2 border-[#E5C07B] shadow-2xl shadow-[#E5C07B]/20 ring-1 ring-[#E5C07B]/40' 
        : 'border-[#E5C07B]/25'
    } bg-[#081432]`}>
      {/* Top Image Showcase */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#040914]">
        <img
          src={room.images[currentImageIndex]}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081432] via-transparent to-black/35"></div>

        {/* Carousel Controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#061026]/80 text-[#F7E5A9] border border-[#E5C07B]/30 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-[#061026] hover:scale-110 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#061026]/80 text-[#F7E5A9] border border-[#E5C07B]/30 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-[#061026] hover:scale-110 transition-all"
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
                      ? 'w-5 bg-[#E5C07B]'
                      : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Room Caption Tag */}
            {room.imageLabels && (
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-[#F7E5A9] border border-[#E5C07B]/30 max-w-[70%] truncate shadow-sm">
                {room.imageLabels[currentImageIndex]}
              </div>
            )}
          </>
        )}

        {/* Floating Category Pill in Light Gold */}
        <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
          {room.isExclusiveFlagship ? (
            <span className="rounded-full bg-gradient-to-r from-[#FFF5D0] via-[#E5C07B] to-[#C49824] px-3 py-1 text-[11px] font-extrabold tracking-wider text-[#061026] shadow-lg flex items-center gap-1">
              <Crown className="h-3 w-3" />
              Flagship Apartment
            </span>
          ) : (
            <span className="rounded-full bg-[#061026]/90 px-3 py-1 text-[11px] font-extrabold tracking-wider text-[#F7E5A9] backdrop-blur-md border border-[#E5C07B]/40 shadow-lg">
              {room.category}
            </span>
          )}
          {room.instantConfirmation && (
            <span className="hidden sm:flex items-center gap-1 rounded-full bg-[#0A2647]/90 px-2.5 py-1 text-[10px] font-bold text-[#60A5FA] backdrop-blur-md border border-[#3B82F6]/40">
              <CheckCircle2 className="h-3 w-3 text-[#60A5FA]" />
              Instant Confirm
            </span>
          )}
        </div>

        {/* Live Availability Pill & Video Badge */}
        <div className="absolute right-3.5 top-3.5 flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-[#07173D]/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#F7E5A9] backdrop-blur-md border border-[#E5C07B]/40 shadow-md">
            {room.availableRooms} {room.availableRooms === 1 ? 'Suite Left' : 'Suites Left'}
          </span>
          {room.videos && room.videos.length > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-red-600 to-rose-700 px-2.5 py-1 text-[10px] font-extrabold text-white backdrop-blur-md shadow-md animate-pulse">
              <Play className="h-2.5 w-2.5 fill-current" />
              5 Video Tours
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Hotel & Rating Header */}
        <div className="mb-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-blue-200">
            <MapPin className="h-3.5 w-3.5 text-[#E5C07B]" />
            <span className="font-medium text-blue-100">{room.city}, {room.country}</span>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-[#E5C07B]/15 px-2 py-0.5 font-bold text-[#F7E5A9] border border-[#E5C07B]/30">
            <Star className="h-3.5 w-3.5 fill-[#E5C07B] text-[#E5C07B]" />
            <span>{room.rating}</span>
            <span className="text-blue-300/70 font-normal">({room.reviewsCount})</span>
          </div>
        </div>

        {/* Hotel Brand Label in Light Gold */}
        <div className="text-[11px] uppercase tracking-widest text-[#E5C07B] font-extrabold mb-1">
          {room.hotel}
        </div>

        {/* Suite Name in Serif Typography */}
        <h3 
          onClick={() => onSelectRoom(room)}
          className="font-serif text-2xl font-bold tracking-tight text-white transition-colors hover:text-[#F7E5A9] cursor-pointer line-clamp-1"
        >
          {room.name}
        </h3>

        {/* Architectural Specs Row */}
        <div className="my-3.5 grid grid-cols-3 gap-2 border-y border-[#E5C07B]/15 py-2.5 text-xs text-blue-200/80">
          <div className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5 text-[#E5C07B]" />
            <span className="font-medium">{room.sizeSqFt} sq ft</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-[#E5C07B]" />
            <span className="font-medium">Up to {room.maxAdults} Guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5 text-[#E5C07B]" />
            <span className="truncate font-medium">{room.bedType.split('+')[0]}</span>
          </div>
        </div>

        {/* Perks Highlights */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((amenity, idx) => (
            <span 
              key={idx}
              className="rounded-lg bg-[#0B1E48]/70 px-2.5 py-1 text-[11px] text-blue-100 border border-[#E5C07B]/15 font-medium"
            >
              • {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <button
              onClick={() => onSelectRoom(room)}
              className="text-[11px] text-[#F7E5A9] hover:text-white hover:underline px-1 py-1 font-semibold"
            >
              +{room.amenities.length - 3} more perks
            </button>
          )}
        </div>

        {/* B2B Agent Commission Matrix in Sapphire & Light Gold */}
        <div className="mt-auto rounded-2xl border border-[#E5C07B]/30 bg-gradient-to-br from-[#07132E] via-[#0B1B40] to-[#0E2458] p-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-[#E5C07B]/15 pb-2.5">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-blue-200/80">
                Client Quoted Rate
              </div>
              <div className="text-base font-bold text-white">
                {currencySymbol}{clientRatePerNight.toLocaleString()} <span className="text-xs font-normal text-blue-200/70">/ nt</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-blue-200/80">
                Wholesale Net Cost
              </div>
              <div className="text-sm font-semibold text-blue-100">
                {currencySymbol}{agentNetPerNight.toLocaleString()} <span className="text-xs font-normal text-blue-200/70">/ nt</span>
              </div>
            </div>
          </div>

          {/* Commission Calculation & Stay Total */}
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5C07B]/20 text-[#F7E5A9]">
                <TrendingUp className="h-3 w-3" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#F7E5A9]">
                  +{currencySymbol}{totalAgentCommission.toLocaleString()} Commission
                </span>
                <span className="ml-1 text-[10px] font-bold text-[#E5C07B]/90">
                  ({room.agentCommissionPct}%)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-blue-200">
                {nights} {nights === 1 ? 'Nt' : 'Nts'}: <strong className="text-white font-bold">{currencySymbol}{totalClientPrice.toLocaleString()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onSelectRoom(room)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E5C07B]/30 bg-[#091738] px-3 py-2.5 text-xs font-bold text-blue-100 transition-colors hover:border-[#E5C07B]/70 hover:bg-[#0D2252]"
          >
            <Eye className="h-3.5 w-3.5 text-[#E5C07B]" />
            <span>Suite Spec</span>
          </button>

          <button
            onClick={() => onBookRoom(room)}
            className="gold-btn flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold"
          >
            <span>Book for Client</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
