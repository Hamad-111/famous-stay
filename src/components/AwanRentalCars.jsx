import React, { useState } from 'react';
import {
  Car,
  MessageCircle,
  PhoneCall,
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
    { id: 'all', label: `All Cars (${AWAN_CARS_FLEET.length})` },
    { id: 'hatchback', label: 'Alto (4.5k)' },
    { id: 'sedan', label: 'City & Civic X (7k–10k)' },
    { id: 'executive', label: 'Civic 11th Gen (14k–15k)' },
    { id: 'suv', label: 'MG HS SUV (16k)' }
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
      className="relative z-10 mt-6 mb-10 rounded-2xl sm:rounded-3xl border border-[#D4AF37]/35 bg-white p-4 sm:p-8 shadow-sm"
    >
      {/* Simple Clean Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF6EA] border border-[#D4AF37]/40 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8C6207]">
            <Car className="h-3.5 w-3.5" />
            <span>AWAN RENTAL CARS • Islamabad</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Simple, Clean Daily Car Rentals
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Transparent per-day tariffs • Instant booking directly with{' '}
            <strong className="text-slate-900">Jawad</strong> on WhatsApp or Email.
          </p>
        </div>

        {/* Clean Manager Contact Card: Jawad */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/35 bg-[#FAF9F5] px-3.5 py-2.5 w-full md:w-auto shrink-0">
          <img
            src="/agent-jawad.jpg"
            alt="Jawad - AWAN RENTAL CARS"
            className="h-11 w-11 rounded-full object-cover object-[center_20%] border-2 border-[#25D366] shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-extrabold text-slate-950">
              Jawad <span className="font-semibold text-[#8C6207]">• Booking Manager</span>
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] sm:text-xs">
              <a
                href="https://wa.me/923342443388"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-emerald-700 hover:underline shrink-0"
              >
                0334 2443388
              </a>
              <a
                href="mailto:malikjawad3066@gmail.com"
                className="text-slate-600 hover:text-[#8C6207] break-all sm:break-normal"
              >
                malikjawad3066@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Simple 1-Row Controls: Categories + Self-Drive/Chauffeur + Days */}
      <div className="mt-4 sm:mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto pb-1 sm:pb-0 gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-950 text-[#F7E5A9] shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-[#FAF6EA] hover:text-[#8C6207]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto shrink-0">
          {/* Self-Drive vs With Driver Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setDriverMode('self')}
              className={`rounded-lg px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                driverMode === 'self'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Self-Drive
            </button>
            <button
              type="button"
              onClick={() => setDriverMode('driver')}
              className={`rounded-lg px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                driverMode === 'driver'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              With Driver
            </button>
          </div>

          {/* Days Counter */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200 bg-[#FAF9F5] px-2.5 sm:px-3 py-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#8C6207]" />
            <span className="text-[11px] sm:text-xs font-bold text-slate-600">Days</span>
            <button
              type="button"
              onClick={() => setRentalDays((d) => Math.max(1, d - 1))}
              className="h-6 w-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-800 text-xs"
              aria-label="Decrease rental days"
            >
              -
            </button>
            <span className="font-mono text-xs font-extrabold text-slate-950 min-w-[16px] text-center">
              {rentalDays}
            </span>
            <button
              type="button"
              onClick={() => setRentalDays((d) => Math.min(30, d + 1))}
              className="h-6 w-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-800 text-xs"
              aria-label="Increase rental days"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Spacious User-Friendly Car Grid */}
      <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredCars.map((car) => {
          const activeRate = driverMode === 'driver' ? car.withDriverRate : car.dailyRate;
          const totalEstimate = activeRate * rentalDays;

          return (
            <article
              key={car.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300"
            >
              {/* Clean Photo Container */}
              <div
                onClick={() => setPreviewCar(car)}
                className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer"
                title="Click to enlarge photo"
              >
                <img
                  src={car.image}
                  alt={`${car.name} - AWAN RENTAL CARS`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2.5 right-2.5 rounded-xl bg-slate-950/90 backdrop-blur-sm px-3 py-1 border border-[#D4AF37]/40">
                  <span className="font-mono text-sm font-extrabold text-[#F7E5A9]">
                    Rs. {activeRate.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-300"> /day</span>
                </div>
              </div>

              {/* Clean Minimal Details */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-serif text-base font-extrabold text-slate-950 leading-snug">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {car.subtitle}
                  </p>
                  <p className="text-[11px] font-medium text-[#8C6207] mt-1.5">
                    {car.transmission} • {car.fuel} • {car.seats}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Total ({rentalDays} {rentalDays === 1 ? 'day' : 'days'})
                    </span>
                    <span className="font-mono font-extrabold text-emerald-700 text-sm">
                      Rs. {totalEstimate.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={buildWhatsAppLink(car, activeRate)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1fb857] text-slate-950 font-bold text-xs py-2.5 px-3 transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Book on WhatsApp</span>
                    </a>
                    <a
                      href="tel:+923342443388"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-[#FAF9F5] hover:bg-[#FFF4D4] text-slate-700 p-2.5 transition-colors"
                      title="Call Jawad: 0334 2443388"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`mailto:malikjawad3066@gmail.com?subject=${encodeURIComponent(`AWAN RENTAL CARS Booking: ${car.name}`)}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-[#FAF9F5] hover:bg-[#FFF4D4] text-slate-700 p-2.5 transition-colors"
                      title="Email Jawad"
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

      {/* Simple Lightbox Preview */}
      {previewCar && (
        <div
          onClick={() => setPreviewCar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full overflow-hidden rounded-3xl bg-white border border-[#D4AF37] shadow-2xl"
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
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF9F5]">
              <div>
                <h4 className="font-serif text-lg font-extrabold text-slate-950">{previewCar.name}</h4>
                <p className="text-xs text-[#8C6207] font-semibold">
                  Rs. {(driverMode === 'driver' ? previewCar.withDriverRate : previewCar.dailyRate).toLocaleString()} / day • Contact Jawad: 0334 2443388
                </p>
              </div>
              <a
                href={buildWhatsAppLink(
                  previewCar,
                  driverMode === 'driver' ? previewCar.withDriverRate : previewCar.dailyRate
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-extrabold text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Jawad</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
