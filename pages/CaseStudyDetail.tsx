
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PORTFOLIO } from '../constants';

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PORTFOLIO.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="pt-40 pb-20 text-center bg-slate-950 min-h-screen">
        <h1 className="text-4xl font-heading font-bold mb-8">Project Not Found</h1>
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
          className="max-w-5xl mx-auto"
        >
          <Link to="/#portfolio" className="text-cyan-500 font-bold mb-8 inline-block flex items-center gap-2 group">
            <i className="fa-solid fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> BACK TO PORTFOLIO
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-cyan-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">{project.category}</span>
              <h1 className="text-5xl md:text-8xl font-heading font-black leading-none">{project.client}</h1>
            </div>
          </div>

          <div className="rounded-[3rem] overflow-hidden bg-slate-900 border border-slate-800 mb-16 shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={project.image}
              className="w-full h-auto block"
            >
              <source src={project.video} type="video/mp4" />
            </video>
            
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h3 className="text-2xl font-heading font-bold mb-6 text-white uppercase tracking-wider">The Mission</h3>
                <p className="text-xl text-slate-400 font-light leading-relaxed">
                  {project.fullDescription}
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-cyan-500 font-bold mb-4 uppercase text-sm tracking-widest">The Challenge</h4>
                  <p className="text-slate-400 leading-relaxed">{project.challenge}</p>
                </div>
                <div>
                  <h4 className="text-cyan-500 font-bold mb-4 uppercase text-sm tracking-widest">The Solution</h4>
                  <p className="text-slate-400 leading-relaxed">{project.solution}</p>
                </div>
              </section>
            </div>

            <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 h-fit">
              <h3 className="text-2xl font-heading font-bold mb-8 text-white">Impact</h3>
              <ul className="space-y-6">
                {project.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-600 flex-shrink-0 flex items-center justify-center text-[10px] mt-1">
                      <i className="fa-solid fa-check text-white"></i>
                    </div>
                    <span className="text-slate-200 font-medium">{result}</span>
                  </li>
                ))}
              </ul>
              <Link to="/#contact" className="w-full inline-block text-center mt-12 bg-white text-slate-950 py-4 rounded-2xl font-bold hover:bg-cyan-400 transition-all shadow-xl">
                GET RESULTS LIKE THIS
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
