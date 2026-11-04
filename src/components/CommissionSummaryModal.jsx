import React from 'react';
import { 
  X, 
  DollarSign, 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  CreditCard 
} from 'lucide-react';

export default function CommissionSummaryModal({ 
  totalCommissions, 
  bookingsCount, 
  currency, 
  onClose 
}) {
  // Currency is strictly in Pakistani Rupees (PKR)
  const currencySymbol = 'Rs. ';
  const formattedTotalCommissions = totalCommissions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-[#D4AF37]/45 bg-white text-slate-800 shadow-2xl shadow-[#D4AF37]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 bg-gradient-to-r from-[#FFFDF8] via-white to-[#FAF6EC] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl gold-btn text-slate-950 font-bold shadow-sm">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Agent Commission & Earnings Hub
              </h3>
              <p className="text-xs text-slate-600">
                Live financial overview for Famous Stay Luxury Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Banner Card in White & Royal Gold */}
          <div className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EC] to-[#FFF4D4] p-6 shadow-md shadow-[#D4AF37]/15">
            <div className="flex items-center justify-between text-xs text-[#8C6207]">
              <span className="font-extrabold uppercase tracking-wider">Total Commission Balance</span>
              <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Ready for Transfer
              </span>
            </div>

            <div className="mt-3 font-serif text-4xl font-extrabold text-[#8C6207]">
              +{currencySymbol}{formattedTotalCommissions.toLocaleString()}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-t border-[#D4AF37]/20 pt-3">
              <span>Across <strong className="text-slate-900 font-bold">{bookingsCount}</strong> client bookings</span>
              <span>Next automatic settlement: <strong className="text-[#8C6207] font-bold">Nov 1, 2026</strong></span>
            </div>
          </div>

          {/* Tier Status */}
          <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#FAF7EE] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-[#8C6207]" />
                <span className="font-serif text-lg font-bold text-[#8C6207]">
                  Diamond Elite Partner Tier
                </span>
              </div>
              <span className="rounded-full gold-btn px-3 py-1 text-[10px] font-extrabold text-slate-950 uppercase tracking-wider shadow-sm">
                Active Tier
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-700 leading-relaxed">
              Your agency qualifies for top-bracket wholesale net rates with 15% - 18% base commission + complimentary client VIP welcome amenities.
            </p>
          </div>

          {/* Payout Schedule & Direct Deposit */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6207]">
              Payout Channels & Settlement Details
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#FAF9F5] p-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                  <CreditCard className="h-4 w-4 text-[#8C6207]" />
                  <span>Direct Bank Wire (IBAN Pakistan)</span>
                </div>
                <div className="text-slate-600">Account: PK36 ALFH 0019 4829 0192 (Bank Alfalah)</div>
                <div className="text-emerald-700 font-bold mt-1">Status: SBP Verified & Active</div>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#FAF9F5] p-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                  <Calendar className="h-4 w-4 text-[#8C6207]" />
                  <span>Cycle & Terms</span>
                </div>
                <div className="text-slate-600">Frequency: Monthly on the 1st</div>
                <div className="text-slate-700 font-semibold mt-1">Net 30 Invoiced Corporate Account</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#D4AF37]/25 bg-[#FAF9F5] px-6 py-4">
          <button
            onClick={onClose}
            className="gold-btn rounded-xl px-6 py-2.5 text-xs font-bold shadow-md shadow-[#D4AF37]/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
