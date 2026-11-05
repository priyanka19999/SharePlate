import React from 'react';
import { Utensils, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Business Posts Surplus',
      desc: 'Hotels, caterers, bakeries, or banquets list surplus prepared food with quantity, packaging, and pickup deadline.',
      icon: Utensils
    },
    {
      num: '2',
      title: 'Verified Shelter Claims',
      desc: 'Registered local NGOs, child care homes, and night shelters receive the alert and claim the batch with 1 click.',
      icon: CheckCircle2
    },
    {
      num: '3',
      title: 'Safe Pickup & PIN Verification',
      desc: 'The shelter collection vehicle arrives, checks temperature, and verifies the 4-digit PIN to ensure authentic handover.',
      icon: Truck
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden border-b border-[#E8E3D5]/80">
      
      {/* Subtle Ethereal Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C9E7A3]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider block bg-[#173F35]/5 px-3 py-1 rounded-full w-fit mx-auto border border-[#173F35]/10">
            Simple 3-Step Coordination
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#173F35] tracking-tight">
            How SharePlate Works
          </h2>
          <p className="text-xs sm:text-sm text-[#555E51] leading-relaxed">
            We make it effortless for food businesses to donate safely and for shelters to feed vulnerable communities across your city.
          </p>
        </div>

        {/* 3 Step Cards - Equal Height and Centered Alignment (Frosted Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map(s => {
            const Icon = s.icon;
            return (
              <div 
                key={s.num}
                className="p-8 sm:p-9 rounded-3xl bg-gradient-to-b from-white to-[#F7F4EC]/70 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-5px_rgba(23,63,53,0.04)] ring-1 ring-[#173F35]/5 hover:shadow-[0_20px_40px_-10px_rgba(23,63,53,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#173F35] to-[#24594B] text-[#C9E7A3] flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(23,63,53,0.3)] ring-4 ring-[#C9E7A3]/30 mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                
                <span className="text-xs font-black text-[#C8722B] uppercase tracking-wider mb-1.5">
                  Step {s.num}
                </span>

                <h3 className="font-bold text-lg text-[#252923] mb-2.5">
                  {s.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#636B5F] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
