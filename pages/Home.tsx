
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import ContactForm from "../components/ContactForm";


const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="w-full relative">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 origin-left z-[110] shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        style={{ scaleX }}
      />

      <Hero />

      {/* Services Section with Reversible Animations */}
      <section id="services" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="max-w-2xl"
            >
              <h2 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-none">
                WHAT WE <br /> <span className="text-cyan-500">DELIVER</span>
              </h2>
              <p className="text-slate-400 text-xl">
                We bridge the gap between imagination and reality with cutting-edge marketing strategies and cinematic visuals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-slate-800 hover:bg-white hover:text-slate-950 px-8 py-4 rounded-full font-bold transition-all inline-block border border-slate-700"
              >
                BOOK A CONSULTATION
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 100, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: false, amount: 0.1 }}
                className="group relative bg-slate-800/50 p-10 rounded-[2.5rem] border border-slate-700/50 hover:border-cyan-500 transition-all duration-500 hover:-translate-y-4 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <i className={`fa-solid ${service.icon} text-9xl`}></i>
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-lg shadow-cyan-500/20">
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                
                <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">{service.shortDescription}</p>
                
                <Link 
                  to={`/services/${service.id}`}
                  className="inline-flex items-center text-sm font-bold tracking-widest text-white group-hover:text-cyan-400"
                >
                  LEARN MORE <i className="fa-solid fa-arrow-right-long ml-3 transform group-hover:translate-x-2 transition-transform"></i>
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Portfolio />

      {/* Why Us Section with Reversible Stats */}
      <section className="py-32 bg-slate-950 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1 }}
            >
              <span className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-sm mb-6 block">Why Upliftr</span>
              <h2 className="text-5xl md:text-8xl font-heading font-black mb-8 leading-[0.9]">
                DRIVEN BY <br /> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">RESULTS</span>
              </h2>
              <div className="space-y-12">
                {[
                  { title: 'Data-Centric Strategy', text: 'We analyze market trends to ensure your content hits the right audience at the right time.', icon: 'fa-chart-pie' },
                  { title: 'Premium Production', text: 'Our cinematic approach to reels and static posts sets you apart from the clutter.', icon: 'fa-film' },
                  { title: 'Growth Guaranteed', text: 'Performance marketing tailored for maximum ROI and scalable results.', icon: 'fa-rocket' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 text-xl group hover:bg-cyan-500 hover:text-slate-950 transition-colors">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white text-2xl mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { val: '98%', label: 'Retention Rate', color: 'bg-blue-600' },
                  { val: '50M+', label: 'Ad Impressions', color: 'bg-cyan-600' },
                  { val: '12+', label: 'Awards Won', color: 'bg-indigo-600' },
                  { val: '24/7', label: 'Client Support', color: 'bg-teal-600' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    whileHover={{ y: -15, scale: 1.05 }}
                    className={`p-10 rounded-[2rem] border border-slate-800/50 backdrop-blur-xl relative overflow-hidden group`}
                    style={{ background: 'rgba(30, 41, 59, 0.4)' }}
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
                    <h3 className="text-4xl md:text-5xl font-heading font-black text-white mb-2">{stat.val}</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-tighter text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] border border-slate-800 overflow-hidden flex flex-col lg:flex-row shadow-2xl"
          >
            <div className="lg:w-1/2 p-12 md:p-20">
              <h2 className="text-4xl md:text-6xl font-heading font-black mb-8">GET IN <span className="text-cyan-500">TOUCH</span></h2>
              <p className="text-slate-400 mb-12">Ready to take your brand to the next level? Drop us a message and we'll get back to you within 24 hours.</p>
              <ContactForm />
              {/* <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message Sent! We will reach out soon.'); }}>
                <div className="space-y-4">
                   <input required type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all text-white" />
                   <input required type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all text-white" />
                   <textarea required placeholder="Tell us about your project" rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all text-white"></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-900/20 transition-all active:scale-95"
                >
                  SEND ENQUIRY
                </button>
              </form> */}
            </div>
            
            <div className="lg:w-1/2 h-[400px] lg:h-auto grayscale contrast-125 border-l border-slate-800 relative">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d603585.377587306!2d72.77575274257797!3d18.93936541313739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c630d1bb39fb%3A0x503f9b93e9dce6!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 glass p-6 rounded-2xl border border-white/10">
                  <p className="text-white font-bold mb-1">Mumbai, Maharashtra</p>
                  <p className="text-slate-400 text-sm">India</p>
                </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
