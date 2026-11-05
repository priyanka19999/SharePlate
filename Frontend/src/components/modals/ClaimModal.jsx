import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  Truck, 
  KeyRound, 
  Copy, 
  Check, 
  ArrowRight,
  Thermometer,
  PackageCheck,
  Sparkles
} from 'lucide-react';

export default function ClaimModal({ 
  isOpen, 
  onClose, 
  foodItem, 
  currentUser, 
  onConfirmClaim,
  onQuickLoginAsShelter,
  onNavigateToDashboard 
}) {
  const [ngoName, setNgoName] = useState(
    currentUser?.role === 'recipient' 
      ? (currentUser.orgName || currentUser.name) 
      : 'Verified Community Shelter & Rescue Kitchen'
  );
  const [driverName, setDriverName] = useState('Authorized Rescue Volunteer');
  const [driverPhone, setDriverPhone] = useState('+91 99999 00000');
  const [vehicle, setVehicle] = useState('Insulated Food Rescue Vehicle');
  const [confirmed, setConfirmed] = useState(false);
  const [safetyCheck, setSafetyCheck] = useState(true);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (currentUser?.role === 'recipient') {
      setNgoName(currentUser.orgName || currentUser.name);
    } else if (currentUser?.name) {
      setNgoName(currentUser.name);
    }
  }, [currentUser]);

  if (!isOpen || !foodItem) return null;

  const handleClaim = (e) => {
    e.preventDefault();
    onConfirmClaim(foodItem.id, ngoName, {
      driverName,
      driverPhone,
      vehicle
    });
    setConfirmed(true);
  };

  const handleCopyPin = () => {
    if (foodItem?.handoverPin) {
      navigator.clipboard?.writeText(foodItem.handoverPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleGoToDashboard = () => {
    setConfirmed(false);
    onClose();
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E8E3D5] shadow-xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-float">
        
        {/* Sticky Modal Header */}
        <div className={`p-6 pb-5 relative shrink-0 transition-colors ${
          confirmed ? 'bg-[#173F35] text-white' : 'bg-[#173F35] text-white'
        }`}>
          <button
            onClick={() => { setConfirmed(false); onClose(); }}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9E7A3] text-xs font-bold mb-2">
            {confirmed ? <CheckCircle className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
            <span>{confirmed ? 'Food Rescue Reserved' : 'NGO Food Rescue Claim'}</span>
          </div>

          <h3 className="font-serif text-2xl font-bold">
            {confirmed ? 'Batch Claimed Successfully!' : 'Claim Surplus Food Batch'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            {confirmed 
              ? 'Your collection request has been registered with the food donor.' 
              : 'Reserve this batch for immediate pickup and distribution to shelters.'}
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 text-xs space-y-4 overflow-y-auto flex-1">
          
          {confirmed ? (
            /* =========================================
               AFTER CLAIMED: COMPREHENSIVE SUCCESS VIEW
               ========================================= */
            <div className="space-y-4">
              
              {/* 1. Confirmation Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-emerald-950">
                  Reserved for {ngoName}
                </h4>
                <p className="text-[11px] text-emerald-800">
                  The restaurant kitchen team has been notified. Please collect before the deadline.
                </p>
              </div>

              {/* 2. Prominent Handover PIN Card with 1-Click Copy */}
              <div className="p-5 rounded-3xl bg-[#F7F4EC] border-2 border-dashed border-[#173F35] text-center space-y-2 relative">
                <span className="text-[11px] font-bold text-[#636B5F] uppercase tracking-wider block">
                  Your 4-Digit Collection PIN
                </span>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="text-4xl sm:text-5xl font-mono font-black text-[#173F35] tracking-widest px-4 py-1 rounded-2xl bg-white border border-[#E8E3D5] shadow-2xs">
                    {foodItem.handoverPin}
                  </div>
                  <button
                    onClick={handleCopyPin}
                    className="p-3 rounded-2xl bg-[#173F35] text-white hover:bg-[#24594B] transition-all cursor-pointer shadow-xs flex items-center gap-1.5 font-bold text-xs"
                    title="Copy PIN to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#C9E7A3]" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#636B5F] pt-1">
                  Show this PIN to <strong>{foodItem.donorName}</strong> at pickup to confirm receipt.
                </p>
              </div>

              {/* 3. Step-by-Step Pickup Guide */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E3D5] space-y-2.5">
                <span className="font-bold text-xs text-[#252923] block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Next Steps for Safe Collection:</span>
                </span>
                
                <div className="space-y-2 text-[11px] text-[#636B5F]">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F7F4EC] text-[#173F35] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#E8E3D5]">1</span>
                    <span><strong>Dispatch Driver:</strong> {driverName} ({driverPhone}) with vehicle {vehicle}.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F7F4EC] text-[#173F35] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#E8E3D5]">2</span>
                    <span><strong>Inspect Quality:</strong> Verify hygiene and temperature ({foodItem.storage}) upon arrival.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F7F4EC] text-[#173F35] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#E8E3D5]">3</span>
                    <span><strong>Handover Verification:</strong> Give the 4-digit PIN above to the kitchen manager.</span>
                  </div>
                </div>
              </div>

              {/* 4. Donor Contact & Pickup Location */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E3D5] space-y-2">
                <span className="font-bold text-[#252923] block text-xs">
                  Pickup Location & Contact:
                </span>
                <div className="flex items-start gap-2 text-[#636B5F]">
                  <MapPin className="w-4 h-4 text-[#C8722B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252923] block">{foodItem.donorName}</strong>
                    <span>{foodItem.address}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#636B5F] pt-1 border-t border-[#E8E3D5]">
                  <Phone className="w-4 h-4 text-[#173F35] shrink-0" />
                  <span className="font-semibold text-[#252923]">{foodItem.donorPhone}</span>
                  <span className="text-[10px] text-[#8C9588]">(Kitchen Dispatch)</span>
                </div>
              </div>

              {/* 5. Actions: Dashboard or Browse More */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={handleGoToDashboard}
                  className="w-full py-3 rounded-2xl bg-[#173F35] text-white font-bold text-xs hover:bg-[#24594B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Track in Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#C9E7A3]" />
                </button>

                <button
                  onClick={() => { setConfirmed(false); onClose(); }}
                  className="w-full py-3 rounded-2xl bg-white border border-[#E8E3D5] text-[#252923] font-bold text-xs hover:bg-[#F7F4EC] transition-all cursor-pointer"
                >
                  Browse More Surplus
                </button>
              </div>

            </div>
          ) : (
            /* =========================================
               BEFORE CLAIMED: CLAIM CONFIRMATION FORM
               ========================================= */
            <form id="claim-food-form" onSubmit={handleClaim} className="space-y-4">
              
              {/* Access Role Notice (Guest vs Verified Shelter) */}
              {!currentUser ? (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>Browsing as Guest — Verified Shelter Required to Claim</span>
                    </span>
                    <span className="text-[10px] bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full font-bold">Guest Mode</span>
                  </div>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed">
                    To maintain food safety and ensure meals reach vulnerable people, only verified NGOs can claim surplus food batches. You can test this immediately with 1 click:
                  </p>
                  <button
                    type="button"
                    onClick={() => onQuickLoginAsShelter && onQuickLoginAsShelter()}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#173F35] text-[#C9E7A3] font-bold text-xs hover:bg-[#24594B] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C9E7A3]" />
                    <span>⚡ 1-Click Sign In as Ruchika Shelter (NGO)</span>
                  </button>
                </div>
              ) : currentUser.role === 'recipient' ? (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Verified NGO Shelter: {currentUser.orgName || currentUser.name}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                    Authorized
                  </span>
                </div>
              ) : null}

              {/* Item summary box */}
              <div className="p-3.5 rounded-2xl bg-[#F7F4EC] border border-[#E8E3D5] flex items-center gap-3">
                <img
                  src={foodItem.imageUrl}
                  alt={foodItem.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.pexels.com/photos/11115801/pexels-photo-11115801.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-[#252923] truncate">
                    {foodItem.title}
                  </h4>
                  <div className="text-xs text-[#636B5F] flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-[#173F35]">{foodItem.quantity}</span>
                    <span>·</span>
                    <span>~{foodItem.mealsCount} Meals</span>
                  </div>
                  <div className="text-[11px] text-[#C8722B] font-semibold mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Must collect: {foodItem.expiryTime}</span>
                  </div>
                </div>
              </div>

              {/* NGO Org Name */}
              <div>
                <label className="font-bold text-[#252923] block mb-1">
                  Recipient Organization (NGO / Shelter) *
                </label>
                <input
                  type="text"
                  required
                  value={ngoName}
                  onChange={e => setNgoName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC] focus:bg-white"
                />
              </div>

              {/* Driver & Transport Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#252923] block mb-1">
                    Driver / Volunteer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={e => setDriverName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#252923] block mb-1">
                    Driver Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={driverPhone}
                    onChange={e => setDriverPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#252923] block mb-1">
                  Transport Vehicle Details
                </label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={e => setVehicle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E3D5] text-[#252923] bg-[#F7F4EC] focus:bg-white"
                />
              </div>

              {/* Safety declaration */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F7F4EC] border border-[#E8E3D5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyCheck}
                    onChange={e => setSafetyCheck(e.target.checked)}
                    className="mt-0.5 rounded text-[#173F35] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[11px] text-[#636B5F] leading-snug">
                    <strong className="text-[#252923]">Distribution Commitment:</strong> We confirm this food will be collected within the specified window, transported in clean insulated containers, and served free of charge to beneficiaries.
                  </span>
                </label>
              </div>
            </form>
          )}

        </div>

        {/* Sticky Actions Footer (when form is active) */}
        {!confirmed && (
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
              form="claim-food-form"
              disabled={!safetyCheck}
              className="px-6 py-2.5 rounded-xl bg-[#173F35] text-white font-bold text-xs hover:bg-[#24594B] disabled:opacity-50 shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Confirm Claim & Get PIN</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9E7A3]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
