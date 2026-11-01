import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  Lock,
  Plus,
  Car,
  Wine,
  UtensilsCrossed,
  Clock,
  Briefcase,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ 
  room, 
  initialDates, 
  currency, 
  onClose, 
  onBookingComplete 
}) {
  const [step, setStep] = useState(1);
  const [previewPhotoIndex, setPreviewPhotoIndex] = useState(0);

  // Client Details Form State
  const [clientForm, setClientForm] = useState({
    salutation: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    passportNumber: '',
    additionalGuests: '',
    agentPnr: `VIP-${Math.floor(1000 + Math.random() * 9000)}-PK`,
    paymentMode: 'Bank Alfalah Corporate Transfer',
    specialRequests: '',
    selectedAddons: []
  });

  const [formErrors, setFormErrors] = useState({});

  if (!room) return null;

  // Currency is strictly in Pakistani Rupees (PKR)
  const currencySymbol = 'Rs. ';

  const apartmentPhotos = room.images || [
    "/apartment/emerald-living-main.jpg",
    "/apartment/master-bedroom-blush.jpg",
    "/apartment/charcoal-bedroom-suite.jpg",
    "/apartment/emerald-lounge-art.jpg",
    "/apartment/beige-marble-salon.jpg"
  ];

  const photoLabels = room.imageLabels || [
    "Emerald Executive Salon & Media Wall",
    "Blush Rose Master King Suite",
    "Noir Charcoal Second Suite",
    "Velvet Lounge & Signature Gold Art",
    "Beige Marble Salon & Arched Mirrors"
  ];

  // Calculate nights
  const checkInDate = new Date(initialDates.checkIn);
  const checkOutDate = new Date(initialDates.checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // VIP Add-on options with prices in PKR
  const VIP_ADDONS = [
    {
      id: 'limo',
      name: 'Private Airport Chauffeur (Mercedes S-Class / Prado)',
      price: 25000,
      icon: Car,
      desc: 'Seamless tarmac or terminal VIP meet & direct transfer'
    },
    {
      id: 'champagne',
      name: 'Royal Mughal Welcome High Tea & Gourmet Sweets',
      price: 15000,
      icon: Wine,
      desc: 'Artisan Kashmiri tea, gourmet dry fruits and baklava in suite'
    },
    {
      id: 'dinner',
      name: 'Private Chef 3-Course Candlelight Terrace Barbecue',
      price: 35000,
      icon: UtensilsCrossed,
      desc: 'Bespoke live grill and fine-dining experience on private terrace'
    },
    {
      id: 'checkout',
      name: 'Guaranteed 4:00 PM Late Departure Privilege',
      price: 20000,
      icon: Clock,
      desc: 'Enjoy a relaxed final day without standard checkout rush'
    }
  ];

  const toggleAddon = (addonId) => {
    if (clientForm.selectedAddons.includes(addonId)) {
      setClientForm({
        ...clientForm,
        selectedAddons: clientForm.selectedAddons.filter(id => id !== addonId)
      });
    } else {
      setClientForm({
        ...clientForm,
        selectedAddons: [...clientForm.selectedAddons, addonId]
      });
    }
  };

  // Pricing calculations (PKR)
  const baseClientRate = room.clientRate;
  const baseRoomTotal = baseClientRate * nights;

  const addonsTotal = clientForm.selectedAddons.reduce((sum, addonId) => {
    const item = VIP_ADDONS.find(a => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  const grandClientTotal = baseRoomTotal + addonsTotal;
  const agentCommission = Math.round((baseRoomTotal * (room.agentCommissionPct / 100)) + (addonsTotal * 0.10));
  const agentNetPayable = grandClientTotal - agentCommission;

  // Validation
  const validateStep1 = () => {
    const errors = {};
    if (!clientForm.firstName.trim()) errors.firstName = 'First name is required';
    if (!clientForm.lastName.trim()) errors.lastName = 'Last name is required';
    if (!clientForm.email.trim()) errors.email = 'Client email is required';
    else if (!/\S+@\S+\.\S+/.test(clientForm.email)) errors.email = 'Valid email is required';
    if (!clientForm.phone.trim()) errors.phone = 'Contact number is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleCompleteBooking = () => {
    // Fire festive luxury confetti in light gold & royal blue
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F7E5A9', '#E5C07B', '#3B82F6', '#1D4ED8', '#FFFFFF']
    });

    const newBookingId = `FS-${Math.floor(10000 + Math.random() * 90000)}-${room.city.substring(0, 3).toUpperCase()}`;

    const newBookingRecord = {
      id: newBookingId,
      bookingDate: new Date().toISOString().split('T')[0],
      clientName: `${clientForm.salutation} ${clientForm.firstName} ${clientForm.lastName}`,
      clientEmail: clientForm.email,
      clientPhone: clientForm.phone,
      hotelName: room.hotel,
      roomName: room.name,
      destination: `${room.city}, ${room.country}`,
      checkIn: initialDates.checkIn,
      checkOut: initialDates.checkOut,
      nights: nights,
      guests: `${room.maxAdults} Adults`,
      clientTotal: grandClientTotal,
      agentNetTotal: agentNetPayable,
      agentCommission: agentCommission,
      commissionPct: room.agentCommissionPct,
      status: 'Confirmed',
      paymentMode: clientForm.paymentMode,
      specialRequests: clientForm.specialRequests || 'No special requests submitted.',
      agentPnr: clientForm.agentPnr,
      selectedAddons: clientForm.selectedAddons.map(id => VIP_ADDONS.find(a => a.id === id)?.name),
      qrCodeMock: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=FAMOUS-STAY-${newBookingId}`,
      room: room
    };

    onBookingComplete(newBookingRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#040814]/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[#E5C07B]/40 bg-[#07132F] text-white shadow-2xl shadow-[#E5C07B]/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#E5C07B]/20 bg-[#0B1C44] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF5D0] via-[#E5C07B] to-[#B88A1F] text-[#061026] shadow-md shadow-[#E5C07B]/30 font-bold">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                Client Reservation Wizard
              </h3>
              <p className="text-xs text-blue-200/80">
                Booking <strong className="text-[#F7E5A9]">{room.name}</strong> for client
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

        {/* Wizard Steps Indicator in Sapphire Blue & Light Gold */}
        <div className="flex border-b border-[#E5C07B]/15 bg-[#050E24] px-6 py-3 text-xs">
          <div className={`flex items-center gap-2 font-bold ${step >= 1 ? 'text-[#F7E5A9]' : 'text-blue-300/50'}`}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step >= 1 ? 'bg-[#E5C07B] text-[#061026] font-extrabold' : 'bg-[#0A1738] text-blue-300'}`}>
              1
            </span>
            <span>Client Profile</span>
          </div>

          <div className="mx-4 my-auto h-px flex-1 bg-[#E5C07B]/20"></div>

          <div className={`flex items-center gap-2 font-bold ${step >= 2 ? 'text-[#F7E5A9]' : 'text-blue-300/50'}`}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step >= 2 ? 'bg-[#E5C07B] text-[#061026] font-extrabold' : 'bg-[#0A1738] text-blue-300'}`}>
              2
            </span>
            <span>Stay & VIP Add-ons</span>
          </div>

          <div className="mx-4 my-auto h-px flex-1 bg-[#E5C07B]/20"></div>

          <div className={`flex items-center gap-2 font-bold ${step >= 3 ? 'text-[#F7E5A9]' : 'text-blue-300/50'}`}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step >= 3 ? 'bg-[#E5C07B] text-[#061026] font-extrabold' : 'bg-[#0A1738] text-blue-300'}`}>
              3
            </span>
            <span>Billing & Voucher</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-h-[75vh] overflow-y-auto p-4 sm:p-7">
          {/* STYLISH 5-PHOTO APARTMENT SHOWCASE IN BOOKING SECTOR */}
          <div className="mb-5 overflow-hidden rounded-2xl border border-[#E5C07B]/40 bg-[#061026] shadow-xl">
            {/* Main Active Photo Container */}
            <div className="group relative h-40 sm:h-52 w-full overflow-hidden bg-black">
              <img
                src={apartmentPhotos[previewPhotoIndex]}
                alt={photoLabels[previewPhotoIndex] || room.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040A18]/90 via-transparent to-black/40"></div>

              {/* Photo Index Badge */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="flex items-center gap-1.5 rounded-full bg-[#061026]/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#F7E5A9] border border-[#E5C07B]/40 shadow-lg">
                  <Camera className="h-3 w-3 text-[#E5C07B]" />
                  <span>Photo {previewPhotoIndex + 1} of {apartmentPhotos.length}</span>
                </span>
              </div>

              {/* Wholesale Rate Tag */}
              <div className="absolute top-2.5 right-2.5 z-10">
                <span className="rounded-full bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                  Rs. {room.clientRate.toLocaleString()} / nt
                </span>
              </div>

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={() => setPreviewPhotoIndex((prev) => (prev === 0 ? apartmentPhotos.length - 1 : prev - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#061026]/80 text-white border border-[#E5C07B]/40 hover:bg-[#E5C07B] hover:text-[#061026] transition-all shadow-md z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewPhotoIndex((prev) => (prev === apartmentPhotos.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#061026]/80 text-white border border-[#E5C07B]/40 hover:bg-[#E5C07B] hover:text-[#061026] transition-all shadow-md z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Photo Title Overlay */}
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between z-10">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#E5C07B]">
                    Verified Residence View
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate max-w-[220px] sm:max-w-md">
                    {photoLabels[previewPhotoIndex] || room.name}
                  </div>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400 bg-[#061026]/90 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                  Host: Mohsin (0314 3292778)
                </span>
              </div>
            </div>

            {/* 5-Thumbnail Selector Bar */}
            <div className="grid grid-cols-5 gap-1.5 p-2 bg-[#091738]/90 border-t border-[#E5C07B]/20">
              {apartmentPhotos.map((photoUrl, pIdx) => {
                const isSelected = previewPhotoIndex === pIdx;
                return (
                  <button
                    type="button"
                    key={pIdx}
                    onClick={() => setPreviewPhotoIndex(pIdx)}
                    className={`relative aspect-[16/10] overflow-hidden rounded-lg border transition-all ${
                      isSelected
                        ? 'border-[#E5C07B] ring-2 ring-[#E5C07B]/60 scale-105 shadow-md'
                        : 'border-[#E5C07B]/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photoUrl}
                      alt={photoLabels[pIdx]}
                      className="h-full w-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute inset-0 bg-[#E5C07B]/15"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 1: CLIENT DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#E5C07B]/25 bg-[#0A1A40]/80 p-4 text-xs text-blue-100">
                <span className="font-bold text-[#F7E5A9]">Agent Notice:</span> The guest details entered below will appear on the official Hotel Check-in Voucher and Arrival Greeting registry.
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Title / Salutation
                  </label>
                  <select
                    value={clientForm.salutation}
                    onChange={(e) => setClientForm({ ...clientForm, salutation: e.target.value })}
                    className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026] px-3 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#E5C07B]"
                  >
                    <option value="Mr." className="bg-[#07132F]">Mr.</option>
                    <option value="Mrs." className="bg-[#07132F]">Mrs.</option>
                    <option value="Ms." className="bg-[#07132F]">Ms.</option>
                    <option value="Dr." className="bg-[#07132F]">Dr.</option>
                    <option value="Lord" className="bg-[#07132F]">Lord</option>
                    <option value="Lady" className="bg-[#07132F]">Lady</option>
                    <option value="VIP" className="bg-[#07132F]">VIP Dignitary</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Client First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alexander"
                    value={clientForm.firstName}
                    onChange={(e) => setClientForm({ ...clientForm, firstName: e.target.value })}
                    className={`w-full rounded-xl border bg-[#061026] px-3 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#E5C07B] ${
                      formErrors.firstName ? 'border-rose-500' : 'border-[#E5C07B]/30'
                    }`}
                  />
                  {formErrors.firstName && (
                    <span className="text-[11px] text-rose-400">{formErrors.firstName}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Client Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kensington"
                    value={clientForm.lastName}
                    onChange={(e) => setClientForm({ ...clientForm, lastName: e.target.value })}
                    className={`w-full rounded-xl border bg-[#061026] px-3 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#E5C07B] ${
                      formErrors.lastName ? 'border-rose-500' : 'border-[#E5C07B]/30'
                    }`}
                  />
                  {formErrors.lastName && (
                    <span className="text-[11px] text-rose-400">{formErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Client Email (for Voucher Dispatch) *
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#E5C07B]" />
                    <input
                      type="email"
                      placeholder="client@luxuryclient.com"
                      value={clientForm.email}
                      onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                      className={`w-full rounded-xl border bg-[#061026] py-2.5 pl-9 pr-3 text-sm font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.email ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <span className="text-[11px] text-rose-400">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Client Contact Phone *
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#E5C07B]" />
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={clientForm.phone}
                      onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                      className={`w-full rounded-xl border bg-[#061026] py-2.5 pl-9 pr-3 text-sm font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.phone ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="text-[11px] text-rose-400">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Client Nationality / Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pakistan"
                    value={clientForm.country}
                    onChange={(e) => setClientForm({ ...clientForm, country: e.target.value })}
                    className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026] px-3 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#E5C07B]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Passport / VIP National ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GB98241029"
                    value={clientForm.passportNumber}
                    onChange={(e) => setClientForm({ ...clientForm, passportNumber: e.target.value })}
                    className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026] px-3 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#E5C07B]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                  Additional Accompanying Guests Names (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lady Victoria Kensington, Master Oliver"
                  value={clientForm.additionalGuests}
                  onChange={(e) => setClientForm({ ...clientForm, additionalGuests: e.target.value })}
                  className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026] px-3 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#E5C07B]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: STAY DETAILS & VIP ADD-ONS */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Stay Recap Box */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E5C07B]/35 bg-[#0B1E48]/80 p-5 shadow-lg">
                <div>
                  <div className="text-xs uppercase font-extrabold text-[#E5C07B]">Selected Luxury Suite</div>
                  <div className="font-serif text-xl font-bold text-white mt-0.5">{room.name}</div>
                  <div className="text-xs text-blue-200">{room.hotel} • {room.city}, {room.country}</div>
                </div>

                <div className="text-right">
                  <div className="rounded-xl bg-[#061026] px-4 py-2 text-xs text-blue-100 border border-[#E5C07B]/30">
                    <span className="font-bold text-[#F7E5A9]">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    <span className="mx-2 text-[#E5C07B]/40">|</span>
                    <span>{initialDates.checkIn} to {initialDates.checkOut}</span>
                  </div>
                </div>
              </div>

              {/* VIP Add-Ons Selector */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#F7E5A9]">
                  Select Bespoke VIP Client Add-Ons:
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {VIP_ADDONS.map((addon) => {
                    const isSelected = clientForm.selectedAddons.includes(addon.id);
                    const IconComponent = addon.icon;
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                          isSelected
                            ? 'border-[#E5C07B] bg-[#E5C07B]/15 shadow-md shadow-[#E5C07B]/15'
                            : 'border-[#E5C07B]/20 bg-[#061026]/80 hover:border-[#E5C07B]/50 hover:bg-[#091738]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${isSelected ? 'bg-[#E5C07B] text-[#061026] font-bold' : 'bg-[#0B1C44] text-[#E5C07B]'}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{addon.name}</div>
                              <div className="text-[11px] text-blue-200/70">{addon.desc}</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#F7E5A9]">
                            +{currencySymbol}{addon.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Concierge Requests */}
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                  Special Concierge Instructions & Client Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Celebrating 15th wedding anniversary. Preference for high floor, non-feather pillows, chilled champagne waiting on arrival at 14:00."
                  value={clientForm.specialRequests}
                  onChange={(e) => setClientForm({ ...clientForm, specialRequests: e.target.value })}
                  className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026] p-3 text-xs font-medium text-white outline-none focus:border-[#E5C07B]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: BILLING & COMMISSION CONFIRMATION */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Booking Summary Box */}
              <div className="rounded-2xl border border-[#E5C07B]/35 bg-gradient-to-br from-[#07132E] via-[#0B1C44] to-[#0E2866] p-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#E5C07B]/20 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F7E5A9]">
                    Financial Ledger & Commission Breakdown
                  </span>
                  <span className="text-xs text-blue-200">
                    Agent Commission Tier: <strong className="text-[#F7E5A9] font-bold">{room.agentCommissionPct}% Net</strong>
                  </span>
                </div>

                <div className="my-4 space-y-2 text-xs">
                  <div className="flex justify-between text-blue-100">
                    <span>Base Suite Rate ({nights} nights × {currencySymbol}{baseClientRate}):</span>
                    <span>{currencySymbol}{baseRoomTotal.toLocaleString()}</span>
                  </div>

                  {addonsTotal > 0 && (
                    <div className="flex justify-between text-blue-100">
                      <span>Bespoke VIP Add-ons:</span>
                      <span>+{currencySymbol}{addonsTotal.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-[#E5C07B]/20 pt-2 text-sm font-bold text-white">
                    <span>Total Client Quoted Invoice:</span>
                    <span>{currencySymbol}{grandClientTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-xs text-blue-200/80">
                    <span>Wholesale Hotel Cost (Agent Net):</span>
                    <span>{currencySymbol}{agentNetPayable.toLocaleString()}</span>
                  </div>
                </div>

                {/* Big Profit Box in Light Golden & Sapphire Blue */}
                <div className="rounded-xl border border-[#E5C07B]/50 bg-gradient-to-r from-[#0E2355] to-[#0A1A40] p-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5C07B]/20 text-[#F7E5A9]">
                      <DollarSign className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase font-extrabold tracking-wider text-[#F7E5A9]">
                        Your Agent Net Commission
                      </div>
                      <div className="text-xs text-blue-200">Credited to your agency balance immediately</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-3xl font-extrabold text-[#F7E5A9]">
                      +{currencySymbol}{agentCommission.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Mode Selection */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-blue-200">
                  Select Settlement / Payment Method:
                </label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {[
                    'Bank Alfalah Corporate Transfer',
                    'Habib Bank (HBL) / Meezan Direct Wire',
                    'Agency Corporate Credit Line (Net 30)'
                  ].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setClientForm({ ...clientForm, paymentMode: mode })}
                      className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                        clientForm.paymentMode === mode
                          ? 'border-[#E5C07B] bg-[#E5C07B]/20 font-bold'
                          : 'border-[#E5C07B]/20 bg-[#061026] hover:border-[#E5C07B]/50'
                      }`}
                    >
                      <CreditCard className="mb-1.5 h-4 w-4 text-[#E5C07B]" />
                      <span className="text-xs font-semibold text-white">{mode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent File Code */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Internal Agent PNR / File Reference
                  </label>
                  <input
                    type="text"
                    value={clientForm.agentPnr}
                    onChange={(e) => setClientForm({ ...clientForm, agentPnr: e.target.value })}
                    className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#061026] px-3 py-2 text-xs font-bold text-[#F7E5A9] outline-none focus:border-[#E5C07B]"
                  />
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-blue-400/20 bg-[#081534] p-3 text-xs text-blue-200">
                  <Lock className="h-4 w-4 text-[#60A5FA] flex-shrink-0" />
                  <span>256-bit SSL Direct B2B Encryption with hotel reservation exchange.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between border-t border-[#E5C07B]/20 bg-[#0B1C44] px-6 py-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 rounded-xl border border-[#E5C07B]/30 px-4 py-2.5 text-xs font-bold text-blue-100 transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-blue-200 hover:text-white"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="gold-btn flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold"
            >
              <span>Continue to Next Step</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteBooking}
              className="gold-btn flex items-center gap-2 rounded-xl px-7 py-3 text-xs font-bold shadow-xl"
            >
              <Sparkles className="h-4 w-4" />
              <span>Issue Voucher & Complete Booking</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
