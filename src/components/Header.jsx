import React, { useState } from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Film, 
  LogOut, 
  LogIn, 
  ChevronDown,
  PhoneCall,
  UserCheck,
  Search
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
  const currencySymbol = 'Rs. ';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D4AF37]/25 bg-white/95 backdrop-blur-xl shadow-sm">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="cursor-pointer transition-transform hover:opacity-95"
        >
          <Logo size="default" />
        </div>

        {/* Center Navigation Tabs (Desktop & Laptop) */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#FAF9F5] p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all ${
              activeTab === 'explore'
                ? 'gold-btn text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <Film className="h-3.5 w-3.5 text-[#8C6207]" />
            <span>Video Showcase</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('explore');
              setTimeout(() => {
                const el = document.getElementById('famous-search-console');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold tracking-wide text-slate-600 hover:text-slate-950 hover:bg-white/70 transition-all"
          >
            <Search className="h-3.5 w-3.5 text-[#8C6207]" />
            <span>Search Console</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all ${
              activeTab === 'ledger'
                ? 'gold-btn text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5 text-[#8C6207]" />
            <span>Bookings</span>
            {bookingsCount > 0 && (
              <span className={`ml-0.5 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                activeTab === 'ledger' ? 'bg-slate-950 text-[#F7E5A9]' : 'bg-[#D4AF37] text-slate-950'
              }`}>
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('commissions')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all ${
              activeTab === 'commissions'
                ? 'gold-btn text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <DollarSign className="h-3.5 w-3.5 text-[#8C6207]" />
            <span>Earnings</span>
            <span className="rounded-full bg-[#D4AF37]/25 px-2 py-0.5 text-[10px] font-extrabold text-[#8C6207]">
              {currencySymbol}{totalCommissions.toLocaleString()}
            </span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick WhatsApp Concierge Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20a%20hotel%20booking%20on%20Famous%20Stay."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat directly on WhatsApp with Host Mohsin"
              className="flex items-center gap-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold transition-all shadow-sm group shrink-0"
            >
              <img src="/agent-mohsin.jpg" alt="Mohsin" className="h-4 w-4 rounded-full object-cover object-[center_18%]" />
              <span className="hidden sm:inline">Mohsin</span>
              <span className="hidden xl:inline font-mono text-[11px] opacity-80">(0314 3292778)</span>
            </a>

            <a
              href="https://wa.me/923180985887?text=Hello%20Arsalan%2C%20I%20am%20inquiring%20about%20a%20hotel%20booking%20on%20Famous%20Stay."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat directly on WhatsApp with Agent Arsalan Jutt"
              className="flex items-center gap-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold transition-all shadow-sm group shrink-0"
            >
              <img src="/agent-arsalan.jpg" alt="Arsalan" className="h-4 w-4 rounded-full object-cover object-[center_20%]" />
              <span className="hidden sm:inline">Arsalan</span>
              <span className="hidden xl:inline font-mono text-[11px] opacity-80">(+92 318 0985887)</span>
            </a>
          </div>

          {/* User Profile or Sign In */}
          {currentUser?.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-white hover:bg-[#FAF9F5] px-2.5 py-1.5 text-xs font-bold text-slate-800 transition-all shadow-sm"
              >
                <div className="relative">
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover object-[center_18%] border border-[#D4AF37]"
                    />
                  ) : (
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF5D0] to-[#E5C07B] text-slate-900 text-xs font-bold">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#25D366] border border-white"></span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold leading-none mt-0.5">
                    Online
                  </div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#8C6207]" />
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
                        className="h-10 w-10 rounded-full object-cover border border-[#D4AF37]"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF5D0] to-[#E5C07B] text-slate-900 text-sm font-bold">
                        {currentUser.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{currentUser.name}</div>
                      <div className="text-[11px] text-[#8C6207] font-semibold">{currentUser.agencyName || 'Famous Stay Travel Partner'}</div>
                      <div className="text-[10px] text-emerald-600 font-mono font-bold mt-0.5">📞 {currentUser.phone || '0314 3292778'}</div>
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

                    <a
                      href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20a%20hotel%20booking%20on%20Famous%20Stay."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white text-[#128C7E] px-2.5 py-2 text-left transition-all font-bold text-xs"
                    >
                      <img src="/agent-mohsin.jpg" alt="Mohsin" className="h-4 w-4 rounded-full object-cover object-[center_18%]" />
                      <span>WhatsApp Mohsin (0314 3292778)</span>
                    </a>

                    <a
                      href="https://wa.me/923180985887?text=Hello%20Arsalan%2C%20I%20am%20inquiring%20about%20a%20hotel%20booking%20on%20Famous%20Stay."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white text-[#128C7E] px-2.5 py-2 text-left transition-all font-bold text-xs"
                    >
                      <img src="/agent-arsalan.jpg" alt="Arsalan" className="h-4 w-4 rounded-full object-cover object-[center_20%]" />
                      <span>WhatsApp Arsalan (+92 318 0985887)</span>
                    </a>
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
              className="flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/50 bg-[#FFFDF7] hover:bg-[#D4AF37] hover:text-white px-3.5 py-2 text-xs font-bold text-[#8C6207] transition-all shadow-sm"
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
              ? 'bg-white text-[#8C6207] shadow-sm border border-[#D4AF37]/35 font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Film className="h-3.5 w-3.5" />
          <span>Videos</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ledger'
              ? 'bg-white text-[#8C6207] shadow-sm border border-[#D4AF37]/35 font-extrabold'
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
              ? 'bg-white text-[#8C6207] shadow-sm border border-[#D4AF37]/35 font-extrabold'
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
