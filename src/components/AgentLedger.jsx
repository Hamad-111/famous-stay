import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  Printer, 
  Mail, 
  MapPin, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AgentLedger({ 
  bookings, 
  currency, 
  onViewVoucher, 
  onNewBookingClick 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Currency is strictly in Pakistani Rupees (PKR)
  const currencySymbol = 'Rs. ';

  // Calculate totals (PKR)
  const totalBookings = bookings.length;
  const totalGrossClient = bookings.reduce((sum, b) => sum + (b.clientTotal || 0), 0);
  const totalNetCommissions = bookings.reduce((sum, b) => sum + (b.agentCommission || 0), 0);
  const totalNights = bookings.reduce((sum, b) => sum + (b.nights || 0), 0);
  const avgCommissionPct = totalGrossClient > 0 ? ((totalNetCommissions / totalGrossClient) * 100).toFixed(1) : 16.0;

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.hotelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.agentPnr?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5C07B]/20 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF5D0] via-[#E5C07B] to-[#B88A1F] text-[#061026] shadow-md shadow-[#E5C07B]/25 font-bold">
              <Briefcase className="h-5 w-5" />
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Client Bookings & Commission Ledger
            </h1>
          </div>
          <p className="mt-1 text-xs text-blue-200/80">
            Real-time management for all luxury client reservations, vouchers, and commission settlements.
          </p>
        </div>

        <button
          onClick={onNewBookingClick}
          className="gold-btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold"
        >
          <Sparkles className="h-4 w-4" />
          <span>Book Another Room</span>
        </button>
      </div>

      {/* KPI Cards Grid in Sapphire Blue & Light Gold */}
      <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Bookings */}
        <div className="glass-blue-panel rounded-2xl p-5 border border-[#E5C07B]/25">
          <div className="flex items-center justify-between text-xs text-blue-200">
            <span className="uppercase font-bold tracking-wider">Total Reservations</span>
            <Briefcase className="h-4 w-4 text-[#E5C07B]" />
          </div>
          <div className="mt-2 font-serif text-3xl font-bold text-white">
            {totalBookings}
          </div>
          <div className="mt-1 text-xs text-blue-300">
            {totalNights} Total Guest Nights Booked
          </div>
        </div>

        {/* Total Gross Volume */}
        <div className="glass-blue-panel rounded-2xl p-5 border border-[#E5C07B]/25">
          <div className="flex items-center justify-between text-xs text-blue-200">
            <span className="uppercase font-bold tracking-wider">Gross Client Value</span>
            <DollarSign className="h-4 w-4 text-[#E5C07B]" />
          </div>
          <div className="mt-2 font-serif text-3xl font-bold text-white">
            {currencySymbol}{totalGrossClient.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-[#F7E5A9] font-medium">
            Direct High-Net-Worth Volume
          </div>
        </div>

        {/* Net Agent Commission Earned */}
        <div className="glass-blue-panel rounded-2xl p-5 border border-[#E5C07B]/45 bg-gradient-to-br from-[#0C2050] to-[#07132F]">
          <div className="flex items-center justify-between text-xs text-[#E5C07B]">
            <span className="uppercase font-extrabold tracking-wider">Agent Commission Earned</span>
            <TrendingUp className="h-4 w-4 text-[#E5C07B]" />
          </div>
          <div className="mt-2 font-serif text-3xl font-bold text-[#F7E5A9]">
            +{currencySymbol}{totalNetCommissions.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-blue-200">
            Average {avgCommissionPct}% Commission Rate
          </div>
        </div>

        {/* Agency Partner Status */}
        <div className="glass-blue-panel rounded-2xl p-5 border border-[#60A5FA]/30 bg-gradient-to-br from-[#0B2154] to-[#07132F]">
          <div className="flex items-center justify-between text-xs text-[#93C5FD]">
            <span className="uppercase font-extrabold tracking-wider">Agent Status</span>
            <ShieldCheck className="h-4 w-4 text-[#60A5FA]" />
          </div>
          <div className="mt-2 font-serif text-2xl font-bold text-white">
            Diamond Elite
          </div>
          <div className="mt-1 text-xs text-blue-200">
            Next payout: 1st of next month
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E5C07B]/25 bg-[#081534] p-4">
        <div className="relative min-w-[280px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#E5C07B]" />
          <input
            type="text"
            placeholder="Search by client name, PNR, hotel, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#050E24] py-2 pl-9 pr-3 text-xs font-semibold text-white placeholder-blue-300/50 outline-none focus:border-[#E5C07B]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-200 font-medium flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-[#E5C07B]" /> Status:
          </span>
          {['All', 'Confirmed', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                statusFilter === status
                  ? 'gold-btn text-[#061026]'
                  : 'bg-[#0B1A3E] text-blue-100 hover:bg-[#0E2252] border border-[#E5C07B]/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List / Table */}
      {filteredBookings.length === 0 ? (
        <div className="glass-blue-panel rounded-3xl p-12 text-center border border-[#E5C07B]/20">
          <Briefcase className="mx-auto h-12 w-12 text-blue-400/40" />
          <h3 className="mt-3 font-serif text-lg font-bold text-white">No client bookings found</h3>
          <p className="mt-1 text-xs text-blue-200">
            Try adjusting your search criteria or book a new luxury suite for a client.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="luxury-card group relative overflow-hidden rounded-3xl border border-[#E5C07B]/25 bg-[#081534] p-6 transition-all hover:border-[#E5C07B]/60 hover:bg-[#0B1E48]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Left: Client & Suite Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#F7E5A9] bg-[#050E24] px-2.5 py-1 rounded-lg border border-[#E5C07B]/30">
                      {booking.id}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0E2D64] px-3 py-0.5 text-[11px] font-bold text-[#93C5FD] border border-[#3B82F6]/30">
                      <CheckCircle2 className="h-3 w-3 text-[#60A5FA]" />
                      {booking.status}
                    </span>
                    <span className="text-xs text-blue-300">• Booked on {booking.bookingDate}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {booking.clientName}
                    </h3>
                    <div className="text-xs text-blue-200">
                      {booking.clientEmail} • {booking.clientPhone}
                    </div>
                  </div>

                  <div className="text-xs text-blue-100">
                    <span className="font-bold text-[#F7E5A9]">{booking.roomName}</span>
                    <span className="mx-1.5 text-blue-400">—</span>
                    <span>{booking.hotelName} ({booking.destination})</span>
                  </div>

                  {booking.specialRequests && (
                    <div className="text-xs text-blue-200 italic line-clamp-1 max-w-xl">
                      "{booking.specialRequests}"
                    </div>
                  )}
                </div>

                {/* Right: Financials & Action Buttons */}
                <div className="flex flex-col items-end gap-3 text-right">
                  <div>
                    <div className="text-xs text-blue-200">Client Total Quoted:</div>
                    <div className="font-serif text-2xl font-bold text-white">
                      {currencySymbol}{Math.round((booking.clientTotal || 0) * currencyRate).toLocaleString()}
                    </div>
                    <div className="text-xs font-bold text-[#F7E5A9]">
                      +{currencySymbol}{Math.round((booking.agentCommission || 0) * currencyRate).toLocaleString()} Commission ({booking.commissionPct}%)
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewVoucher(booking)}
                      className="gold-btn flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>View Guest Voucher</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Details Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between border-t border-[#E5C07B]/15 pt-3.5 text-xs text-blue-200/80">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-blue-100">
                    <Calendar className="h-3.5 w-3.5 text-[#E5C07B]" />
                    <span>{booking.checkIn} → {booking.checkOut} ({booking.nights} nights)</span>
                  </div>
                  <div>Guests: <strong className="text-white">{booking.guests}</strong></div>
                  <div>Settlement: <strong className="text-[#F7E5A9]">{booking.paymentMode}</strong></div>
                </div>

                <div className="font-mono text-[11px] text-[#E5C07B] font-bold">
                  Ref PNR: {booking.agentPnr}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
