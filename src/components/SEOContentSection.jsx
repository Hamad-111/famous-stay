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
  Building2,
  Trees,
  Crown,
  Waves,
  UtensilsCrossed,
  ArrowRight,
  ExternalLink,
  Search
} from 'lucide-react';
import { SEO_KEYWORD_GROUPS, ALL_SEO_KEYWORDS } from '../data/seoKeywords';

export default function SEOContentSection({ 
  singleBedRoom, 
  twoBedRoom, 
  penthouseRoom, 
  farmhouseRoom, 
  famousHotelRoom,
  onBookRoom 
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeKeywordTab, setActiveKeywordTab] = useState(0);
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const faqs = [
    {
      q: "How does Famous Stay compare to famous hotels in Islamabad like Serena, Marriott, or Centaurus?",
      a: "Traditional 5-star hotels in Islamabad charge upwards of Rs. 45,000 to Rs. 85,000 per night for standard rooms plus heavy taxes. Famous Stay provides the exact same 5-star luxury standards—plush king beds, marble rain showers, 24/7 room service, and prime locations near F-6, F-7, and Blue Area—at fixed wholesale partner rates of Rs. 8,000/day for Single Bed and Rs. 15,000/day for Two Bed suites, with a guaranteed 18% agent commission."
    },
    {
      q: "Can I book a private luxury farmhouse with a swimming pool in Islamabad on Famous Stay?",
      a: "Yes! Famous Stay offers private gated luxury farmhouses in Islamabad's prime green belts (Chak Shahzad, Bani Gala, and Simly Dam). Amenities include private temperature-controlled swimming pools, sprawling 2-acre manicured green lawns, outdoor barbecue and bonfire stations, full standby heavy generators, and 24/7 private caretaker and security. Ideal for family holidays, corporate retreats, and private parties."
    },
    {
      q: "What is included with the Trending Luxury Penthouse (Rs. 50,000 / day)?",
      a: "The Trending Penthouse is Islamabad's #1 serviced rooftop residence featuring a private open-air sky terrace with direct panoramic views of the Margalla Hills, a dedicated outdoor barbecue patio, an 85-inch 4K smart TV media wall, a sculpted wave ambient LED lounge, an arched backlit vanity mirror foyer, 15 live HD video walkthroughs, and complimentary VIP airport Prado transfers."
    },
    {
      q: "What are the official daily rates for rooms on Famous Stay?",
      a: "Famous Stay maintains strict transparent rates: Single Bed Room at Rs. 8,000 per day (8k), Two Bed Room at Rs. 15,000 per day (15k), Trending Margalla Sky Terrace Penthouse at Rs. 50,000 per day (50k), and Private Pool Farmhouses from Rs. 60,000/day. All bookings include an 18% wholesale partner margin."
    },
    {
      q: "How can I book instantly via WhatsApp with Agent Usman or Arsalan Jutt?",
      a: "You can connect directly with our authorized VIP desk on WhatsApp: Lead Host Agent Usman at 0348 0964370 (+92 348 0964370) or Second Agent Arsalan Jutt at +92 318 0985887. You can also generate an official PDF guest arrival voucher instantly through the online agent booking console."
    },
    {
      q: "Are the listings on Famous Stay officially verified and DTS accredited?",
      a: "Yes. Famous Stay is compliant with Department of Tourist Services (DTS) license ISB-4921 and Travel Agents Association of Pakistan (TAAP) code #2841. Every hotel suite, penthouse, and farmhouse is physically inspected and verified for safety, hygiene, and luxury hospitality."
    }
  ];

  return (
    <section className="relative z-10 mt-12 mb-16 rounded-3xl border border-[#D4AF37]/35 bg-white p-6 sm:p-10 shadow-sm" aria-label="Famous Stay SEO Overview & FAQs">
      {/* Top Banner */}
      <div className="border-b border-[#D4AF37]/20 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#FFFDF5] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#8C6207]">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>Islamabad's #1 Luxury Accommodation, Farmhouse & Penthouse Network</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-extrabold text-slate-950">
            Islamabad Famous Hotels, Luxury Farmhouses & Penthouses
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl">
            The authoritative hospitality portal for Islamabad. Compare top 5-star famous hotel suites, book private swimming pool farmhouses in Chak Shahzad, or experience our trending Margalla Hills sky terrace penthouse.
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
          <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#FAF9F5] px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Guest Rating</div>
            <div className="text-lg font-serif font-extrabold text-[#8C6207] flex items-center justify-center gap-1">
              <span>⭐ 5.0 / 5.0</span>
            </div>
            <div className="text-[10px] text-slate-400">460+ Verified Bookings</div>
          </div>
        </div>
      </div>

      {/* 3 Core Destination Pillars: Famous Hotels, Farmhouses, Penthouse */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* 1. Islamabad Famous Hotels */}
        <article className="rounded-2xl border border-[#D4AF37]/35 bg-[#FAF9F5]/70 p-5 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207] bg-[#FFF4D4] px-2 py-0.5 rounded-md border border-[#D4AF37]/30 flex items-center gap-1">
                <Building2 className="h-3 w-3" /> Famous Hotels
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">From Rs. 8k / day</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Islamabad Famous 5-Star Partner Suites
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Experience the luxury standards of Islamabad's famous 5-star hotels (Serena, Marriott, Centaurus) in prime F-6, F-7, and Blue Area. High-speed 1Gbps Wi-Fi, marble rain shower baths, plush king beds, and 24/7 room service at transparent fixed rates of <strong>Rs. 8,000</strong> (Single Bed) and <strong>Rs. 15,000</strong> (Two Bed).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C6207]">18% Net Agent Profit</span>
            <button
              onClick={() => onBookRoom && onBookRoom(famousHotelRoom || twoBedRoom)}
              className="text-xs font-bold text-[#8C6207] hover:underline flex items-center gap-1"
            >
              <span>Book Suite</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </article>

        {/* 2. Luxury Farmhouses in Islamabad */}
        <article className="rounded-2xl border border-emerald-300 bg-emerald-50/30 p-5 hover:border-emerald-500 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1">
                <Trees className="h-3 w-3" /> Private Pool Farmhouse
              </span>
              <span className="text-xs font-mono font-bold text-emerald-800">Chak Shahzad</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Luxury Farmhouse with Swimming Pool
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Escape to Islamabad's lush green countryside in Chak Shahzad, Bani Gala, and Simly Dam. Features a private swimming pool, 2-acre lawn for barbecue parties and family gatherings, 4 master king bedrooms, heavy standby generator, and dedicated 24/7 caretaker service.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800">Gated 24/7 Security</span>
            <button
              onClick={() => onBookRoom && onBookRoom(farmhouseRoom)}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Book Farmhouse</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </article>

        {/* 3. Trending Penthouse */}
        <article className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFFDF8] via-white to-[#FAF5E6] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-rose-600 px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                <Crown className="h-3 w-3" /> #1 Penthouse
              </span>
              <span className="text-xs font-mono font-bold text-[#8C6207]">Rs. 50,000 / day</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Trending Margalla Sky Terrace Penthouse
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Pakistan's #1 trending luxury penthouse with an iconic open-air rooftop sky terrace offering uninterrupted twilight views of the Margalla Hills. Complete with a private barbecue patio, 85" 4K media wall, wave ambient LED lounge, and 15 live video walkthroughs.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C6207]">15 HD Video Tours</span>
            <button
              onClick={() => onBookRoom && onBookRoom(penthouseRoom)}
              className="text-xs font-bold text-[#8C6207] hover:underline flex items-center gap-1"
            >
              <span>Book 50k Penthouse</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </article>
      </div>

      {/* Comparison Guide Matrix (Why Choose Famous Stay) */}
      <div className="mb-10 rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] p-5 sm:p-7 overflow-x-auto">
        <div className="mb-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207]">
            Islamabad Hospitality Comparison
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Famous Stay vs. Traditional 5-Star Hotels & Farmhouses
          </h3>
        </div>

        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
          <thead>
            <tr className="border-b border-[#D4AF37]/30 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Accommodation Type</th>
              <th className="py-2.5 px-3">Location</th>
              <th className="py-2.5 px-3">Average Daily Rate</th>
              <th className="py-2.5 px-3">Highlights</th>
              <th className="py-2.5 px-3 text-right">Instant Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4AF37]/20 text-slate-800">
            <tr className="hover:bg-white/60 transition-colors">
              <td className="py-3 px-3 font-bold text-slate-950 flex items-center gap-2">
                <Crown className="h-4 w-4 text-[#8C6207]" />
                <span>Trending Luxury Penthouse</span>
              </td>
              <td className="py-3 px-3 text-slate-600">Margalla Foothills, Islamabad</td>
              <td className="py-3 px-3 font-mono font-bold text-[#8C6207]">Rs. 50,000 / day</td>
              <td className="py-3 px-3 text-slate-600">Private Sky Terrace, BBQ Patio, 85" TV, 15 Videos</td>
              <td className="py-3 px-3 text-right">
                <button
                  onClick={() => onBookRoom && onBookRoom(penthouseRoom)}
                  className="gold-btn rounded-lg px-2.5 py-1 text-xs font-bold"
                >
                  Book 50k
                </button>
              </td>
            </tr>

            <tr className="hover:bg-white/60 transition-colors">
              <td className="py-3 px-3 font-bold text-slate-950 flex items-center gap-2">
                <Trees className="h-4 w-4 text-emerald-600" />
                <span>Private Pool Farmhouse</span>
              </td>
              <td className="py-3 px-3 text-slate-600">Chak Shahzad / Bani Gala</td>
              <td className="py-3 px-3 font-mono font-bold text-emerald-700">From Rs. 60,000 / day</td>
              <td className="py-3 px-3 text-slate-600">Private Pool, 2-Acre Lawn, 4 Bed Suites, Generator</td>
              <td className="py-3 px-3 text-right">
                <button
                  onClick={() => onBookRoom && onBookRoom(farmhouseRoom)}
                  className="bg-emerald-800 text-white rounded-lg px-2.5 py-1 text-xs font-bold hover:bg-emerald-900 transition-colors"
                >
                  Book Estate
                </button>
              </td>
            </tr>

            <tr className="hover:bg-white/60 transition-colors">
              <td className="py-3 px-3 font-bold text-slate-950 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#8C6207]" />
                <span>Famous Hotel Partner Suites</span>
              </td>
              <td className="py-3 px-3 text-slate-600">F-6 / F-7 / Blue Area, Islamabad</td>
              <td className="py-3 px-3 font-mono font-bold text-emerald-700">Rs. 8,000 – 15,000 / day</td>
              <td className="py-3 px-3 text-slate-600">Serena & Marriott Tier Luxury, 24/7 Room Service</td>
              <td className="py-3 px-3 text-right">
                <button
                  onClick={() => onBookRoom && onBookRoom(twoBedRoom)}
                  className="gold-btn rounded-lg px-2.5 py-1 text-xs font-bold"
                >
                  Book 15k
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Islamabad Top Locations & Sector Guide */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-6">
        <div className="mb-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
            Islamabad Prime Sector Directory
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
            Best Sectors for Top Hotels, Luxury Penthouses &amp; Pool Farmhouses in Islamabad
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
            <div className="font-bold text-slate-900">Sector F-6 &amp; F-7 (Jinnah Super)</div>
            <p className="text-slate-600 mt-1">Diplomatic-zone 1 Bed (<span className="font-semibold text-emerald-700">8k</span>) &amp; 2 Bed (<span className="font-semibold text-emerald-700">15k</span>) luxury hotel suites minutes from Kohsar Market.</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
            <div className="font-bold text-slate-900">Blue Area &amp; Centaurus Belt</div>
            <p className="text-slate-600 mt-1">Executive corporate rooms matching Serena &amp; Marriott hospitality standards with fixed rates (<span className="font-semibold text-emerald-700">8k–15k</span>).</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
            <div className="font-bold text-slate-900">E-7 Margalla Hills &amp; Chak Shahzad</div>
            <p className="text-slate-600 mt-1">Trending Sky Terrace Penthouse (<span className="font-semibold text-[#8C6207]">50k</span>) &amp; Bani Gala / Chak Shahzad Pool Farmhouses (<span className="font-semibold text-emerald-700">60k</span>).</p>
          </div>
        </div>
      </div>

      {/* SEO Frequently Asked Questions Accordion */}
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FFFDF8] p-5 sm:p-7 mb-8">
        <div className="mb-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207]">
            Google Search FAQ & Knowledge Base
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Frequently Asked Questions: Islamabad Hotels, Farmhouses & Penthouses
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

      {/* 500+ Verified Hospitality Search Index & Popular Queries */}
      <div id="search-index-500" className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5" />
              <span>Islamabad &amp; Pakistan Complete Stay Directory ({ALL_SEO_KEYWORDS.length} Indexed Search Terms)</span>
            </div>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-slate-900 mt-0.5">
              Popular Searches: Top Hotels, Luxury Penthouses, Farmhouses &amp; 15 Video Walkthroughs
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowAllKeywords((prev) => !prev)}
            className="shrink-0 rounded-xl border border-[#D4AF37]/40 bg-[#FFFDF5] px-3.5 py-2 text-xs font-bold text-[#8C6207] hover:bg-[#FFF4D4] transition-colors"
          >
            {showAllKeywords ? 'Show Single Category' : `View All ${ALL_SEO_KEYWORDS.length} Queries`}
          </button>
        </div>

        {!showAllKeywords && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {SEO_KEYWORD_GROUPS.map((group, idx) => (
              <button
                key={group.category}
                type="button"
                onClick={() => setActiveKeywordTab(idx)}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                  activeKeywordTab === idx
                    ? 'bg-slate-900 text-[#F7E5A9]'
                    : 'bg-slate-100 text-slate-700 hover:bg-[#FAF6EA]'
                }`}
              >
                {group.badge} ({group.queries.length})
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {(showAllKeywords ? SEO_KEYWORD_GROUPS : [SEO_KEYWORD_GROUPS[activeKeywordTab]]).map((group) => (
            <div key={group.category} className="rounded-xl border border-slate-100 bg-[#FAF9F5]/60 p-3.5">
              <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-[10px] font-semibold text-[#8C6207]">{group.queries.length} keywords</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.queries.map((kw) => (
                  <a
                    key={kw}
                    href={`/?search=${encodeURIComponent(kw)}#famous-search-console`}
                    className="rounded-full border border-[#D4AF37]/25 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-[#D4AF37] hover:text-[#8C6207] transition-colors"
                  >
                    {kw}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
