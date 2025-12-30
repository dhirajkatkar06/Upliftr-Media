
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  const handleHashLink = (e: React.MouseEvent, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="text-3xl font-heading font-extrabold tracking-tighter mb-6 block">
              <span className="bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-md mr-1">U</span>
              <span className="text-white">PLIFTR</span>
            </Link>
            <p className="text-slate-400 mb-8 max-w-xs">
              Transforming businesses through creative content and performance-driven marketing.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"><i className="fa-brands fa-tiktok"></i></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-6">SERVICES</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors font-bold">ALL SERVICES</Link></li>
              <li><Link to="/services/social-media" className="hover:text-cyan-400 transition-colors">Social Media Management</Link></li>
              <li><Link to="/services/production" className="hover:text-cyan-400 transition-colors">Production Shoot</Link></li>
              <li><Link to="/services/content-creation" className="hover:text-cyan-400 transition-colors">Content Creation</Link></li>
              <li><Link to="/services/performance-marketing" className="hover:text-cyan-400 transition-colors">Performance Marketing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-6">PAGES</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services Directory</Link></li>
              <li><Link to="/portfolio" className="hover:text-cyan-400 transition-colors">Our Portfolio</Link></li>
              <li><Link to="/#contact" onClick={(e) => handleHashLink(e, 'contact')} className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-6">CONTACT</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center"><i className="fa-solid fa-envelope mr-3 text-cyan-500"></i> hello@upliftr.agency</li>
              <li className="flex items-center"><i className="fa-solid fa-phone mr-3 text-cyan-500"></i> +91 97697 08255</li>
              <li className="flex items-start"><i className="fa-solid fa-location-dot mr-3 text-cyan-500 mt-1"></i> 976, Digital Heights,<br />Innovation Dr, NYC</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>© 2024 UPLIFTR DIGITAL AGENCY. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
