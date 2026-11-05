import React, { useState, useEffect } from 'react';
import { 
  Soup, 
  LogIn, 
  UserPlus, 
  LogOut, 
  PlusCircle, 
  Compass, 
  Menu, 
  X,
  MapPin,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  activeView, 
  setActiveView, 
  selectedCity,
  selectedLocality,
  onOpenLocation,
  onOpenAuth, 
  onLogout, 
  onOpenDonate 
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (viewName) => {
    setActiveView(viewName);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Interactive Location Selector */}
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            {/* Brand Logo Button */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none shrink-0 cursor-pointer"
              aria-label="SharePlate Home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#173F35] to-[#24594B] flex items-center justify-center text-[#C9E7A3] shadow-[0_4px_16px_rgba(23,63,53,0.18)] ring-1 ring-[#C9E7A3]/30 group-hover:scale-105 group-hover:shadow-[0_6px_22px_rgba(23,63,53,0.28)] transition-all shrink-0">
                <Soup className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#173F35] block leading-none">
                  Share<span className="text-[#E8A66A]">Plate</span>
                </span>
                <span className="text-[10px] font-semibold text-[#636B5F] tracking-wider uppercase block mt-1">
                  Food Rescue
                </span>
              </div>
            </button>

            {/* Desktop / Tablet Location Selector Pill */}
            <button
              onClick={onOpenLocation}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#E8E3D5]/80 hover:border-[#173F35]/40 hover:bg-white/95 text-xs font-bold text-[#173F35] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] group cursor-pointer"
              title="Click to change city or locality"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <MapPin className="w-3.5 h-3.5 text-[#C8722B] shrink-0" />
              <div className="text-left max-w-[140px] lg:max-w-[180px] truncate">
                <div className="leading-tight flex items-center gap-1">
                  <span className="truncate">{selectedCity?.name || 'Bhubaneswar'}</span>
                  <ChevronDown className="w-3 h-3 text-[#8C9588] group-hover:text-[#173F35] transition-colors shrink-0" />
                </div>
                <span className="text-[10px] font-medium text-[#636B5F] block leading-none truncate">
                  {selectedLocality && selectedLocality !== 'All Areas' ? selectedLocality : 'All Areas · Change'}
                </span>
              </div>
            </button>
          </div>

          {/* Center: Main Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-[#252923]">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'home' 
                  ? 'bg-[#173F35] text-[#F7F4EC] shadow-[0_2px_12px_rgba(23,63,53,0.2)] ring-1 ring-white/10' 
                  : 'text-[#636B5F] hover:text-[#173F35] hover:bg-[#173F35]/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('food')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'food' 
                  ? 'bg-[#173F35] text-[#F7F4EC] shadow-[0_2px_12px_rgba(23,63,53,0.2)] ring-1 ring-white/10' 
                  : 'text-[#636B5F] hover:text-[#173F35] hover:bg-[#173F35]/5'
              }`}
            >
              Available Food
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'how-it-works' 
                  ? 'bg-[#173F35] text-[#F7F4EC] shadow-[0_2px_12px_rgba(23,63,53,0.2)] ring-1 ring-white/10' 
                  : 'text-[#636B5F] hover:text-[#173F35] hover:bg-[#173F35]/5'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('safety')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'safety' 
                  ? 'bg-[#173F35] text-[#F7F4EC] shadow-[0_2px_12px_rgba(23,63,53,0.2)] ring-1 ring-white/10' 
                  : 'text-[#636B5F] hover:text-[#173F35] hover:bg-[#173F35]/5'
              }`}
            >
              Food Safety
            </button>
          </nav>

          {/* Right Action: Log In / Sign Up OR User Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentUser.role === 'donor' && (
                  <button
                    onClick={onOpenDonate}
                    className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#173F35] to-[#24594B] text-[#F7F4EC] text-xs font-bold hover:shadow-[0_4px_16px_rgba(23,63,53,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#C9E7A3]" />
                    <span>+ Donate Food</span>
                  </button>
                )}

                {currentUser.role === 'recipient' && (
                  <button
                    onClick={() => handleNavClick('food')}
                    className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#173F35] to-[#24594B] text-[#F7F4EC] text-xs font-bold hover:shadow-[0_4px_16px_rgba(23,63,53,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#C9E7A3]" />
                    <span>Browse Food</span>
                  </button>
                )}

                {/* Dashboard button */}
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-2 p-1.5 pr-2.5 sm:pr-3 rounded-xl border transition-all cursor-pointer ${
                    activeView === 'dashboard'
                      ? 'bg-[#173F35]/10 border-[#173F35]'
                      : 'bg-[#F7F4EC] border-[#E8E3D5] hover:bg-[#EFEADF]'
                  }`}
                  title="Open Dashboard"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#173F35] text-[#F7F4EC] flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden min-[480px]:block max-w-[110px] truncate">
                    <span className="font-bold text-xs text-[#252923] block leading-tight truncate">
                      {currentUser.name || 'Dashboard'}
                    </span>
                    <span className="text-[10px] text-[#636B5F] capitalize block leading-none truncate">
                      {currentUser.role === 'donor' ? 'Donor' : currentUser.role === 'recipient' ? 'Shelter' : 'Admin'}
                    </span>
                  </div>
                </button>

                {/* Log Out */}
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-[#636B5F] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Log Out"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#E8E3D5] text-[11px] font-semibold text-[#252923] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Guest (Browsing Mode)</span>
                </span>

                <button
                  id="btn-navbar-login"
                  onClick={() => onOpenAuth('login')}
                  className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-[#173F35] bg-[#173F35]/5 hover:bg-[#173F35]/12 border border-[#173F35]/20 hover:border-[#173F35]/40 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Sign in as Shelter NGO or Food Donor"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#173F35]" />
                  <span>Log In</span>
                </button>

                <button
                  id="btn-navbar-signup"
                  onClick={() => onOpenAuth('signup')}
                  className="hidden min-[420px]:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#173F35] to-[#24594B] text-[#F7F4EC] hover:shadow-[0_4px_14px_rgba(23,63,53,0.25)] hover:-translate-y-0.5 active:translate-y-0 font-bold text-xs shadow-xs transition-all items-center gap-1.5 cursor-pointer"
                  title="Register new Food Donor or Shelter"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#C9E7A3]" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Mobile Controls (Quick City Selector + Menu Toggle) */}
            <div className="flex items-center gap-1 sm:hidden">
              <button
                onClick={onOpenLocation}
                className="p-1.5 px-2 rounded-xl bg-[#F7F4EC] text-[#173F35] border border-[#E8E3D5] text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                aria-label="Change city"
              >
                <MapPin className="w-3 h-3 text-[#C8722B]" />
                <span>{selectedCity?.shortName || 'BBSR'}</span>
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-[#252923] hover:bg-[#173F35]/10 cursor-pointer transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-5 h-5 text-[#173F35]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Tablet Menu Toggle (Between 640px and 768px) */}
            <div className="hidden sm:flex md:hidden items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-[#252923] hover:bg-[#173F35]/10 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-5 h-5 text-[#173F35]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-30 md:hidden"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="relative z-40 md:hidden border-t border-[#E8E3D5] bg-white px-4 py-4 space-y-3 text-xs font-bold shadow-lg animate-fadeIn">
            {/* Location Bar in Drawer */}
            <button
              onClick={() => { onOpenLocation(); setMobileOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F7F4EC] text-[#173F35] border border-[#E8E3D5] text-left cursor-pointer hover:bg-[#EFEADF] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#173F35] text-[#C9E7A3] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-xs">{selectedCity?.name}</span>
                  <span className="text-[10px] text-[#636B5F] font-normal">
                    {selectedLocality && selectedLocality !== 'All Areas' ? selectedLocality : 'All Areas'} · Tap to change
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#8C9588]" />
            </button>

            {/* Navigation Links Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-center py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  activeView === 'home' ? 'bg-[#173F35] text-white' : 'bg-[#F7F4EC] text-[#252923] hover:bg-[#EAE5D9]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('food')}
                className={`w-full text-center py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  activeView === 'food' ? 'bg-[#173F35] text-white' : 'bg-[#F7F4EC] text-[#252923] hover:bg-[#EAE5D9]'
                }`}
              >
                Available Food
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className={`w-full text-center py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  activeView === 'how-it-works' ? 'bg-[#173F35] text-white' : 'bg-[#F7F4EC] text-[#252923] hover:bg-[#EAE5D9]'
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick('safety')}
                className={`w-full text-center py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  activeView === 'safety' ? 'bg-[#173F35] text-white' : 'bg-[#F7F4EC] text-[#252923] hover:bg-[#EAE5D9]'
                }`}
              >
                Food Safety
              </button>
            </div>

            {/* Authenticated user actions or Auth buttons */}
            {currentUser ? (
              <div className="pt-2 border-t border-[#E8E3D5] space-y-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full text-left py-2.5 px-3 rounded-xl bg-[#173F35]/10 text-[#173F35] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#173F35]" />
                    <span>My Dashboard ({currentUser.name})</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#173F35] text-white">
                    {currentUser.role}
                  </span>
                </button>

                {currentUser.role === 'donor' && (
                  <button
                    onClick={() => { onOpenDonate(); setMobileOpen(false); }}
                    className="w-full text-center py-2.5 px-3 rounded-xl bg-[#173F35] text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-[#C9E7A3]" />
                    <span>+ List Surplus Food</span>
                  </button>
                )}

                <button
                  onClick={() => { onLogout(); setMobileOpen(false); }}
                  className="w-full text-left py-2 px-3 rounded-xl text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#E8E3D5] grid grid-cols-2 gap-2">
                <button
                  id="btn-mobile-login"
                  onClick={() => { onOpenAuth('login'); setMobileOpen(false); }}
                  className="py-2.5 rounded-xl border border-[#173F35]/30 bg-[#173F35]/5 text-[#173F35] font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#173F35]/10 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#173F35]" />
                  <span>Log In</span>
                </button>
                <button
                  id="btn-mobile-signup"
                  onClick={() => { onOpenAuth('signup'); setMobileOpen(false); }}
                  className="py-2.5 rounded-xl bg-[#173F35] text-[#F7F4EC] font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#24594B] transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#C9E7A3]" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
