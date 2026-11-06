import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  Flame, 
  Bed, 
  Crown, 
  Mountain, 
  UtensilsCrossed, 
  Video, 
  PhoneCall, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export default function FamousSearchBar({
  onSelectRoom,
  onBookRoom,
  singleBedRoom,
  twoBedRoom,
  penthouseRoom
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  // Famous Search Keys / Popular Hotkeys
  const famousKeys = [
    { id: 'penthouse-50k', label: 'Trending Penthouse (50k)', icon: Flame, tag: '50k/day', room: penthouseRoom },
    { id: 'single-8k', label: 'Single Bed Room (8k)', icon: Bed, tag: '8k/day', room: singleBedRoom },
    { id: 'two-bed-15k', label: 'Two Bed Room (15k)', icon: Bed, tag: '15k/day', room: twoBedRoom },
    { id: 'sky-terrace', label: 'Margalla Sky Terrace', icon: Mountain, tag: 'Mountain View', room: penthouseRoom },
    { id: 'bbq-patio', label: 'BBQ Patio & Grill', icon: UtensilsCrossed, tag: 'Outdoor Dining', room: penthouseRoom },
    { id: 'video-tours', label: '15 HD Video Tours', icon: Video, tag: 'Live Walkthrough', action: 'videos' },
    { id: 'agent-desk', label: 'Mohsin & Arsalan', icon: PhoneCall, tag: '24/7 VIP Desk', action: 'agents' }
  ];

  const handleKeyClick = (key) => {
    setActiveKey(key.id);
    setSearchQuery(key.label);

    if (key.action === 'videos') {
      const el = document.getElementById('primary-cinema-player') || document.getElementById('apartment-video-showroom');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (key.action === 'agents') {
      const el = document.getElementById('agent-concierge-desk');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (key.room && onSelectRoom) {
      onSelectRoom(key.room);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setActiveKey(null);
  };

  // Filter matching keys or rooms if typing
  const queryLower = searchQuery.toLowerCase().trim();
  const isMatchingPenthouse = queryLower.includes('pent') || queryLower.includes('50') || queryLower.includes('terrace') || queryLower.includes('bbq') || queryLower.includes('trend');
  const isMatchingSingle = queryLower.includes('single') || queryLower.includes('8') || queryLower.includes('1 bed') || queryLower.includes('one');
  const isMatchingTwoBed = queryLower.includes('two') || queryLower.includes('2') || queryLower.includes('15') || queryLower.includes('double');

  return (
    <div className="relative z-20 mb-8 rounded-3xl border-2 border-[#D4AF37]/45 bg-gradient-to-r from-white via-[#FFFDF8] to-[#FAF6ED] p-4 sm:p-6 shadow-xl shadow-[#D4AF37]/10 backdrop-blur-md">
      {/* Header Label */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF4D4] to-[#E5C07B] text-[#8C6207] shadow-sm border border-[#D4AF37]/40">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Famous Search Key</span>
              <span className="hidden sm:inline-block rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 shadow-sm">
                Top Trending SEO Engine
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Instant search across fixed rate tiers (8k, 15k, 50k), Margalla Sky Terrace, and 15 video walkthroughs
            </p>
          </div>
        </div>

        <div className="text-[11px] font-bold text-[#8C6207] bg-white px-2.5 py-1 rounded-xl border border-[#D4AF37]/30 shadow-sm">
          🔍 Famous Key Search Filter
        </div>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#8C6207]">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Famous Key: 8k Single Bed, 15k Two Bed, 50k Penthouse, Sky Terrace, BBQ..."
          className="w-full rounded-2xl border-2 border-[#D4AF37]/40 bg-white py-3.5 pl-12 pr-12 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#D4AF37] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20 shadow-inner transition-all"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-700 transition-colors"
            title="Clear Search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Famous Search Key Quick Hotlinks */}
      <div className="mt-3.5">
        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <span>Famous Search Keys (Click to Filter):</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {famousKeys.map((key) => {
            const Icon = key.icon;
            const isSelected = activeKey === key.id;
            return (
              <button
                key={key.id}
                onClick={() => handleKeyClick(key)}
                className={`group flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
                  isSelected
                    ? 'bg-[#8C6207] text-white ring-2 ring-[#8C6207]/40 scale-105'
                    : 'bg-white hover:bg-[#FFFDF7] text-slate-800 border border-[#D4AF37]/40 hover:border-[#D4AF37]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-[#F5E6B8]' : 'text-[#8C6207]'}`} />
                <span>{key.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-[#FAF6EA] text-[#8C6207] border border-[#D4AF37]/30'
                }`}>
                  {key.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Match Notification when Searching */}
      {searchQuery && (
        <div className="mt-4 pt-3.5 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-700">
              Famous Search results for <strong className="text-slate-900 font-bold">"{searchQuery}"</strong>:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isMatchingPenthouse && penthouseRoom && (
              <button
                onClick={() => onBookRoom && onBookRoom(penthouseRoom)}
                className="gold-btn flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold"
              >
                <span>Book Luxury Penthouse (Rs. 50k)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {isMatchingSingle && singleBedRoom && (
              <button
                onClick={() => onBookRoom && onBookRoom(singleBedRoom)}
                className="gold-btn flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold"
              >
                <span>Book Single Bed Room (Rs. 8k)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {isMatchingTwoBed && twoBedRoom && (
              <button
                onClick={() => onBookRoom && onBookRoom(twoBedRoom)}
                className="gold-btn flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold"
              >
                <span>Book Two Bed Room (Rs. 15k)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              onClick={handleClear}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold ml-1"
            >
              Reset Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
