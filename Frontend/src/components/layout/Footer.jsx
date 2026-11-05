import React from 'react';
import { 
  Soup, 
  Heart, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  PlusCircle,
  LogIn,
  CheckCircle2
} from 'lucide-react';

export default function Footer({ 
  setActiveView, 
  selectedCity, 
  selectedLocality,
  onSelectLocality,
  onOpenLocation,
  onOpenDonate,
  onOpenAuth,
  currentUser
}) {
  const cityName = selectedCity?.name || 'Bhubaneswar (BBSR)';
  
  // Extract top 6 active localities for selected city
  const localities = (selectedCity?.localities || [])
    .filter(loc => loc !== 'All Areas')
    .slice(0, 6);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (viewName) => {
    setActiveView(viewName);
    scrollToTop();
  };

  return (
    <footer className="w-full mt-auto bg-[#173F35] text-[#F7F4EC] border-t border-[#24594B] pt-14 pb-12 text-xs shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & FSSAI Standards */}
          <div className="space-y-3.5">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
              aria-label="SharePlate Home"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#C9E7A3] text-[#173F35] flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                <Soup className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Share<span className="text-[#E8A66A]">Plate</span>
              </span>
            </button>
            <p className="text-xs text-[#F7F4EC]/80 leading-relaxed">
              Connecting commercial surplus food to verified shelters, child welfare homes, and community kitchens across {cityName}.
            </p>
            <div className="p-3 rounded-2xl bg-[#24594B]/50 border border-[#24594B] flex items-start gap-2 text-[11px] text-[#C9E7A3]">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Complies with FSSAI Surplus Food Recovery Regulations, 2019.</span>
            </div>
          </div>

          {/* Col 2: Platform Links & Actions */}
          <div className="space-y-3">
            <span className="font-bold text-sm text-white block">Platform Navigation</span>
            <ul className="space-y-2 text-[#F7F4EC]/80">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('food')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Available Food Feed
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('how-it-works')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('safety')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Food Safety Guidelines
                </button>
              </li>
              {currentUser ? (
                <li>
                  <button 
                    onClick={() => handleNav('dashboard')} 
                    className="text-[#C9E7A3] font-semibold hover:underline cursor-pointer text-left"
                  >
                    Open My Dashboard
                  </button>
                </li>
              ) : (
                <li>
                  <button 
                    onClick={() => onOpenAuth && onOpenAuth('login')} 
                    className="text-[#C9E7A3] font-semibold hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Shelter / Donor Sign In</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Dynamic City Localities (Interactive) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white block truncate">
                {selectedCity?.name || 'Bhubaneswar'} Localities
              </span>
            </div>
            <p className="text-[11px] text-[#F7F4EC]/60">
              Click area to filter surplus donations:
            </p>
            <ul className="space-y-1.5 text-[#F7F4EC]/85">
              {localities.map(loc => {
                const isActive = selectedLocality === loc;
                return (
                  <li key={loc}>
                    <button
                      onClick={() => onSelectLocality && onSelectLocality(loc)}
                      className={`text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
                        isActive ? 'text-[#C9E7A3] font-bold' : ''
                      }`}
                    >
                      <MapPin className={`w-3 h-3 ${isActive ? 'text-[#C9E7A3]' : 'text-[#C9E7A3]/60'}`} />
                      <span className="truncate">{loc}</span>
                      {isActive && <span className="text-[9px] bg-[#C9E7A3]/20 px-1.5 py-0.2 rounded-sm text-[#C9E7A3]">Active</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="pt-1">
              <button
                onClick={onOpenLocation}
                className="text-[#C9E7A3] font-semibold hover:underline cursor-pointer text-xs flex items-center gap-1"
              >
                <span>📍 Change City ({selectedCity?.shortName || 'BBSR'})</span>
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Help (Clickable Links) */}
          <div className="space-y-3">
            <span className="font-bold text-sm text-white block">Rescue Coordination</span>
            <div className="space-y-2.5 text-[#F7F4EC]/80">
              <a 
                href="tel:1800000000" 
                className="hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                title="Call 24/7 Helpline"
              >
                <div className="w-7 h-7 rounded-lg bg-[#24594B] text-[#C9E7A3] flex items-center justify-center shrink-0 group-hover:bg-[#C9E7A3] group-hover:text-[#173F35] transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block font-semibold text-white">1800-000-0000</span>
                  <span className="text-[10px] text-[#F7F4EC]/60">24/7 Food Rescue Helpline</span>
                </div>
              </a>

              <a 
                href={`mailto:rescue.${selectedCity?.id || 'delhi'}@shareplate.org`} 
                className="hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                title="Send Email"
              >
                <div className="w-7 h-7 rounded-lg bg-[#24594B] text-[#C9E7A3] flex items-center justify-center shrink-0 group-hover:bg-[#C9E7A3] group-hover:text-[#173F35] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block font-semibold text-white truncate max-w-[190px]">
                    rescue.{selectedCity?.id || 'delhi'}@shareplate.org
                  </span>
                  <span className="text-[10px] text-[#F7F4EC]/60">Donation Inquiries</span>
                </div>
              </a>

              <div className="flex items-start gap-2 pt-1 text-[#F7F4EC]/70">
                <MapPin className="w-4 h-4 text-[#C9E7A3] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">
                  {selectedCity?.id === 'delhi' && 'Regional Food Coordination Hub, Barakhamba Road, Connaught Place, New Delhi 110001'}
                  {selectedCity?.id === 'bbsr' && 'Regional Food Coordination Hub, Saheed Nagar, Bhubaneswar, Odisha 751007'}
                  {selectedCity?.id === 'cuttack' && 'Regional Food Coordination Hub, Badambadi, Cuttack, Odisha 753012'}
                  {selectedCity?.id === 'blr' && 'Regional Food Coordination Hub, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038'}
                  {selectedCity?.id === 'mumbai' && 'Regional Food Coordination Hub, BKC G-Block, Bandra East, Mumbai, Maharashtra 400051'}
                  {!['delhi', 'bbsr', 'cuttack', 'blr', 'mumbai'].includes(selectedCity?.id) && `Regional Food Coordination Hub, ${cityName}, ${selectedCity?.state || 'India'}`}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-[#24594B] flex flex-col md:flex-row items-center justify-between gap-4 text-[#F7F4EC]/60 text-[11px]">
          <div className="text-center md:text-left">
            © 2026 SharePlate {cityName}. Connecting surplus food to verified shelters across {selectedCity?.state || 'the region'}.
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>FSSAI Certified</span>
            </span>
            <span>•</span>
            <span>Zero Waste Initiative</span>
            <span>•</span>
            <span>100% Free Food Rescue</span>
          </div>

          {/* Back to Top Button */}
          <div className="text-center md:text-right">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#24594B] text-[#C9E7A3] hover:text-white hover:bg-[#2e6e5d] transition-all cursor-pointer font-bold text-xs"
              title="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
