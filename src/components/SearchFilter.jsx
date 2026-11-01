import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  X,
  Percent,
  Layers,
  ChevronDown,
  Building,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { DESTINATIONS, CATEGORIES } from '../data/hotels';

export default function SearchFilter({
  filters,
  setFilters,
  onReset,
  totalResults
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const luxuryPerks = [
    "Private Infinity Pool",
    "24/7 Dedicated Butler",
    "Overwater Villa",
    "Airport Chauffeur (Rolls-Royce / Mercedes)",
    "Breakfast Included",
    "Helicopter / Seaplane Access",
    "Michelin Dining in Suite",
    "Panoramic Ocean / Skyline View"
  ];

  const togglePerk = (perk) => {
    if (filters.selectedPerks.includes(perk)) {
      setFilters({
        ...filters,
        selectedPerks: filters.selectedPerks.filter(p => p !== perk)
      });
    } else {
      setFilters({
        ...filters,
        selectedPerks: [...filters.selectedPerks, perk]
      });
    }
  };

  // Calculate nights
  const checkInDate = new Date(filters.checkIn);
  const checkOutDate = new Date(filters.checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  return (
    <div className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Search Console Container in Sapphire Blue with Light Golden Accents */}
      <div className="glass-blue-elevated relative rounded-3xl p-5 sm:p-7 shadow-2xl">
        {/* Top Header Row */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5C07B]/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF5D0] via-[#E5C07B] to-[#B88A1F] text-[#061026] shadow-md shadow-[#E5C07B]/30 font-bold">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wide text-white">
                B2B Suite Finder & Availability Engine
              </h2>
              <p className="text-[11px] text-blue-200/80">
                Direct luxury partner channel with real-time wholesale net rates & guaranteed commissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#E5C07B]/15 border border-[#E5C07B]/40 px-3.5 py-1 text-xs font-bold text-[#F7E5A9]">
              {totalResults} {totalResults === 1 ? 'Suite Available' : 'Suites Available'}
            </span>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 rounded-xl border border-[#E5C07B]/30 bg-[#0B1A3E] px-3.5 py-1.5 text-xs font-semibold text-blue-100 transition-colors hover:border-[#E5C07B]/70 hover:bg-[#0E2252]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#E5C07B]" />
              <span>{showAdvanced ? 'Hide Amenities' : 'Filter Amenities'}</span>
            </button>
          </div>
        </div>

        {/* Primary Search Inputs Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {/* Destination */}
          <div className="lg:col-span-4">
            <label className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-200">
              <span>Destination or Hotel</span>
              <span className="text-[10px] text-[#F7E5A9] font-normal">Global 5-Star Portfolio</span>
            </label>
            <div className="relative flex items-center">
              <MapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#E5C07B]" />
              <select
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                className="w-full appearance-none rounded-xl border border-[#E5C07B]/30 bg-[#061026]/90 py-3.5 pl-10 pr-9 text-sm font-semibold text-white shadow-inner transition-colors focus:border-[#E5C07B] focus:bg-[#071430] focus:outline-none"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest} className="bg-[#07132F] text-white">
                    {dest}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-blue-300/60" />
            </div>
          </div>

          {/* Check-In */}
          <div className="lg:col-span-3">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-blue-200">
              Check-In Date
            </label>
            <div className="relative flex items-center">
              <Calendar className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#E5C07B]" />
              <input
                type="date"
                value={filters.checkIn}
                onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026]/90 py-3.5 pl-10 pr-3 text-sm font-semibold text-white shadow-inner transition-colors focus:border-[#E5C07B] focus:bg-[#071430] focus:outline-none"
              />
            </div>
          </div>

          {/* Check-Out & Nights Pill */}
          <div className="lg:col-span-3">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Check-Out Date
              </label>
              <span className="rounded-full bg-[#E5C07B]/20 border border-[#E5C07B]/40 px-2.5 py-0.5 text-[10px] font-extrabold text-[#F7E5A9]">
                {diffDays} {diffDays === 1 ? 'Night' : 'Nights'}
              </span>
            </div>
            <div className="relative flex items-center">
              <Calendar className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#E5C07B]" />
              <input
                type="date"
                value={filters.checkOut}
                onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026]/90 py-3.5 pl-10 pr-3 text-sm font-semibold text-white shadow-inner transition-colors focus:border-[#E5C07B] focus:bg-[#071430] focus:outline-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-blue-200">
              Client Guests
            </label>
            <div className="relative flex items-center">
              <Users className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#E5C07B]" />
              <select
                value={filters.guests}
                onChange={(e) => setFilters({ ...filters, guests: Number(e.target.value) })}
                className="w-full appearance-none rounded-xl border border-[#E5C07B]/30 bg-[#061026]/90 py-3.5 pl-10 pr-8 text-sm font-semibold text-white shadow-inner transition-colors focus:border-[#E5C07B] focus:bg-[#071430] focus:outline-none"
              >
                <option value={1} className="bg-[#07132F] text-white">1 Guest</option>
                <option value={2} className="bg-[#07132F] text-white">2 Guests</option>
                <option value={3} className="bg-[#07132F] text-white">3 Guests</option>
                <option value={4} className="bg-[#07132F] text-white">4+ Guests</option>
                <option value={6} className="bg-[#07132F] text-white">6+ Family/VIP</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-blue-300/60" />
            </div>
          </div>
        </div>

        {/* Secondary Category & Sort Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5C07B]/20 pt-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#E5C07B] mr-1 flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-[#E5C07B]" /> Style:
            </span>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                  filters.category === cat
                    ? 'gold-btn text-[#061026]'
                    : 'bg-[#081534] text-blue-100 hover:bg-[#0E2252] hover:text-white border border-[#E5C07B]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-blue-200 font-medium">Sort Inventory:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="rounded-xl border border-[#E5C07B]/30 bg-[#061026] px-3 py-1.5 text-xs font-bold text-[#F7E5A9] outline-none focus:border-[#E5C07B]"
            >
              <option value="recommended" className="bg-[#07132F] text-white">Recommended Luxury</option>
              <option value="commission-high" className="bg-[#07132F] text-white">Highest Agent Commission (PKR)</option>
              <option value="price-low" className="bg-[#07132F] text-white">Lowest Client Rate (PKR)</option>
              <option value="price-high" className="bg-[#07132F] text-white">Highest Client Rate (PKR)</option>
              <option value="rating" className="bg-[#07132F] text-white">Guest Rating (5.0★)</option>
            </select>
          </div>
        </div>

        {/* Advanced Amenities Filter Drawer */}
        {showAdvanced && (
          <div className="mt-4 space-y-4 rounded-2xl border border-[#E5C07B]/25 bg-[#050C1F]/90 p-5 animate-in fade-in slide-in-from-top-3 duration-200">
            <div>
              <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-[#F7E5A9]">
                Guaranteed Inclusions & VIP Amenities:
              </label>
              <div className="flex flex-wrap gap-2">
                {luxuryPerks.map((perk) => {
                  const isSelected = filters.selectedPerks.includes(perk);
                  return (
                    <button
                      key={perk}
                      onClick={() => togglePerk(perk)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? 'border border-[#E5C07B] bg-[#E5C07B]/20 text-[#F7E5A9] font-bold'
                          : 'border border-blue-400/20 bg-[#081534] text-blue-200 hover:text-white hover:border-[#E5C07B]/40'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-3.5 w-3.5 text-[#E5C07B]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50"></span>
                      )}
                      <span>{perk}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5C07B]/20 pt-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-blue-200 hover:text-white">
                <input
                  type="checkbox"
                  checked={filters.instantOnly}
                  onChange={(e) => setFilters({ ...filters, instantOnly: e.target.checked })}
                  className="rounded border-[#E5C07B]/40 bg-[#061026] text-[#E5C07B] focus:ring-[#E5C07B]"
                />
                <span className="font-medium">Instant Agent Confirmation Only (Skip hotel desk approval)</span>
              </label>

              <button
                onClick={onReset}
                className="text-[#F7E5A9] hover:text-white underline underline-offset-4 font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
