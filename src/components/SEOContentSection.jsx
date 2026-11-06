import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Star, 
  CheckCircle2, 
  PhoneCall, 
  Flame, 
  Bed, 
  Building 
} from 'lucide-react';

export default function SEOContentSection({ singleBedRoom, twoBedRoom, penthouseRoom, onBookRoom }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      q: "What are the fixed daily room rates on Famous Stay?",
      a: "Famous Stay features fixed wholesale rates: Single Bed Room at Rs. 8,000 per day (8k), Two Bed Room at Rs. 15,000 per day (15k), and the #1 Trending Luxury Penthouse with Margalla Sky Terrace at Rs. 50,000 per day (50k). Rates include 18% guaranteed travel agent commission in PKR."
    },
    {
      q: "How can I book the Trending Luxury Penthouse in Islamabad?",
      a: "You can book directly via WhatsApp by contacting Lead Host Agent Mohsin at 0314 3292778 or Second Agent Arsalan Jutt at +92 318 0985887. You can also use our online booking console to generate an official verified PDF guest arrival voucher instantly."
    },
    {
      q: "What amenities are included with the 50k Penthouse?",
      a: "The Trending Penthouse includes an open-air rooftop sky terrace with barbecue grill and panoramic Margalla Hills twilight views, an 85-inch 4K smart TV media wall, sculpted wave ambient LED lounge, arched backlit mirror foyer, high-speed 1Gbps fiber Wi-Fi, 15 live video walkthroughs, and complimentary VIP airport Prado transfers."
    },
    {
      q: "What does the 8k Single Bed Room and 15k Two Bed Room include?",
      a: "The Single Bed Room (Rs. 8k/day) features a plush king bed, ergonomic desk, high-speed Wi-Fi, 4K LED TV, and luxury marble shower. The Two Bed Room (Rs. 15k/day) features 2 completely separate master king bedrooms, 2 attached en-suite designer baths, central living lounge, dining area, and kitchenette."
    },
    {
      q: "Is Famous Stay verified for B2B travel agents?",
      a: "Yes. Famous Stay is an official luxury accommodation channel compliant with Department of Tourist Services (DTS) license ISB-4921 and TAAP standards. Registered agents receive guaranteed 18% commission credited upon checkout with formal PNR codes."
    }
  ];

  return (
    <section className="relative z-10 mt-12 mb-16 rounded-3xl border border-[#D4AF37]/35 bg-white p-6 sm:p-10 shadow-sm" aria-label="Famous Stay SEO Overview & FAQs">
      {/* Top Banner */}
      <div className="border-b border-[#D4AF37]/20 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#FFFDF5] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#8C6207]">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>Pakistan's #1 Luxury Accommodation & Penthouse Network</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-extrabold text-slate-950">
            About Famous Stay & Official Daily Rate Index
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
            The authoritative booking platform for premium hotel suites, penthouses, and serviced residences in Islamabad and across Pakistan.
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
          <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#FAF9F5] px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Guest Rating</div>
            <div className="text-lg font-serif font-extrabold text-[#8C6207] flex items-center justify-center gap-1">
              <span>⭐ 5.0 / 5.0</span>
            </div>
            <div className="text-[10px] text-slate-400">384 Verified Reviews</div>
          </div>
        </div>
      </div>

      {/* 3 Strategic SEO Keyword Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* Single Bed Room 8k */}
        <article className="rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5]/60 p-5 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207] bg-[#FFF4D4] px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                8k Daily Rate
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">Rs. 8,000 / day</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Single Bed Room Executive Suites
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Designed for traveling executives, diplomats, and solo professionals seeking privacy, speed, and comfort in Pakistan. Includes ultra-fast 1Gbps fiber internet, ergonomic work desk, 4K LED television, room service, and luxury bath amenities.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C6207]">18% Net Agent Profit</span>
            <button
              onClick={() => onBookRoom && onBookRoom(singleBedRoom)}
              className="text-xs font-bold text-[#8C6207] hover:underline"
            >
              Book Single Bed →
            </button>
          </div>
        </article>

        {/* Two Bed Room 15k */}
        <article className="rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5]/60 p-5 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207] bg-[#FFF4D4] px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                15k Daily Rate
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">Rs. 15,000 / day</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Two Bed Room Luxury Suites
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Spacious dual-master residence ideal for traveling families, VIP delegations, and corporate teams. Features two independent king bedroom suites, attached marble bathrooms, central entertaining salon, and fully appointed dining kitchenette.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C6207]">18% Net Agent Profit</span>
            <button
              onClick={() => onBookRoom && onBookRoom(twoBedRoom)}
              className="text-xs font-bold text-[#8C6207] hover:underline"
            >
              Book Two Bed →
            </button>
          </div>
        </article>

        {/* Penthouse 50k */}
        <article className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFFDF8] via-white to-[#FAF5E6] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-rose-600 px-2 py-0.5 rounded-md shadow-sm">
                🔥 50k Penthouse
              </span>
              <span className="text-xs font-mono font-bold text-[#8C6207]">Rs. 50,000 / day</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Trending Margalla Sky Terrace Penthouse
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Pakistan's #1 trending luxury penthouse with an iconic private rooftop sky terrace overlooking the Margalla Hills. Features barbecue facilities, 85" smart media wall, wave ambient lighting lounge, and 15 live video walkthroughs.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C6207]">18% Net Agent Profit</span>
            <button
              onClick={() => onBookRoom && onBookRoom(penthouseRoom)}
              className="text-xs font-bold text-[#8C6207] hover:underline"
            >
              Book Penthouse →
            </button>
          </div>
        </article>
      </div>

      {/* SEO Frequently Asked Questions Accordion */}
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FFFDF8] p-5 sm:p-7">
        <div className="mb-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207]">
            Google Search FAQ & Knowledge Base
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="divide-y divide-[#D4AF37]/20">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-3.5">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 text-left font-serif text-sm sm:text-base font-bold text-slate-900 hover:text-[#8C6207] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white border border-[#D4AF37]/40 text-[#8C6207]">
                    {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1 animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
