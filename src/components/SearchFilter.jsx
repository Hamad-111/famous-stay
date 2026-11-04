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
      {/* Search Console Container in White & Golden Luxury Style */}
      <div className="relative rounded-3xl p-5 sm:p-7 shadow-xl shadow-[#D4AF37]/10 bg-white/95 border border-[#D4AF37]/35 backdrop-blur-xl">
        {/* Top Header Row */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFFDF5] via-[#F5E6B8] to-[#D4AF37] text-[#8C6207] shadow-md shadow-[#D4AF37]/20 font-bold">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wide text-slate-900">
                B2B Suite Finder & Availability Engine
              </h2>
              <p className="text-[11px] text-slate-600">
                Direct luxury partner channel with real-time wholesale net rates & guaranteed commissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#FFFDF5] border border-[#D4AF37]/50 px-3.5 py-1 text-xs font-bold text-[#8C6207]">
              {totalResults} {totalResults === 1 ? 'Suite Available' : 'Suites Available'}
            </span>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#D4AF37] hover:bg-[#FFFDF7] hover:text-[#8C6207]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#8C6207]" />
              <span>{showAdvanced ? 'Hide Amenities' : 'Filter Amenities'}</span>
            </button>
          </div>
        </div>

        {/* Primary Search Inputs Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {/* Destination */}
          <div className="lg:col-span-4">
            <label className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span>Destination or Hotel</span>
              <span className="text-[10px] text-[#8C6207] font-semibold">Global 5-Star Portfolio</span>
            </label>
            <div className="relative flex items-center">
              <MapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C6207]" />
              <select
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                className="w-full appearance-none rounded-xl border border-[#D4AF37]/35 bg-[#FAF9F5] py-3.5 pl-10 pr-9 text-sm font-semibold text-slate-900 shadow-sm transition-colors focus:border-[#D4AF37] focus:bg-white focus:outline-none"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest} className="bg-white text-slate-900">
                    {dest}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Check-In */}
          <div className="lg:col-span-3">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Check-In Date
            </label>
            <div className="relative flex items-center">
              <Calendar className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C6207]" />
              <input
                type="date"
                value={filters.checkIn}
                onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                className="w-full rounded-xl border border-[#D4AF37]/35 bg-[#FAF9F5] py-3.5 pl-10 pr-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors focus:border-[#D4AF37] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Check-Out & Nights Pill */}
          <div className="lg:col-span-3">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Check-Out Date
              </label>
              <span className="rounded-full bg-[#FFFDF5] border border-[#D4AF37]/50 px-2.5 py-0.5 text-[10px] font-extrabold text-[#8C6207]">
                {diffDays} {diffDays === 1 ? 'Night' : 'Nights'}
              </span>
            </div>
            <div className="relative flex items-center">
              <Calendar className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C6207]" />
              <input
                type="date"
                value={filters.checkOut}
                onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                className="w-full rounded-xl border border-[#D4AF37]/35 bg-[#FAF9F5] py-3.5 pl-10 pr-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors focus:border-[#D4AF37] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Client Guests
            </label>
            <div className="relative flex items-center">
              <Users className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#8C6207]" />
              <select
                value={filters.guests}
                onChange={(e) => setFilters({ ...filters, guests: Number(e.target.value) })}
                className="w-full appearance-none rounded-xl border border-[#D4AF37]/35 bg-[#FAF9F5] py-3.5 pl-10 pr-8 text-sm font-semibold text-slate-900 shadow-sm transition-colors focus:border-[#D4AF37] focus:bg-white focus:outline-none"
              >
                <option value={1} className="bg-white text-slate-900">1 Guest</option>
                <option value={2} className="bg-white text-slate-900">2 Guests</option>
                <option value={3} className="bg-white text-slate-900">3 Guests</option>
                <option value={4} className="bg-white text-slate-900">4+ Guests</option>
                <option value={6} className="bg-white text-slate-900">6+ Family/VIP</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Secondary Category & Sort Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/20 pt-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#8C6207] mr-1 flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-[#8C6207]" /> Style:
            </span>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                  filters.category === cat
                    ? 'gold-btn text-[#120D03]'
                    : 'bg-[#FAF8F2] text-slate-700 hover:bg-white hover:text-slate-900 border border-[#D4AF37]/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-medium">Sort Inventory:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="rounded-xl border border-[#D4AF37]/40 bg-white px-3 py-1.5 text-xs font-bold text-[#8C6207] outline-none focus:border-[#D4AF37]"
            >
              <option value="recommended" className="bg-white text-slate-900">Recommended Luxury</option>
              <option value="commission-high" className="bg-white text-slate-900">Highest Agent Commission (PKR)</option>
              <option value="price-low" className="bg-white text-slate-900">Lowest Client Rate (PKR)</option>
              <option value="price-high" className="bg-white text-slate-900">Highest Client Rate (PKR)</option>
              <option value="rating" className="bg-white text-slate-900">Guest Rating (5.0★)</option>
            </select>
          </div>
        </div>

        {/* Advanced Amenities Filter Drawer */}
        {showAdvanced && (
          <div className="mt-4 space-y-4 rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] p-5 animate-in fade-in slide-in-from-top-3 duration-200">
            <div>
              <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-[#8C6207]">
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
                          ? 'border border-[#D4AF37] bg-[#FFFDF5] text-[#8C6207] font-bold shadow-sm'
                          : 'border border-[#D4AF37]/25 bg-white text-slate-700 hover:text-slate-900 hover:border-[#D4AF37]'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-3.5 w-3.5 text-[#8C6207]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/50"></span>
                      )}
                      <span>{perk}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/20 pt-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.instantOnly}
                  onChange={(e) => setFilters({ ...filters, instantOnly: e.target.checked })}
                  className="rounded border-[#D4AF37]/40 bg-white text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="font-medium">Instant Agent Confirmation Only (Skip hotel desk approval)</span>
              </label>

              <button
                onClick={onReset}
                className="text-[#8C6207] hover:text-[#664604] underline underline-offset-4 font-semibold"
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
