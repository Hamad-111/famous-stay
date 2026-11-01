import React, { useState, useEffect } from 'react';
import {
  Crown,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Building2,
  PhoneCall,
  Headphones,
  Play
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
      const saved = localStorage.getItem('famous_stay_agent_bookings_pkr_v2');
      return saved ? JSON.parse(saved) : INITIAL_AGENT_BOOKINGS;
    } catch {
      return INITIAL_AGENT_BOOKINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('famous_stay_agent_bookings_pkr_v2', JSON.stringify(bookings));
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

  // Flagship Real Apartment for Unique Showcase
  const flagshipApartment = LUXURY_HOTELS.find(h => h.id === "fs-apt-emerald-01");
  const showFlagshipShowcase = flagshipApartment && 
    (filters.destination === 'All Destinations' || filters.destination.toLowerCase().includes('islamabad')) &&
    (filters.category === 'All Categories' || filters.category === 'Luxury Serviced Apartment');

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
    <div className="min-h-screen bg-[#050B18] text-slate-100 flex flex-col font-sans selection:bg-[#E5C07B] selection:text-[#061026]">
      {/* Fixed Luxury Navigation in Sapphire Blue & Light Gold */}
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
            {/* CINEMATIC HERO SECTION WITH LIGHT GOLDEN & SAPPHIRE BLUE AMBIENCE */}
            <div className="relative overflow-hidden border-b border-[#E5C07B]/20 py-14 lg:py-20 text-center">
              {/* Cinematic Luxury Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/85 to-[#071536]/70"></div>
              
              {/* Radial ambient light golden and royal blue glows */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-r from-[#E5C07B]/15 via-[#1D4ED8]/15 to-transparent blur-[140px]"></div>

              <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#E5C07B]/40 bg-[#0A1A3E]/90 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#F7E5A9] backdrop-blur-md shadow-lg shadow-[#E5C07B]/10">
                    <Crown className="h-3.5 w-3.5 text-[#E5C07B]" />
                    <span>Premier B2B Agent Reservation Network • Pakistan</span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#061026]/90 px-3 py-1 text-xs font-bold text-white shadow-md">
                    <img
                      src="/agent-mohsin.jpg"
                      alt="Agent Mohsin"
                      className="h-6 w-6 rounded-full object-cover object-[center_18%] border border-[#25D366]"
                    />
                    <span>Host: <strong className="text-[#F7E5A9]">Agent Mohsin</strong></span>
                    <span className="text-emerald-400 font-mono font-semibold">(0314 3292778)</span>
                  </div>
                </div>

                <h1 className="mt-5 font-serif text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
                  Reserve Iconic Suites for Your <br className="hidden sm:inline" />
                  <span className="gold-gradient-text">Distinguished Clients</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base sm:text-lg text-blue-100 font-normal leading-relaxed mx-auto">
                  Access wholesale net rates with <strong className="text-[#F7E5A9] font-bold">15% - 18% guaranteed agent commissions in PKR</strong>. Pick luxury villas, configure VIP client preferences, and issue official guest vouchers instantly.
                </p>

                {/* Direct Video & WhatsApp Actions */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('apartment-video-showcase');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-rose-950/60 hover:brightness-110 transition-all border border-rose-400/30"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                    <span>Watch Front Dashboard Video Tours (15 Rooms)</span>
                  </button>

                  <a
                    href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20the%20luxury%20apartment%20booking%20and%20rates%20on%20Famous%20Stay."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/50 px-5 py-3 text-xs sm:text-sm font-bold text-emerald-300 hover:bg-[#25D366] hover:text-[#061026] transition-all shadow-lg backdrop-blur-md"
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
                totalResults={1}
              />
            </div>

            {/* SUITES INVENTORY CATALOG SECTION */}
            <div id="inventory-catalog" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 scroll-mt-20">
              {/* Exclusive Luxury Residence Section Header */}
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#E5C07B]/20 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5C07B]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Exclusive Verified Residence • Diplomatic Sector Islamabad</span>
                  </div>
                  <h2 className="mt-1 font-serif text-3xl font-bold text-white sm:text-4xl">
                    The Royal Emerald Luxury Penthouse
                  </h2>
                  <p className="mt-1 text-xs text-blue-200/80">
                    Calculated for <strong className="text-[#F7E5A9] font-bold">{nights} {nights === 1 ? 'night' : 'nights'}</strong> ({filters.checkIn} → {filters.checkOut}) • Guaranteed wholesale net partner rates in PKR
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-blue-200/70">Guaranteed Agent Commission</div>
                    <div className="text-sm font-bold text-[#F7E5A9]">+Rs. {((flagshipApartment?.clientRate || 145000) * nights * 0.18).toLocaleString()} Net (18%)</div>
                  </div>
                </div>
              </div>

              {/* STYLISH & UNIQUE 5-PHOTO & 5-VIDEO REAL APARTMENT SHOWCASE */}
              {flagshipApartment && (
                <ApartmentShowcase
                  apartment={flagshipApartment}
                  nights={nights}
                  onSelectApartment={(apt) => setSelectedRoomForModal(apt)}
                  onBookApartment={(apt) => handleBookRoom(apt)}
                />
              )}
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

      {/* MODERN ATTRACTIVE FOOTER IN ROYAL NAVY & LIGHT GOLD */}
      <footer className="border-t border-[#E5C07B]/30 bg-[#040A18] py-14 text-xs text-blue-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Footer Columns Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-[#E5C07B]/15">
            {/* Column 1: Brand & Agency Identity */}
            <div className="lg:col-span-2 space-y-4">
              <Logo size="large" />

              <p className="text-xs text-blue-200/80 leading-relaxed max-w-sm pt-2">
                Pakistan's premier B2B luxury hotel reservation gateway connecting accredited travel agents to 5-star suites, heritage pavilions, and mountain chalets with guaranteed wholesale margins.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="rounded-full bg-[#081738] border border-[#E5C07B]/30 px-3 py-1 text-[11px] font-bold text-[#F7E5A9]">
                  DTS Lic #ISB-4921
                </span>
                <span className="rounded-full bg-[#081738] border border-[#E5C07B]/30 px-3 py-1 text-[11px] font-bold text-[#F7E5A9]">
                  TAAP Member #2841
                </span>
                <span className="rounded-full bg-[#081738] border border-[#60A5FA]/40 px-3 py-1 text-[11px] font-bold text-[#93C5FD]">
                  SECP Reg #0192841
                </span>
              </div>
            </div>

            {/* Column 2: Pakistan & Global Destinations */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#F7E5A9]">
                Featured Destinations
              </div>
              <ul className="space-y-2 text-xs text-blue-200/80">
                <li><button onClick={() => handleQuickDestinationSelect('Islamabad')} className="hover:text-white transition-colors">Islamabad Serena Suites</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Hunza')} className="hover:text-white transition-colors">Hunza Valley & Altit Fort</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Bhurban')} className="hover:text-white transition-colors">Bhurban & Murree Hills</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Skardu')} className="hover:text-white transition-colors">Skardu Shangrila Lake</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Lahore')} className="hover:text-white transition-colors">Lahore Gulberg Nishat</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Karachi')} className="hover:text-white transition-colors">Karachi Arabian Sea</button></li>
                <li><button onClick={() => handleQuickDestinationSelect('Dubai')} className="hover:text-white transition-colors">Dubai Outbound Luxury</button></li>
              </ul>
            </div>

            {/* Column 3: Partner Agency Services */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#F7E5A9]">
                Agency Privileges
              </div>
              <ul className="space-y-2 text-xs text-blue-200/80">
                <li><span className="hover:text-white cursor-pointer">15% - 18% Wholesale Net Margins</span></li>
                <li><span className="hover:text-white cursor-pointer">Official PDF Client Vouchers</span></li>
                <li><span className="hover:text-white cursor-pointer">Bank Alfalah & HBL Settlements</span></li>
                <li><span className="hover:text-white cursor-pointer">Clefs d'Or Concierge Coordination</span></li>
                <li><span className="hover:text-white cursor-pointer">VIP Airport Prado Transfers</span></li>
                <li><span className="hover:text-white cursor-pointer">Helicopter Safari Charter Liaison</span></li>
              </ul>
            </div>

            {/* Column 4: 24/7 Agent Desk Contact in Pakistan */}
            <div className="space-y-3">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#F7E5A9]">
                24/7 Agent Desk (Pakistan)
              </div>
              <div className="space-y-2.5 text-xs text-blue-200/80">
                <div className="flex items-center gap-3">
                  <img
                    src="/agent-mohsin.jpg"
                    alt="Agent Mohsin"
                    className="h-10 w-10 rounded-full object-cover border border-[#E5C07B] shadow-md"
                  />
                  <div>
                    <div className="text-white font-bold text-sm">Mohsin</div>
                    <div className="text-[#F7E5A9] text-[11px]">Authorized Reservation Lead</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <PhoneCall className="h-4 w-4 text-[#E5C07B]" />
                  <a href="tel:+923143292778" className="font-bold text-white hover:text-[#F7E5A9] font-mono">
                    +92 (314) 3292778
                  </a>
                </div>

                <div>
                  <a
                    href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20a%20luxury%20hotel%20booking%20on%20Famous%20Stay."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-[#25D366] hover:text-[#061026] transition-all"
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
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-300/60">
            <div>
              © 2026 Famous Stay Luxury Hospitality Pakistan (Pvt) Ltd. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">DTS Regulations</span>
              <span className="hover:text-white cursor-pointer transition-colors">Agency Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">TAAP Member Code</span>
              <span className="text-[#F7E5A9]">SBP Approved Wholesale Channel</span>
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
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#061026]/95 backdrop-blur-xl border-t border-[#E5C07B]/40 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
        <div className="flex flex-col min-w-0">
          <div className="text-[10px] uppercase font-bold text-blue-300/80 leading-none">
            Wholesale Rate
          </div>
          <div className="font-serif text-base font-extrabold text-[#F7E5A9] leading-tight">
            Rs. {((flagshipApartment?.clientRate || 145000) * nights).toLocaleString()}
            <span className="text-[10px] font-sans font-normal text-blue-200/70"> ({nights}n)</span>
          </div>
          <div className="text-[10px] font-bold text-emerald-400 leading-none truncate">
            +Rs. {((flagshipApartment?.clientRate || 145000) * nights * 0.18).toLocaleString()} Net (18%)
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20want%20to%20inquire%20about%20booking%20The%20Royal%20Emerald%20Penthouse."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-xl bg-[#25D366] text-[#061026] px-2.5 py-2 text-xs font-extrabold shadow-md active:scale-95 transition-transform"
            title="Chat on WhatsApp"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
            </svg>
            <span className="text-[11px]">Chat</span>
          </a>

          <button
            onClick={() => handleBookRoom(flagshipApartment)}
            className="gold-btn flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold shadow-md active:scale-95 transition-transform"
          >
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
