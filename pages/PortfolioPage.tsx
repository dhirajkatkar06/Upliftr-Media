
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PORTFOLIO } from '../constants';

const PortfolioGridItem: React.FC<{ item: typeof PORTFOLIO[0], idx: number }> = ({ item, idx }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isMounted = true;
    const playVideo = async () => {
      if (videoRef.current && isMounted) {
        try {
          const promise = videoRef.current.play();
          if (promise !== undefined) await promise;
        } catch (e: any) {
          if (e.name !== 'AbortError') console.warn("Portfolio video error", e);
        }
      }
    };
    playVideo();
    return () => { isMounted = false; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
      viewport={{ once: false, amount: 0.2 }}
      className="group relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl"
    >
      {item.video ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={item.image}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={item.video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={item.image}
          alt={item.client}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-12 z-20">
        <span className="text-cyan-500 text-xs font-bold tracking-widest mb-3 block uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{item.category}</span>
        <h3 className="text-3xl md:text-5xl font-heading font-black text-white mb-6 group-hover:text-cyan-400 transition-colors transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.client}</h3>
        
        <div className="flex flex-wrap gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
          <Link 
            to={`/portfolio/${item.id}`} 
            className="bg-white text-slate-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-cyan-400 transition-all shadow-xl"
          >
            VIEW CASE STUDY
          </Link>
          <Link 
            to="/#contact" 
            className="bg-slate-900/50 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold text-sm hover:bg-white hover:text-slate-950 transition-all"
          >
            INQUIRE SIMILAR
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-40 pb-24 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-cyan-500 font-bold tracking-[0.4em] uppercase text-sm mb-4 block underline decoration-2 underline-offset-8">Our Legacy</span>
          <h1 className="text-5xl md:text-8xl font-heading font-black mb-8 leading-none">THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">GALLERY</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Every brand has a story. We just make sure yours is the one everyone remembers. 
            Explore our curated collection of digital transformations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PORTFOLIO.map((item, idx) => (
            <PortfolioGridItem key={item.id} item={item} idx={idx} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center bg-slate-900 p-16 rounded-[4rem] border border-slate-800"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-8">HAVE A <span className="text-cyan-500">VISION?</span></h2>
          <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto">Let's turn your concept into a cinematic masterpiece. Our production team is ready.</p>
          <Link to="/#contact" className="inline-block bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/20">
            START YOUR PROJECT
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;
