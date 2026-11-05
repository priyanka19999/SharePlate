import React, { useState } from 'react';
import { 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Truck, 
  ShieldCheck, 
  KeyRound,
  UtensilsCrossed,
  HeartHandshake,
  AlertCircle,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { DEMO_USERS } from '../../data';

export default function Dashboard({ 
  currentUser, 
  donations, 
  onOpenDonate, 
  onVerifyHandover,
  onSwitchUser 
}) {
  const [pinInputs, setPinInputs] = useState({});
  const [pinError, setPinError] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  if (!currentUser) {
    return (
      <section className="py-16 bg-[#FBF9F5] min-h-[70vh] flex items-center">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#173F35] text-[#C9E7A3] flex items-center justify-center mx-auto shadow-xs">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#173F35]">
            Sign In to View Your Dashboard
          </h2>
          <p className="text-sm text-[#636B5F]">
            Track your surplus food donations, view claimed batches, verify pickup PINs, or coordinate rescues.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onSwitchUser(DEMO_USERS.donor)}
              className="p-4 rounded-2xl bg-white border border-[#E8E3D5] hover:border-[#173F35] shadow-xs text-left transition-all cursor-pointer group"
            >
              <UtensilsCrossed className="w-5 h-5 text-[#C8722B] mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-[#252923]">Login as Donor</div>
              <div className="text-[11px] text-[#636B5F] truncate">{DEMO_USERS.donor.orgName}</div>
            </button>

            <button
              onClick={() => onSwitchUser(DEMO_USERS.ngo)}
              className="p-4 rounded-2xl bg-white border border-[#E8E3D5] hover:border-[#173F35] shadow-xs text-left transition-all cursor-pointer group"
            >
              <HeartHandshake className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-[#252923]">Login as NGO</div>
              <div className="text-[11px] text-[#636B5F] truncate">{DEMO_USERS.ngo.orgName}</div>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const isDonor = currentUser.role === 'donor';
  const isRecipient = currentUser.role === 'recipient';
  const isAdmin = currentUser.role === 'admin';

  // Calculate dynamic metrics
  const totalMeals = donations.reduce((acc, d) => acc + (d.mealsCount || 0), 0);
  const claimedCount = donations.filter(d => d.status === 'Claimed').length;
  const pickedUpCount = donations.filter(d => d.status === 'Picked Up').length;

  const handleVerify = (donationId, correctPin) => {
    const input = (pinInputs[donationId] || '').trim();
    if (input === correctPin) {
      onVerifyHandover(donationId);
      setPinError({ ...pinError, [donationId]: null });
    } else {
      setPinError({ ...pinError, [donationId]: 'Invalid PIN! Please check with driver.' });
    }
  };

  const handleCopyPin = (donationId, pin) => {
    navigator.clipboard?.writeText(pin);
    setCopiedId(donationId);
    setTimeout(() => setCopiedId(null), 3000);
  };

  // Filter donations according to statusFilter
  const displayedDonations = donations.filter(item => {
    if (statusFilter === 'claimed') return item.status === 'Claimed';
    if (statusFilter === 'completed') return item.status === 'Picked Up';
    if (statusFilter === 'available') return item.status === 'Available';
    return true;
  });

  return (
    <section className="py-10 bg-[#FBF9F5] min-h-[85vh] border-b border-[#E8E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Profile & Action Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E3D5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-[#173F35] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl font-bold text-[#173F35] truncate">
                  {currentUser.orgName || currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#173F35]/10 text-[#173F35] shrink-0">
                  {currentUser.role === 'donor' ? 'Food Donor' : currentUser.role === 'recipient' ? 'Shelter NGO' : 'Platform Admin'}
                </span>
              </div>
              <p className="text-xs text-[#636B5F] mt-0.5 truncate">
                {currentUser.name} · {currentUser.locality} · {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isDonor && (
              <button
                onClick={onOpenDonate}
                className="px-4 py-2.5 rounded-xl bg-[#173F35] text-white text-xs font-bold hover:bg-[#24594B] shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#C9E7A3]" />
                <span>+ List Surplus Food</span>
              </button>
            )}

            {/* Quick role test toggles */}
            <div className="flex items-center gap-1 bg-[#F7F4EC] p-1 rounded-xl border border-[#E8E3D5] text-[11px] font-bold">
              <span className="px-2 text-[#636B5F]">Role:</span>
              <button
                onClick={() => onSwitchUser(DEMO_USERS.donor)}
                className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                  isDonor ? 'bg-white shadow-xs text-[#173F35]' : 'text-[#636B5F] hover:text-[#173F35]'
                }`}
              >
                Donor
              </button>
              <button
                onClick={() => onSwitchUser(DEMO_USERS.ngo)}
                className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                  isRecipient ? 'bg-white shadow-xs text-[#173F35]' : 'text-[#636B5F] hover:text-[#173F35]'
                }`}
              >
                NGO
              </button>
              <button
                onClick={() => onSwitchUser(DEMO_USERS.admin)}
                className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                  isAdmin ? 'bg-white shadow-xs text-[#173F35]' : 'text-[#636B5F] hover:text-[#173F35]'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards with Uniform Grid Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-[#E8E3D5] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#636B5F] uppercase tracking-wider">
              {isDonor ? 'Total Surplus Listed' : 'Total Meals Rescued'}
            </span>
            <div className="text-3xl font-black text-[#173F35] mt-2 mb-1">
              {totalMeals} Meals
            </div>
            <span className="text-xs text-emerald-700 font-semibold block">
              100% Safe Distribution
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E3D5] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#636B5F] uppercase tracking-wider">
              Active Pickups (After Claimed)
            </span>
            <div className="text-3xl font-black text-[#C8722B] mt-2 mb-1">
              {claimedCount} Batches
            </div>
            <span className="text-xs text-[#636B5F] block">
              Drivers en route for collection
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E3D5] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#636B5F] uppercase tracking-wider">
              Completed Handover Rescues
            </span>
            <div className="text-3xl font-black text-emerald-800 mt-2 mb-1">
              {pickedUpCount} Handed Over
            </div>
            <span className="text-xs text-emerald-700 font-semibold block">
              PIN Verified & Received
            </span>
          </div>
        </div>

        {/* Dashboard Feed with Filter Tabs */}
        <div className="bg-white rounded-3xl border border-[#E8E3D5] shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#E8E3D5] gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#173F35]">
                {isDonor 
                  ? 'Your Surplus Listings & Handover Status' 
                  : isRecipient 
                    ? 'Surplus Food Claimed by Your Organization' 
                    : 'All Platform Coordination Records'}
              </h3>
              <p className="text-xs text-[#636B5F]">
                {isDonor 
                  ? 'Verify 4-digit PIN when collection drivers arrive to mark handover complete.' 
                  : 'Show your 4-digit PIN to donors upon vehicle collection.'}
              </p>
            </div>

            {/* Status Filter Chips */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F7F4EC] p-1 rounded-xl border border-[#E8E3D5] text-[11px] font-bold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'all' ? 'bg-[#173F35] text-white shadow-2xs' : 'text-[#636B5F] hover:text-[#173F35]'
                }`}
              >
                All ({donations.length})
              </button>
              <button
                onClick={() => setStatusFilter('claimed')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'claimed' ? 'bg-[#C8722B] text-white shadow-2xs' : 'text-[#636B5F] hover:text-[#C8722B]'
                }`}
              >
                Claimed ({claimedCount})
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'completed' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-[#636B5F] hover:text-emerald-700'
                }`}
              >
                Completed ({pickedUpCount})
              </button>
            </div>
          </div>

          {/* List of Donation Items with Rich After-Claimed Workflows */}
          <div className="space-y-4">
            {displayedDonations.map(item => {
              const isClaimed = item.status === 'Claimed';
              const isCompleted = item.status === 'Picked Up';
              const isAvailable = item.status === 'Available';

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs ${
                    isClaimed 
                      ? 'border-amber-300 bg-amber-50/40 hover:bg-white' 
                      : isCompleted 
                        ? 'border-emerald-200 bg-emerald-50/30 hover:bg-white' 
                        : 'border-[#E8E3D5] bg-[#FBF9F5] hover:bg-white'
                  }`}
                >
                  {/* Left: Food summary & Photo */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#E8E3D5]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          isAvailable 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : isClaimed 
                              ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                              : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {item.status === 'Claimed' ? '🟡 Claimed · In Transit' : item.status === 'Picked Up' ? '✓ Handover Completed' : '🟢 Available'}
                        </span>
                        <span className="font-semibold text-[#173F35]">{item.quantity}</span>
                        <span>·</span>
                        <span className="text-[#636B5F]">~{item.mealsCount} meals</span>
                      </div>

                      <h4 className="font-bold text-sm text-[#252923] mt-1 truncate">
                        {item.title}
                      </h4>

                      <div className="text-[11px] text-[#636B5F] flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="font-medium text-[#252923]">{item.donorName}</span>
                        <span>•</span>
                        <span>{item.locality}</span>
                        <span>•</span>
                        <span>Deadline: {item.expiryTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle / Right: Contextual Workflow Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    
                    {/* A. If Claimed: Show Claimed Shelter Pill */}
                    {isClaimed && (
                      <div className="bg-white border border-amber-300 p-2.5 rounded-xl text-[11px] text-amber-950 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-amber-800 block">Claimed by Shelter:</span>
                        <strong className="block truncate">{item.claimedBy || 'Verified Local Shelter'}</strong>
                      </div>
                    )}

                    {/* B. If Picked Up: Show Completed Stamp */}
                    {isCompleted && (
                      <div className="bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl text-[11px] text-emerald-900 flex items-center gap-2 font-bold shadow-2xs">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span>Handover Verified & Completed</span>
                          <span className="block text-[10px] font-normal text-emerald-700">Meals safely delivered to shelter</span>
                        </div>
                      </div>
                    )}

                    {/* C. DONOR WORKFLOW: PIN Verification input to complete handover */}
                    {isDonor && isClaimed && (
                      <div className="p-3 bg-white rounded-2xl border border-amber-300 space-y-1.5 shadow-2xs">
                        <span className="text-[10px] font-bold text-[#173F35] block uppercase tracking-wider">
                          Enter Driver's 4-Digit PIN:
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={4}
                            placeholder="PIN"
                            value={pinInputs[item.id] || ''}
                            onChange={e => setPinInputs({ ...pinInputs, [item.id]: e.target.value })}
                            className="w-20 px-3 py-1.5 rounded-xl border border-[#E8E3D5] text-xs font-mono text-center tracking-widest uppercase font-black bg-[#F7F4EC] focus:bg-white"
                          />
                          <button
                            onClick={() => handleVerify(item.id, item.handoverPin)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#173F35] text-white font-bold text-xs hover:bg-[#24594B] cursor-pointer shrink-0 transition-colors"
                          >
                            Verify & Handover
                          </button>
                        </div>
                        {pinError[item.id] && (
                          <span className="text-[10px] text-red-600 block">
                            {pinError[item.id]}
                          </span>
                        )}
                        <span className="text-[10px] text-[#8C9588] block">
                          (Driver code: <strong>{item.handoverPin}</strong>)
                        </span>
                      </div>
                    )}

                    {/* D. RECIPIENT WORKFLOW: High-Visibility PIN Badge with Copy Button */}
                    {isRecipient && isClaimed && (
                      <div className="p-2.5 px-3.5 rounded-2xl bg-[#173F35] text-white flex items-center justify-between gap-3 shadow-xs">
                        <div>
                          <span className="text-[10px] text-[#C9E7A3] block font-bold uppercase tracking-wider">
                            Collection PIN:
                          </span>
                          <span className="text-xl font-mono font-black tracking-widest block leading-tight">
                            {item.handoverPin}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyPin(item.id, item.handoverPin)}
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#C9E7A3] transition-colors cursor-pointer"
                          title="Copy PIN"
                        >
                          {copiedId === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    )}

                    {/* E. ADMIN VIEW: Details Badge */}
                    {isAdmin && isClaimed && (
                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px]">
                        <span>PIN: <strong className="font-mono">{item.handoverPin}</strong></span>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {displayedDonations.length === 0 && (
              <div className="text-center py-10 bg-[#FBF9F5] rounded-2xl border border-[#E8E3D5] p-6 space-y-2">
                <p className="text-xs font-bold text-[#252923]">No batches matching this filter</p>
                <button
                  onClick={() => setStatusFilter('all')}
                  className="text-xs text-[#173F35] font-bold underline cursor-pointer"
                >
                  View all batches
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
