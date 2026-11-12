import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  KeyRound,
  HelpCircle
} from 'lucide-react';
import Logo from './Logo';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  initialMode = 'login' 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: 'bilal.aslam@industravel.pk',
    password: 'password123',
    rememberMe: true
  });

  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    agencyName: '',
    agentName: '',
    email: '',
    phone: '',
    dtsLicense: '',
    city: 'Islamabad',
    password: '',
    confirmPassword: '',
    agreedToTerms: true
  });

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  // Demo auto-fill helpers
  const handleQuickDemoFill = (type) => {
    if (type === 'usman') {
      setLoginForm({
        email: 'usman@famousstay.pk',
        password: 'password123',
        rememberMe: true
      });
    } else if (type === 'lahore') {
      setLoginForm({
        email: 'zainab.malik@lahorevoyages.pk',
        password: 'password123',
        rememberMe: true
      });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginForm.email.trim()) errors.email = 'Work email is required';
    if (!loginForm.password.trim()) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Determine user profile based on email or default demo
    const isLahore = loginForm.email.includes('lahore');
    const userData = {
      name: isLahore ? 'Zainab Malik' : 'Usman',
      avatar: isLahore ? null : '/agent-usman.jpg',
      email: loginForm.email,
      agencyName: isLahore ? 'Lahore Royal Voyages' : 'Famous Stay Luxury Desk',
      dtsLicense: isLahore ? 'LHR-DTS-3810' : 'ISB-DTS-4921',
      taapNumber: isLahore ? 'TAAP-1940' : 'TAAP-2841',
      tier: 'Diamond Desk Lead',
      city: isLahore ? 'Lahore, Pakistan' : 'Islamabad, Pakistan',
      phone: isLahore ? '+92 321 8899221' : '+92 348 0964370',
      rawPhone: isLahore ? '03218899221' : '03480964370',
      isLoggedIn: true
    };

    onLoginSuccess(userData);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!registerForm.agencyName.trim()) errors.agencyName = 'Agency name is required';
    if (!registerForm.agentName.trim()) errors.agentName = 'Agent name is required';
    if (!registerForm.email.trim()) errors.email = 'Business email is required';
    if (!registerForm.phone.trim()) errors.phone = 'Contact phone is required';
    if (!registerForm.password || registerForm.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (registerForm.password !== registerForm.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newUserData = {
      name: registerForm.agentName,
      email: registerForm.email,
      agencyName: registerForm.agencyName,
      dtsLicense: registerForm.dtsLicense || 'PENDING-VERIFICATION',
      taapNumber: 'PENDING',
      tier: 'Gold Partner (15% Net)',
      city: `${registerForm.city}, Pakistan`,
      phone: registerForm.phone,
      isLoggedIn: true
    };

    onLoginSuccess(newUserData);
    onClose();
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setFormErrors({ forgotEmail: 'Email is required' });
      return;
    }
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setMode('login');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-[#D4AF37]/45 bg-white text-slate-800 shadow-2xl shadow-[#D4AF37]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/90 text-slate-700 backdrop-blur-md border border-[#D4AF37]/40 transition-colors hover:bg-[#D4AF37] hover:text-white shadow-sm"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Dual-Column Modal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Brand & Agency Privileges Showcase */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EC] to-[#F5EED9] border-r border-[#D4AF37]/25">
            <div className="relative z-10">
              <Logo size="large" />

              <div className="mt-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#8C6207] shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#8C6207]" />
                  <span>Licensed B2B Travel Portal</span>
                </div>

                <h3 className="font-serif text-2xl font-bold leading-tight text-slate-900">
                  Exclusive Access for Registered Hotel & Travel Agents
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Log in to access live wholesale net rates, instant PDF guest check-in vouchers, and guaranteed 15%–18% commissions across Pakistan & international 5-star suites.
                </p>
              </div>

              {/* Agency Highlights */}
              <div className="mt-6 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6207] flex-shrink-0" />
                  <span>DTS Pakistan Verified wholesale rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6207] flex-shrink-0" />
                  <span>Instant guest reservation vouchers with QR pass</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6207] flex-shrink-0" />
                  <span>Net 30 Invoicing via HBL & Bank Alfalah</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6207] flex-shrink-0" />
                  <span>24/7 dedicated Islamabad general manager hotline</span>
                </div>
              </div>
            </div>

            {/* Bottom Support Callout */}
            <div className="relative z-10 pt-6 border-t border-[#D4AF37]/25 text-[11px] text-slate-600">
              Need assistance? Call our Agent Desk: <br />
              <strong className="text-[#8C6207] font-bold">+92 (51) 890-STAY (7829)</strong>
            </div>
          </div>

          {/* Right Column: Forms (Login / Register / Forgot Password) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-9 bg-white">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-4 mb-6">
              <button
                onClick={() => { setMode('login'); setFormErrors({}); }}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'gold-btn text-slate-950 shadow-sm'
                    : 'bg-[#FAF9F5] text-slate-600 hover:text-slate-900 border border-[#D4AF37]/25'
                }`}
              >
                Agent Sign In
              </button>

              <button
                onClick={() => { setMode('register'); setFormErrors({}); }}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                  mode === 'register'
                    ? 'gold-btn text-slate-950 shadow-sm'
                    : 'bg-[#FAF9F5] text-slate-600 hover:text-slate-900 border border-[#D4AF37]/25'
                }`}
              >
                Register Agency
              </button>
            </div>

            {/* MODE 1: AGENT LOGIN */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 my-auto">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Sign In to Agent Portal
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Enter your registered agency email and password
                  </p>
                </div>

                {/* Quick Auto-Fill Demo Accounts for Fast Testing */}
                <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#FAF7EE] p-3 text-xs">
                  <div className="text-[10px] uppercase font-bold text-[#8C6207] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#B8860B]" />
                    <span>Quick Test Login (One-Click Auto-Fill):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoFill('usman')}
                      className="rounded-lg bg-white border border-[#D4AF37]/35 px-2.5 py-1 text-[11px] font-semibold text-slate-800 hover:bg-[#FFFDF7] hover:text-[#8C6207] shadow-sm"
                    >
                      🇵🇰 Agent Usman (0348 0964370)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoFill('lahore')}
                      className="rounded-lg bg-white border border-[#D4AF37]/35 px-2.5 py-1 text-[11px] font-semibold text-slate-800 hover:bg-[#FFFDF7] hover:text-[#8C6207] shadow-sm"
                    >
                      🏛️ Partner Agency (Lahore Desk)
                    </button>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Business Work Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#8C6207]" />
                    <input
                      type="email"
                      placeholder="agent@industravel.pk"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] py-3 pl-10 pr-3 text-sm font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.email ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-[#8C6207] hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#8C6207]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] py-3 pl-10 pr-10 text-sm font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.password ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password view"
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-800"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.password}</span>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                      className="rounded border-[#D4AF37]/40 bg-[#FAF9F5] text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span>Remember this device</span>
                  </label>
                  <span className="text-slate-400 text-[11px]">256-Bit SSL Encrypted</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="gold-btn w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-md shadow-[#D4AF37]/20"
                >
                  <span>Sign In to Agent Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* MODE 2: REGISTER AGENCY */}
            {mode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 my-auto">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Register Travel Agency
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Join Pakistan's premier B2B luxury suite reservation network
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Agency Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Karakoram Luxury Voyages"
                      value={registerForm.agencyName}
                      onChange={(e) => setRegisterForm({ ...registerForm, agencyName: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.agencyName ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Authorized Agent Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Asadullah Farooqi"
                      value={registerForm.agentName}
                      onChange={(e) => setRegisterForm({ ...registerForm, agentName: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.agentName ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="info@karakoramtravel.pk"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.email ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Contact Phone (Pakistan) *
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 7654321"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.phone ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      DTS / TAAP License (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DTS-ISB-9281"
                      value={registerForm.dtsLicense}
                      onChange={(e) => setRegisterForm({ ...registerForm, dtsLicense: e.target.value })}
                      className="w-full rounded-xl border border-[#D4AF37]/35 bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      City in Pakistan
                    </label>
                    <select
                      value={registerForm.city}
                      onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                      className="w-full rounded-xl border border-[#D4AF37]/35 bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white"
                    >
                      <option value="Islamabad">Islamabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Gilgit">Gilgit-Baltistan</option>
                      <option value="Quetta">Quetta</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.password ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className={`w-full rounded-xl border bg-[#FAF9F5] px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white ${
                        formErrors.confirmPassword ? 'border-rose-500' : 'border-[#D4AF37]/35'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={registerForm.agreedToTerms}
                      onChange={(e) => setRegisterForm({ ...registerForm, agreedToTerms: e.target.checked })}
                      className="rounded border-[#D4AF37]/40 bg-[#FAF9F5] text-[#D4AF37]"
                    />
                    <span>I agree to DTS Pakistan wholesale agent code & terms</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="gold-btn w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold shadow-md shadow-[#D4AF37]/20"
                >
                  <span>Complete Agency Registration</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* MODE 3: FORGOT PASSWORD */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-4 my-auto">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Reset Agent Password
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Enter your registered email and we will send you a recovery link
                  </p>
                </div>

                {forgotSuccess ? (
                  <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-center">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                    <div className="font-bold text-emerald-800 mt-2 text-sm">Recovery Link Sent!</div>
                    <div className="text-xs text-slate-600 mt-1">Check your email inbox for password reset instructions.</div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Registered Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="agent@industravel.pk"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#D4AF37]/35 bg-[#FAF9F5] py-3 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-[#D4AF37] focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="gold-btn w-full py-3 rounded-xl text-xs font-bold shadow-md shadow-[#D4AF37]/20"
                    >
                      Send Password Reset Link
                    </button>
                  </>
                )}

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-[#8C6207] hover:underline font-bold"
                  >
                    ← Back to Agent Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Footer Notice */}
            <div className="pt-4 border-t border-[#D4AF37]/20 text-center text-[10px] text-slate-500">
              Department of Tourist Services (DTS) Pakistan Authorized Portal • 24/7 Agent Desk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

