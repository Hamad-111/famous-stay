import React, { useState } from 'react';
import {
  Car,
  Fuel,
  Gauge,
  Users,
  ShieldCheck,
  MessageCircle,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  MapPin,
  X,
  Calendar,
  Mail
} from 'lucide-react';
import { AWAN_CARS_FLEET } from '../data/awanCars';

export default function AwanRentalCars() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [driverMode, setDriverMode] = useState('self'); // 'self' | 'driver'
  const [rentalDays, setRentalDays] = useState(1);
  const [previewCar, setPreviewCar] = useState(null);

  const categories = [
    { id: 'all', label: `All Fleet (${AWAN_CARS_FLEET.length})` },
    { id: 'hatchback', label: 'Hatchback (4.5k)' },
    { id: 'sedan', label: 'Sedans (7k–10k)' },
    { id: 'executive', label: 'Civic 11th Gen (14k–15k)' },
    { id: 'suv', label: 'Luxury SUV (16k)' }
  ];

  const filteredCars =
    selectedCategory === 'all'
      ? AWAN_CARS_FLEET
      : AWAN_CARS_FLEET.filter((car) => car.category === selectedCategory);

  const buildWhatsAppLink = (car, rate) => {
    const modeLabel = driverMode === 'driver' ? 'With Chauffeur/Driver' : 'Self-Drive';
    const total = rate * rentalDays;
    const msg = `Assalam-o-Alaikum Jawad, I want to book ${car.name} (${car.subtitle}) from AWAN RENTAL CARS (${modeLabel}) for ${rentalDays} day(s) at Rs. ${rate.toLocaleString()}/day (Est. Total: Rs. ${total.toLocaleString()}).`;
    return `https://wa.me/923342443388?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section
      id="awan-rental-cars"
      aria-label="AWAN RENTAL CARS - Official Islamabad Car Rental Fleet"
      className="relative z-10 mt-10 mb-12 rounded-3xl border-2 border-[#D4AF37]/45 bg-gradient-to-br from-white via-[#FFFDF8] to-[#FAF6EA] p-5 sm:p-8 lg:p-10 shadow-lg shadow-[#D4AF37]/10"
    >
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-[#D4AF37]/25">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-slate-950 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#F7E5A9] shadow-xs">
            <Car className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Official Transport Partner • Islamabad &amp; Nationwide</span>
          </div>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            AWAN <span className="gold-gradient-text">RENTAL CARS</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl">
            Verified well-maintained vehicles in Islamabad with transparent fixed per-day charges. Instant pickup at Sector F-6, F-7, Blue Area, Gulberg Greens &amp; Islamabad International Airport.
          </p>
        </div>

        {/* Driver Toggle & Days Selector Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* AWAN RENTAL CARS Direct Contact Badge: Jawad */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-[#D4AF37]/45 bg-white px-3 py-1.5 shadow-xs">
            <img
              src="/agent-jawad.jpg"
              alt="Jawad - AWAN RENTAL CARS Manager"
              className="h-10 w-10 rounded-full object-cover object-[center_20%] border-2 border-[#25D366] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-slate-950 truncate">Jawad</span>
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-bold text-[#8C6207]">Fleet Lead</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px]">
                <a
                  href="https://wa.me/923342443388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-emerald-700 hover:underline"
                >
                  0334 2443388
                </a>
                <a
                  href="mailto:malikjawad3066@gmail.com"
                  className="text-slate-600 hover:text-[#8C6207] truncate max-w-[140px]"
                >
                  malikjawad3066@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Self Drive vs With Driver */}
          <div className="inline-flex rounded-2xl border border-[#D4AF37]/35 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setDriverMode('self')}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                driverMode === 'self'
                  ? 'bg-slate-950 text-[#F7E5A9] shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Self-Drive Rate
            </button>
            <button
              type="button"
              onClick={() => setDriverMode('driver')}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                driverMode === 'driver'
                  ? 'bg-slate-950 text-[#F7E5A9] shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              With Chauffeur
            </button>
          </div>

          {/* Days Counter */}
          <div className="flex items-center justify-between sm:justify-start gap-2 rounded-2xl border border-[#D4AF37]/35 bg-white px-3.5 py-2 shadow-xs">
            <Calendar className="h-4 w-4 text-[#8C6207]" />
            <span className="text-xs font-bold text-slate-700">Days:</span>
            <button
              type="button"
              onClick={() => setRentalDays((d) => Math.max(1, d - 1))}
              className="h-6 w-6 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 text-xs"
              aria-label="Decrease rental days"
            >
              -
            </button>
            <span className="font-mono text-sm font-extrabold text-[#8C6207] min-w-[20px] text-center">
              {rentalDays}
            </span>
            <button
              type="button"
              onClick={() => setRentalDays((d) => Math.min(30, d + 1))}
              className="h-6 w-6 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 text-xs"
              aria-label="Increase rental days"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'gold-btn border-[#B8860B] text-slate-950 shadow-xs'
                  : 'border-[#D4AF37]/30 bg-white text-slate-700 hover:border-[#D4AF37] hover:text-[#8C6207]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Verified Islamabad Fleet • 24/7 Dispatch Desk</span>
        </div>
      </div>

      {/* 7-Car Showcase Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCars.map((car) => {
          const activeRate = driverMode === 'driver' ? car.withDriverRate : car.dailyRate;
          const totalEstimate = activeRate * rentalDays;

          return (
            <article
              key={car.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-white shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300"
            >
              {/* Photo Frame */}
              <div
                onClick={() => setPreviewCar(car)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
                title="Click to enlarge vehicle photo"
              >
                <img
                  src={car.image}
                  alt={`${car.name} - ${car.subtitle} AWAN RENTAL CARS`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="rounded-full bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#F7E5A9] border border-[#D4AF37]/40">
                    {car.categoryLabel}
                  </span>
                </div>

                {car.popular && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] px-2.5 py-0.5 text-[10px] font-extrabold text-slate-950 shadow-sm">
                      <Sparkles className="h-2.5 w-2.5" />
                      Trending
                    </span>
                  </div>
                )}

                {/* Bottom Price Pill Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-xl bg-slate-950/85 backdrop-blur-md px-3 py-1.5 border border-[#D4AF37]/40">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-300">
                    {driverMode === 'driver' ? 'With Driver' : 'Per Day Charge'}
                  </span>
                  <span className="font-mono text-sm font-extrabold text-[#F7E5A9]">
                    Rs. {activeRate.toLocaleString()}<span className="text-[10px] font-normal text-slate-300">/day</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-serif text-base font-extrabold text-slate-950 leading-snug">
                    {car.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#8C6207] mt-0.5">
                    {car.subtitle}
                  </p>

                  {/* Spec Grid */}
                  <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5 rounded-lg bg-[#FAF9F5] px-2 py-1 border border-slate-100">
                      <Gauge className="h-3 w-3 text-[#8C6207] shrink-0" />
                      <span className="truncate">{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[#FAF9F5] px-2 py-1 border border-slate-100">
                      <Fuel className="h-3 w-3 text-[#8C6207] shrink-0" />
                      <span className="truncate">{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[#FAF9F5] px-2 py-1 border border-slate-100">
                      <Users className="h-3 w-3 text-[#8C6207] shrink-0" />
                      <span className="truncate">{car.seats}</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[#FAF9F5] px-2 py-1 border border-slate-100">
                      <MapPin className="h-3 w-3 text-emerald-600 shrink-0" />
                      <span className="truncate">Islamabad</span>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {car.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-50/80 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200/70"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing Breakdown & Book Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">
                      {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'} Total:
                    </span>
                    <span className="font-mono font-extrabold text-emerald-700 text-sm">
                      Rs. {totalEstimate.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={buildWhatsAppLink(car, activeRate)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1fb857] text-slate-950 font-extrabold text-xs py-2.5 px-3 shadow-xs transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Book on WhatsApp</span>
                    </a>
                    <a
                      href="tel:+923342443388"
                      className="inline-flex items-center justify-center rounded-xl border border-[#D4AF37]/45 bg-[#FFFDF5] hover:bg-[#FFF4D4] text-[#8C6207] p-2.5 transition-colors"
                      title="Call Jawad: 0334 2443388"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`mailto:malikjawad3066@gmail.com?subject=${encodeURIComponent(`AWAN RENTAL CARS Booking: ${car.name}`)}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 p-2.5 transition-colors"
                      title="Email Jawad: malikjawad3066@gmail.com"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Compact Official Per-Day Tariff Summary Bar */}
      <div className="mt-7 rounded-2xl border border-[#D4AF37]/30 bg-white p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/agent-jawad.jpg"
              alt="Jawad - AWAN RENTAL CARS"
              className="h-12 w-12 rounded-2xl object-cover object-[center_20%] border-2 border-[#D4AF37] shrink-0"
            />
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207]">
                AWAN RENTAL CARS — Contact Jawad (Fleet Manager)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Self-drive (valid CNIC &amp; driving license) or Chauffeur-driven • WhatsApp{' '}
                <a href="https://wa.me/923342443388" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 hover:underline font-mono">
                  0334 2443388
                </a>{' '}
                • Email{' '}
                <a href="mailto:malikjawad3066@gmail.com" className="font-semibold text-slate-800 hover:text-[#8C6207] underline">
                  malikjawad3066@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="mailto:malikjawad3066@gmail.com?subject=AWAN%20RENTAL%20CARS%20Booking%20Inquiry"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#D4AF37]/45 bg-[#FFFDF5] hover:bg-[#FFF4D4] px-3.5 py-2.5 text-xs font-extrabold text-[#8C6207] transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email Jawad</span>
            </a>
            <a
              href="https://wa.me/923342443388?text=Hello%20Jawad%2C%20I%20want%20to%20inquire%20about%20AWAN%20RENTAL%20CARS%20in%20Islamabad."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl gold-btn px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-sm"
            >
              <Car className="h-4 w-4" />
              <span>WhatsApp Jawad (0334 2443388)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      {previewCar && (
        <div
          onClick={() => setPreviewCar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full overflow-hidden rounded-3xl bg-white border-2 border-[#D4AF37] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setPreviewCar(null)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white hover:bg-black"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={previewCar.image}
              alt={previewCar.name}
              className="w-full max-h-[70vh] object-contain bg-slate-950"
            />
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFDF7]">
              <div>
                <h4 className="font-serif text-lg font-extrabold text-slate-950">{previewCar.name}</h4>
                <p className="text-xs font-semibold text-[#8C6207]">
                  {previewCar.subtitle} • Rs. {(driverMode === 'driver' ? previewCar.withDriverRate : previewCar.dailyRate).toLocaleString()} / day
                </p>
              </div>
              <a
                href={buildWhatsAppLink(
                  previewCar,
                  driverMode === 'driver' ? previewCar.withDriverRate : previewCar.dailyRate
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-extrabold text-slate-950 shadow-xs"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Reserve This Car</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

