import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Crown,
  FileCheck,
  Send,
  ExternalLink,
  Award,
  Download,
  Building
} from 'lucide-react';

import Logo from './Logo';

export default function VoucherModal({ 
  booking, 
  currency, 
  onClose, 
  onViewLedger 
}) {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  if (!booking) return null;

  // Currency is strictly in Pakistani Rupees (PKR)
  const currencySymbol = 'Rs. ';
  const formattedClientTotal = booking.clientTotal || 0;
  const formattedAgentCommission = booking.agentCommission || 0;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border-2 border-[#D4AF37]/45 bg-white text-slate-800 shadow-2xl shadow-[#D4AF37]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header Bar (No-Print) */}
        <div className="no-print flex flex-wrap items-center justify-between border-b border-[#D4AF37]/25 bg-gradient-to-r from-[#FFFDF8] via-white to-[#FAF6EC] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF4D4] text-[#8C6207] border border-[#D4AF37]/30">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Booking Completed & Confirmed
              </h3>
              <p className="text-xs text-[#8C6207] font-bold">
                Official VIP Guest Reservation Voucher is ready for client
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/50 bg-[#FFF4D4] px-3.5 py-2 text-xs font-bold text-[#8C6207] transition-colors hover:bg-[#D4AF37] hover:text-white shadow-sm"
            >
              <Printer className="h-4 w-4" />
              <span>Print / PDF Voucher</span>
            </button>

            <button
              onClick={handleSendEmail}
              disabled={emailSent}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 shadow-sm"
            >
              {emailSent ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Dispatched!</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 text-[#8C6207]" />
                  <span>Email Client</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Voucher Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-8">
          {/* THE LUXURY VOUCHER CERTIFICATE IN WHITE & ROYAL GOLD */}
          <div className="relative rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#FFFDF8] via-white to-[#FAF6EC] p-6 shadow-xl sm:p-9 text-slate-800">
            {/* Watermark Crest */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
              <Crown className="h-96 w-96 text-[#D4AF37]" />
            </div>

            {/* Voucher Header with Monogram and Reference */}
            <div className="relative flex flex-wrap items-start justify-between gap-4 border-b border-[#D4AF37]/25 pb-6">
              <div>
                <Logo showBadge={false} />
              </div>

              {/* Status Stamp & Reference */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#FFFDF7] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8C6207] shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Guaranteed & Confirmed
                </div>
                <div className="mt-2 flex items-center justify-end gap-1.5">
                  <span className="text-xs text-slate-500">Confirmation Code:</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 rounded-lg bg-[#FAF9F5] px-2.5 py-1 font-mono text-xs font-bold text-[#8C6207] hover:bg-white border border-[#D4AF37]/35 shadow-sm"
                    title="Click to copy code"
                  >
                    <span>{booking.id}</span>
                    <Copy className="h-3.5 w-3.5 text-[#8C6207]" />
                  </button>
                  {copied && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
                </div>
              </div>
            </div>

            {/* Primary Guest & Stay Grid */}
            <div className="relative my-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Client Info */}
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] p-5 text-xs shadow-sm">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#8C6207]">
                  Primary Guest / Client
                </span>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-900">
                  {booking.clientName}
                </div>
                <div className="mt-2.5 space-y-1.5 text-slate-700">
                  <div>Email: <strong className="text-slate-900">{booking.clientEmail}</strong></div>
                  <div>Phone: <strong className="text-slate-900">{booking.clientPhone}</strong></div>
                  <div>Party Size: <strong className="text-slate-900">{booking.guests}</strong></div>
                  <div>Agent PNR Code: <strong className="font-mono text-[#8C6207]">{booking.agentPnr}</strong></div>
                </div>
              </div>

              {/* Hotel Property & Suite Info */}
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] p-5 text-xs shadow-sm">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#8C6207]">
                  Reserved Property & Suite
                </span>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-900">
                  {booking.roomName}
                </div>
                <div className="mt-2.5 space-y-1.5 text-slate-700">
                  <div className="font-bold text-[#8C6207] text-sm">{booking.hotelName}</div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin className="h-3.5 w-3.5 text-[#8C6207]" />
                    <span>{booking.destination}</span>
                  </div>
                  <div>Booking Date: <span className="text-slate-900 font-medium">{booking.bookingDate}</span></div>
                </div>
              </div>
            </div>

            {/* Timestamps & Nights Bar */}
            <div className="relative rounded-2xl border border-[#D4AF37]/35 bg-[#FAF7EE] p-5 shadow-sm">
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div className="border-b border-slate-200 pb-2 sm:border-b-0 sm:border-r border-[#D4AF37]/25">
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500">
                    Check-In Date
                  </div>
                  <div className="font-serif text-lg font-bold text-slate-900 mt-1">
                    {booking.checkIn}
                  </div>
                  <div className="text-xs text-[#8C6207] font-bold mt-0.5">Guaranteed from 15:00</div>
                </div>

                <div className="border-b border-slate-200 pb-2 sm:border-b-0 sm:border-r border-[#D4AF37]/25">
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500">
                    Duration of Stay
                  </div>
                  <div className="font-serif text-lg font-extrabold text-[#8C6207] mt-1">
                    {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">Executive Concierge Included</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500">
                    Check-Out Date
                  </div>
                  <div className="font-serif text-lg font-bold text-slate-900 mt-1">
                    {booking.checkOut}
                  </div>
                  <div className="text-xs text-[#8C6207] font-bold mt-0.5">Departure until 12:00</div>
                </div>
              </div>
            </div>

            {/* Special Instructions & Add-ons */}
            <div className="relative my-6 space-y-3">
              {booking.selectedAddons && booking.selectedAddons.length > 0 && (
                <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] p-4 text-xs shadow-sm">
                  <span className="font-bold text-[#8C6207] uppercase tracking-wider text-[10px]">
                    Confirmed VIP Add-ons:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {booking.selectedAddons.map((addon, i) => (
                      <span key={i} className="rounded-lg bg-[#FFF4D4] px-3 py-1 text-[#8C6207] border border-[#D4AF37]/35 font-bold shadow-sm">
                        ✓ {addon}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] p-4 text-xs shadow-sm">
                <span className="font-bold text-[#8C6207] uppercase tracking-wider text-[10px]">
                  Special Concierge & Guest Instructions:
                </span>
                <p className="mt-1.5 text-slate-700 italic font-medium leading-relaxed">
                  "{booking.specialRequests}"
                </p>
              </div>
            </div>

            {/* Financial Summary & QR Code Verification */}
            <div className="relative flex flex-wrap items-center justify-between gap-6 border-t border-[#D4AF37]/25 pt-6">
              <div className="text-xs space-y-1.5">
                <div className="text-slate-600">Settlement Method: <strong className="text-slate-900">{booking.paymentMode}</strong></div>
                <div className="text-slate-600">Total Client Invoice: <strong className="text-slate-950 text-base font-serif font-bold">{currencySymbol}{formattedClientTotal.toLocaleString()}</strong></div>
                <div className="text-xs text-slate-600">
                  Agent Net Commission: <strong className="text-[#8C6207] font-bold">+{currencySymbol}{formattedAgentCommission.toLocaleString()}</strong>
                </div>
                <div className="text-[11px] text-slate-500 pt-1">
                  Issued by: <strong className="text-[#8C6207]">Famous Stay Luxury Desk (Agent Mohsin • 0314 3292778)</strong>
                </div>
              </div>

              {/* QR Code and Barcode */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/40 bg-white p-3 text-slate-900 shadow-md">
                <img
                  src={booking.qrCodeMock || "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=FAMOUS-STAY"}
                  alt="Voucher QR Code"
                  className="h-16 w-16 rounded-lg"
                />
                <div className="text-[10px] font-mono leading-tight">
                  <div className="font-bold tracking-wider text-slate-900">VIP ARRIVAL PASS</div>
                  <div className="text-slate-500">FRONT DESK SYNC</div>
                  <div className="text-[10px] text-[#8C6207] font-bold mt-1.5">{booking.id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Navigation (No-Print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-t border-[#D4AF37]/25 bg-[#FAF9F5] px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Close
            </button>

            <a
              href={`https://wa.me/923143292778?text=${encodeURIComponent(`Hello Mohsin, reservation voucher ${booking.id} has been issued for ${booking.clientName} at ${booking.hotelName}. Check-in: ${booking.checkIn}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 px-3.5 py-2.5 text-xs font-bold text-emerald-800 hover:bg-[#25D366] hover:text-slate-950 transition-all shadow-sm"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
              </svg>
              <span>Share on WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onViewLedger();
            }}
            className="gold-btn flex items-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 text-xs font-bold shadow-md shadow-[#D4AF37]/20"
          >
            <span>View All in Bookings Ledger</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
