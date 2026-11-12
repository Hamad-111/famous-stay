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
  Compass,
  Building2,
  Trees,
  Waves,
  MapPin,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function FamousSearchBar({
  onSelectRoom,
  onBookRoom,
  singleBedRoom,
  twoBedRoom,
  penthouseRoom,
  farmhouseRoom,
  famousHotelRoom
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKey, setActiveKey] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Famous Search Keys / Popular Hotkeys
  const famousKeys = [
    { 
      id: 'famous-hotels', 
      label: 'Islamabad Famous Hotels', 
      icon: Building2, 
      tag: 'Serena & Marriott Tier', 
      category: 'hotels', 
      room: famousHotelRoom || twoBedRoom,
      desc: '5-star suites rivaling Serena & Marriott at fixed partner rates'
    },
    { 
      id: 'luxury-farmhouse', 
      label: 'Luxury Farmhouse (Pool & BBQ)', 
      icon: Trees, 
      tag: 'Chak Shahzad & Bani Gala', 
      category: 'farmhouse', 
      room: farmhouseRoom,
      desc: 'Private swimming pool, 2-acre lawn & BBQ party estate'
    },
    { 
      id: 'penthouse-50k', 
      label: 'Trending Penthouse (50k)', 
      icon: Flame, 
      tag: 'Margalla Sky Terrace', 
      category: 'penthouse', 
      room: penthouseRoom,
      desc: 'Private rooftop terrace, BBQ patio & 85" media wall'
    },
    { 
      id: 'single-8k', 
      label: 'Single Bed Room (8k)', 
      icon: Bed, 
      tag: '8k/day', 
      category: 'rates', 
      room: singleBedRoom,
      desc: 'Plush king bed, fiber Wi-Fi & rain shower'
    },
    { 
      id: 'two-bed-15k', 
      label: 'Two Bed Room (15k)', 
      icon: Bed, 
      tag: '15k/day', 
      category: 'rates', 
      room: twoBedRoom,
      desc: '2 master king bedrooms, dual marble baths & central lounge'
    },
    { 
      id: 'video-tours', 
      label: '15 HD Video Tours', 
      icon: Video, 
      tag: 'Live Walkthrough', 
      category: 'media', 
      action: 'videos',
      desc: 'Cinema player with interactive room jump chips'
    },
    { 
      id: 'agent-desk', 
      label: 'Usman & Arsalan', 
      icon: PhoneCall, 
      tag: '24/7 VIP Desk', 
      category: 'agents', 
      action: 'agents',
      desc: 'Direct WhatsApp booking with authorized hosts'
    }
  ];

  // Google Search Console & Sitelinks URL parameter listener:
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
            setActiveCategory(matched.category || 'all');
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

  // Filter matching categories or hotkeys
  const filteredKeys = activeCategory === 'all' 
    ? famousKeys 
    : famousKeys.filter(k => k.category === activeCategory || (activeCategory === 'rates' && k.category === 'rates'));

  // Query analysis for live intent detection with multiple search keywords
  const queryLower = searchQuery.toLowerCase().trim();
  const isMatchingHotels = queryLower.includes('hotel') || queryLower.includes('serena') || queryLower.includes('marriott') || queryLower.includes('centaurus') || queryLower.includes('ramada') || queryLower.includes('top') || queryLower.includes('best') || queryLower.includes('f-6') || queryLower.includes('f-7') || queryLower.includes('blue area');
  const isMatchingFarmhouse = queryLower.includes('farm') || queryLower.includes('pool') || queryLower.includes('swimming') || queryLower.includes('lawn') || queryLower.includes('chak') || queryLower.includes('shahzad') || queryLower.includes('bani gala') || queryLower.includes('simly') || queryLower.includes('estate');
  const isMatchingPenthouse = queryLower.includes('pent') || queryLower.includes('50') || queryLower.includes('terrace') || queryLower.includes('bbq') || queryLower.includes('trend') || queryLower.includes('sky') || queryLower.includes('view');
  const isMatchingSingle = queryLower.includes('single') || queryLower.includes('8') || queryLower.includes('8k') || queryLower.includes('1 bed') || queryLower.includes('one');
  const isMatchingTwoBed = queryLower.includes('two') || queryLower.includes('2') || queryLower.includes('15') || queryLower.includes('15k') || queryLower.includes('double');
  const isMatchingVideos = queryLower.includes('video') || queryLower.includes('tour') || queryLower.includes('walk') || queryLower.includes('15') || queryLower.includes('live') || queryLower.includes('cinema');
  const isMatchingAgents = queryLower.includes('agent') || queryLower.includes('usman') || queryLower.includes('arsalan') || queryLower.includes('whatsapp') || queryLower.includes('contact') || queryLower.includes('call') || queryLower.includes('number');

  return (
    <div id="famous-search-console" className="relative z-20 mb-8 rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-r from-white via-[#FFFDF8] to-[#FAF6ED] p-4 sm:p-6 shadow-xl shadow-[#D4AF37]/15 backdrop-blur-md">
      {/* Search Console Header */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF4D4] via-[#F5E6B8] to-[#E5C07B] text-[#8C6207] shadow-sm border border-[#D4AF37]/45">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Famous Search Console
              </h2>
              <span className="rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 shadow-xs">
                Islamabad Hotspots
              </span>
              <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 border border-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Hotels • Farmhouse • Penthouse
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Targeted search engine for Islamabad Famous Hotels, Chak Shahzad Farmhouses with Pool & Trending Margalla Penthouses
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
              <span>{copiedLink ? 'Link Copied!' : 'Share Search'}</span>
            </button>
          )}
          <div className="text-[11px] font-bold text-[#8C6207] bg-[#FFF8E6] px-2.5 py-1 rounded-xl border border-[#D4AF37]/35 shadow-xs flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#8C6207]" />
            <span>SEO Key Engine</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (Hotels • Farmhouse • Penthouse • Rates) */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs font-bold">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-xl px-3 py-1 transition-all ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
          }`}
        >
          🌟 All Keys
        </button>

        <button
          onClick={() => {
            setActiveCategory('hotels');
            setSearchQuery('Islamabad Famous Hotels');
            setActiveKey('famous-hotels');
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1 transition-all ${
            activeCategory === 'hotels'
              ? 'bg-[#8C6207] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:text-[#8C6207] border border-[#D4AF37]/40'
          }`}
        >
          <Building2 className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>Famous Hotels</span>
        </button>

        <button
          onClick={() => {
            setActiveCategory('farmhouse');
            setSearchQuery('Luxury Farmhouse with Pool');
            setActiveKey('luxury-farmhouse');
            if (farmhouseRoom && onSelectRoom) onSelectRoom(farmhouseRoom);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1 transition-all ${
            activeCategory === 'farmhouse'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:text-emerald-800 border border-emerald-300'
          }`}
        >
          <Trees className="h-3.5 w-3.5 text-emerald-600" />
          <span>Luxury Farmhouse</span>
        </button>

        <button
          onClick={() => {
            setActiveCategory('penthouse');
            setSearchQuery('Trending Penthouse 50k');
            setActiveKey('penthouse-50k');
            if (penthouseRoom && onSelectRoom) onSelectRoom(penthouseRoom);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1 transition-all ${
            activeCategory === 'penthouse'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:text-rose-700 border border-rose-300'
          }`}
        >
          <Crown className="h-3.5 w-3.5 text-rose-600" />
          <span>Trending Penthouse</span>
        </button>

        <button
          onClick={() => setActiveCategory('rates')}
          className={`rounded-xl px-3 py-1 transition-all ${
            activeCategory === 'rates'
              ? 'bg-[#D4AF37] text-slate-950 font-extrabold shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
          }`}
        >
          Fixed Rates (8k / 15k / 50k)
        </button>
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
          placeholder="Search: Islamabad Famous Hotels, Farmhouse with Pool, 50k Penthouse, Serena alternative, Single 8k, Two Bed 15k..."
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
          <span>Famous Search Keys (Click to Filter):</span>
          <span className="text-[9px] font-mono text-[#8C6207]">{filteredKeys.length} Keys Filtered</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filteredKeys.map((key) => {
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

      {/* Live Match Notification & Instant Action Cards */}
      {searchQuery && (
        <div className="mt-4 pt-3.5 border-t border-[#D4AF37]/25 flex flex-col gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-700">
                Matches for <strong className="text-slate-900 font-bold">"{searchQuery}"</strong>:
              </span>
            </div>
            <button
              onClick={handleClear}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold"
            >
              Reset Filter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {/* 1. Islamabad Famous Hotels Match */}
            {isMatchingHotels && (
              <div className="rounded-xl border border-[#D4AF37]/40 bg-white p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="inline-flex items-center gap-1 rounded bg-[#FFF4D4] px-2 py-0.5 text-[10px] font-extrabold text-[#8C6207]">
                      <Building2 className="h-3 w-3" /> Famous Hotel Suite
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-700">Rs. 15k / day</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-xs">
                    Islamabad Famous 5-Star Partner Suite
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    Serena & Marriott tier luxury in F-6/F-7 Blue Area with marble baths and 24/7 room service.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">18% Agent Margin</span>
                  <button
                    onClick={() => onBookRoom && onBookRoom(famousHotelRoom || twoBedRoom)}
                    className="gold-btn rounded-lg px-2.5 py-1 text-[11px] font-bold"
                  >
                    Book Hotel 15k
                  </button>
                </div>
              </div>
            )}

            {/* 2. Luxury Farmhouse Match */}
            {isMatchingFarmhouse && (
              <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-200/80 px-2 py-0.5 text-[10px] font-extrabold text-emerald-900">
                      <Trees className="h-3 w-3" /> Private Pool Farmhouse
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-800">Chak Shahzad</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-xs">
                    Margalla Luxury Pool Farmhouse & Estate
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    Private swimming pool, 2-acre party lawn, 4 king bedrooms, BBQ pit & 24/7 generator backup.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                  <a
                    href="https://wa.me/923480964370?text=Hello%20Usman%2C%20I%20am%20inquiring%20about%20booking%20the%20Luxury%20Farmhouse%20with%20Swimming%20Pool%20in%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-1"
                  >
                    <span>WhatsApp Inquiry</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() => onBookRoom && onBookRoom(farmhouseRoom)}
                    className="bg-emerald-800 text-white rounded-lg px-2.5 py-1 text-[11px] font-bold hover:bg-emerald-900 transition-colors"
                  >
                    Book Farmhouse
                  </button>
                </div>
              </div>
            )}

            {/* 3. Trending Penthouse Match */}
            {isMatchingPenthouse && penthouseRoom && (
              <div className="rounded-xl border-2 border-[#D4AF37] bg-white p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="inline-flex items-center gap-1 rounded bg-rose-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                      🔥 #1 Penthouse
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#8C6207]">Rs. 50k / day</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-xs">
                    Trending Penthouse & Margalla Sky Terrace
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    Open-air rooftop terrace, BBQ patio, 85" 4K smart TV media wall & 15 video walkthroughs.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      const el = document.getElementById('primary-cinema-player') || document.getElementById('apartment-video-showroom');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[11px] font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1"
                  >
                    <Video className="h-3 w-3 text-[#8C6207]" />
                    <span>Watch 15 Videos</span>
                  </button>
                  <button
                    onClick={() => onBookRoom && onBookRoom(penthouseRoom)}
                    className="gold-btn rounded-lg px-2.5 py-1 text-[11px] font-bold"
                  >
                    Book 50k
                  </button>
                </div>
              </div>
            )}

            {/* 4. Single Bed Room (8k) Match */}
            {isMatchingSingle && singleBedRoom && (
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-800">
                      <Bed className="h-3 w-3" /> 1-Bed Room
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-700">Rs. 8k / day</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-xs">
                    Deluxe Single Bed Room Executive Suite
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    Plush king bed, ergonomic desk, high-speed fiber Wi-Fi & attached luxury marble rain shower.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Fixed Daily Rate</span>
                  <button
                    onClick={() => onBookRoom && onBookRoom(singleBedRoom)}
                    className="gold-btn rounded-lg px-2.5 py-1 text-[11px] font-bold"
                  >
                    Book 8k
                  </button>
                </div>
              </div>
            )}

            {/* 5. Two Bed Room (15k) Match */}
            {isMatchingTwoBed && twoBedRoom && (
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-800">
                      <Bed className="h-3 w-3" /> 2-Bed Room
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-700">Rs. 15k / day</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-xs">
                    Executive Two Bed Room Luxury Suite
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    2 master king bedrooms, 2 en-suite marble baths, central living lounge with 65" TV & kitchenette.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Fixed Daily Rate</span>
                  <button
                    onClick={() => onBookRoom && onBookRoom(twoBedRoom)}
                    className="gold-btn rounded-lg px-2.5 py-1 text-[11px] font-bold"
                  >
                    Book 15k
                  </button>
                </div>
              </div>
            )}

            {/* 6. Videos & Tours Match */}
            {isMatchingVideos && (
              <div className="rounded-xl border border-slate-800 bg-slate-900 text-white p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded bg-[#D4AF37] text-slate-950 px-2 py-0.5 text-[10px] font-extrabold uppercase">
                    📹 Video Showroom
                  </span>
                  <h4 className="font-serif font-bold text-white text-xs mt-1.5">
                    15 HD Cinema Walkthrough Tours
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Interactive cinema player with direct frame jump chips for all suites, lounges & terrace.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('primary-cinema-player') || document.getElementById('apartment-video-showroom');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-2.5 w-full bg-[#D4AF37] hover:bg-[#E5C07B] text-slate-950 font-bold rounded-lg py-1.5 text-xs text-center transition-colors"
                >
                  Watch 15 Video Tours →
                </button>
              </div>
            )}

            {/* 7. VIP Concierge Desk Match */}
            {isMatchingAgents && (
              <div className="rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded bg-[#25D366] text-white px-2 py-0.5 text-[10px] font-extrabold uppercase">
                    📞 VIP Concierge
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-xs mt-1.5">
                    Agent Usman & Arsalan Jutt
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    24/7 direct WhatsApp booking, keycard issuance & airport Prado transfers.
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <a
                    href="https://wa.me/923480964370?text=Hello%20Usman%2C%20I%20am%20inquiring%20about%20booking%20a%20stay%20in%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#25D366] text-white font-bold rounded-lg py-1 text-[11px] hover:bg-[#20ba5c] transition-colors"
                  >
                    Usman
                  </a>
                  <a
                    href="https://wa.me/923180985887?text=Hello%20Arsalan%2C%20I%20am%20inquiring%20about%20booking%20a%20stay%20in%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#25D366] text-white font-bold rounded-lg py-1 text-[11px] hover:bg-[#20ba5c] transition-colors"
                  >
                    Arsalan
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
