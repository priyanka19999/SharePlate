import React, { useMemo } from 'react';
import { ArrowRight, Soup, CheckCircle, MapPin } from 'lucide-react';

export default function Hero({ 
  onOpenDonate, 
  onViewFood, 
  selectedCity, 
  selectedLocality,
  donations = [],
  onClaimFood,
  onOpenLocation 
}) {
  const cityName = selectedCity?.name || 'Delhi NCR';
  const cityShortName = selectedCity?.shortName || 'DEL';

  // Dynamically select the featured surplus donation for the current active city & locality
  const featuredItem = useMemo(() => {
    if (!donations || donations.length === 0) return null;

    // 1. If a specific locality is selected (not 'All Areas'), look for item in this city and locality
    if (selectedLocality && selectedLocality !== 'All Areas') {
      const cleanLoc = selectedLocality.split('(')[0].trim().toLowerCase();
      const locMatch = donations.find(d => 
        d.cityId === selectedCity?.id && 
        (d.locality?.toLowerCase().includes(cleanLoc) || d.address?.toLowerCase().includes(cleanLoc))
      );
      if (locMatch) return locMatch;
    }

    // 2. Look for any Available item in the selected city
    const cityAvailable = donations.find(d => d.cityId === selectedCity?.id && d.status === 'Available');
    if (cityAvailable) return cityAvailable;

    // 3. Look for any item in the selected city
    const anyCityItem = donations.find(d => d.cityId === selectedCity?.id);
    if (anyCityItem) return anyCityItem;

    // 4. Fallback to first available donation
    return donations.find(d => d.status === 'Available') || donations[0];
  }, [donations, selectedCity, selectedLocality]);

  const displayLocality = featuredItem?.locality || (selectedLocality && selectedLocality !== 'All Areas' ? selectedLocality : cityName);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24 ethereal-hero-bg border-b border-[#E8E3D5]/80">
      
      {/* Ambient Ethereal Glow Orbs & Architectural Dot Grid */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[520px] h-[520px] bg-[#C9E7A3]/35 rounded-full blur-[130px] pointer-events-none -z-0"></div>
      <div className="absolute top-1/4 right-0 w-[480px] h-[480px] bg-[#E8A66A]/20 rounded-full blur-[140px] pointer-events-none -z-0"></div>
      <div className="absolute -bottom-20 left-1/3 w-[560px] h-[360px] bg-[#DCE9F3]/45 rounded-full blur-[130px] pointer-events-none -z-0"></div>
      <div className="absolute inset-0 ethereal-dot-grid opacity-35 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live City Tag (Luminous Frosted Pill) */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_2px_12px_rgba(23,63,53,0.06)] text-[#173F35] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
              <span>Active in {cityName} {selectedLocality && selectedLocality !== 'All Areas' ? `(${selectedLocality})` : ''} · 100% Free Food Rescue</span>
              <button 
                onClick={onOpenLocation}
                className="underline hover:text-[#C8722B] transition-colors cursor-pointer ml-1 font-bold"
                title="Change active city"
              >
                (Change)
              </button>
            </div>

            {/* Headline with Ethereal Serif Elegance */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#173F35] leading-[1.14] font-normal tracking-tight">
              Don’t let good food <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#173F35] underline decoration-[#C9E7A3] decoration-wavy decoration-2 underline-offset-8">
                go to waste.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#555E51] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              SharePlate is a simple coordination platform connecting commercial food businesses in {cityName} with verified local NGOs, shelters, and community kitchens to safely redistribute surplus meals.
            </p>

            {/* Primary Action Buttons (Elevated Luminous Controls) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenDonate}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#173F35] to-[#24594B] text-[#F7F4EC] hover:shadow-[0_12px_28px_rgba(23,63,53,0.28)] hover:-translate-y-0.5 active:translate-y-0 font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Donate Surplus Food</span>
                <ArrowRight className="w-4 h-4 text-[#C9E7A3]" />
              </button>

              <button
                onClick={onViewFood}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md hover:bg-white border border-white/90 text-[#173F35] font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(23,63,53,0.05)] hover:shadow-[0_8px_25px_rgba(23,63,53,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Soup className="w-4 h-4 text-[#E8A66A]" />
                <span>Find Food to Rescue</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#555E51] font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified {selectedCity?.name ? selectedCity.shortName : 'Local'} Shelters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>FSSAI Safe Food</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure Pickup PIN</span>
              </div>
            </div>

            {/* Simple Platform Access Model Note */}
            <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 text-[11px] text-[#555E51] flex items-start sm:items-center gap-2.5 max-w-xl mx-auto lg:mx-0 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1 sm:mt-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <p className="leading-snug">
                <strong className="text-[#173F35]">Open Community Access:</strong> Anyone can freely browse surplus food batches across cities. To ensure safety, verified shelters sign in to claim, and licensed food businesses sign in to donate.
              </p>
            </div>
          </div>

          {/* Right: Dynamic Featured Food Preview Card (Floating Glass Showcase) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(23,63,53,0.12)] border border-white/80 ring-1 ring-[#173F35]/5 hover:shadow-[0_28px_60px_-12px_rgba(23,63,53,0.18)] transition-all duration-500">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E3D5]/80 text-xs">
                <span className="font-bold text-[#173F35] flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="truncate">Live Surplus in {displayLocality}, {cityShortName}</span>
                </span>
                <span className="bg-[#C9E7A3]/40 text-[#173F35] px-3 py-0.5 rounded-full font-bold shrink-0 text-[11px] border border-[#C9E7A3]/50">
                  {featuredItem?.status === 'Claimed' ? 'Claimed' : 'Just Listed'}
                </span>
              </div>

              <div className="mt-4 relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-100 shadow-inner group">
                <img
                  src={featuredItem?.imageUrl || "https://images.pexels.com/photos/11115801/pexels-photo-11115801.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt={featuredItem?.title || "Surplus food preview"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.pexels.com/photos/11115801/pexels-photo-11115801.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-xs font-black text-[#173F35] shadow-xs">
                  {featuredItem ? `${featuredItem.quantity} · ~${featuredItem.mealsCount} Meals` : '50 kg · ~120 Meals'}
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="font-bold text-base text-[#252923] leading-snug line-clamp-1">
                  {featuredItem?.title || `Surplus Meals Available in ${cityName}`}
                </h3>
                <p className="text-xs text-[#636B5F] flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#C8722B] shrink-0" />
                  <span className="truncate">
                    {featuredItem ? `${featuredItem.donorName} · ${featuredItem.locality}, ${cityShortName}` : cityName}
                  </span>
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#E8E3D5]/80 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#C8722B]">
                  {featuredItem?.expiryTime ? `Must collect: ${featuredItem.expiryTime}` : 'Urgent collection'}
                </span>
                <button
                  onClick={() => {
                    if (featuredItem && onClaimFood && featuredItem.status === 'Available') {
                      onClaimFood(featuredItem);
                    } else {
                      onViewFood();
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-[#173F35] text-[#F7F4EC] text-xs font-bold hover:bg-[#24594B] hover:shadow-xs transition-all cursor-pointer shrink-0"
                >
                  {featuredItem?.status === 'Claimed' ? 'View Details' : 'Claim Food'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Impact Numbers Bar (Luminous Pedestal Stat Cards) */}
        <div className="mt-16 pt-10 border-t border-[#E8E3D5]/80 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center">
          <div className="p-6 bg-white/85 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_10px_30px_-5px_rgba(23,63,53,0.04)] ring-1 ring-[#173F35]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
            <div className="text-3xl sm:text-4xl font-black font-outfit text-[#173F35] tracking-tight">
              28,400+
            </div>
            <div className="text-xs font-bold text-[#636B5F] uppercase tracking-wider mt-1.5">
              Meals Rescued in {cityShortName}
            </div>
          </div>

          <div className="p-6 bg-white/85 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_10px_30px_-5px_rgba(23,63,53,0.04)] ring-1 ring-[#173F35]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
            <div className="text-3xl sm:text-4xl font-black font-outfit text-[#173F35] tracking-tight">
              9.6 Tons
            </div>
            <div className="text-xs font-bold text-[#636B5F] uppercase tracking-wider mt-1.5">
              Food Diverted from Waste
            </div>
          </div>

          <div className="p-6 bg-white/85 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_10px_30px_-5px_rgba(23,63,53,0.04)] ring-1 ring-[#173F35]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
            <div className="text-3xl sm:text-4xl font-black font-outfit text-[#173F35] tracking-tight">
              45+ Partners
            </div>
            <div className="text-xs font-bold text-[#636B5F] uppercase tracking-wider mt-1.5">
              Hotels, Caterers & Shelters
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
