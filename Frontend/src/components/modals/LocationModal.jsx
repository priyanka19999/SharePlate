import React, { useState, useEffect } from 'react';
import { X, MapPin, Check, Navigation } from 'lucide-react';
import { CITIES } from '../../data';

export default function LocationModal({ 
  isOpen, 
  onClose, 
  selectedCity, 
  selectedLocality, 
  onSelectLocation 
}) {
  const [activeCityId, setActiveCityId] = useState(selectedCity?.id || 'delhi');
  const [activeLocality, setActiveLocality] = useState(selectedLocality || 'All Areas');

  // Synchronize state when modal opens or selected city/locality changes
  useEffect(() => {
    if (isOpen) {
      setActiveCityId(selectedCity?.id || 'delhi');
      setActiveLocality(selectedLocality || 'All Areas');
    }
  }, [isOpen, selectedCity, selectedLocality]);

  if (!isOpen) return null;

  const currentCityObj = CITIES.find(c => c.id === activeCityId) || CITIES[0];

  const handleApply = (localityToSet = activeLocality) => {
    onSelectLocation(currentCityObj, localityToSet);
    onClose();
  };

  const handleCityChange = (city) => {
    setActiveCityId(city.id);
    setActiveLocality('All Areas');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E8E3D5] shadow-xl overflow-hidden my-6 max-h-[90vh] flex flex-col animate-float">
        
        {/* Modal Header */}
        <div className="bg-[#173F35] text-[#F7F4EC] p-6 pb-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9E7A3] text-xs font-bold mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>Select Rescue Location</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-white">
            Choose City & Locality
          </h3>
          <p className="text-xs text-[#F7F4EC]/80 mt-1">
            Browse available surplus food and connect with nearby shelters in your area.
          </p>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 space-y-5 text-xs overflow-y-auto flex-1">
          
          {/* Step 1: Select City */}
          <div>
            <label className="font-bold text-[#252923] text-xs block mb-2">
              1. Select City:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CITIES.map(city => {
                const isSelected = city.id === activeCityId;
                return (
                  <button
                    key={city.id}
                    onClick={() => handleCityChange(city)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#173F35] bg-[#173F35]/10 font-bold text-[#173F35] ring-2 ring-[#173F35]/20'
                        : 'border-[#E8E3D5] bg-[#F7F4EC] hover:bg-[#EAE5D9] text-[#252923]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs truncate">{city.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#173F35] shrink-0" />}
                    </div>
                    <span className="text-[10px] text-[#636B5F] block mt-0.5">
                      {city.state}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Locality / Neighborhood in that city */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-[#252923] text-xs block">
                2. Select Area in {currentCityObj.name}:
              </label>
              <span className="text-[11px] text-[#636B5F]">
                {currentCityObj.localities.length - 1} neighborhoods
              </span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2.5 bg-[#F7F4EC] rounded-2xl border border-[#E8E3D5]">
              {currentCityObj.localities.map(loc => {
                const isLocSelected = activeLocality === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      setActiveLocality(loc);
                      handleApply(loc);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isLocSelected
                        ? 'bg-[#173F35] text-white shadow-xs'
                        : 'bg-white border border-[#E8E3D5] text-[#252923] hover:border-[#173F35]'
                    }`}
                  >
                    <MapPin className={`w-3 h-3 ${isLocSelected ? 'text-[#C9E7A3]' : 'text-[#8C9588]'}`} />
                    <span>{loc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active selection info */}
          <div className="p-3.5 rounded-2xl bg-[#C9E7A3]/30 border border-[#7FA84A]/30 flex items-center justify-between gap-3">
            <div className="text-xs">
              <strong className="text-[#173F35] block font-bold">
                Selected: {currentCityObj.name} {activeLocality !== 'All Areas' ? `(${activeLocality})` : ''}
              </strong>
              <span className="text-[#636B5F] text-[11px]">Surplus food batches will automatically update for this region</span>
            </div>
            <button
              onClick={() => handleApply()}
              className="px-4 py-1.5 rounded-xl bg-[#173F35] text-white font-bold text-xs hover:bg-[#24594B] cursor-pointer shrink-0"
            >
              Apply
            </button>
          </div>

        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 px-6 bg-[#F7F4EC] border-t border-[#E8E3D5] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#636B5F] hover:bg-[#EAE5D9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleApply()}
            className="px-6 py-2.5 rounded-xl bg-[#173F35] text-[#F7F4EC] font-bold text-xs hover:bg-[#24594B] shadow-xs cursor-pointer"
          >
            Apply Location
          </button>
        </div>

      </div>
    </div>
  );
}
