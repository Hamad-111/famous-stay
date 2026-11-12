import React, { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Film, 
  LogOut, 
  LogIn, 
  ChevronDown,
  PhoneCall,
  UserCheck,
  Search,
  MessageCircle,
  ShieldCheck,
  ExternalLink,
  Phone
} from 'lucide-react';
import Logo from './Logo';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  bookingsCount, 
  totalCommissions, 
  currentUser,
  onOpenAuth,
  onSignOut
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [conciergeDropdownOpen, setConciergeDropdownOpen] = useState(false);
  const currencySymbol = 'Rs. ';

  const profileRef = useRef(null);
  const conciergeRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (conciergeRef.current && !conciergeRef.current.contains(event.target)) {
        setConciergeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D4AF37]/25 bg-white/95 backdrop-blur-xl shadow-xs">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 gap-2">
        {/* Brand Logo (Left) */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="cursor-pointer transition-transform hover:opacity-95 shrink-0"
        >
          <Logo size="default" />
        </div>

        {/* Center Navigation Tabs (Responsive: Desktop & Laptop) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 rounded-full border border-[#D4AF37]/30 bg-[#FAF9F5] p-1 shadow-xs shrink-0">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-1.5 xl:gap-2 rounded-full px-3 xl:px-4 py-1.5 xl:py-2 text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
              activeTab === 'explore'
                ? 'gold-btn text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <Film className="h-3.5 w-3.5 text-[#8C6207] shrink-0" />
            <span className="hidden xl:inline">Video Showcase</span>
            <span className="xl:hidden">Showcase</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('explore');
              setTimeout(() => {
                const el = document.getElementById('famous-search-console');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex items-center gap-1.5 rounded-full px-3 xl:px-3.5 py-1.5 xl:py-2 text-xs font-bold tracking-wide text-slate-600 hover:text-slate-950 hover:bg-white/70 transition-all whitespace-nowrap"
          >
            <Search className="h-3.5 w-3.5 text-[#8C6207] shrink-0" />
            <span className="hidden xl:inline">Search Console</span>
            <span className="xl:hidden">Search</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center gap-1.5 xl:gap-2 rounded-full px-3 xl:px-4 py-1.5 xl:py-2 text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
              activeTab === 'ledger'
                ? 'gold-btn text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5 text-[#8C6207] shrink-0" />
            <span>Bookings</span>
            {bookingsCount > 0 && (
              <span className={`ml-0.5 rounded-full px-1.5 xl:px-2 py-0.5 text-[10px] font-extrabold ${
                activeTab === 'ledger' ? 'bg-slate-950 text-[#F7E5A9]' : 'bg-[#D4AF37] text-slate-950'
              }`}>
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('commissions')}
            className={`flex items-center gap-1.5 xl:gap-2 rounded-full px-3 xl:px-4 py-1.5 xl:py-2 text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
              activeTab === 'commissions'
                ? 'gold-btn text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <DollarSign className="h-3.5 w-3.5 text-[#8C6207] shrink-0" />
            <span className="hidden xl:inline">Earnings</span>
            <span className="rounded-full bg-[#D4AF37]/25 px-2 py-0.5 text-[10px] font-extrabold text-[#8C6207]">
              {currencySymbol}{totalCommissions.toLocaleString()}
            </span>
          </button>
        </nav>

        {/* Right Action Controls (VIP Concierge + Profile) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Unified 24/7 VIP Concierge Dropdown Pill */}
          <div ref={conciergeRef} className="relative shrink-0">
            <button
              onClick={() => {
                setConciergeDropdownOpen(!conciergeDropdownOpen);
                setProfileDropdownOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-gradient-to-r from-emerald-50 via-[#F0FDF4] to-emerald-100/70 hover:from-emerald-100 hover:to-emerald-200/80 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-bold text-emerald-950 transition-all shadow-xs shrink-0 whitespace-nowrap group"
              title="24/7 VIP Concierge & WhatsApp Desk (Usman & Arsalan)"
            >
              {/* WhatsApp Icon with Live Online Ping */}
              <div className="relative flex items-center justify-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {/* Overlapping Agent Avatars */}
              <div className="flex items-center -space-x-1.5 shrink-0">
                <img
                  src="/agent-usman.jpg"
                  alt="Usman"
                  className="h-5 w-5 rounded-full object-cover object-[center_12%] border border-white shadow-xs"
                />
                <img
                  src="/agent-arsalan.jpg"
                  alt="Arsalan"
                  className="h-5 w-5 rounded-full object-cover object-[center_20%] border border-white shadow-xs"
                />
              </div>

              <span className="text-[11px] sm:text-xs font-bold text-emerald-900 group-hover:text-emerald-950">
                <span className="hidden sm:inline">24/7 VIP Concierge</span>
                <span className="sm:hidden">VIP Desk</span>
              </span>

              <ChevronDown className={`h-3 w-3 text-emerald-700 transition-transform duration-200 shrink-0 ${conciergeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* VIP Concierge Dropdown Menu */}
            {conciergeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border-2 border-emerald-500/40 bg-white p-3.5 shadow-2xl shadow-emerald-900/15 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-900">
                      Direct VIP Concierge
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800">
                    Online Now
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Agent Usman Option */}
                  <div className="rounded-xl border border-slate-200/90 bg-[#FAF9F5] p-2.5 transition-all hover:border-emerald-400 hover:bg-emerald-50/40">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img
                            src="/agent-usman.jpg"
                            alt="Host Usman"
                            className="h-8 w-8 rounded-full object-cover object-[center_12%] border border-emerald-500"
                          />
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#25D366] border border-white"></span>
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">Agent Usman</div>
                          <div className="text-[10px] text-[#8C6207] font-semibold">Lead Reservation Host</div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500 font-bold">0348 0964370</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <a
                        href="https://wa.me/923480964370?text=Hello%20Usman%2C%20I%20am%20inquiring%20about%20a%20hotel%20booking%20on%20Famous%20Stay."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white py-1 px-2 text-[11px] font-bold shadow-xs transition-all"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="tel:+923480964370"
                        className="flex items-center justify-center gap-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 py-1 px-2 text-[11px] font-bold shadow-xs transition-all"
                      >
                        <Phone className="h-3 w-3 text-emerald-600" />
                        <span>Direct Call</span>
                      </a>
                    </div>
                  </div>

                  {/* Agent Arsalan Jutt Option */}
                  <div className="rounded-xl border border-slate-200/90 bg-[#FAF9F5] p-2.5 transition-all hover:border-emerald-400 hover:bg-emerald-50/40">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img
                            src="/agent-arsalan.jpg"
                            alt="Agent Arsalan"
                            className="h-8 w-8 rounded-full object-cover object-[center_20%] border border-emerald-500"
                          />
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#25D366] border border-white"></span>
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">Arsalan Jutt</div>
                          <div className="text-[10px] text-[#8C6207] font-semibold">VIP Booking Specialist</div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500 font-bold">+92 318 0985887</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <a
                        href="https://wa.me/923180985887?text=Hello%20Arsalan%2C%20I%20am%20inquiring%20about%20a%20hotel%20booking%20on%20Famous%20Stay."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white py-1 px-2 text-[11px] font-bold shadow-xs transition-all"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="tel:+923180985887"
                        className="flex items-center justify-center gap-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 py-1 px-2 text-[11px] font-bold shadow-xs transition-all"
                      >
                        <Phone className="h-3 w-3 text-emerald-600" />
                        <span>Direct Call</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 text-center">
                  <span className="text-[10px] text-slate-500 font-medium">
                    Islamabad Tourism License DTS ISB-4921 • TAAP #2841
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* User Profile or Sign In (Right) */}
          {currentUser?.isLoggedIn ? (
            <div ref={profileRef} className="relative shrink-0">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setConciergeDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-[#D4AF37]/45 bg-white hover:bg-[#FAF9F5] px-2 sm:px-2.5 py-1.5 text-xs font-bold text-slate-800 transition-all shadow-xs shrink-0 whitespace-nowrap"
              >
                <div className="relative shrink-0">
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover object-[center_12%] border border-[#D4AF37]"
                    />
                  ) : (
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF5D0] to-[#E5C07B] text-slate-900 text-xs font-bold">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#25D366] border border-white"></span>
                </div>
                <div className="hidden sm:block text-left whitespace-nowrap">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold leading-none mt-0.5">
                    Online
                  </div>
                </div>
                <ChevronDown className={`h-3.5 w-3.5 text-[#8C6207] shrink-0 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#D4AF37]/40 bg-white p-3.5 text-xs shadow-2xl shadow-[#D4AF37]/20 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="border-b border-[#D4AF37]/20 pb-3 mb-2 px-1 flex items-center gap-3">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="h-10 w-10 rounded-full object-cover object-[center_12%] border border-[#D4AF37]"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF5D0] to-[#E5C07B] text-slate-900 text-sm font-bold">
                        {currentUser.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{currentUser.name}</div>
                      <div className="text-[11px] text-[#8C6207] font-semibold">{currentUser.agencyName || 'Famous Stay Travel Partner'}</div>
                      <div className="text-[10px] text-emerald-600 font-mono font-bold mt-0.5">📞 {currentUser.phone || '0348 0964370'}</div>
                    </div>
                  </div>

                  {/* Earnings Summary Pill inside Profile */}
                  <div 
                    onClick={() => setActiveTab('commissions')}
                    className="cursor-pointer rounded-xl bg-gradient-to-r from-[#FFFDF8] to-[#FAF4E2] border border-[#D4AF37]/35 p-2.5 mb-2 transition-all hover:border-[#D4AF37]"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-600">Commission Earnings:</span>
                      <span className="font-extrabold text-[#8C6207]">+{currencySymbol}{totalCommissions.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('explore');
                        setTimeout(() => {
                          const el = document.getElementById('famous-search-console');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-slate-700 hover:bg-[#FAF6EA] hover:text-[#8C6207] transition-colors font-bold text-xs"
                    >
                      <Search className="h-3.5 w-3.5 text-[#8C6207]" />
                      <span>Famous Search Console</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('ledger')}
                      className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-slate-700 hover:bg-[#FAF6EA] hover:text-[#8C6207] transition-colors"
                    >
                      <Briefcase className="h-3.5 w-3.5 text-[#8C6207]" />
                      <span>Bookings Ledger ({bookingsCount})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('commissions')}
                      className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-slate-700 hover:bg-[#FAF6EA] hover:text-[#8C6207] transition-colors"
                    >
                      <DollarSign className="h-3.5 w-3.5 text-[#8C6207]" />
                      <span>Commission Settlements (PKR)</span>
                    </button>
                  </div>

                  <div className="border-t border-[#D4AF37]/20 my-1.5 pt-1.5">
                    <button
                      onClick={onSignOut}
                      className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-rose-600 hover:bg-rose-50 transition-colors font-semibold"
                    >
                      <LogOut className="h-3.5 w-3.5 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/50 bg-[#FFFDF7] hover:bg-[#D4AF37] hover:text-white px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-[#8C6207] transition-all shadow-xs shrink-0 whitespace-nowrap"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Agent Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Tab Navigation Bar (< lg screens) */}
      <div className="lg:hidden flex items-center border-t border-[#D4AF37]/20 bg-[#FAF9F5] px-2 py-1.5">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'explore'
              ? 'bg-white text-[#8C6207] shadow-xs border border-[#D4AF37]/35 font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Film className="h-3.5 w-3.5" />
          <span>Videos</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('explore');
            setTimeout(() => {
              const el = document.getElementById('famous-search-console');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition-all"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ledger'
              ? 'bg-white text-[#8C6207] shadow-xs border border-[#D4AF37]/35 font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Bookings</span>
          {bookingsCount > 0 && (
            <span className="rounded-full bg-slate-900 px-1.5 py-0.2 text-[10px] font-extrabold text-[#F7E5A9]">
              {bookingsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('commissions')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'commissions'
              ? 'bg-white text-[#8C6207] shadow-xs border border-[#D4AF37]/35 font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="h-3.5 w-3.5" />
          <span>Earnings</span>
        </button>
      </div>
    </header>
  );
}
