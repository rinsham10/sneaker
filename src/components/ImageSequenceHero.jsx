import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValue, animate } from 'framer-motion';

const ImageSequenceHero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const frameIndexValue = useMotionValue(0);
  const frameCount = 240;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Milestones: Title (0), Clear (1), Features (2), Heel (3), Grip (4)
  const milestones = [0, 10, 110, 180, 239];

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIndex = String(i).padStart(3, '0');
        img.src = `${import.meta.env.BASE_URL}images/herosection/ezgif-frame-${frameIndex}.png`;
        img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) {
                setImages(loadedImages);
                setLoading(false);
                renderFrame(0);
            }
        };
        img.onerror = () => loadedCount++;
        loadedImages[i-1] = img;
    }
  }, []);

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;
    const ctx = canvas.getContext('2d');
    const img = images[index];
    
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, x, y;

    // Smart Fitting: On desktop (landscape) we use a version of cover/fill.
    // On mobile (portrait), we strictly use 'contain' to prevent the shoe from being "very enlarged" and losing quality.
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isPortrait) {
        // MOBILE PORTRAIT: Fit to width with padding
        drawWidth = canvas.width * 0.9; // 90% of screen width for elegance
        drawHeight = drawWidth / imgRatio;
        x = (canvas.width - drawWidth) / 2;
        y = (canvas.height - drawHeight) / 2;
    } else {
        // DESKTOP LANDSCAPE: Fit to height or width
        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            x = 0;
            y = (canvas.height - drawHeight) / 2;
        } else {
            drawHeight = canvas.height * 0.8; // Give some vertical breathing room
            drawWidth = drawHeight * imgRatio;
            x = (canvas.width - drawWidth) / 2;
            y = (canvas.height - drawHeight) / 2;
        }
    }
    
    // VIRTUAL CROP: We zoom in slightly (5%) to hide watermarks in the corners
    const cropAmount = 0.05; // 5% crop from each edge
    const sx = img.width * cropAmount;
    const sy = img.height * cropAmount;
    const sWidth = img.width * (1 - cropAmount * 2);
    const sHeight = img.height * (1 - cropAmount * 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // High-quality interpolation for mobile stretching
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Using 9-parameter drawImage for real-time cropping:
    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, drawWidth, drawHeight);
  };

  useEffect(() => {
    const unsubscribe = frameIndexValue.on("change", (latest) => {
        renderFrame(Math.round(latest));
    });
    return () => unsubscribe();
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // Use devicePixelRatio for crispness on mobile (Retina display)
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        renderFrame(Math.round(frameIndexValue.get()));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  // Section Tracking based on scroll segments
  useEffect(() => {
    if (loading) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
        // We have 5 sections. Latest is 0 to 1. 
        // We trigger the change earlier to make it feel extremely responsive.
        const section = Math.min(milestones.length - 1, Math.floor((latest + 0.1) * 4));
        if (section !== currentSection) {
            setCurrentSection(section);
            animate(frameIndexValue, milestones[section], {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1] // Custom snappy curve
            });
        }
    });
    return () => unsubscribe();
  }, [loading, currentSection, scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-black snap-y snap-mandatory">
      <div className="sticky top-0 w-full h-screen overflow-hidden z-30 pointer-events-none">
        
        {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black pointer-events-auto">
                <div className="text-white text-[10px] tracking-[1em] font-black uppercase mb-4">Hyper Processing</div>
                <div className="w-32 h-[1px] bg-white/10 relative">
                   <motion.div className="absolute inset-y-0 left-0 bg-malachite shadow-[0_0_10px_#00875a]" animate={{ width: `${loadProgress}%` }} />
                </div>
            </div>
        )}

        <div className="absolute inset-0 z-10 bg-black">
           <canvas ref={canvasRef} className="w-full h-full block object-cover" />
        </div>

        {!loading && (
          <div className="relative z-20 w-full h-full flex items-center justify-center px-4 md:px-6">
            
            {/* 0. Title */}
            <motion.div 
               animate={{ opacity: currentSection === 0 ? 1 : 0, scale: currentSection === 0 ? 1 : 0.95 }} 
               className="text-center transition-all duration-300 pointer-events-none"
            >
                <h1 className="text-[18vw] md:text-[12vw] font-black leading-none text-white tracking-tighter text-glow">DUNK <span className="opacity-30">LOW</span></h1>
                <p className="text-malachite text-[8px] md:text-[10px] tracking-[0.8em] font-black uppercase mt-4 md:mt-8 animate-pulse italic">start</p>
            </motion.div>

            {/* 2. Feature Stagger (Milestone 2) */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between pointer-events-none p-8 md:p-12 lg:p-24 overflow-hidden">
                <motion.div 
                   animate={{ opacity: currentSection === 2 ? 1 : 0, y: currentSection === 2 ? 0 : -30 }} 
                   className="transition-all duration-500 text-center md:text-left mt-12 md:mt-0"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">SUEDE</h2>
                    <div className="h-1 bg-malachite w-12 md:w-16 mx-auto md:ml-0 mt-2" />
                </motion.div>
                <motion.div 
                   animate={{ opacity: currentSection === 2 ? 1 : 0, y: currentSection === 2 ? 0 : 30 }} 
                   className="transition-all duration-500 text-center md:text-right mb-12 md:mb-0"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">REACTIVE</h2>
                    <div className="h-1 bg-white w-12 md:w-16 mx-auto md:mr-0 mt-2" />
                </motion.div>
            </div>

            {/* 3. Heel Concentration (Milestone 3) - Shifted to bottom edge */}
            <motion.div 
               animate={{ opacity: currentSection === 3 ? 1 : 0, y: currentSection === 3 ? 0 : 50 }} 
               className="absolute bottom-8 md:bottom-20 text-center w-full px-6 transition-all duration-500 pointer-events-none"
            >
                <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black text-white italic tracking-tighter text-glow underline decoration-malachite decoration-4 underline-offset-8 uppercase">THE HEEL.</h2>
            </motion.div>
            
            {/* 4. Grip Final (Milestone 4) */}
            <motion.div 
               animate={{ opacity: currentSection === 4 ? 1 : 0, scale: currentSection === 4 ? 1 : 1.05 }} 
               className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md gap-4 md:gap-8 transition-all duration-500 pointer-events-none"
            >
                <h2 className="text-6xl sm:text-8xl md:text-[15vw] font-black text-white italic tracking-tighter mix-blend-overlay opacity-30 uppercase">GRIP</h2>
                <div className="px-8 py-4 md:px-16 md:py-8 border-2 md:border-4 border-white backdrop-blur-lg">
                   <h2 className="text-2xl sm:text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter">MAX TRACTION</h2>
                </div>
                <div className="text-malachite text-[8px] md:text-[10px] tracking-[0.8em] font-black uppercase mt-4 animate-pulse">Refinement Complete</div>
            </motion.div>

          </div>
        )}
      </div>

      {/* Extreme Sensitivity Snap Points */}
      <div className="h-[60vh] w-full snap-start" /> {/* 0: Initial */}
      <div className="h-[60vh] w-full snap-start" /> {/* 1: Clear Text */}
      <div className="h-[60vh] w-full snap-start" /> {/* 2: Features */}
      <div className="h-[60vh] w-full snap-start" /> {/* 3: Heel */}
      <div className="h-[60vh] w-full snap-start" /> {/* 4: Grip */}

    </section>
  );
};

export default ImageSequenceHero;
