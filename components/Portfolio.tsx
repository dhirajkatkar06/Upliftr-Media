
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { PORTFOLIO } from '../constants';

const PortfolioItem: React.FC<{ item: typeof PORTFOLIO[0], index: number }> = ({ item, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, []);

  const handleMouseEnter = () => {
    if (!item.video || item.video.trim() === "") return;
    videoRef.current?.play().catch(() => { });
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ amount: 0.2 }}
      onMouseEnter={handleMouseEnter}
      className="group relative h-[600px] rounded-[3rem] overflow-hidden bg-slate-900 cursor-pointer shadow-2xl border border-slate-800"
    >
      {item.video && item.video.trim() !== "" ? (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          poster={item.image}
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.5] group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-[1.5s] ease-out"
        >
          <source src={item.video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={item.image}
          alt={item.client}
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.5] group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-[1.5s] ease-out"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-12 z-20">
        <motion.span 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-cyan-500 text-sm font-bold tracking-[0.4em] mb-4 block uppercase"
        >
          {item.category}
        </motion.span>
        <h3 className="text-4xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors mb-6">{item.client}</h3>
        
        <div className="flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <Link to={`/portfolio/${item.id}`} className="bg-white text-slate-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-cyan-400 transition-colors">
            VIEW CASE STUDY
          </Link>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold text-sm hover:bg-white hover:text-slate-950 transition-colors"
          >
            INQUIRE
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="portfolio" className="py-32 bg-slate-950 relative overflow-hidden" ref={containerRef}>
      <motion.div 
        style={{ x }}
        className="absolute top-20 left-0 whitespace-nowrap opacity-[0.02] text-[20vw] font-black pointer-events-none uppercase leading-none"
      >
        CREATIVE PRODUCTION DIGITAL
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
          >
            <h2 className="text-6xl md:text-8xl font-heading font-black mb-6 tracking-tighter">OUR <span className="text-cyan-500">LEGACY</span></h2>
            <p className="text-slate-400 max-w-xl text-lg">A portfolio of brands we've helped scale through bold aesthetics and cinematic storytelling.</p>
          </motion.div>
          <Link 
            to="/portfolio"
            className="text-white font-bold border-b-2 border-cyan-500 pb-2 hover:text-cyan-400 transition-colors text-lg"
          >
            EXPLORE FULL PORTFOLIO
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PORTFOLIO.slice(0, 4).map((item, idx) => (
            <PortfolioItem key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
