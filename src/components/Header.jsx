import React, { useState } from 'react';
import { 
  Crown, 
  Briefcase, 
  DollarSign, 
  Search, 
  TrendingUp,
  LogOut,
  LogIn,
  ChevronDown
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
    <header className="sticky top-0 z-40 w-full border-b border-[#E5C07B]/25 bg-[#061026]/95 backdrop-blur-2xl shadow-2xl shadow-[#020712]/70">
      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Title with Custom Royal Emblem */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <Logo />
        </div>

        {/* Center Navigation Tabs in Royal Sapphire with Light Golden Active Pill */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-[#E5C07B]/30 bg-[#0B1A3E]/90 p-1.5 backdrop-blur-md shadow-lg shadow-black/40">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-wide transition-all ${
              activeTab === 'explore'
                ? 'gold-btn text-[#061026]'
                : 'text-blue-100 hover:text-white hover:bg-blue-600/20'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>Suites Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-wide transition-all ${
              activeTab === 'ledger'
                ? 'gold-btn text-[#061026]'
                : 'text-blue-100 hover:text-white hover:bg-blue-600/20'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Bookings Ledger</span>
            {bookingsCount > 0 && (
              <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                activeTab === 'ledger' ? 'bg-[#061026] text-[#F7E5A9]' : 'bg-[#E5C07B] text-[#061026]'
              }`}>
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('commissions')}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-wide transition-all ${
              activeTab === 'commissions'
                ? 'gold-btn text-[#061026]'
                : 'text-blue-100 hover:text-white hover:bg-blue-600/20'
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" />
            <span>Agent Commissions</span>
          </button>
        </nav>

        {/* Right Financial Pill & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Direct WhatsApp Action Button for Mohsin */}
          <a
            href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20a%20luxury%20hotel%20booking%20on%20Famous%20Stay."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat directly on WhatsApp with Agent Mohsin"
            className="flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/15 hover:bg-[#25D366] hover:text-[#061026] text-[#25D366] px-2.5 sm:px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm group shrink-0"
          >
            <svg className="h-4 w-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp:</span>
            <span className="hidden md:inline font-mono text-xs">0314 3292778</span>
            <span className="sm:hidden text-[11px]">Chat</span>
          </a>

          {/* Currency Indicator: Fixed PKR */}
          <div className="hidden sm:flex items-center rounded-xl border border-[#E5C07B]/30 bg-[#091738] px-3 py-1.5 text-xs font-bold text-[#F7E5A9] shadow-sm">
            <span>PKR (Rs.)</span>
          </div>

          {/* Agent Net Profit Pill in PKR */}
          <div 
            onClick={() => setActiveTab('commissions')}
            className="hidden sm:flex cursor-pointer items-center gap-2.5 rounded-2xl border border-[#E5C07B]/35 bg-gradient-to-r from-[#0A1738] to-[#0E2355] px-3.5 py-1.5 transition-all hover:border-[#E5C07B]/70 hover:shadow-lg hover:shadow-[#E5C07B]/15"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#E5C07B]/15 text-[#F7E5A9]">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold tracking-wider text-blue-200/80">
                Commission Balance
              </div>
              <div className="text-xs font-bold text-[#F7E5A9]">
                +{currencySymbol}{totalCommissions.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Authentication State: User Profile vs Sign In Button */}
          {currentUser?.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border border-[#E5C07B]/50 bg-[#0B1E48] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white transition-all hover:border-[#E5C07B] hover:bg-[#0E2458] shadow-md shadow-black/40 shrink-0"
              >
                <div className="relative">
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover object-[center_18%] border-2 border-[#E5C07B] shadow-sm"
                    />
                  ) : (
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF5D0] to-[#E5C07B] text-[#061026] text-xs font-extrabold">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-[#25D366] border-2 border-[#0B1E48]"></span>
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-extrabold text-white flex items-center gap-1">
                    <span>Agent {currentUser.name}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono font-semibold leading-tight">
                    0314 3292778
                  </div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#E5C07B]" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#E5C07B]/35 bg-[#061026] p-3.5 text-xs shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="border-b border-[#E5C07B]/15 pb-3 mb-2 px-1 flex items-center gap-3">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="h-11 w-11 rounded-full object-cover border border-[#E5C07B] shadow-md"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF5D0] to-[#E5C07B] text-[#061026] text-sm font-extrabold">
                        {currentUser.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-white text-sm">{currentUser.name}</div>
                      <div className="text-[11px] text-[#F7E5A9]">{currentUser.agencyName || 'Famous Stay Luxury Desk'}</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">📞 {currentUser.phone || '03143292778'}</div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/923143292778?text=Hello%20Mohsin%2C%20I%20am%20inquiring%20about%20a%20luxury%20hotel%20booking%20on%20Famous%20Stay."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 px-3 py-2 text-left text-emerald-300 hover:bg-[#25D366] hover:text-[#061026] transition-all font-bold my-1"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
                      </svg>
                      <span>Direct WhatsApp Chat</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold">Instant</span>
                  </a>

                  <button
                    onClick={() => { setActiveTab('ledger'); setProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-blue-100 hover:bg-[#0E2355] hover:text-[#F7E5A9] transition-colors"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-[#E5C07B]" />
                    <span>View Client Bookings Ledger</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('commissions'); setProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-blue-100 hover:bg-[#0E2355] hover:text-[#F7E5A9] transition-colors"
                  >
                    <DollarSign className="h-3.5 w-3.5 text-[#E5C07B]" />
                    <span>Commission Settlements (PKR)</span>
                  </button>

                  <div className="border-t border-[#E5C07B]/15 my-1.5 pt-1.5">
                    <button
                      onClick={onSignOut}
                      className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-rose-300 hover:bg-rose-950/30 transition-colors font-semibold"
                    >
                      <LogOut className="h-3.5 w-3.5 text-rose-400" />
                      <span>Switch Account / Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-2xl border border-[#E5C07B]/50 bg-[#0B1E48] px-3.5 py-2 text-xs font-bold text-[#F7E5A9] transition-all hover:bg-[#0E2458] hover:border-[#E5C07B] shadow-md shadow-[#E5C07B]/15"
            >
              <LogIn className="h-3.5 w-3.5 text-[#E5C07B]" />
              <span>Agent Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="flex border-t border-[#E5C07B]/15 md:hidden bg-[#07132E]">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex-1 py-3 text-center text-xs font-bold ${
            activeTab === 'explore' ? 'border-b-2 border-[#E5C07B] text-[#F7E5A9] bg-[#E5C07B]/10' : 'text-blue-200/70'
          }`}
        >
          Suites Catalog
        </button>
        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex-1 py-3 text-center text-xs font-bold ${
            activeTab === 'ledger' ? 'border-b-2 border-[#E5C07B] text-[#F7E5A9] bg-[#E5C07B]/10' : 'text-blue-200/70'
          }`}
        >
          Bookings ({bookingsCount})
        </button>
        <button
          onClick={() => setActiveTab('commissions')}
          className={`flex-1 py-3 text-center text-xs font-bold ${
            activeTab === 'commissions' ? 'border-b-2 border-[#E5C07B] text-[#F7E5A9] bg-[#E5C07B]/10' : 'text-blue-200/70'
          }`}
        >
          Earnings (PKR)
        </button>
      </div>
    </header>
  );
}
