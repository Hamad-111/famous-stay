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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#030712]/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[#E5C07B]/45 bg-[#061026] text-white shadow-2xl shadow-[#E5C07B]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header Bar (No-Print) */}
        <div className="no-print flex flex-wrap items-center justify-between border-b border-[#E5C07B]/20 bg-[#0B1C44] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5C07B]/20 text-[#F7E5A9]">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Booking Completed & Confirmed
              </h3>
              <p className="text-xs text-[#F7E5A9] font-medium">
                Official VIP Guest Reservation Voucher is ready for client
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-[#E5C07B]/40 bg-[#E5C07B]/15 px-3.5 py-2 text-xs font-bold text-[#F7E5A9] transition-colors hover:bg-[#E5C07B]/25"
            >
              <Printer className="h-4 w-4" />
              <span>Print / PDF Voucher</span>
            </button>

            <button
              onClick={handleSendEmail}
              disabled={emailSent}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0E2355] px-3.5 py-2 text-xs font-bold text-blue-100 transition-colors hover:bg-[#122A66]"
            >
              {emailSent ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-[#60A5FA]" />
                  <span className="text-[#93C5FD]">Dispatched!</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 text-[#E5C07B]" />
                  <span>Email Client</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-blue-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Voucher Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-8">
          {/* THE LUXURY VOUCHER CERTIFICATE IN SAPPHIRE BLUE & LIGHT GOLD */}
          <div className="relative rounded-3xl border-2 border-[#E5C07B]/45 bg-gradient-to-b from-[#081536] via-[#06112C] to-[#040A1A] p-6 shadow-2xl sm:p-9 text-slate-100">
            {/* Watermark Crest */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <Crown className="h-96 w-96 text-[#E5C07B]" />
            </div>

            {/* Voucher Header with Monogram and Reference */}
            <div className="relative flex flex-wrap items-start justify-between gap-4 border-b border-[#E5C07B]/30 pb-6">
              <div>
                <Logo showBadge={false} />
              </div>

              {/* Status Stamp & Reference */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5C07B]/40 bg-[#0E2355]/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#F7E5A9]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#E5C07B]" />
                  Guaranteed & Confirmed
                </div>
                <div className="mt-2 flex items-center justify-end gap-1.5">
                  <span className="text-xs text-blue-200">Confirmation Code:</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 rounded-lg bg-[#050C1E] px-2.5 py-1 font-mono text-xs font-bold text-[#F7E5A9] hover:bg-black/90 border border-[#E5C07B]/30"
                    title="Click to copy code"
                  >
                    <span>{booking.id}</span>
                    <Copy className="h-3.5 w-3.5 text-blue-300" />
                  </button>
                  {copied && <span className="text-[10px] text-[#60A5FA] font-bold">Copied!</span>}
                </div>
              </div>
            </div>

            {/* Primary Guest & Stay Grid */}
            <div className="relative my-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Client Info */}
              <div className="rounded-2xl border border-[#E5C07B]/20 bg-[#091738]/60 p-5 text-xs">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#E5C07B]">
                  Primary Guest / Client
                </span>
                <div className="mt-1 font-serif text-2xl font-bold text-white">
                  {booking.clientName}
                </div>
                <div className="mt-2.5 space-y-1.5 text-blue-100">
                  <div>Email: <strong className="text-white">{booking.clientEmail}</strong></div>
                  <div>Phone: <strong className="text-white">{booking.clientPhone}</strong></div>
                  <div>Party Size: <strong className="text-white">{booking.guests}</strong></div>
                  <div>Agent PNR Code: <strong className="font-mono text-[#F7E5A9]">{booking.agentPnr}</strong></div>
                </div>
              </div>

              {/* Hotel Property & Suite Info */}
              <div className="rounded-2xl border border-[#E5C07B]/20 bg-[#091738]/60 p-5 text-xs">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#E5C07B]">
                  Reserved Property & Suite
                </span>
                <div className="mt-1 font-serif text-2xl font-bold text-white">
                  {booking.roomName}
                </div>
                <div className="mt-2.5 space-y-1.5 text-blue-100">
                  <div className="font-semibold text-[#F7E5A9] text-sm">{booking.hotelName}</div>
                  <div className="flex items-center gap-1 text-blue-200">
                    <MapPin className="h-3.5 w-3.5 text-[#E5C07B]" />
                    <span>{booking.destination}</span>
                  </div>
                  <div>Booking Date: <span className="text-white font-medium">{booking.bookingDate}</span></div>
                </div>
              </div>
            </div>

            {/* Timestamps & Nights Bar */}
            <div className="relative rounded-2xl border border-[#E5C07B]/30 bg-[#0A1A40]/70 p-5">
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div className="border-b border-white/10 pb-2 sm:border-b-0 sm:border-r border-[#E5C07B]/20">
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-blue-200">
                    Check-In Date
                  </div>
                  <div className="font-serif text-lg font-bold text-white mt-1">
                    {booking.checkIn}
                  </div>
                  <div className="text-xs text-[#F7E5A9] font-semibold mt-0.5">Guaranteed from 15:00</div>
                </div>

                <div className="border-b border-white/10 pb-2 sm:border-b-0 sm:border-r border-[#E5C07B]/20">
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-blue-200">
                    Duration of Stay
                  </div>
                  <div className="font-serif text-lg font-bold text-[#F7E5A9] mt-1">
                    {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                  </div>
                  <div className="text-xs text-blue-200 mt-0.5">Executive Concierge Included</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-blue-200">
                    Check-Out Date
                  </div>
                  <div className="font-serif text-lg font-bold text-white mt-1">
                    {booking.checkOut}
                  </div>
                  <div className="text-xs text-[#F7E5A9] font-semibold mt-0.5">Departure until 12:00</div>
                </div>
              </div>
            </div>

            {/* Special Instructions & Add-ons */}
            <div className="relative my-6 space-y-3">
              {booking.selectedAddons && booking.selectedAddons.length > 0 && (
                <div className="rounded-2xl border border-[#E5C07B]/20 bg-[#061026] p-4 text-xs">
                  <span className="font-bold text-[#E5C07B] uppercase tracking-wider text-[10px]">
                    Confirmed VIP Add-ons:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {booking.selectedAddons.map((addon, i) => (
                      <span key={i} className="rounded-lg bg-[#E5C07B]/15 px-3 py-1 text-[#F7E5A9] border border-[#E5C07B]/30 font-semibold">
                        ✓ {addon}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-[#E5C07B]/20 bg-[#061026] p-4 text-xs">
                <span className="font-bold text-[#E5C07B] uppercase tracking-wider text-[10px]">
                  Special Concierge & Guest Instructions:
                </span>
                <p className="mt-1.5 text-blue-100 italic font-medium leading-relaxed">
                  "{booking.specialRequests}"
                </p>
              </div>
            </div>

            {/* Financial Summary & QR Code Verification */}
            <div className="relative flex flex-wrap items-center justify-between gap-6 border-t border-[#E5C07B]/30 pt-6">
              <div className="text-xs space-y-1.5">
                <div className="text-blue-200">Settlement Method: <strong className="text-[#60A5FA]">{booking.paymentMode}</strong></div>
                <div className="text-blue-200">Total Client Invoice: <strong className="text-white text-base font-serif font-bold">{currencySymbol}{formattedClientTotal.toLocaleString()}</strong></div>
                <div className="text-xs text-blue-200">
                  Agent Net Commission: <strong className="text-[#F7E5A9] font-bold">+{currencySymbol}{formattedAgentCommission.toLocaleString()}</strong>
                </div>
                <div className="text-[11px] text-blue-300 pt-1">
                  Issued by: <strong className="text-[#F7E5A9]">Famous Stay Luxury Desk (Agent Mohsin • 0314 3292778)</strong>
                </div>
              </div>

              {/* QR Code and Barcode */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#E5C07B]/30 bg-white p-3 text-[#061026] shadow-xl">
                <img
                  src={booking.qrCodeMock || "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=FAMOUS-STAY"}
                  alt="Voucher QR Code"
                  className="h-16 w-16 rounded-lg"
                />
                <div className="text-[10px] font-mono leading-tight">
                  <div className="font-bold tracking-wider text-[#061026]">VIP ARRIVAL PASS</div>
                  <div className="text-slate-600">FRONT DESK SYNC</div>
                  <div className="text-[10px] text-[#B88A1F] font-bold mt-1.5">{booking.id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Navigation (No-Print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-t border-[#E5C07B]/20 bg-[#0B1C44] px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-blue-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              Close
            </button>

            <a
              href={`https://wa.me/923143292778?text=${encodeURIComponent(`Hello Mohsin, reservation voucher ${booking.id} has been issued for ${booking.clientName} at ${booking.hotelName}. Check-in: ${booking.checkIn}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 px-3.5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-[#25D366] hover:text-[#061026] transition-all"
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
            className="gold-btn flex items-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 text-xs font-bold"
          >
            <span>View All in Bookings Ledger</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
