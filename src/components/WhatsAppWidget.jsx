import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, ShieldCheck, Phone } from 'lucide-react';

export default function WhatsAppWidget({
  agentName = "Mohsin",
  agentPhone = "03143292778",
  agentAvatar = "/agent-mohsin.jpg"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const formattedNumber = "92" + agentPhone.replace(/^0/, ''); // Converts 03143292778 to 923143292778
  const defaultMessage = encodeURIComponent(
    `Hello Mohsin, I am visiting Famous Stay and would like assistance with a luxury hotel booking in Pakistan.`
  );
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Expandable Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl border-2 border-[#D4AF37]/50 bg-white text-slate-800 shadow-2xl shadow-[#D4AF37]/25 backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header with WhatsApp Brand Colors & Luxury Gold */}
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={agentAvatar}
                    alt={agentName}
                    className="h-14 w-14 rounded-full object-cover object-[center_18%] border-2 border-[#D4AF37] shadow-md ring-2 ring-white/50"
                  />
                  <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#25D366] border-2 border-[#075E54] shadow-sm"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-extrabold text-lg text-white">Agent {agentName}</h3>
                    <ShieldCheck className="h-4 w-4 text-[#FFF5D0]" />
                  </div>
                  <div className="text-xs text-emerald-100 font-semibold">
                    Famous Stay • Luxury Host Desk
                  </div>
                  <div className="text-xs text-emerald-200 font-mono font-bold">
                    📞 {agentPhone}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/80 hover:bg-black/20 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body with Chat Bubble */}
          <div className="p-4 space-y-3 bg-[#FAF9F5]">
            <div className="rounded-2xl rounded-tl-sm bg-white border border-[#D4AF37]/35 p-3.5 text-xs text-slate-800 shadow-sm leading-relaxed">
              <span className="font-bold text-[#8C6207] block mb-1">
                Assalam-o-Alaikum! 👋
              </span>
              I am <strong className="text-slate-900 font-bold">{agentName}</strong>, your dedicated VIP reservation agent. Looking to book Serena, PC Bhurban, or luxury suites in Pakistan? Chat with me directly on WhatsApp!
            </div>

            <div className="text-[10px] text-slate-500 text-center">
              Direct line: <span className="font-mono text-[#8C6207] font-bold">{agentPhone}</span> • Available 24/7
            </div>

            {/* Jump to WhatsApp CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold text-xs py-3.5 px-4 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02]"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
              </svg>
              <span>Chat on WhatsApp</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-3">
        {/* Floating Tooltip Label */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex cursor-pointer items-center gap-2.5 rounded-full border border-[#D4AF37]/45 bg-white/95 px-4 py-2 text-xs font-bold text-slate-900 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-[#D4AF37]"
          >
            <div className="relative">
              <img
                src={agentAvatar}
                alt={agentName}
                className="h-10 w-10 rounded-full object-cover object-[center_18%] border-2 border-[#D4AF37] shadow-sm ring-2 ring-[#D4AF37]/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#25D366] border-2 border-white"></span>
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-900 font-extrabold leading-tight flex items-center gap-1.5">
                <span>Agent {agentName}</span>
                <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span>
              </div>
              <div className="text-[11px] text-[#8C6207] font-mono font-bold leading-tight">
                0314 3292778
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Icon Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp Chat with Agent Mohsin"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#061026] shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-110 hover:bg-[#20ba5a] focus:outline-none"
        >
          {/* Animated pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none"></span>

          {isOpen ? (
            <X className="h-7 w-7 text-[#061026] relative z-10" />
          ) : (
            <svg className="h-8 w-8 fill-current relative z-10" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.28c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.16.12-3.37-.8-2.69-1.12-4.4-3.86-4.53-4.04-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .35.01.5.01.16 0 .38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

