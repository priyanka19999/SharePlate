import React, { useState } from 'react';
import { X, Utensils, CheckCircle, Clock, MapPin, AlertCircle, Camera, Sparkles } from 'lucide-react';
import { CITIES } from '../../data';

const PRESET_IMAGES = [
  { label: 'Cooked Meals / Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fresh Fruits / Fruit Stalls', url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bakery & Bread', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fresh Farm Produce', url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80' }
];

export default function DonateModal({ isOpen, onClose, onAddDonation, currentUser, selectedCity, onQuickLoginAsDonor }) {
  const [cityId, setCityId] = useState(selectedCity?.id || 'delhi');
  const activeCity = CITIES.find(c => c.id === cityId) || CITIES[0];
  const localityOptions = activeCity.localities.filter(l => l !== 'All Areas');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cooked Meals');
  const [diet, setDiet] = useState('Veg');
  const [quantity, setQuantity] = useState('');
  const [mealsCount, setMealsCount] = useState('');
  const [expiryHours, setExpiryHours] = useState('3');
  const [locality, setLocality] = useState(localityOptions[0] || 'Central Area');
  const [address, setAddress] = useState(currentUser?.locality || `${localityOptions[0] || 'Central Area'}, ${activeCity.name}`);
  const [storage, setStorage] = useState('Hot holding (>60°C)');
  const [notes, setNotes] = useState('Packed in clean, sealed food-grade thermal containers.');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [fssaiAgreed, setFssaiAgreed] = useState(true);

  React.useEffect(() => {
    if (isOpen && selectedCity) {
      setCityId(selectedCity.id);
      const cityObj = CITIES.find(c => c.id === selectedCity.id) || CITIES[0];
      const locOpts = cityObj.localities.filter(l => l !== 'All Areas');
      const firstLoc = locOpts[0] || 'Central Area';
      setLocality(firstLoc);
      setAddress(currentUser?.locality || `${firstLoc}, ${cityObj.name}`);
    }
  }, [isOpen, selectedCity, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !quantity.trim()) return;

    const newDonation = {
      id: `don-${Date.now()}`,
      cityId,
      title,
      donorName: currentUser?.orgName || 'Mayfair Lagoon & Convention Hotel',
      donorPhone: currentUser?.phone || '+91 99999 00001',
      locality,
      address,
      category,
      diet,
      quantity,
      mealsCount: parseInt(mealsCount) || 30,
      preparedTime: 'Just now',
      expiryTime: `Within ${expiryHours} hours`,
      storage,
      imageUrl,
      status: 'Available',
      handoverPin: Math.floor(1000 + Math.random() * 9000).toString(),
      claimedBy: null,
      notes
    };

    onAddDonation(newDonation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E8E3D5] shadow-xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-float">
        
        {/* Sticky Header */}
        <div className="bg-[#173F35] text-white p-6 pb-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9E7A3] text-xs font-bold mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Surplus Listing · {activeCity.shortName}</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">Donate Surplus Food</h3>
          <p className="text-xs text-white/80 mt-1">
            Publish edible extra food to verified shelters across {activeCity.name}.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form id="donate-food-form" onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          {/* Access Role Notice (Guest vs Registered Donor) */}
          {!currentUser ? (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <Utensils className="w-4 h-4 text-amber-700" />
                  <span>Browsing as Guest — Food Business Login Required</span>
                </span>
                <span className="text-[10px] bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full font-bold">Guest Mode</span>
              </div>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                Registered food businesses (hotels, restaurants, bakeries, mandis) sign in to maintain FSSAI traceability. You can test the donor listing instantly:
              </p>
              <button
                type="button"
                onClick={() => onQuickLoginAsDonor && onQuickLoginAsDonor()}
                className="w-full py-2.5 px-3 rounded-xl bg-[#173F35] text-[#C9E7A3] font-bold text-xs hover:bg-[#24594B] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C9E7A3]" />
                <span>⚡ 1-Click Sign In as Mayfair Hotel (Food Donor)</span>
              </button>
            </div>
          ) : currentUser.role === 'donor' ? (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-950 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Listing as Food Donor: {currentUser.orgName || currentUser.name}</span>
              </div>
              <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                FSSAI Registered
              </span>
            </div>
          ) : null}

          {/* City & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="font-bold text-[#252923] block mb-1">City Location *</label>
              <select
                value={cityId}
                onChange={e => {
                  setCityId(e.target.value);
                  const newCity = CITIES.find(c => c.id === e.target.value);
                  const firstLoc = newCity?.localities.filter(l => l !== 'All Areas')[0] || '';
                  setLocality(firstLoc);
                  setAddress(`${firstLoc}, ${newCity?.name}`);
                }}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] font-semibold bg-[#F7F4EC]"
              >
                {CITIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-[#252923] block mb-1">Area / Locality *</label>
              <select
                value={locality}
                onChange={e => {
                  setLocality(e.target.value);
                  setAddress(`${e.target.value}, ${activeCity.name}`);
                }}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC]"
              >
                {localityOptions.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-[#252923] block mb-1">
              Food Item Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 50 kg Dum Biryani, Salan & Raita"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3D5] text-[#252923] focus:outline-none focus:ring-2 focus:ring-[#173F35]/20 font-medium"
            />
          </div>

          {/* Category & Diet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="font-bold text-[#252923] block mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC]"
              >
                <option value="Cooked Meals">Cooked Meals (Restaurants & Hotels)</option>
                <option value="Fresh Fruits">Fresh Fruits (Fruit Shops & Mandis)</option>
                <option value="Bakery">Bakery & Breads</option>
                <option value="Vegetables">Raw Produce / Vegetables</option>
                <option value="Packaged Food">Packaged / Dry Food</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#252923] block mb-1">Diet Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDiet('Veg')}
                  className={`py-2 px-3 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                    diet === 'Veg'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-[#E8E3D5] bg-[#F7F4EC]'
                  }`}
                >
                  🟢 Pure Veg
                </button>
                <button
                  type="button"
                  onClick={() => setDiet('Non-Veg')}
                  className={`py-2 px-3 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                    diet === 'Non-Veg'
                      ? 'border-red-600 bg-red-50 text-red-800'
                      : 'border-[#E8E3D5] bg-[#F7F4EC]'
                  }`}
                >
                  🔴 Non-Veg
                </button>
              </div>
            </div>
          </div>

          {/* Quantity & Meals Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="font-bold text-[#252923] block mb-1">
                Approx Quantity *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 35 kg / 4 thermal pots"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923]"
              />
            </div>

            <div>
              <label className="font-bold text-[#252923] block mb-1">
                Approx People Fed (Meals)
              </label>
              <input
                type="number"
                placeholder="e.g. 70"
                value={mealsCount}
                onChange={e => setMealsCount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923]"
              />
            </div>
          </div>

          {/* Pickup Deadline */}
          <div>
            <label className="font-bold text-[#252923] block mb-1">
              Must Be Picked Up Within
            </label>
            <select
              value={expiryHours}
              onChange={e => setExpiryHours(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC]"
            >
              <option value="2">Within 2 hours (Hot cooked meals)</option>
              <option value="3">Within 3 hours</option>
              <option value="5">Within 5 hours</option>
              <option value="12">Within 12 hours</option>
              <option value="24">Within 24 hours (Bakery / dry produce)</option>
            </select>
          </div>

          {/* Exact Address */}
          <div>
            <label className="font-bold text-[#252923] block mb-1">
              Detailed Pickup Address
            </label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="e.g. Plot 15, Near KIIT Square, Patia, Bhubaneswar"
              className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923]"
            />
          </div>

          {/* Storage & Notes */}
          <div>
            <label className="font-bold text-[#252923] block mb-1">
              Storage Condition & Packaging Details
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Kept hot >60°C in thermal boxes with lids"
              className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923]"
            />
          </div>

          {/* Photo Presets */}
          <div>
            <label className="font-bold text-[#252923] block mb-1">
              Select Sample Image
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(img.url)}
                  className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
                    imageUrl === img.url ? 'border-[#173F35] ring-2 ring-[#173F35]/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] p-0.5 truncate text-center">
                    {img.label.split('/')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* FSSAI Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F7F4EC] border border-[#E8E3D5] cursor-pointer">
              <input
                type="checkbox"
                checked={fssaiAgreed}
                onChange={e => setFssaiAgreed(e.target.checked)}
                className="mt-0.5 rounded text-[#173F35] focus:ring-0 cursor-pointer"
              />
              <span className="text-[11px] text-[#636B5F] leading-snug">
                <strong className="text-[#252923]">Food Safety Declaration:</strong> I certify that this food was prepared hygienically, stored at safe temperatures, and has not been served to customers, as per FSSAI Surplus Food Regulations 2019.
              </span>
            </label>
          </div>
        </form>

        {/* Sticky Actions Footer */}
        <div className="p-4 px-6 bg-[#F7F4EC] border-t border-[#E8E3D5] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#636B5F] hover:bg-[#EAE5D9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="donate-food-form"
            disabled={!fssaiAgreed}
            className="px-6 py-2.5 rounded-xl bg-[#173F35] text-[#F7F4EC] font-bold text-xs hover:bg-[#24594B] disabled:opacity-50 shadow-xs cursor-pointer"
          >
            Publish Food Donation
          </button>
        </div>

      </div>
    </div>
  );
}
