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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl gold-btn text-slate-950 shadow-sm font-bold">
              <Briefcase className="h-5 w-5" />
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Client Bookings & Commission Ledger
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Real-time management for all luxury client reservations, vouchers, and commission settlements.
          </p>
        </div>

        <button
          onClick={onNewBookingClick}
          className="gold-btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-md shadow-[#D4AF37]/20"
        >
          <Sparkles className="h-4 w-4" />
          <span>Book Another Room</span>
        </button>
      </div>

      {/* KPI Cards Grid in White & Royal Gold */}
      <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Bookings */}
        <div className="rounded-2xl p-5 border border-[#D4AF37]/35 bg-white shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="uppercase font-bold tracking-wider">Total Reservations</span>
            <Briefcase className="h-4 w-4 text-[#8C6207]" />
          </div>
          <div className="mt-2 font-serif text-3xl font-bold text-slate-900">
            {totalBookings}
          </div>
          <div className="mt-1 text-xs text-slate-600">
            {totalNights} Total Guest Nights Booked
          </div>
        </div>

        {/* Total Gross Volume */}
        <div className="rounded-2xl p-5 border border-[#D4AF37]/35 bg-white shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="uppercase font-bold tracking-wider">Gross Client Value</span>
            <DollarSign className="h-4 w-4 text-[#8C6207]" />
          </div>
          <div className="mt-2 font-serif text-3xl font-bold text-slate-900">
            {currencySymbol}{totalGrossClient.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-[#8C6207] font-semibold">
            Direct High-Net-Worth Volume
          </div>
        </div>

        {/* Net Agent Commission Earned */}
        <div className="rounded-2xl p-5 border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EC] to-[#FFF4D4] shadow-md shadow-[#D4AF37]/15">
          <div className="flex items-center justify-between text-xs text-[#8C6207]">
            <span className="uppercase font-extrabold tracking-wider">Agent Commission Earned</span>
            <TrendingUp className="h-4 w-4 text-[#8C6207]" />
          </div>
          <div className="mt-2 font-serif text-3xl font-extrabold text-[#8C6207]">
            +{currencySymbol}{totalNetCommissions.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-slate-600">
            Average {avgCommissionPct}% Commission Rate
          </div>
        </div>

        {/* Agency Partner Status */}
        <div className="rounded-2xl p-5 border border-emerald-300 bg-emerald-50/70 shadow-sm">
          <div className="flex items-center justify-between text-xs text-emerald-800">
            <span className="uppercase font-extrabold tracking-wider">Agent Status</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 font-serif text-2xl font-bold text-slate-900">
            Diamond Elite
          </div>
          <div className="mt-1 text-xs text-emerald-700 font-medium">
            Next payout: 1st of next month
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/35 bg-white p-4 shadow-sm">
        <div className="relative min-w-[280px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#8C6207]" />
          <input
            type="text"
            placeholder="Search by client name, PNR, hotel, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#FAF9F5] py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-[#D4AF37] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-[#8C6207]" /> Status:
          </span>
          {['All', 'Confirmed', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                statusFilter === status
                  ? 'gold-btn text-slate-950 shadow-sm'
                  : 'bg-[#FAF9F5] text-slate-600 hover:text-slate-900 hover:bg-[#FFFDF7] border border-[#D4AF37]/25'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List / Table */}
      {filteredBookings.length === 0 ? (
        <div className="rounded-3xl p-12 text-center border border-[#D4AF37]/25 bg-white shadow-sm">
          <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-3 font-serif text-lg font-bold text-slate-900">No client bookings found</h3>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search criteria or book a new luxury suite for a client.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="luxury-card-white group relative overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-white p-6 transition-all hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/15 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Left: Client & Suite Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#8C6207] bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#D4AF37]/35 shadow-sm">
                      {booking.id}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300/60 shadow-sm">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {booking.status}
                    </span>
                    <span className="text-xs text-slate-500">• Booked on {booking.bookingDate}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      {booking.clientName}
                    </h3>
                    <div className="text-xs text-slate-600">
                      {booking.clientEmail} • {booking.clientPhone}
                    </div>
                  </div>

                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-[#8C6207]">{booking.roomName}</span>
                    <span className="mx-1.5 text-slate-300">—</span>
                    <span>{booking.hotelName} ({booking.destination})</span>
                  </div>

                  {booking.specialRequests && (
                    <div className="text-xs text-slate-600 italic line-clamp-1 max-w-xl">
                      "{booking.specialRequests}"
                    </div>
                  )}
                </div>

                {/* Right: Financials & Action Buttons */}
                <div className="flex flex-col items-end gap-3 text-right">
                  <div>
                    <div className="text-xs text-slate-500">Client Total Quoted:</div>
                    <div className="font-serif text-2xl font-bold text-slate-900">
                      {currencySymbol}{(booking.clientTotal || 0).toLocaleString()}
                    </div>
                    <div className="text-xs font-bold text-[#8C6207]">
                      +{currencySymbol}{(booking.agentCommission || 0).toLocaleString()} Commission ({booking.commissionPct}%)
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewVoucher(booking)}
                      className="gold-btn flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-md shadow-[#D4AF37]/20"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>View Guest Voucher</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Details Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between border-t border-[#D4AF37]/20 pt-3.5 text-xs text-slate-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-slate-700">
                    <Calendar className="h-3.5 w-3.5 text-[#8C6207]" />
                    <span>{booking.checkIn} → {booking.checkOut} ({booking.nights} nights)</span>
                  </div>
                  <div>Guests: <strong className="text-slate-900">{booking.guests}</strong></div>
                  <div>Settlement: <strong className="text-[#8C6207]">{booking.paymentMode}</strong></div>
                </div>

                <div className="font-mono text-[11px] text-[#8C6207] font-bold">
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
