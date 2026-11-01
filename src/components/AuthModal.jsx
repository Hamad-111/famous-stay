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
    if (type === 'mohsin') {
      setLoginForm({
        email: 'mohsin@famousstay.pk',
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
      name: isLahore ? 'Zainab Malik' : 'Mohsin',
      avatar: isLahore ? null : '/agent-mohsin.jpg',
      email: loginForm.email,
      agencyName: isLahore ? 'Lahore Royal Voyages' : 'Famous Stay Luxury Desk',
      dtsLicense: isLahore ? 'LHR-DTS-3810' : 'ISB-DTS-4921',
      taapNumber: isLahore ? 'TAAP-1940' : 'TAAP-2841',
      tier: 'Diamond Desk Lead',
      city: isLahore ? 'Lahore, Pakistan' : 'Islamabad, Pakistan',
      phone: isLahore ? '+92 321 8899221' : '+92 314 3292778',
      rawPhone: isLahore ? '03218899221' : '03143292778',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#030712]/92 backdrop-blur-2xl animate-in fade-in duration-200">
      <div 
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-[#E5C07B]/45 bg-[#07132F] text-white shadow-2xl shadow-[#E5C07B]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#061026]/80 text-[#F7E5A9] backdrop-blur-md border border-[#E5C07B]/30 transition-colors hover:bg-[#061026] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Dual-Column Modal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Brand & Agency Privileges Showcase */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 bg-gradient-to-b from-[#0B1E48] via-[#081534] to-[#040A18] border-r border-[#E5C07B]/25">
            {/* Background Ambience */}
            <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A18] via-transparent to-[#07132F]/80"></div>

            <div className="relative z-10">
              <Logo size="large" />

              <div className="mt-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E5C07B]/40 bg-[#0E2355]/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#F7E5A9]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#E5C07B]" />
                  <span>Licensed B2B Travel Portal</span>
                </div>

                <h3 className="font-serif text-2xl font-bold leading-tight text-white">
                  Exclusive Access for Registered Hotel & Travel Agents
                </h3>

                <p className="text-xs text-blue-200/80 leading-relaxed">
                  Log in to access live wholesale net rates, instant PDF guest check-in vouchers, and guaranteed 15%–18% commissions across Pakistan & international 5-star suites.
                </p>
              </div>

              {/* Agency Highlights */}
              <div className="mt-6 space-y-2.5 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F7E5A9] flex-shrink-0" />
                  <span>DTS Pakistan Verified wholesale rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F7E5A9] flex-shrink-0" />
                  <span>Instant guest reservation vouchers with QR pass</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F7E5A9] flex-shrink-0" />
                  <span>Net 30 Invoicing via HBL & Bank Alfalah</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F7E5A9] flex-shrink-0" />
                  <span>24/7 dedicated Islamabad general manager hotline</span>
                </div>
              </div>
            </div>

            {/* Bottom Support Callout */}
            <div className="relative z-10 pt-6 border-t border-[#E5C07B]/20 text-[11px] text-blue-300/70">
              Need assistance? Call our Agent Desk: <br />
              <strong className="text-[#F7E5A9] font-bold">+92 (51) 890-STAY (7829)</strong>
            </div>
          </div>

          {/* Right Column: Forms (Login / Register / Forgot Password) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-9 bg-[#07132F]">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E5C07B]/20 pb-4 mb-6">
              <button
                onClick={() => { setMode('login'); setFormErrors({}); }}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'gold-btn text-[#061026] shadow-md shadow-[#E5C07B]/20'
                    : 'bg-[#0A1738] text-blue-200 hover:text-white border border-[#E5C07B]/20'
                }`}
              >
                Agent Sign In
              </button>

              <button
                onClick={() => { setMode('register'); setFormErrors({}); }}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                  mode === 'register'
                    ? 'gold-btn text-[#061026] shadow-md shadow-[#E5C07B]/20'
                    : 'bg-[#0A1738] text-blue-200 hover:text-white border border-[#E5C07B]/20'
                }`}
              >
                Register Agency
              </button>
            </div>

            {/* MODE 1: AGENT LOGIN */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 my-auto">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Sign In to Agent Portal
                  </h2>
                  <p className="text-xs text-blue-200/80 mt-1">
                    Enter your registered agency email and password
                  </p>
                </div>

                {/* Quick Auto-Fill Demo Accounts for Fast Testing */}
                <div className="rounded-2xl border border-[#E5C07B]/30 bg-[#0A1A40]/70 p-3 text-xs">
                  <div className="text-[10px] uppercase font-bold text-[#F7E5A9] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#E5C07B]" />
                    <span>Quick Test Login (One-Click Auto-Fill):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoFill('mohsin')}
                      className="rounded-lg bg-[#0E2355] border border-[#E5C07B]/30 px-2.5 py-1 text-[11px] font-semibold text-blue-100 hover:bg-[#122D6E] hover:text-[#F7E5A9]"
                    >
                      🇵🇰 Agent Mohsin (0314 3292778)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoFill('lahore')}
                      className="rounded-lg bg-[#0E2355] border border-[#E5C07B]/30 px-2.5 py-1 text-[11px] font-semibold text-blue-100 hover:bg-[#122D6E] hover:text-[#F7E5A9]"
                    >
                      🏛️ Partner Agency (Lahore Desk)
                    </button>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                    Business Work Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#E5C07B]" />
                    <input
                      type="email"
                      placeholder="agent@industravel.pk"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] py-3 pl-10 pr-3 text-sm font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.email ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-blue-200">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-[#F7E5A9] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#E5C07B]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] py-3 pl-10 pr-10 text-sm font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.password ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password view"
                      className="absolute right-3 top-3 text-blue-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.password}</span>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs text-blue-200 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                      className="rounded border-[#E5C07B]/40 bg-[#050C1E] text-[#E5C07B] focus:ring-[#E5C07B]"
                    />
                    <span>Remember this device</span>
                  </label>
                  <span className="text-blue-300/60 text-[11px]">256-Bit SSL Encrypted</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="gold-btn w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-xl"
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
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Register Travel Agency
                  </h2>
                  <p className="text-xs text-blue-200/80 mt-0.5">
                    Join Pakistan's premier B2B luxury suite reservation network
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      Agency Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Karakoram Luxury Voyages"
                      value={registerForm.agencyName}
                      onChange={(e) => setRegisterForm({ ...registerForm, agencyName: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.agencyName ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      Authorized Agent Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Asadullah Farooqi"
                      value={registerForm.agentName}
                      onChange={(e) => setRegisterForm({ ...registerForm, agentName: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.agentName ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="info@karakoramtravel.pk"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.email ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      Contact Phone (Pakistan) *
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 7654321"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.phone ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      DTS / TAAP License (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DTS-ISB-9281"
                      value={registerForm.dtsLicense}
                      onChange={(e) => setRegisterForm({ ...registerForm, dtsLicense: e.target.value })}
                      className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      City in Pakistan
                    </label>
                    <select
                      value={registerForm.city}
                      onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                      className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B]"
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
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.password ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className={`w-full rounded-xl border bg-[#050C1E] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#E5C07B] ${
                        formErrors.confirmPassword ? 'border-rose-500' : 'border-[#E5C07B]/30'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-blue-200">
                    <input
                      type="checkbox"
                      checked={registerForm.agreedToTerms}
                      onChange={(e) => setRegisterForm({ ...registerForm, agreedToTerms: e.target.checked })}
                      className="rounded border-[#E5C07B]/40 bg-[#050C1E] text-[#E5C07B]"
                    />
                    <span>I agree to DTS Pakistan wholesale agent code & terms</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="gold-btn w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold shadow-lg"
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
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Reset Agent Password
                  </h2>
                  <p className="text-xs text-blue-200/80 mt-1">
                    Enter your registered email and we will send you a recovery link
                  </p>
                </div>

                {forgotSuccess ? (
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                    <div className="font-bold text-emerald-300 mt-2 text-sm">Recovery Link Sent!</div>
                    <div className="text-xs text-blue-200 mt-1">Check your email inbox for password reset instructions.</div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-200">
                        Registered Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="agent@industravel.pk"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#E5C07B]/30 bg-[#050C1E] py-3 px-3 text-sm font-semibold text-white outline-none focus:border-[#E5C07B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="gold-btn w-full py-3 rounded-xl text-xs font-bold"
                    >
                      Send Password Reset Link
                    </button>
                  </>
                )}

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-[#F7E5A9] hover:underline"
                  >
                    ← Back to Agent Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Footer Notice */}
            <div className="pt-4 border-t border-[#E5C07B]/15 text-center text-[10px] text-blue-300/60">
              Department of Tourist Services (DTS) Pakistan Authorized Portal • 24/7 Agent Desk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

