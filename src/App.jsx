import React, { useState, useEffect } from 'react';
import {
  Crown,
  TrendingUp,
  ShieldCheck,
  PhoneCall,
  Play
} from 'lucide-react';
import Header from './components/Header';
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
  const currency = 'PKR';

  // Agent Authentication State with LocalStorage persistence
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('famous_stay_auth_user_pk');
      if (saved) {
        const parsed = JSON.parse(saved);
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

  // Selected Booking Dates
  const [bookingDates] = useState({
    checkIn: '2026-11-15',
    checkOut: '2026-11-20'
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
  const checkInDate = new Date(bookingDates.checkIn);
  const checkOutDate = new Date(bookingDates.checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Total Commissions Calculation
  const totalCommissions = bookings.reduce((sum, b) => sum + (b.agentCommission || 0), 0);

  // Dedicated room types with fixed rates: 1-Bed 8k, 2-Bed 15k, Penthouse 50k
  const penthouseRoom = LUXURY_HOTELS.find(h => h.id === 'fs-apt-emerald-01') || LUXURY_HOTELS[0];
  const singleBedRoom = LUXURY_HOTELS.find(h => h.id === 'fs-room-1bed-01') || LUXURY_HOTELS[1];
  const twoBedRoom = LUXURY_HOTELS.find(h => h.id === 'fs-room-2bed-01') || LUXURY_HOTELS[2];

  // The primary luxury suite featuring the 15 HD video tours
  const featuredSuite = penthouseRoom;

  const handleBookRoom = (room) => {
    if (!currentUser?.isLoggedIn) {
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
      showToast('Agent Authentication Required', 'Please sign in to your agency portal to access wholesale booking privileges.');
      return;
    }
    setSelectedRoomForBooking(room || featuredSuite);
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
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 animate-in fade-in duration-300">
            {/* STREAMLINED LUXURY HERO BANNER */}
            <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#FFFDF8] via-white to-[#FAF6ED] p-6 sm:p-10 text-center shadow-lg shadow-[#D4AF37]/10">
              {/* Radial ambient glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] rounded-full bg-[#D4AF37]/15 blur-[100px]"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider shadow-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span>🔥 #1 Trending Penthouse in Pakistan</span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
                    <img
                      src="/agent-mohsin.jpg"
                      alt="Agent Mohsin"
                      className="h-5 w-5 rounded-full object-cover object-[center_18%] border border-[#25D366]"
                    />
                    <span>Host: <strong className="text-[#8C6207]">Agent Mohsin</strong></span>
                    <span className="text-emerald-600 font-mono font-bold">(0314 3292778)</span>
                  </div>

                  <a
                    href="https://wa.me/923180985887?text=Hello%20Arsalan%2C%20I%20am%20inquiring%20about%20the%20Trending%20Luxury%20Penthouse%20on%20Famous%20Stay."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-white hover:bg-[#25D366]/10 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm transition-all"
                  >
                    <img
                      src="/agent-arsalan.jpg"
                      alt="Agent Arsalan Jutt"
                      className="h-5 w-5 rounded-full object-cover object-[center_20%] border border-[#25D366]"
                    />
                    <span>Agent: <strong className="text-[#8C6207]">Arsalan Jutt</strong></span>
                    <span className="text-emerald-600 font-mono font-bold">(+92 318 0985887)</span>
                  </a>
                </div>

                <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Trending Luxury Penthouse <br className="hidden sm:inline" />
                  <span className="gold-gradient-text">& Margalla Sky Terrace</span>
                </h1>

                {/* Fixed Rates Pill Bar */}
                <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/95 border border-[#D4AF37]/50 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                  <span className="text-[#8C6207]">Official Daily Rates:</span>
                  <span className="rounded-lg bg-[#FAF6EA] px-2 py-0.5 border border-[#D4AF37]/30 font-mono text-slate-900">
                    Single Bed: <strong>Rs. 8k/day</strong>
                  </span>
                  <span className="rounded-lg bg-[#FAF6EA] px-2 py-0.5 border border-[#D4AF37]/30 font-mono text-slate-900">
                    Two Bed: <strong>Rs. 15k/day</strong>
                  </span>
                  <span className="rounded-lg bg-[#FFF4D4] px-2 py-0.5 border border-[#D4AF37]/50 font-mono text-[#8C6207] font-extrabold">
                    Penthouse: <strong>Rs. 50k/day</strong>
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Private open-air barbecue terrace with Margalla mountain views, sculpted wave ambient LED lounge, and 15 live video walkthroughs. Guaranteed <strong className="text-[#8C6207] font-bold">18% agent wholesale commission in PKR</strong>.
                </p>

                {/* Quick Action Buttons */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('primary-cinema-player');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="gold-btn flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-md shadow-[#D4AF37]/20"
                  >
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                    <span>Watch Main Player</span>
                  </button>

                  <a
                    href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20watching%20the%2015%20video%20tours%20and%20want%20to%20inquire%20about%20booking%20the%20luxury%20suite."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 px-4 py-3 text-xs sm:text-sm font-bold text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                    </svg>
                    <span>WhatsApp Mohsin (0314 3292778)</span>
                  </a>

                  <a
                    href="https://wa.me/923180985887?text=Hello%20Arsalan%2C%20I%20am%20watching%20the%2015%20video%20tours%20and%20want%20to%20inquire%20about%20booking%20the%20luxury%20suite."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 px-4 py-3 text-xs sm:text-sm font-bold text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                    </svg>
                    <span>WhatsApp Arsalan (+92 318 0985887)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* OFFICIAL FIXED DAILY RATE CARD (Single Bed 8k, Two Bed 15k, Penthouse 50k) */}
            <div className="mb-8 rounded-3xl border border-[#D4AF37]/35 bg-white p-5 sm:p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8C6207]">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Fixed Daily Partner Rates • 18% Agent Margin</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    Official Fixed Daily Rates
                  </h2>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Direct keycard check-in • Multi-hotel partner flexibility
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. Single Bed Room - 8k / day */}
                <div className="rounded-2xl border-2 border-[#D4AF37]/35 bg-[#FAF9F5]/70 p-4 sm:p-5 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF4D4] px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-[#8C6207] border border-[#D4AF37]/30">
                        1-Bed Room
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600">8k / day</span>
                    </div>

                    <h3 className="mt-2.5 font-serif text-lg font-bold text-slate-900">
                      Single Bed Room
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      1 Plush Master Bed • Fiber Wi-Fi • Dedicated Desk • 4K LED TV • Marble Rain Shower.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Fixed Rate</div>
                      <div className="font-serif text-xl font-extrabold text-slate-950">
                        Rs. 8,000 <span className="text-xs font-sans font-normal text-slate-500">/ day</span>
                      </div>
                      <div className="text-[11px] font-bold text-emerald-600 font-mono">+Rs. 1,440 profit/nt</div>
                    </div>
                    <button
                      onClick={() => handleBookRoom(singleBedRoom)}
                      className="gold-btn rounded-xl px-3.5 py-2 text-xs font-bold text-slate-950 shadow-sm"
                    >
                      Book 8k
                    </button>
                  </div>
                </div>

                {/* 2. Two Bed Room - 15k / day */}
                <div className="rounded-2xl border-2 border-[#D4AF37]/35 bg-[#FAF9F5]/70 p-4 sm:p-5 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF4D4] px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-[#8C6207] border border-[#D4AF37]/30">
                        2-Bed Room
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600">15k / day</span>
                    </div>

                    <h3 className="mt-2.5 font-serif text-lg font-bold text-slate-900">
                      Two Bed Room
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      2 Separate Master Bedrooms • Attached En-Suite Baths • Central Salon • Kitchenette.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Fixed Rate</div>
                      <div className="font-serif text-xl font-extrabold text-slate-950">
                        Rs. 15,000 <span className="text-xs font-sans font-normal text-slate-500">/ day</span>
                      </div>
                      <div className="text-[11px] font-bold text-emerald-600 font-mono">+Rs. 2,700 profit/nt</div>
                    </div>
                    <button
                      onClick={() => handleBookRoom(twoBedRoom)}
                      className="gold-btn rounded-xl px-3.5 py-2 text-xs font-bold text-slate-950 shadow-sm"
                    >
                      Book 15k
                    </button>
                  </div>
                </div>

                {/* 3. Luxury Penthouse - 50k / day */}
                <div className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFFDF8] via-white to-[#FAF5E6] p-4 sm:p-5 shadow-md ring-2 ring-[#D4AF37]/25 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-white shadow-sm">
                        🔥 Trending Penthouse
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#8C6207]">50k / day</span>
                    </div>

                    <h3 className="mt-2.5 font-serif text-lg font-bold text-slate-900">
                      Luxury Penthouse
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Margalla Sky Terrace • BBQ Patio • 85" 4K Smart Media Wall • 15 Video Tours.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Fixed Rate</div>
                      <div className="font-serif text-xl font-extrabold text-[#8C6207]">
                        Rs. 50,000 <span className="text-xs font-sans font-normal text-slate-500">/ day</span>
                      </div>
                      <div className="text-[11px] font-bold text-emerald-600 font-mono">+Rs. 9,000 profit/nt</div>
                    </div>
                    <button
                      onClick={() => handleBookRoom(penthouseRoom)}
                      className="gold-btn rounded-xl px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md"
                    >
                      Book 50k
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* THE MULTI-FRAME VIDEO SHOWROOM (15 VIDEOS DIRECT) */}
            {featuredSuite && (
              <ApartmentShowcase
                apartment={featuredSuite}
                nights={nights}
                onSelectApartment={(apt) => setSelectedRoomForModal(apt)}
                onBookApartment={(apt) => handleBookRoom(apt)}
              />
            )}

            {/* AGENT PRIVILEGES / WHY FAMOUS STAY PILLARS */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] font-bold mb-3 border border-[#D4AF37]/30">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">18% Guaranteed Profit</h4>
                <p className="text-xs text-slate-600 mt-1">Wholesale net partner rates with commission credited upon guest checkout.</p>
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
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-[#D4AF37]/20">
            {/* Column 1: Brand & Agency Identity */}
            <div className="lg:col-span-2 space-y-4">
              <Logo size="large" />

              <p className="text-xs text-slate-600 leading-relaxed max-w-sm pt-2">
                Pakistan's premier B2B luxury suite reservation portal connecting accredited travel agents to 5-star suites with guaranteed wholesale margins.
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

            {/* Column 2: Partner Agency Services */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#8C6207]">
                Agency Privileges
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><span>18% Wholesale Net Margins in PKR</span></li>
                <li><span>Official PDF Client Vouchers</span></li>
                <li><span>Bank Alfalah & HBL Settlements</span></li>
                <li><span>VIP Airport Prado Transfers</span></li>
                <li><span>1080p Verified Multi-Frame Video Tours</span></li>
              </ul>
            </div>

            {/* Column 3: 24/7 Agent Desk Contact in Pakistan */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#8C6207]">
                24/7 Agent Desk (Pakistan)
              </div>
              <div className="space-y-3 text-xs text-slate-600">
                {/* Agent 1: Mohsin */}
                <div className="rounded-xl border border-[#D4AF37]/30 bg-white p-2.5 shadow-sm space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/agent-mohsin.jpg"
                      alt="Agent Mohsin"
                      className="h-9 w-9 rounded-full object-cover border-2 border-[#D4AF37]"
                    />
                    <div>
                      <div className="text-slate-900 font-bold text-xs">Mohsin</div>
                      <div className="text-[#8C6207] text-[10px] font-semibold">Authorized Reservation Lead</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <a href="tel:+923143292778" className="font-bold text-slate-800 hover:text-[#8C6207] font-mono text-[11px]">
                      0314 3292778
                    </a>
                    <a
                      href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20a%20luxury%20hotel%20booking%20on%20Famous%20Stay."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] text-slate-950 font-bold text-[10px] px-2 py-1 shadow-sm"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Agent 2: Arsalan Jutt */}
                <div className="rounded-xl border border-[#D4AF37]/30 bg-white p-2.5 shadow-sm space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/agent-arsalan.jpg"
                      alt="Agent Arsalan Jutt"
                      className="h-9 w-9 rounded-full object-cover object-[center_20%] border-2 border-[#25D366]"
                    />
                    <div>
                      <div className="text-slate-900 font-bold text-xs">Arsalan Jutt</div>
                      <div className="text-[#8C6207] text-[10px] font-semibold">Senior VIP Reservation Agent</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <a href="tel:+923180985887" className="font-bold text-slate-800 hover:text-[#8C6207] font-mono text-[11px]">
                      +92 318 0985887
                    </a>
                    <a
                      href="https://wa.me/923180985887?text=Hello%20Arsalan%2C%20I%20am%20inquiring%20about%20the%20Trending%20Luxury%20Penthouse%20on%20Famous%20Stay."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] text-slate-950 font-bold text-[10px] px-2 py-1 shadow-sm"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
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
          initialDates={{ checkIn: bookingDates.checkIn, checkOut: bookingDates.checkOut }}
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
            Wholesale Rate
          </div>
          <div className="font-serif text-sm font-extrabold text-slate-900 leading-tight">
            Rs. {((featuredSuite?.clientRate || 145000) * nights).toLocaleString()}
            <span className="text-[10px] font-sans font-normal text-slate-500"> ({nights}n)</span>
          </div>
          <div className="text-[10px] font-bold text-emerald-600 leading-none truncate">
            +Rs. {((featuredSuite?.clientRate || 145000) * nights * 0.18).toLocaleString()} Net (18%)
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20watching%20the%20video%20tours%20and%20want%20to%20inquire%20about%20booking%20the%20luxury%20suite."
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
            onClick={() => handleBookRoom(featuredSuite)}
            className="gold-btn flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold shadow-md active:scale-95 transition-transform"
          >
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
