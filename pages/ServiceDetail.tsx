
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-heading font-bold mb-8">Service Not Found</h1>
        <Link to="/" className="text-cyan-400 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link to="/#services" className="text-cyan-500 font-bold mb-8 inline-block flex items-center gap-2 group">
            <i className="fa-solid fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> BACK TO SERVICES
          </Link>
          
          <div className="flex items-center gap-6 mb-10">
            <div className="w-20 h-20 bg-cyan-600/20 rounded-2xl flex items-center justify-center text-cyan-400 text-4xl border border-cyan-500/30">
              <i className={`fa-solid ${service.icon}`}></i>
            </div>
            <h1 className="text-4xl md:text-7xl font-heading font-black">{service.title}</h1>
          </div>

          <p className="text-2xl text-slate-300 font-light mb-16 leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="glass p-10 rounded-3xl border border-slate-800">
              <h3 className="text-2xl font-heading font-bold mb-8 text-white">What we offer</h3>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-slate-400">
                    <i className="fa-solid fa-check text-cyan-500 mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-blue-800 p-10 rounded-3xl text-white">
              <h3 className="text-2xl font-heading font-bold mb-4">Start your growth journey</h3>
              <p className="mb-8 opacity-80">Our experts are ready to build a customized {service.title} strategy for your brand.</p>
              <Link to="/#contact" className="inline-block bg-white text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all">
                Book a Consultation
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-16">
            <h3 className="text-2xl font-heading font-bold mb-10 text-center">More Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.filter(s => s.id !== id).slice(0, 4).map(s => (
                <Link 
                  key={s.id} 
                  to={`/services/${s.id}`}
                  className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-cyan-500 transition-all group"
                >
                  <i className={`fa-solid ${s.icon} text-cyan-500 mb-4 block`}></i>
                  <h4 className="font-bold group-hover:text-cyan-400 transition-colors">{s.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
