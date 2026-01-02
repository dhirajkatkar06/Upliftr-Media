
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     // Ensure the video is muted for autoplay compliance
  //     videoRef.current.defaultMuted = true;
  //     videoRef.current.muted = true;
  //     videoRef.current.play().catch(error => {
  //       console.warn("Autoplay was prevented:", error);
  //     });
  //   }
  // }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(err => {
        console.warn("Video autoplay blocked:", err);
      });
    };

    video.addEventListener("loadedmetadata", playVideo);

    return () => {
      video.removeEventListener("loadedmetadata", playVideo);
    };
  }, []);


  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Cinematic Agency Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          // autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover brightness-[0.35] contrast-[1.15] saturate-[1.1]"
          // poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000"
        >
          {/* Stable Creative Agency Video Link */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Screenshot-matched gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
      </div>

      {/* Decorative Glows */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        style={{ y: -y1 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-[10px] font-bold tracking-[0.4em] uppercase bg-cyan-950/20 backdrop-blur-md">
              Elevate Your Brand
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-[130px] font-heading font-black leading-[0.85] mb-10 tracking-tighter">
            <span className="text-white">UPLIFTR</span> <br />
            <span className="text-cyan-500 inline-block mt-2">Media</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-200 text-lg md:text-xl font-light mb-12 leading-relaxed opacity-80">
            Where bold creativity meets <br className="hidden md:block" />
            measurable brand growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-lg transition-all hover:bg-cyan-500 shadow-2xl shadow-cyan-500/30"
            >
              <span className="relative z-10">View Our Work</span>
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border border-white/20 hover:border-cyan-400 text-white px-12 py-5 rounded-full font-bold text-lg transition-all bg-white/5 backdrop-blur-md hover:bg-white/10"
            >
              Our Services
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 cursor-pointer hover:text-cyan-400 transition-colors"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <i className="fa-solid fa-chevron-down text-2xl"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
