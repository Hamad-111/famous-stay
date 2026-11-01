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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#030712]/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#E5C07B]/45 bg-[#07132F] text-white shadow-2xl shadow-[#E5C07B]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5C07B]/20 bg-[#0B1C44] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E5C07B]/20 text-[#F7E5A9] font-bold">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Agent Commission & Earnings Hub
              </h3>
              <p className="text-xs text-blue-200/80">
                Live financial overview for Regal Global Travel (IATA #8942-AG)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-blue-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Banner Card in Sapphire & Light Gold */}
          <div className="rounded-2xl border border-[#E5C07B]/45 bg-gradient-to-br from-[#0C2050] via-[#081534] to-[#040A18] p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#E5C07B]">
              <span className="font-extrabold uppercase tracking-wider">Total Commission Balance</span>
              <span className="flex items-center gap-1 font-bold text-[#F7E5A9]">
                <span className="h-2 w-2 rounded-full bg-[#E5C07B] animate-pulse"></span>
                Ready for Transfer
              </span>
            </div>

            <div className="mt-3 font-serif text-4xl font-extrabold text-[#F7E5A9]">
              +{currencySymbol}{formattedTotalCommissions.toLocaleString()}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-blue-200 border-t border-[#E5C07B]/20 pt-3">
              <span>Across <strong className="text-white">{bookingsCount}</strong> client bookings</span>
              <span>Next automatic settlement: <strong className="text-[#F7E5A9]">Nov 1, 2026</strong></span>
            </div>
          </div>

          {/* Tier Status */}
          <div className="rounded-2xl border border-[#E5C07B]/35 bg-[#0B1A3E]/80 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-[#E5C07B]" />
                <span className="font-serif text-lg font-bold text-[#F7E5A9]">
                  Diamond Elite Partner Tier
                </span>
              </div>
              <span className="rounded-full bg-[#E5C07B] px-3 py-1 text-[10px] font-extrabold text-[#061026] uppercase tracking-wider">
                Active Tier
              </span>
            </div>
            <p className="mt-2 text-xs text-blue-100 leading-relaxed">
              Your agency qualifies for top-bracket wholesale net rates with 15% - 18% base commission + complimentary client VIP welcome amenities.
            </p>
          </div>

          {/* Payout Schedule & Direct Deposit */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C07B]">
              Payout Channels & Settlement Details
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-[#E5C07B]/20 bg-[#061026] p-4">
                <div className="flex items-center gap-2 text-white font-bold mb-1">
                  <CreditCard className="h-4 w-4 text-[#E5C07B]" />
                  <span>Direct Bank Wire (IBAN Pakistan)</span>
                </div>
                <div className="text-blue-200">Account: PK36 ALFH 0019 4829 0192 (Bank Alfalah)</div>
                <div className="text-[#60A5FA] font-bold mt-1">Status: SBP Verified & Active</div>
              </div>

              <div className="rounded-2xl border border-[#E5C07B]/20 bg-[#061026] p-4">
                <div className="flex items-center gap-2 text-white font-bold mb-1">
                  <Calendar className="h-4 w-4 text-[#E5C07B]" />
                  <span>Cycle & Terms</span>
                </div>
                <div className="text-blue-200">Frequency: Monthly on the 1st</div>
                <div className="text-blue-100 font-semibold mt-1">Net 30 Invoiced Corporate Account</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#E5C07B]/20 bg-[#0B1C44] px-6 py-4">
          <button
            onClick={onClose}
            className="gold-btn rounded-xl px-6 py-2.5 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
