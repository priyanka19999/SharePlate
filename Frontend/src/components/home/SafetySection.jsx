import React from 'react';
import { ShieldCheck, Thermometer, Clock, PackageCheck } from 'lucide-react';

export default function SafetySection() {
  const points = [
    {
      title: 'Safe Temperatures',
      desc: 'Cooked meals are kept above 60°C in food warmers. Chilled items are kept below 5°C.',
      icon: Thermometer
    },
    {
      title: 'Freshness Deadlines',
      desc: 'Every batch has an expiry countdown. Food is only distributed while fresh and safe.',
      icon: Clock
    },
    {
      title: 'Hygienic Packaging',
      desc: 'Surplus food is sealed in sanitized, food-grade thermal containers or foil trays.',
      icon: PackageCheck
    },
    {
      title: 'Verified Partners Only',
      desc: 'We only partner with registered restaurants with valid FSSAI licenses and verified non-profits.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-20 md:py-24 ethereal-safety-bg text-[#F7F4EC] relative overflow-hidden">
      
      {/* Luminous emerald halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9E7A3]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold text-[#C9E7A3] uppercase tracking-wider block bg-white/10 px-3.5 py-1 rounded-full w-fit mx-auto border border-[#C9E7A3]/30 shadow-[0_0_15px_rgba(201,231,163,0.15)]">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
            Food Safety & FSSAI Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/80 leading-relaxed">
            Redistributing surplus food responsibly is our primary duty. We adhere strictly to the Food Safety and Standards (Recovery and Distribution of Surplus Food) Regulations, 2019.
          </p>
        </div>

        {/* 4 Cards Grid - Equal Height & Crystalline Emerald Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div 
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-[#C9E7A3]/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start space-y-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#C9E7A3] flex items-center justify-center shrink-0 border border-[#C9E7A3]/30 shadow-[0_0_15px_rgba(201,231,163,0.15)] group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-[#F7F4EC]/80 leading-relaxed flex-1 font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
