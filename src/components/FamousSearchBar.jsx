import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  ExternalLink,
  Share2,
  Terminal,
  Compass
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
  const [copiedLink, setCopiedLink] = useState(false);

  // Famous Search Keys / Popular Hotkeys
  const famousKeys = [
    { id: 'penthouse-50k', label: 'Trending Penthouse (50k)', icon: Flame, tag: '50k/day', category: 'penthouse', room: penthouseRoom },
    { id: 'single-8k', label: 'Single Bed Room (8k)', icon: Bed, tag: '8k/day', category: 'rates', room: singleBedRoom },
    { id: 'two-bed-15k', label: 'Two Bed Room (15k)', icon: Bed, tag: '15k/day', category: 'rates', room: twoBedRoom },
    { id: 'sky-terrace', label: 'Margalla Sky Terrace', icon: Mountain, tag: 'Mountain View', category: 'penthouse', room: penthouseRoom },
    { id: 'bbq-patio', label: 'BBQ Patio & Grill', icon: UtensilsCrossed, tag: 'Outdoor Dining', category: 'penthouse', room: penthouseRoom },
    { id: 'video-tours', label: '15 HD Video Tours', icon: Video, tag: 'Live Walkthrough', category: 'media', action: 'videos' },
    { id: 'agent-desk', label: 'Mohsin & Arsalan', icon: PhoneCall, tag: '24/7 VIP Desk', category: 'agents', action: 'agents' }
  ];

  // Google Search Console & Sitelinks URL parameter listener:
  // Detects ?search=... or ?q=... from search engine traffic
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('search') || params.get('q');
        if (q) {
          setSearchQuery(q);
          const matched = famousKeys.find(
            (k) => k.label.toLowerCase().includes(q.toLowerCase()) || k.id.toLowerCase().includes(q.toLowerCase())
          );
          if (matched) {
            setActiveKey(matched.id);
          }
        }
      }
    } catch {
      // Ignore if URLSearchParams is unavailable
    }
  }, []);

  const handleKeyClick = (key) => {
    setActiveKey(key.id);
    setSearchQuery(key.label);

    // Update URL query cleanly for shareability & search console indexing
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('search', key.id);
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}

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
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('search');
        url.searchParams.delete('q');
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
  };

  const handleCopySearchLink = () => {
    try {
      if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      }
    } catch {}
  };

  // Filter matching keys or rooms if typing
  const queryLower = searchQuery.toLowerCase().trim();
  const isMatchingPenthouse = queryLower.includes('pent') || queryLower.includes('50') || queryLower.includes('terrace') || queryLower.includes('bbq') || queryLower.includes('trend');
  const isMatchingSingle = queryLower.includes('single') || queryLower.includes('8') || queryLower.includes('1 bed') || queryLower.includes('one');
  const isMatchingTwoBed = queryLower.includes('two') || queryLower.includes('2') || queryLower.includes('15') || queryLower.includes('double');
  const isMatchingVideos = queryLower.includes('video') || queryLower.includes('tour') || queryLower.includes('walk') || queryLower.includes('15') || queryLower.includes('live');
  const isMatchingAgents = queryLower.includes('agent') || queryLower.includes('mohsin') || queryLower.includes('arsalan') || queryLower.includes('whatsapp') || queryLower.includes('contact');

  return (
    <div id="famous-search-console" className="relative z-20 mb-8 rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-r from-white via-[#FFFDF8] to-[#FAF6ED] p-4 sm:p-6 shadow-xl shadow-[#D4AF37]/15 backdrop-blur-md">
      {/* Search Console Header */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF4D4] via-[#F5E6B8] to-[#E5C07B] text-[#8C6207] shadow-sm border border-[#D4AF37]/45">
            <Terminal className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Famous Search Console
              </h2>
              <span className="rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 shadow-xs">
                Live SEO Engine
              </span>
              <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 border border-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                GSC Sitelinks Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Instant keyword filter across fixed rates (Single 8k • Two Bed 15k • Penthouse 50k), Margalla Sky Terrace & 15 HD Tours
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={handleCopySearchLink}
              className="flex items-center gap-1 text-[11px] font-bold text-[#8C6207] bg-white px-2.5 py-1 rounded-xl border border-[#D4AF37]/35 hover:bg-[#FAF6EA] transition-all shadow-xs"
              title="Copy shareable Search URL"
            >
              <Share2 className="h-3 w-3" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Query'}</span>
            </button>
          )}
          <div className="text-[11px] font-bold text-[#8C6207] bg-[#FFF8E6] px-2.5 py-1 rounded-xl border border-[#D4AF37]/35 shadow-xs flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-[#8C6207]" />
            <span>Search Console</span>
          </div>
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
          placeholder="Search Famous Stay: 8k Single Bed, 15k Two Bed, 50k Penthouse, Sky Terrace, BBQ, 15 Videos..."
          className="w-full rounded-2xl border-2 border-[#D4AF37]/45 bg-white py-3.5 pl-12 pr-12 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#D4AF37] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20 shadow-inner transition-all"
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
        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
          <span>Click Famous Key to Auto-Filter:</span>
          <span className="text-[9px] font-mono text-[#8C6207]">7 Hotkeys Ready</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {famousKeys.map((key) => {
            const Icon = key.icon;
            const isSelected = activeKey === key.id;
            return (
              <button
                key={key.id}
                onClick={() => handleKeyClick(key)}
                className={`group flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-xs ${
                  isSelected
                    ? 'bg-[#8C6207] text-white ring-2 ring-[#8C6207]/40 scale-105 shadow-sm'
                    : 'bg-white hover:bg-[#FFFDF7] text-slate-800 border border-[#D4AF37]/40 hover:border-[#D4AF37]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-[#F5E6B8]' : 'text-[#8C6207]'}`} />
                <span>{key.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-black/25 text-white' : 'bg-[#FAF6EA] text-[#8C6207] border border-[#D4AF37]/30'
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
              Matches found for <strong className="text-slate-900 font-bold">"{searchQuery}"</strong>:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isMatchingPenthouse && penthouseRoom && (
              <button
                onClick={() => onBookRoom && onBookRoom(penthouseRoom)}
                className="gold-btn flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-xs"
              >
                <span>Book Luxury Penthouse (Rs. 50k)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {isMatchingSingle && singleBedRoom && (
              <button
                onClick={() => onBookRoom && onBookRoom(singleBedRoom)}
                className="gold-btn flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-xs"
              >
                <span>Book Single Bed Room (Rs. 8k)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {isMatchingTwoBed && twoBedRoom && (
              <button
                onClick={() => onBookRoom && onBookRoom(twoBedRoom)}
                className="gold-btn flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-xs"
              >
                <span>Book Two Bed Room (Rs. 15k)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {isMatchingVideos && (
              <button
                onClick={() => {
                  const el = document.getElementById('primary-cinema-player') || document.getElementById('apartment-video-showroom');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 text-white px-3 py-1.5 text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
              >
                <Video className="h-3.5 w-3.5 text-[#E5C07B]" />
                <span>Jump to 15 Video Tours</span>
              </button>
            )}

            {isMatchingAgents && (
              <button
                onClick={() => {
                  const el = document.getElementById('agent-concierge-desk');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-700 text-white px-3 py-1.5 text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Agent WhatsApp Desk</span>
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
