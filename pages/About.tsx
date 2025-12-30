
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="pt-40 pb-24 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-cyan-500 font-bold tracking-[0.4em] text-xs mb-6 block uppercase">The Agency</span>
          <h1 className="text-5xl md:text-8xl font-heading font-black mb-12 leading-[0.9] tracking-tighter">
            WE ARE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 italic">CATALYST</span><br />
            FOR YOUR GROWTH.
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl font-light leading-relaxed mb-20 max-w-3xl">
            Founded with a simple mission: most brands have great products, but fail at storytelling. 
            We bridge that gap with a team of filmmakers, data scientists, and creative thinkers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden h-[600px] border border-white/5 shadow-2xl group bg-slate-900"
          >
            {/* Agency Life Background Video - Mixkit Asset */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-34444-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-xs font-bold tracking-widest uppercase mb-2 text-cyan-400">Our Workspace</p>
              <h4 className="text-2xl font-heading font-bold">CREATIVITY WITHOUT LIMITS</h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-heading font-black tracking-tight">OUR MISSION</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              To empower visionaries by providing the creative infrastructure needed to scale. 
              We don't just "post content"—we engineer experiences that provoke emotion and drive action.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-6">
              <div className="space-y-3">
                <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
                <h4 className="text-white font-bold text-lg">INTEGRITY</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Transparent reporting and honest strategy. We win when you win.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                <h4 className="text-white font-bold text-lg">INNOVATION</h4>
                <p className="text-slate-500 text-sm leading-relaxed">First to adopt, never a follower. We define trends before they hit the feed.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="py-20 border-t border-white/5">
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-20 text-center tracking-tighter">OUR PHILOSOPHY</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { num: '01', title: 'Deep Discovery', desc: 'We immerse ourselves in your brand DNA before sketching a single idea.' },
              { num: '02', title: 'Radical Creativity', desc: 'If it doesn\'t feel bold, it doesn\'t leave our studio. Safe is dangerous.' },
              { num: '03', title: 'Data Optimization', desc: 'Every pixel is tracked. We refine until your message is surgical.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-slate-900/40 p-12 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all duration-500"
              >
                <span className="text-7xl font-heading font-black text-slate-800/40 group-hover:text-cyan-500/20 mb-8 block transition-colors">{item.num}</span>
                <h3 className="text-2xl font-heading font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
