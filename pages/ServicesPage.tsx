
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const ServiceSection: React.FC<{ service: typeof SERVICES[0], idx: number }> = ({ service, idx }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the visual element
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Framer Motion Variants for Staggered Reveal
  // Explicitly typing variants to avoid inference issues
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Fixed easing type by using standard string values to satisfy Framer Motion's Easing type in Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Fixed easing type by using standard string values to satisfy Framer Motion's Easing type in Variants
  const maskVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24 py-40 border-b border-slate-900/50 last:border-0`}
    >
      {/* Content Side */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="lg:w-1/2 space-y-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-4 text-cyan-400"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-950/30 flex items-center justify-center border border-cyan-500/20 text-sm">
            <i className={`fa-solid ${service.icon}`}></i>
          </div>
          <span className="font-bold tracking-[0.4em] text-[10px] uppercase">Service 0{idx + 1}</span>
        </motion.div>

        <div className="space-y-6">
          <div className="overflow-hidden">
            <motion.h2
              variants={maskVariants}
              className="text-5xl md:text-7xl font-heading font-black text-white leading-[0.9] tracking-tighter"
            >
              {service.title}
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.p
              variants={maskVariants}
              className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-xl font-light"
            >
              {service.shortDescription}
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 py-4"
        >
          {service.features.map((feature, fIdx) => (
            <div key={fIdx} className="flex items-center gap-4 text-slate-300 group/item">
              <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover/item:scale-150 transition-transform"></div>
              <span className="text-sm font-medium tracking-wide opacity-80 group-hover/item:opacity-100 transition-opacity">{feature}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="pt-4"
        >
          <Link
            to={`/services/${service.id}`}
            className="group relative inline-flex items-center gap-4 text-white font-bold tracking-[0.2em] text-xs uppercase"
          >
            <span className="relative z-10">Dive into {service.title}</span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500">
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </div>
            <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-cyan-500/50 group-hover:w-full transition-all duration-700"></div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Media Side */}
      <div className="lg:w-1/2 relative w-full h-full">
        <motion.div 
          style={{ y: smoothY }}
          className="relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900 shadow-2xl z-10"
        >
          <motion.img
            src={service.image}
            alt={service.title}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full object-cover grayscale-[0.4] hover:grayscale-0 transition-all duration-1000 aspect-[4/3] lg:aspect-[16/10]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>
        
        {/* Abstract Glow */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0"
        />
      </div>
    </motion.div>
  );
};

const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-48 pb-24 bg-slate-950 min-h-screen selection:bg-cyan-500/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-40 text-center"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cyan-500 font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block"
          >
            Our Expertise
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-heading font-black mb-12 leading-[0.85] tracking-tighter">
            IMPACT THROUGH <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">INNOVATION</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light opacity-80">
            We architect digital identities that resonate. Our process combines 
            cinematic artistry with analytical precision to drive exponential growth.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-800 to-transparent hidden lg:block" />
          
          <div className="space-y-0">
            {SERVICES.map((service, idx) => (
              <ServiceSection key={service.id} service={service} idx={idx} />
            ))}
          </div>
        </div>

        {/* CTA Footer Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-40 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-slate-900/60 backdrop-blur-3xl p-16 md:p-32 rounded-[4rem] border border-white/5 text-center overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]"
            />
            
            <h2 className="text-5xl md:text-8xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
              READY TO <br />
              <span className="text-cyan-500">SCALE?</span>
            </h2>
            <p className="text-slate-400 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              Join the ranks of high-growth brands partnering with Upliftr to define the future of digital commerce.
            </p>
            <Link 
              to="/#contact" 
              className="group relative inline-flex items-center justify-center px-16 py-6 rounded-full bg-white text-slate-950 font-bold text-xl hover:bg-cyan-400 transition-all duration-500 shadow-2xl shadow-cyan-500/10"
            >
              <span className="relative z-10 flex items-center gap-3">
                LET'S TALK <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
