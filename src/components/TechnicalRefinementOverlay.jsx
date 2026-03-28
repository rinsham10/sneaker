import React from 'react';
import { motion } from 'framer-motion';

const TechnicalRefinementOverlay = ({ onClose }) => {
  const specs = [
    { label: "MODEL ARCHITECTURE", value: "Dunk Low Retro '26 Edition" },
    { label: "CHASSIS MATERIAL", value: "Premium Phantom Suede" },
    { label: "BASE COLORWAY", value: "Phantom / Malachite-Gum" },
    { label: "MIDSOLE COMPONENT", value: "Injection Molded Phylon Foam" },
    { label: "TRACTION SYSTEM", value: "Gum Light Brown Rubber Outsole" },
    { label: "WEIGHT COEFFICIENT", value: "382.4g (Size 9 US)" },
    { label: "INTERIOR LINING", value: "High-Ventilation Mesh" },
    { label: "STRESS PERFORMANCE", value: "Elite Durability Rating" }
  ];

  const details = [
    { 
      id: "01",
      title: "STRUCTURAL INTEGRITY",
      desc: "Double-stitched overlays across the toe box and heel counter for maximum structural reinforcement during high-intensity wear."
    },
    { 
      id: "02",
      title: "CLIMATE THERMAL",
      desc: "Precisely laser-perforated vamp allows for optimal thermal regulation and moisture mitigation in varying climates."
    },
    { 
      id: "03",
      title: "KINETIC ENERGY",
      desc: "Reactive foam midsole geometry optimized for linear energy return and lateral stability during rapid force shifts."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0c0c0c]/95 backdrop-blur-2xl flex items-start md:items-center justify-center p-4 md:p-12 overflow-y-auto"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none fixed" 
           style={{ backgroundImage: 'radial-gradient(#00875a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -50, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-6xl relative bg-black border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 overflow-hidden shadow-[0_0_100px_rgba(0,135,90,0.15)] my-auto"
      >
        {/* Decorative Grid Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden sm:block">
          <div className="absolute top-8 left-8 w-24 h-[1px] bg-malachite/30" />
          <div className="absolute top-8 left-8 w-[1px] h-24 bg-malachite/30" />
          <div className="absolute bottom-8 right-8 w-24 h-[1px] bg-malachite/30" />
          <div className="absolute bottom-8 right-8 w-[1px] h-24 bg-malachite/30" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-16 relative">
          <div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-malachite text-[10px] tracking-[0.8em] font-black uppercase mb-4"
            >
              Diagnostic.Refinement
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-tight uppercase">
              TECHNICAL <span className="text-malachite">SPECS.</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="group absolute -top-2 -right-2 md:top-0 md:right-0 p-3 md:p-4 bg-white/5 hover:bg-malachite/20 rounded-full transition-all border border-white/10 hover:border-malachite/50 z-20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-90 transition-transform md:w-6 md:h-6">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column - Core Data */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              {specs.map((spec, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.05) }}
                  className="border-b border-white/5 pb-4"
                >
                  <div className="text-[8px] font-black text-white/30 tracking-widest uppercase mb-2">{spec.label}</div>
                  <div className="text-sm font-bold text-white tracking-wide">{spec.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 p-6 md:p-8 bg-malachite/5 border border-malachite/20 rounded-2xl md:rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 text-malachite/20 font-black text-6xl italic -mr-4 -mt-4 group-hover:scale-110 transition-transform hidden sm:block">NIKE</div>
                <div className="relative z-10">
                   <div className="text-[10px] font-black text-malachite tracking-[0.4em] uppercase mb-4">Manufacturer Assurance</div>
                   <p className="text-neutral-400 text-xs font-medium leading-relaxed max-w-sm">
                     The Dunk Low Phantom/Malachite is specifically calibrated for high-surface grip and impact mitigation. Engineered under strict SNKRS Lab protocols.
                   </p>
                </div>
            </div>
          </div>

          {/* Right Column - Deep Dive */}
          <div className="flex flex-col gap-10">
            {details.map((detail, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="group flex gap-8 items-start hover:bg-white/[0.02] p-6 -m-6 rounded-3xl transition-colors"
              >
                <div className="text-[10px] font-black text-malachite/40 tracking-widest mt-2">{detail.id}</div>
                <div>
                   <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-4 group-hover:text-malachite transition-colors">{detail.title}</h3>
                   <p className="text-neutral-500 text-sm font-light leading-relaxed">{detail.desc}</p>
                </div>
              </motion.div>
            ))}

            <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between text-[10px] font-black tracking-widest text-white/20 uppercase">
              <span>Ref-Code: PJ2026-MAL-PHN</span>
              <span>Updated: 28.03.2026</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TechnicalRefinementOverlay;
