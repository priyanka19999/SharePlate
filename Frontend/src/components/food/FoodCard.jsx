import React from 'react';
import { MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle2, KeyRound, Truck } from 'lucide-react';

export default function FoodCard({ item, onClaimFood, currentUser, onViewDashboard }) {
  const isAvailable = item.status === 'Available';
  const isClaimed = item.status === 'Claimed';
  const isPickedUp = item.status === 'Picked Up';

  const isUserDonor = currentUser?.role === 'donor';
  const isUserRecipient = currentUser?.role === 'recipient';

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-[#E8E3D5]/80 shadow-[0_4px_20px_-3px_rgba(23,63,53,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(23,63,53,0.12)] hover:-translate-y-1 hover:border-[#173F35]/30 transition-all duration-300 flex flex-col group">
      
      {/* 1. Card Media Header */}
      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden shrink-0">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.pexels.com/photos/11115801/pexels-photo-11115801.jpeg?auto=compress&cs=tinysrgb&w=800";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Subtle Vignette Gradient for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

        {/* Top Badges: Diet on Left, Status on Right */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* FSSAI Veg / Non-Veg Standard Mark */}
          <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1.5 pointer-events-auto">
            <span className={`inline-flex items-center justify-center w-3.5 h-3.5 border rounded-xs p-0.5 ${
              item.diet === 'Veg' ? 'border-emerald-700' : 'border-red-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                item.diet === 'Veg' ? 'bg-emerald-700' : 'bg-red-700'
              }`}></span>
            </span>
            <span className={`text-[10px] font-bold ${
              item.diet === 'Veg' ? 'text-emerald-900' : 'text-red-900'
            }`}>
              {item.diet === 'Veg' ? 'Pure Veg' : 'Non-Veg'}
            </span>
          </div>

          {/* Status Badge */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xs pointer-events-auto flex items-center gap-1 ${
            isAvailable 
              ? 'bg-emerald-600' 
              : isClaimed 
                ? 'bg-amber-600' 
                : 'bg-[#173F35]'
          }`}>
            {isAvailable && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
            {isClaimed && <Truck className="w-3 h-3" />}
            {isPickedUp && <CheckCircle2 className="w-3 h-3 text-[#C9E7A3]" />}
            <span>{isAvailable ? 'Available' : isClaimed ? 'Claimed · In Transit' : 'Rescued'}</span>
          </span>
        </div>

        {/* Bottom Pill: Meals count */}
        <div className="absolute bottom-3 left-3 bg-[#173F35]/95 text-[#F7F4EC] px-3 py-1 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5">
          <span className="text-[#C9E7A3] font-bold">{item.quantity}</span>
          <span>·</span>
          <span>~{item.mealsCount} Meals</span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2.5">
          
          {/* Storage & Temperature info tag */}
          <div className="text-[11px] text-[#636B5F] flex items-center justify-between">
            <span className="bg-[#F7F4EC] text-[#252923] px-2.5 py-0.5 rounded-lg border border-[#E8E3D5] font-medium truncate max-w-[200px]">
              {item.storage}
            </span>
            <span className="text-[10px] font-bold text-[#8C9588] uppercase tracking-wider">
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-[#252923] leading-snug line-clamp-2 group-hover:text-[#173F35] transition-colors">
            {item.title}
          </h3>

          {/* Donor & Locality */}
          <div className="text-xs text-[#636B5F] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C8722B] shrink-0" />
            <span className="font-semibold text-[#252923] truncate">{item.donorName}</span>
            <span>·</span>
            <span className="text-[#173F35] font-medium shrink-0">{item.locality}</span>
          </div>

          {/* Packaging notes */}
          <p className="text-xs text-[#636B5F] line-clamp-2 leading-relaxed">
            {item.notes}
          </p>
        </div>

        {/* 3. Card Bottom — Contextual "Available" vs "After Claimed" View */}
        <div className="pt-3.5 border-t border-[#E8E3D5] space-y-2">
          
          {/* A. If Still Available */}
          {isAvailable && (
            <div className="flex items-center justify-between gap-3">
              <div className="text-[11px] text-[#636B5F]">
                <span className="block font-semibold text-[#252923] text-[10px] uppercase tracking-wider">
                  Pickup Window:
                </span>
                <span className="font-medium text-[#C8722B] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.expiryTime}</span>
                </span>
              </div>

              <button
                onClick={() => onClaimFood(item)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#173F35] to-[#24594B] text-[#F7F4EC] text-xs font-bold hover:shadow-[0_4px_14px_rgba(23,63,53,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                <span>Claim Food</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9E7A3]" />
              </button>
            </div>
          )}

          {/* B. If Already Claimed ("After Claimed" State) */}
          {isClaimed && (
            <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-amber-950 font-bold truncate">
                  <Truck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">Claimed by {item.claimedBy || 'Verified Shelter'}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full shrink-0">
                  En Route
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-amber-200/60 text-[11px]">
                <span className="text-[#636B5F] flex items-center gap-1 truncate">
                  <Clock className="w-3 h-3 text-amber-700 shrink-0" />
                  <span>Deadline: {item.expiryTime}</span>
                </span>

                {/* Contextual Action Button for Claimed Items */}
                {isUserRecipient ? (
                  <button
                    onClick={onViewDashboard}
                    className="px-2.5 py-1 rounded-lg bg-[#173F35] text-white font-bold text-[10px] hover:bg-[#24594B] flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <KeyRound className="w-3 h-3 text-[#C9E7A3]" />
                    <span>PIN: {item.handoverPin}</span>
                  </button>
                ) : isUserDonor ? (
                  <button
                    onClick={onViewDashboard}
                    className="px-2.5 py-1 rounded-lg bg-[#173F35] text-white font-bold text-[10px] hover:bg-[#24594B] flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Verify Pickup</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-amber-900 font-semibold bg-white/70 px-2 py-0.5 rounded-md border border-amber-200">
                    Awaiting Handover
                  </span>
                )}
              </div>
            </div>
          )}

          {/* C. If Handover Completed */}
          {isPickedUp && (
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold truncate">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">Rescued by {item.claimedBy || 'Shelter'}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                Completed
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
