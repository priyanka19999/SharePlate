import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, UtensilsCrossed, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { DEMO_USERS, CITIES } from '../../data';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess, selectedCity }) {
  const [mode, setMode] = useState(initialMode);
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up fields
  const [role, setRole] = useState('donor');
  const [orgName, setOrgName] = useState('');
  const [personName, setPersonName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityId, setCityId] = useState(selectedCity?.id || 'delhi');
  const activeCity = CITIES.find(c => c.id === cityId) || CITIES[0];
  const localities = activeCity.localities.filter(l => l !== 'All Areas');
  const [locality, setLocality] = useState(localities[0] || 'Connaught Place');

  React.useEffect(() => {
    if (selectedCity?.id) {
      setCityId(selectedCity.id);
      const cObj = CITIES.find(c => c.id === selectedCity.id) || CITIES[0];
      const locs = cObj.localities.filter(l => l !== 'All Areas');
      setLocality(locs[0] || 'Central Area');
    }
  }, [selectedCity]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    let user = DEMO_USERS.donor;
    const lower = email.toLowerCase();
    if (lower.includes('ngo') || lower.includes('shelter') || lower.includes('ruchika')) {
      user = DEMO_USERS.ngo;
    } else if (lower.includes('admin')) {
      user = DEMO_USERS.admin;
    }

    onLoginSuccess(user);
    onClose();
  };

  const handleQuickDemo = (roleKey) => {
    const user = DEMO_USERS[roleKey];
    onLoginSuccess(user);
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!orgName.trim() || !personName.trim()) return;

    const newUser = {
      id: `user-${Date.now()}`,
      name: personName,
      orgName: orgName,
      role: role,
      phone: phone || '+91 99999 00000',
      cityId: cityId,
      locality: `${locality}, ${activeCity.name}`
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-[#E8E3D5] shadow-xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-float">
        
        {/* Sticky Header with Mode Switcher */}
        <div className="bg-[#173F35] text-[#F7F4EC] p-6 pb-4 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="font-serif text-2xl font-bold text-white text-center">
            {mode === 'login' ? 'Sign In to SharePlate' : 'Create Free Account'}
          </h3>
          <p className="text-xs text-[#F7F4EC]/80 text-center mt-1 leading-snug">
            {mode === 'login' 
              ? 'Public visitors can browse food freely. Sign in to donate meals (Businesses) or claim food (Shelters).' 
              : 'Join as a registered food business donor or verified NGO shelter in your city.'}
          </p>

          {/* Simple Tab switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/25 rounded-2xl mt-4">
            <button
              onClick={() => setMode('login')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#173F35] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In (Log In)
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#173F35] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Register (Sign Up)
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          {mode === 'login' ? (
            /* --- SIMPLE LOGIN FORM --- */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-bold text-[#252923] block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C9588] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. subrat@mayfairlagoon.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F35]/20 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#252923] block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C9588] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F35]/20 font-medium"
                  />
                </div>
              </div>

              {/* Login Button — prominent & clearly labeled */}
              <button
                type="submit"
                id="btn-login-submit"
                className="w-full py-3.5 rounded-2xl bg-[#173F35] text-[#F7F4EC] font-bold text-sm hover:bg-[#24594B] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Log In to Your Account</span>
                <ArrowRight className="w-4 h-4 text-[#C9E7A3]" />
              </button>

              {/* 1-Click Demo Buttons with High Contrast */}
              <div className="pt-3.5 border-t border-[#E8E3D5] space-y-2">
                <span className="text-[11px] font-bold text-[#636B5F] uppercase block text-center flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8722B]" />
                  <span>1-Click Fast Demo Login:</span>
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('donor')}
                    className="p-3 rounded-2xl border border-[#E8E3D5] hover:border-[#173F35] hover:bg-[#F7F4EC] text-center transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#F7F4EC] group-hover:bg-[#173F35]/10 flex items-center justify-center mx-auto mb-1.5">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-[#C8722B]" />
                    </div>
                    <span className="font-bold text-[11px] text-[#252923] block leading-tight">Food Donor</span>
                    <span className="text-[10px] text-[#636B5F] block truncate mt-0.5">Hotel Mayfair</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('ngo')}
                    className="p-3 rounded-2xl border border-[#E8E3D5] hover:border-[#173F35] hover:bg-[#F7F4EC] text-center transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#F7F4EC] group-hover:bg-[#173F35]/10 flex items-center justify-center mx-auto mb-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="font-bold text-[11px] text-[#252923] block leading-tight">NGO Shelter</span>
                    <span className="text-[10px] text-[#636B5F] block truncate mt-0.5">Ruchika Shelter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin')}
                    className="p-3 rounded-2xl border border-[#E8E3D5] hover:border-[#173F35] hover:bg-[#F7F4EC] text-center transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#F7F4EC] group-hover:bg-[#173F35]/10 flex items-center justify-center mx-auto mb-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="font-bold text-[11px] text-[#252923] block leading-tight">Admin Ops</span>
                    <span className="text-[10px] text-[#636B5F] block truncate mt-0.5">Central Hub</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* --- SIMPLE SIGN UP FORM --- */
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div>
                <label className="font-bold text-[#252923] block mb-1">
                  I want to: *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('donor')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      role === 'donor'
                        ? 'border-[#173F35] bg-[#173F35]/10 font-bold text-[#173F35]'
                        : 'border-[#E8E3D5] bg-[#F7F4EC]'
                    }`}
                  >
                    <span className="block text-xs">Donate Food</span>
                    <span className="text-[10px] font-normal text-[#636B5F]">Hotel, Bakery, Restaurant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('recipient')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      role === 'recipient'
                        ? 'border-[#173F35] bg-[#173F35]/10 font-bold text-[#173F35]'
                        : 'border-[#E8E3D5] bg-[#F7F4EC]'
                    }`}
                  >
                    <span className="block text-xs">Receive Food</span>
                    <span className="text-[10px] font-normal text-[#636B5F]">Shelter, Child Home, NGO</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#252923] block mb-1">
                  Business / NGO Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'donor' ? 'e.g. Mayfair Lagoon Restaurant' : 'e.g. Ruchika Shelter'}
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] text-xs bg-[#F7F4EC] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-[#252923] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={personName}
                    onChange={e => setPersonName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] text-xs bg-[#F7F4EC] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#252923] block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99999 00000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] text-xs bg-[#F7F4EC] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-[#252923] block mb-1">
                    Select City *
                  </label>
                  <select
                    value={cityId}
                    onChange={e => {
                      setCityId(e.target.value);
                      const c = CITIES.find(item => item.id === e.target.value);
                      const f = c?.localities.filter(l => l !== 'All Areas')[0] || '';
                      setLocality(f);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] text-xs font-semibold bg-[#F7F4EC]"
                  >
                    {CITIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#252923] block mb-1">
                    Area / Locality *
                  </label>
                  <select
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] text-xs bg-[#F7F4EC]"
                  >
                    {localities.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#252923] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] text-xs bg-[#F7F4EC] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                id="btn-signup-submit"
                className="w-full py-3.5 rounded-2xl bg-[#173F35] text-white font-bold text-xs hover:bg-[#24594B] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
              >
                <span>Create My Free Account</span>
                <ArrowRight className="w-4 h-4 text-[#C9E7A3]" />
              </button>
            </form>
          )}

          {/* Switch tab link */}
          <div className="text-center pt-2 text-[#636B5F]">
            {mode === 'login' ? (
              <span>
                New to SharePlate?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-[#173F35] font-bold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#173F35] font-bold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
