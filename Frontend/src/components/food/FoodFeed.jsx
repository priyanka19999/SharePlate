import React, { useState } from 'react';
import { Search, MapPin, Navigation, RotateCcw } from 'lucide-react';
import FoodCard from './FoodCard';

export default function FoodFeed({
  donations,
  onClaimFood,
  selectedCity,
  selectedLocality,
  onSelectLocality,
  onOpenLocation,
  currentUser,
  onViewDashboard
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cooked Meals', 'Fresh Fruits', 'Bakery', 'Vegetables'];
  const localities = selectedCity?.localities || ['All Areas'];

  const filtered = donations.filter(item => {
    // 1. Strict City Filter: only show food from the active selected city
    if (selectedCity && item.cityId && item.cityId !== selectedCity.id) {
      return false;
    }
    // 2. Locality Filter: if a specific neighborhood/area is chosen, filter by it
    if (selectedLocality && selectedLocality !== 'All Areas') {
      const cleanLoc = selectedLocality.split('(')[0].trim().toLowerCase();
      const matchLoc = item.locality?.toLowerCase().includes(cleanLoc) ||
        item.address?.toLowerCase().includes(cleanLoc);
      if (!matchLoc) return false;
    }
    // 3. Category Filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Fresh Fruits') {
        if (item.category !== 'Fresh Fruits' && item.category !== 'Fruits') return false;
      } else if (item.category !== selectedCategory) {
        return false;
      }
    }
    // 4. Search Filter
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.donorName.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        (item.address && item.address.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section id="food-feed-section" className="py-16 bg-[#FBF9F5] border-b border-[#E8E3D5]/80 scroll-mt-20 relative overflow-hidden">
      
      {/* Delicate Ambient Glow for Ethereal Depth */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#C9E7A3]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#E8A66A]/15 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 relative z-10">
        
        {/* Header with City & Change City button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#E8E3D5]/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider">
                Live Surplus Batches
              </span>
              <span className="text-stone-300">•</span>
              <button
                onClick={onOpenLocation}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E3D5] text-[#173F35] text-xs font-bold hover:bg-white hover:border-[#173F35]/40 transition-all shadow-2xs cursor-pointer"
                title="Change active city"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C8722B]" />
                <span>{selectedCity?.name || 'Delhi NCR'}</span>
                <span className="text-[11px] text-[#636B5F] font-normal underline ml-0.5">Change</span>
              </button>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#173F35] tracking-tight">
              Surplus Food Available in {selectedCity?.name || 'Delhi NCR'}
            </h2>
            <p className="text-xs sm:text-sm text-[#555E51]">
              Ready for immediate claim and collection by verified shelters and community kitchens.
            </p>
          </div>

          <span className="text-xs font-bold text-[#173F35] bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/80 shadow-2xs self-start shrink-0 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{filtered.length} Batches Active</span>
          </span>
        </div>

        {/* Locality Quick Selector Horizontal Bar */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#252923] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#C8722B]" />
              <span>Filter by Area in {selectedCity?.shortName || selectedCity?.name}:</span>
            </span>
            <button
              onClick={onOpenLocation}
              className="text-[#173F35] font-bold hover:underline text-[11px] cursor-pointer"
            >
              All Cities & Localities
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 scrollbar-none">
            {localities.map(loc => {
              const isSelected = selectedLocality === loc;
              return (
                <button
                  key={loc}
                  onClick={() => onSelectLocality(loc)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${isSelected
                    ? 'bg-[#173F35] text-[#F7F4EC] shadow-[0_2px_10px_rgba(23,63,53,0.2)]'
                    : 'bg-white/85 backdrop-blur-md border border-[#E8E3D5]/90 text-[#252923] hover:border-[#173F35]/40 hover:bg-white'
                    }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Category Filter Toolbar (Frosted Glass Container) */}
        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-white/90 shadow-[0_4px_20px_-4px_rgba(23,63,53,0.05)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat
                  ? 'bg-[#173F35] text-[#C9E7A3] shadow-xs'
                  : 'bg-[#F7F4EC] text-[#252923] hover:bg-[#EAE5D9]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#8C9588] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search in ${selectedCity?.shortName || selectedCity?.name} by dish, hotel, area...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#F7F4EC]/90 rounded-xl text-xs border border-[#E8E3D5] text-[#252923] focus:outline-none focus:ring-2 focus:ring-[#173F35]/20 focus:bg-white transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C9588] hover:text-[#252923] cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Cards Grid using FoodCard */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <FoodCard
                key={item.id}
                item={item}
                onClaimFood={onClaimFood}
                currentUser={currentUser}
                onViewDashboard={onViewDashboard}
              />
            ))}
          </div>
        )}

        {/* Empty state when no matches */}
        {filtered.length === 0 && (
          <div className="text-center py-14 bg-white rounded-3xl border border-[#E8E3D5] p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F4EC] text-[#8C9588] flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6 text-[#C8722B]" />
            </div>
            <h3 className="text-base font-bold text-[#252923]">
              No food batches found in {selectedLocality !== 'All Areas' ? `${selectedLocality}, ${selectedCity?.name}` : selectedCity?.name}
            </h3>
            <p className="text-xs text-[#636B5F] max-w-md mx-auto">
              There are currently no surplus listings matching your filters in this area. You can switch to "All Areas" or clear your search to see more donations.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectLocality('All Areas');
                  setSearch('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#173F35] text-white text-xs font-bold hover:bg-[#24594B] inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All Surplus Batches in {selectedCity?.name}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
