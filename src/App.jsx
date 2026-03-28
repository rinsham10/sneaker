import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechnicalRefinementOverlay from './components/TechnicalRefinementOverlay';
import ImageSequenceHero from './components/ImageSequenceHero';

function App() {
  const [showSpecs, setShowSpecs] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Body scroll lock
  React.useEffect(() => {
    if (showSpecs || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSpecs, isMenuOpen]);

  return (
    <div className="relative bg-[#0c0c0c] text-white scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/5">
        <span className="text-xl font-black tracking-tighter">NIKE</span>
        <div className="flex gap-4 md:gap-10 items-center">
          <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.3em] uppercase">
            <a href="#experience" className="hover:text-malachite transition-colors">Experience</a>
            <a href="#features" className="hover:text-malachite transition-colors">Features</a>
            <button 
              onClick={() => setShowSpecs(true)} 
              className="hover:text-malachite transition-colors uppercase cursor-pointer"
            >
              Specs
            </button>
          </div>
          
          <a 
            href="https://www.superkicks.in/products/nike-dunk-low-retro-phantom-malachite-gum-light-brown?variant=47137662271739" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block bg-white text-black px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-malachite hover:text-white transition-all"
          >
            Buy Now
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-12"
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white/50 text-[10px] tracking-widest uppercase font-black">Close</button>
              <a href="#experience" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic tracking-tighter hover:text-malachite transition-colors">EXPERIENCE</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic tracking-tighter hover:text-malachite transition-colors">FEATURES</a>
              <button 
                onClick={() => { setShowSpecs(true); setIsMenuOpen(false); }} 
                className="text-4xl font-black italic tracking-tighter hover:text-malachite transition-colors"
              >
                SPECS
              </button>
              <a 
                href="https://www.superkicks.in/products/nike-dunk-low-retro-phantom-malachite-gum-light-brown?variant=47137662271739"
                className="mt-8 bg-malachite text-white px-12 py-4 rounded-full text-xs font-black tracking-widest uppercase"
              >
                Buy Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <div id="experience">
        <ImageSequenceHero />
      </div>

      {/* Feature Narrative Section */}
      <section id="features" className="relative z-40 bg-[#0c0c0c] py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="text-malachite text-[10px] tracking-[0.6em] font-black uppercase mb-6">Material Science</div>
              <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none mb-10">
                BUILT BY <br/> 
                <span className="text-glow text-transparent bg-clip-text bg-gradient-to-r from-malachite to-white">PRECISION.</span>
              </h2>
              <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                The Phantom/Malachite edition is engineered for those who demand both aesthetic dominance and technical superiority. Every stitch is a testament to the Dunk's 40-year evolution.
              </p>
              
              <div className="mt-12 flex flex-col gap-6">
                {[
                  { label: "PRIMARY COLOR", value: "Phantom White" },
                  { label: "ACCENT TONE", value: "Malachite Green" },
                  { label: "RELEASE CODE", value: "SP-2026-F" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-neutral-400">
                    <div className="w-1.5 h-1.5 bg-malachite rounded-full shadow-[0_0_8px_#00875a]" />
                    <span className="opacity-40 uppercase">{stat.label}:</span>
                    <span className="text-white uppercase">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="grid grid-cols-2 gap-4"
            >
               <div className="aspect-[4/5] bg-neutral-900 rounded-2xl overflow-hidden relative group border border-white/5">
                  <div className="absolute inset-x-0 bottom-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                     <div className="text-[8px] font-black text-malachite tracking-widest mb-2 uppercase">Core 01</div>
                     <div className="text-white font-black text-xl italic uppercase">Suede</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  <img 
                    src="/images/featureimages/suede.png" 
                    alt="Nike Dunk Suede Detail"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
               </div>
               <div className="aspect-[4/5] bg-neutral-900 rounded-2xl overflow-hidden mt-12 relative group border border-white/5">
                  <div className="absolute inset-x-0 bottom-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                     <div className="text-[8px] font-black text-malachite tracking-widest mb-2 uppercase">Core 02</div>
                     <div className="text-white font-black text-xl italic uppercase">Foam</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  <img 
                    src="/images/featureimages/foam.png" 
                    alt="Nike Dunk Foam Detail"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Technical Feature Grid */}
      <section id="specs" className="bg-black py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-malachite/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-5xl font-black text-white italic tracking-tighter">TECHNICAL <br/><span className="text-malachite">REFINEMENT.</span></h2>
            <div className="h-[1px] flex-grow bg-white/10 mx-12 hidden md:block" />
            <p className="max-w-xs text-neutral-500 text-sm font-light">Performance meets heritage in every component of the Dunk Low Architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "VINTAGE SUEDE", 
                desc: "Premium long-hair suede overlays providing a heritage texture and exceptional durability across high-contact zones.",
                icon: "✦"
              },
              { 
                title: "REACTIVE FOAM", 
                desc: "Dual-density cushioning system engineered for elite impact protection and all-day stability during rapid movement.",
                icon: "⚡"
              },
              { 
                title: "GRIP MAX", 
                desc: "Re-engineered rubber outsole pattern maximizing multidirectional surface traction on modern urban environments.",
                icon: "◈"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 bg-neutral-900/40 border border-white/5 rounded-[2rem] hover:border-malachite/30 transition-all duration-500 backdrop-blur-sm group"
              >
                <div className="text-3xl mb-8 group-hover:scale-125 transition-transform origin-left text-malachite">{feature.icon}</div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 uppercase">{feature.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
               <span className="text-3xl font-black tracking-tighter text-white italic mb-4">NIKE <span className="text-malachite">DUNK.</span></span>
               <div className="flex gap-8 text-[10px] font-black tracking-[0.3em] uppercase text-neutral-600">
                  <a href="#" className="hover:text-malachite transition-colors">Privacy</a>
                  <a href="#" className="hover:text-malachite transition-colors">Legal</a>
                  <a href="#" className="hover:text-malachite transition-colors">Cookies</a>
               </div>
            </div>

               <div className="flex flex-col items-center gap-6">
                  <div className="text-white text-xs font-bold tracking-widest uppercase mb-2">Ready to Upgrade?</div>
                  <a 
                    href="https://www.superkicks.in/products/nike-dunk-low-retro-phantom-malachite-gum-light-brown?variant=47137662271739"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-malachite text-white font-black text-xs tracking-[0.2em] px-12 py-5 rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_20px_#00875a]"
                  >
                    BUY NOW · SUPERKICKS
                  </a>
               </div>
          </div>

          <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black tracking-[0.4em] uppercase text-neutral-700 gap-6">
            <p>© 2026 NIKE INC. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-12">
               <a href="https://www.instagram.com/nike/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
               <a href="https://twitter.com/Nike" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
               <a href="https://www.nike.com/in/launch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SNKRS App</a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showSpecs && (
          <TechnicalRefinementOverlay onClose={() => setShowSpecs(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
