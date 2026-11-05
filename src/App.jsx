import React, { useState, useEffect } from 'react';
import {
  Crown,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Building2,
  PhoneCall,
  Headphones,
  Play,
  ArrowRight,
  Grid,
  Film,
  CheckCircle2
} from 'lucide-react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import RoomCard from './components/RoomCard';
import RoomModal from './components/RoomModal';
import BookingModal from './components/BookingModal';
import VoucherModal from './components/VoucherModal';
import AgentLedger from './components/AgentLedger';
import CommissionSummaryModal from './components/CommissionSummaryModal';
import Toast from './components/Toast';
import AuthModal from './components/AuthModal';
import WhatsAppWidget from './components/WhatsAppWidget';
import ApartmentShowcase from './components/ApartmentShowcase';
import { LUXURY_HOTELS, INITIAL_AGENT_BOOKINGS } from './data/hotels';
import Logo from './components/Logo';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'ledger' | 'commissions'
  const [currency, setCurrency] = useState('PKR');

  // Agent Authentication State with LocalStorage persistence
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('famous_stay_auth_user_pk');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If older session with previous name, upgrade to Mohsin
        if (parsed.name && parsed.name.includes('Chaudhry Bilal')) {
          return {
            name: 'Mohsin',
            avatar: '/agent-mohsin.jpg',
            email: 'mohsin@famousstay.pk',
            agencyName: 'Famous Stay Luxury Desk',
            dtsLicense: 'ISB-DTS-4921',
            taapNumber: 'TAAP-2841',
            tier: 'Diamond Desk Lead',
            city: 'Islamabad, Pakistan',
            phone: '+92 314 3292778',
            rawPhone: '03143292778',
            isLoggedIn: true
          };
        }
        return parsed;
      }
      return {
        name: 'Mohsin',
        avatar: '/agent-mohsin.jpg',
        email: 'mohsin@famousstay.pk',
        agencyName: 'Famous Stay Luxury Desk',
        dtsLicense: 'ISB-DTS-4921',
        taapNumber: 'TAAP-2841',
        tier: 'Diamond Desk Lead',
        city: 'Islamabad, Pakistan',
        phone: '+92 314 3292778',
        rawPhone: '03143292778',
        isLoggedIn: true
      };
    } catch {
      return {
        name: 'Mohsin',
        avatar: '/agent-mohsin.jpg',
        email: 'mohsin@famousstay.pk',
        agencyName: 'Famous Stay Luxury Desk',
        dtsLicense: 'ISB-DTS-4921',
        taapNumber: 'TAAP-2841',
        tier: 'Diamond Desk Lead',
        city: 'Islamabad, Pakistan',
        phone: '+92 314 3292778',
        rawPhone: '03143292778',
        isLoggedIn: true
      };
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('famous_stay_auth_user_pk', JSON.stringify(userData));
    showToast('Agent Signed In', `Welcome back, ${userData.name}! Connected to ${userData.agencyName}`);
  };

  const handleSignOut = () => {
    const loggedOutUser = { isLoggedIn: false };
    setCurrentUser(loggedOutUser);
    localStorage.setItem('famous_stay_auth_user_pk', JSON.stringify(loggedOutUser));
    showToast('Signed Out', 'You have been signed out of the agency portal.');
  };

  // Bookings state with LocalStorage persistence
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('famous_stay_agent_bookings_pkr_v3');
      return saved ? JSON.parse(saved) : INITIAL_AGENT_BOOKINGS;
    } catch {
      return INITIAL_AGENT_BOOKINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('famous_stay_agent_bookings_pkr_v3', JSON.stringify(bookings));
    } catch (e) {
      console.error('Could not save bookings to localStorage', e);
    }
  }, [bookings]);

  // Search & Filter State
  const [filters, setFilters] = useState({
    destination: 'All Destinations',
    checkIn: '2026-11-15',
    checkOut: '2026-11-20',
    guests: 2,
    category: 'All Categories',
    sortBy: 'recommended',
    selectedPerks: [],
    instantOnly: false
  });

  // Modals state
  const [selectedRoomForModal, setSelectedRoomForModal] = useState(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Calculate nights
  const checkInDate = new Date(filters.checkIn);
  const checkOutDate = new Date(filters.checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Total Commissions Calculation
  const totalCommissions = bookings.reduce((sum, b) => sum + (b.agentCommission || 0), 0);

  // View mode for inventory: 'grid' (default for normal agent multi-hotel website) vs 'showroom'
  const [catalogViewMode, setCatalogViewMode] = useState('grid');
  const showcaseRoom = LUXURY_HOTELS.find(h => h.videos && h.videos.length > 0) || LUXURY_HOTELS[0];

  // Filtered rooms logic
  const filteredRooms = LUXURY_HOTELS.filter((room) => {
    // Destination filter
    if (filters.destination !== 'All Destinations') {
      const destMatch = `${room.city}, ${room.country}`.toLowerCase().includes(filters.destination.toLowerCase()) ||
                        filters.destination.toLowerCase().includes(room.city.toLowerCase());
      if (!destMatch) return false;
    }

    // Category filter
    if (filters.category !== 'All Categories' && room.category !== filters.category) {
      return false;
    }

    // Guests filter
    if (room.maxAdults < filters.guests) {
      return false;
    }

    // Instant only filter
    if (filters.instantOnly && !room.instantConfirmation) {
      return false;
    }

    // Selected perks filter
    if (filters.selectedPerks.length > 0) {
      const hasPerks = filters.selectedPerks.every((perk) =>
        room.amenities.some((a) => a.toLowerCase().includes(perk.toLowerCase().slice(0, 10)))
      );
      if (!hasPerks) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'commission-high') {
      const commA = a.clientRate * (a.agentCommissionPct / 100);
      const commB = b.clientRate * (b.agentCommissionPct / 100);
      return commB - commA;
    }
    if (filters.sortBy === 'price-low') {
      return a.clientRate - b.clientRate;
    }
    if (filters.sortBy === 'price-high') {
      return b.clientRate - a.clientRate;
    }
    if (filters.sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // recommended default
  });

  const handleResetFilters = () => {
    setFilters({
      destination: 'All Destinations',
      checkIn: '2026-11-15',
      checkOut: '2026-11-20',
      guests: 2,
      category: 'All Categories',
      sortBy: 'recommended',
      selectedPerks: [],
      instantOnly: false
    });
  };

  const handleBookRoom = (room) => {
    if (!currentUser?.isLoggedIn) {
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
      showToast('Agent Authentication Required', 'Please sign in to your agency portal to access wholesale booking privileges.');
      return;
    }
    setSelectedRoomForBooking(room);
  };

  const handleBookingComplete = (newBooking) => {
    setBookings([newBooking, ...bookings]);
    setSelectedRoomForBooking(null);
    setActiveVoucher(newBooking);
    showToast('Reservation Confirmed', `Voucher ${newBooking.id} has been issued for ${newBooking.clientName}`);
  };

  const handleTabChange = (tab) => {
    if (tab === 'commissions') {
      setShowCommissionModal(true);
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuickDestinationSelect = (destName) => {
    setFilters(prev => ({ ...prev, destination: destName }));
    const section = document.getElementById('inventory-catalog');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* Fixed Luxury Navigation in White & Royal Gold */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        bookingsCount={bookings.length}
        totalCommissions={totalCommissions}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthModalMode('login');
          setIsAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-28 sm:pb-20">
        {activeTab === 'explore' && (
          <>
            {/* CINEMATIC HERO SECTION WITH WHITE & ROYAL GOLD AMBIENCE */}
            <div className="relative overflow-hidden border-b border-[#D4AF37]/25 py-14 lg:py-20 text-center">
              {/* Cinematic Luxury Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/85 to-[#FFFDF8]/70"></div>
              
              {/* Radial ambient warm royal gold glows */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#F5E6B8]/30 to-transparent blur-[140px]"></div>

              <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-white/90 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#8C6207] backdrop-blur-md shadow-md shadow-[#D4AF37]/10">
                    <Crown className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Premier B2B Agent Reservation Network • Pakistan</span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
                    <img
                      src="/agent-mohsin.jpg"
                      alt="Agent Mohsin"
                      className="h-6 w-6 rounded-full object-cover object-[center_18%] border-2 border-[#25D366]"
                    />
                    <span>Host: <strong className="text-[#8C6207]">Agent Mohsin</strong></span>
                    <span className="text-emerald-600 font-mono font-bold">(0314 3292778)</span>
                  </div>
                </div>

                <h1 className="mt-5 font-serif text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl leading-[1.08]">
                  Reserve Iconic Suites for Your <br className="hidden sm:inline" />
                  <span className="gold-gradient-text">Distinguished Clients</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed mx-auto">
                  Access wholesale net rates with <strong className="text-[#8C6207] font-bold">15% - 18% guaranteed agent commissions in PKR</strong>. Pick luxury villas, configure VIP client preferences, and issue official guest vouchers instantly.
                </p>

                {/* Direct Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setCatalogViewMode('grid');
                      const el = document.getElementById('inventory-catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="gold-btn flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-xl shadow-[#D4AF37]/25"
                  >
                    <Grid className="h-4 w-4" />
                    <span>Browse All Hotel Rooms ({filteredRooms.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setCatalogViewMode('showroom');
                      const el = document.getElementById('inventory-catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-rose-900/30 hover:brightness-110 transition-all border border-rose-400/30"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                    <span>Multi-Frame Video Showroom</span>
                  </button>

                  <a
                    href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20partner%20hotel%20bookings%20and%20rates%20on%20Famous%20Stay."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/50 px-5 py-3.5 text-xs sm:text-sm font-bold text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-all shadow-md backdrop-blur-md"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                    </svg>
                    <span>WhatsApp Agent Mohsin (0314 3292778)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* SEARCH CONSOLE & CONCIERGE FILTERS */}
            <div id="search-console" className="-mt-8 scroll-mt-24">
              <SearchFilter
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                totalResults={filteredRooms.length}
              />
            </div>

            {/* MAIN HOTEL ROOMS INVENTORY CATALOG */}
            <div id="inventory-catalog" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 scroll-mt-20">
              {/* Section Header with View Mode Switcher */}
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D4AF37]/25 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6207]">
                    <Crown className="h-3.5 w-3.5 text-[#B8860B]" />
                    <span>Agent Reservation Catalog • {filteredRooms.length} Available Hotel Rooms</span>
                  </div>
                  <h2 className="mt-1 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                    Hotel Rooms & Luxury Suites
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Calculated for <strong className="text-[#8C6207] font-bold">{nights} {nights === 1 ? 'night' : 'nights'}</strong> ({filters.checkIn} → {filters.checkOut}) • Guaranteed wholesale net partner rates in PKR
                  </p>
                </div>

                {/* View Switcher: Hotel Rooms Grid vs Multi-Frame Video Showroom */}
                <div className="inline-flex items-center rounded-2xl bg-white p-1 border border-[#D4AF37]/50 shadow-sm self-start md:self-auto">
                  <button
                    onClick={() => setCatalogViewMode('grid')}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      catalogViewMode === 'grid'
                        ? 'gold-btn text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
                    }`}
                  >
                    <Grid className="h-3.5 w-3.5" />
                    <span>All Hotel Rooms ({filteredRooms.length})</span>
                  </button>

                  <button
                    onClick={() => setCatalogViewMode('showroom')}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      catalogViewMode === 'showroom'
                        ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7]'
                    }`}
                  >
                    <Film className="h-3.5 w-3.5" />
                    <span>Video Showroom</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  </button>
                </div>
              </div>

              {/* VIEW 1: NORMAL AGENT MULTI-HOTEL ROOMS GRID (DEFAULT VIEW) */}
              {catalogViewMode === 'grid' && (
                <div className="animate-in fade-in duration-300">
                  {filteredRooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {filteredRooms.map((room) => (
                        <RoomCard
                          key={room.id}
                          room={room}
                          nights={nights}
                          currency={currency}
                          onSelectRoom={(r) => setSelectedRoomForModal(r)}
                          onBookRoom={(r) => handleBookRoom(r)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-[#D4AF37]/40 bg-white p-12 text-center shadow-md">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8E7] text-[#8C6207] mb-4">
                        <Building2 className="h-7 w-7" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">No rooms match your search filters</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Try resetting your destination or category filters to browse all available hotel rooms.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-4 gold-btn px-5 py-2 text-xs font-bold rounded-xl"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}

                  {/* Teaser Ribbon to Open Multi-Frame Video Showroom */}
                  <div className="mt-10 rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#FFFDF8] via-white to-[#FAF6ED] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900">
                          Looking for 1080p Multi-Frame Video Walkthroughs?
                        </h4>
                        <p className="text-xs text-slate-600">
                          Inspect rooms across our 15-frame live video wall, 4-split Quad-Vision command matrix, and cinema theater view.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCatalogViewMode('showroom');
                        window.scrollTo({ top: document.getElementById('inventory-catalog').offsetTop - 80, behavior: 'smooth' });
                      }}
                      className="gold-btn flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shrink-0 shadow-sm"
                    >
                      <span>Open Video Showroom</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 2: MULTI-FRAME VIDEO SHOWROOM */}
              {catalogViewMode === 'showroom' && (
                <div className="animate-in fade-in duration-300">
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      onClick={() => setCatalogViewMode('grid')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/50 bg-white px-3.5 py-1.5 text-xs font-bold text-[#8C6207] hover:bg-[#FFFDF7] shadow-sm transition-all"
                    >
                      <span>← Back to Hotel Rooms Catalog</span>
                    </button>
                    <span className="text-xs text-slate-500 font-semibold">
                      15 Interactive Room Frames • Sound & Quad-Vision
                    </span>
                  </div>

                  {showcaseRoom && (
                    <ApartmentShowcase
                      apartment={showcaseRoom}
                      nights={nights}
                      onSelectApartment={(apt) => setSelectedRoomForModal(apt)}
                      onBookApartment={(apt) => handleBookRoom(apt)}
                    />
                  )}
                </div>
              )}

              {/* UNIVERSAL "WE DEAL WITH ANY HOTEL" CONCIERGE BANNER */}
              <div className="mt-14 rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#FFFDF8] via-white to-[#FAF5E6] p-6 sm:p-10 shadow-xl shadow-[#D4AF37]/15">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#8C6207]">
                      <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" />
                      <span>Universal Multi-Hotel Reservation Network</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Need to Book Any Other Hotel Room or Custom Suite?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                      Famous Stay deals directly with luxury hotels, mountain resorts, and serviced residences across Pakistan and internationally. Whatever hotel or room category your client wants, Host Mohsin will secure wholesale net rates with your guaranteed agent profit.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                    <a
                      href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20have%20a%20client%20requesting%20a%20hotel%20booking%20not%20listed%20on%20the%20website.%20Can%20you%20provide%20rates%20and%20availability%3F"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gold-btn flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-xl shadow-[#D4AF37]/25 w-full sm:w-auto"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                      </svg>
                      <span>Request Any Hotel via WhatsApp</span>
                    </a>

                    <a
                      href="tel:03143292778"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-white hover:bg-[#FFFDF7] text-[#8C6207] px-5 py-3.5 text-xs font-bold transition-all w-full sm:w-auto shadow-sm"
                    >
                      <PhoneCall className="h-4 w-4 text-[#8C6207]" />
                      <span>Call Mohsin Direct</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* AGENT PRIVILEGES / WHY FAMOUS STAY PILLARS */}
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] font-bold mb-3 border border-[#D4AF37]/30">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">15% - 18% Net Profit</h4>
                  <p className="text-xs text-slate-600 mt-1">Guaranteed wholesale commissions credited immediately upon client checkout.</p>
                </div>

                <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] font-bold mb-3 border border-[#D4AF37]/30">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">SBP & DTS Verified</h4>
                  <p className="text-xs text-slate-600 mt-1">Official agency channel compliant with DTS license ISB-4921 & TAAP codes.</p>
                </div>

                <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] font-bold mb-3 border border-[#D4AF37]/30">
                    <Crown className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Official PDF Vouchers</h4>
                  <p className="text-xs text-slate-600 mt-1">Generate client-facing vouchers with agency PNR and instant arrival check-in.</p>
                </div>

                <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] font-bold mb-3 border border-[#D4AF37]/30">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">24/7 Agent Desk</h4>
                  <p className="text-xs text-slate-600 mt-1">Direct coordination with Host Mohsin for airport Prado transfers and VIP greeting.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* AGENT BOOKINGS LEDGER VIEW */}
        {activeTab === 'ledger' && (
          <AgentLedger
            bookings={bookings}
            currency={currency}
            onViewVoucher={(booking) => setActiveVoucher(booking)}
            onNewBookingClick={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* MODERN ATTRACTIVE FOOTER IN WHITE & ROYAL GOLD */}
      <footer className="border-t border-[#D4AF37]/30 bg-[#FAF8F2] py-14 text-xs text-slate-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Footer Columns Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-[#D4AF37]/20">
            {/* Column 1: Brand & Agency Identity */}
            <div className="lg:col-span-2 space-y-4">
              <Logo size="large" />

              <p className="text-xs text-slate-600 leading-relaxed max-w-sm pt-2">
                Pakistan's premier B2B luxury hotel reservation gateway connecting accredited travel agents to 5-star suites, heritage pavilions, and mountain chalets with guaranteed wholesale margins.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="rounded-full bg-white border border-[#D4AF37]/35 px-3 py-1 text-[11px] font-bold text-[#8C6207] shadow-sm">
                  DTS Lic #ISB-4921
                </span>
                <span className="rounded-full bg-white border border-[#D4AF37]/35 px-3 py-1 text-[11px] font-bold text-[#8C6207] shadow-sm">
                  TAAP Member #2841
                </span>
                <span className="rounded-full bg-white border border-[#D4AF37]/35 px-3 py-1 text-[11px] font-bold text-[#8C6207] shadow-sm">
                  SECP Reg #0192841
                </span>
              </div>
            </div>

            {/* Column 2: Pakistan & Global Destinations */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#8C6207]">
                Featured Destinations
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><button onClick={() => handleQuickDestinationSelect('Islamabad')} className="hover:text-slate-900 transition-colors">Islamabad 5-Star Suites</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Hunza')} className="hover:text-slate-900 transition-colors">Hunza Heritage Pavilions</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Bhurban')} className="hover:text-slate-900 transition-colors">Bhurban Mountain Chalets</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Skardu')} className="hover:text-slate-900 transition-colors">Skardu Lakefront Lodges</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Lahore')} className="hover:text-slate-900 transition-colors">Lahore Executive Suites</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Karachi')} className="hover:text-slate-900 transition-colors">Karachi Oceanfront Towers</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Dubai')} className="hover:text-slate-900 transition-colors">Dubai Luxury Beachfront</button></li>
              </ul>
            </div>

            {/* Column 3: Partner Agency Services */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#8C6207]">
                Agency Privileges
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><span className="hover:text-slate-900 cursor-pointer">15% - 18% Wholesale Net Margins</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">Official PDF Client Vouchers</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">Bank Alfalah & HBL Settlements</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">Clefs d'Or Concierge Coordination</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">VIP Airport Prado Transfers</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">Helicopter Safari Charter Liaison</span></li>
              </ul>
            </div>

            {/* Column 4: 24/7 Agent Desk Contact in Pakistan */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#8C6207]">
                24/7 Agent Desk (Pakistan)
              </div>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <img
                    src="/agent-mohsin.jpg"
                    alt="Agent Mohsin"
                    className="h-10 w-10 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
                  />
                  <div>
                    <div className="text-slate-900 font-bold text-sm">Mohsin</div>
                    <div className="text-[#8C6207] text-[11px] font-semibold">Authorized Reservation Lead</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <PhoneCall className="h-4 w-4 text-[#D4AF37]" />
                  <a href="tel:+923143292778" className="font-bold text-slate-900 hover:text-[#8C6207] font-mono">
                    +92 (314) 3292778
                  </a>
                </div>

                <div>
                  <a
                    href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20a%20luxury%20hotel%20booking%20on%20Famous%20Stay."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 px-3 py-1.5 text-xs font-bold text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                    </svg>
                    <span>Chat with Mohsin on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Accreditation Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Famous Stay Luxury Hospitality Pakistan (Pvt) Ltd. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <span className="hover:text-slate-900 cursor-pointer transition-colors">DTS Regulations</span>
              <span className="hover:text-slate-900 cursor-pointer transition-colors">Agency Terms of Service</span>
              <span className="hover:text-slate-900 cursor-pointer transition-colors">TAAP Member Code</span>
              <span className="text-[#8C6207] font-semibold">SBP Approved Wholesale Channel</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {selectedRoomForModal && (
        <RoomModal
          room={selectedRoomForModal}
          nights={nights}
          currency={currency}
          onClose={() => setSelectedRoomForModal(null)}
          onBookNow={(room) => {
            setSelectedRoomForModal(null);
            handleBookRoom(room);
          }}
        />
      )}

      {selectedRoomForBooking && (
        <BookingModal
          room={selectedRoomForBooking}
          initialDates={{ checkIn: filters.checkIn, checkOut: filters.checkOut }}
          currency={currency}
          onClose={() => setSelectedRoomForBooking(null)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {activeVoucher && (
        <VoucherModal
          booking={activeVoucher}
          currency={currency}
          onClose={() => setActiveVoucher(null)}
          onViewLedger={() => {
            setActiveVoucher(null);
            setActiveTab('ledger');
          }}
        />
      )}

      {showCommissionModal && (
        <CommissionSummaryModal
          totalCommissions={totalCommissions}
          bookingsCount={bookings.length}
          currency={currency}
          onClose={() => setShowCommissionModal(false)}
        />
      )}

      {/* AGENT AUTHENTICATION MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />

      {/* TOAST FEEDBACK */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* FLOATING WHATSAPP CHAT WIDGET FOR AGENT MOHSIN */}
      <WhatsAppWidget
        agentName="Mohsin"
        agentPhone="03143292778"
        agentAvatar="/agent-mohsin.jpg"
      />

      {/* FIXED MOBILE BOTTOM ACTION BAR (SM:HIDDEN) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#D4AF37]/40 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
        <div className="flex flex-col min-w-0">
          <div className="text-[10px] uppercase font-bold text-slate-500 leading-none">
            Agent Wholesale Network
          </div>
          <div className="font-serif text-sm font-extrabold text-slate-900 leading-tight">
            15% - 18% Net Commission
          </div>
          <div className="text-[10px] font-bold text-emerald-600 leading-none truncate">
            {filteredRooms.length} Available Hotel Rooms
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20booking%20a%20hotel%20room%20on%20Famous%20Stay."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-xl bg-[#25D366] text-white px-2.5 py-2 text-xs font-extrabold shadow-md active:scale-95 transition-transform"
            title="Chat on WhatsApp"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
            </svg>
            <span className="text-[11px]">WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setCatalogViewMode('grid');
              const el = document.getElementById('inventory-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="gold-btn flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold shadow-md active:scale-95 transition-transform"
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Rooms ({filteredRooms.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
