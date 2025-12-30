
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  path: string
) => {
  setMobileMenuOpen(false);

  if (path.includes('#')) {
    const [route, hash] = path.split('#');
    const targetRoute = route || '/';
    const isSamePage = location.pathname === targetRoute;

    if (isSamePage) {
      e.preventDefault();

      // ⏱️ Wait for mobile menu animation to finish
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 350); // must match animation duration
    }
  }
};

  // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  //   setMobileMenuOpen(false);
    
  //   if (path.includes('#')) {
  //     const [route, hash] = path.split('#');
  //     const targetRoute = route || '/';
  //     const isSamePage = location.pathname === targetRoute;

  //     if (isSamePage) {
  //       e.preventDefault();
  //       const element = document.getElementById(hash);
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }
  //   }
  // };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 glass border-b border-slate-800 shadow-2xl' : 'py-10 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={(e) => handleLinkClick(e as any, '/')}
          className="text-3xl font-heading font-extrabold tracking-tighter flex items-center group"
        >
          <motion.span 
            whileHover={{ rotate: 360 }}
            className="bg-cyan-500 text-slate-950 w-10 h-10 flex items-center justify-center rounded-xl mr-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            U
          </motion.span>
          <span className="text-white">PLIFTR</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-12">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleLinkClick(e as any, link.path)}
              className={`text-xs font-bold transition-all uppercase tracking-[0.2em] relative group ${
                location.pathname === link.path ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
          <Link 
            to="/#contact"
            onClick={(e) => handleLinkClick(e as any, '/#contact')}
            className="bg-white text-slate-950 px-8 py-3 rounded-full font-bold text-xs hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-white/10 uppercase tracking-widest"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white text-2xl"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 p-8 flex flex-col space-y-6 overflow-hidden"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleLinkClick(e as any, link.path)}
                className="text-xl font-heading font-bold text-white hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
