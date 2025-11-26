
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useModal } from '../App';
import { CONTACT } from '../constants';
import { FaPhoneAlt, FaWrench, FaBars, FaTimes, FaClock } from 'react-icons/fa';

const Header: React.FC = () => {
  const { openModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Brands', path: '/brands' },
    { name: 'Areas', path: '/areas' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Payments', path: '/payments' },
    { name: 'Contact', path: '/contact' },
  ];

  const linkClass = "text-white hover:text-brand-orange transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClass = "text-brand-orange bg-white/10";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-blue shadow-lg' : 'bg-brand-blue/90'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex flex-col leading-tight">
              <span className="text-white text-lg md:text-xl lg:text-2xl font-bold">Residential Appliance Services</span>
              <span className="text-brand-orange text-xs md:text-sm lg:text-base font-semibold">FixbyRAS<span className="text-white">.</span></span>
              {/* Business Hours under logo */}
              <div className="flex items-center text-white/70 text-xs mt-1">
                <FaClock className="mr-1.5 text-brand-orange" size={10} />
                <span>{CONTACT.BUSINESS_HOURS.WEEKDAY} • {CONTACT.BUSINESS_HOURS.WEEKEND}</span>
              </div>
            </NavLink>
          </div>

          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <NavLink key={link.name} to={link.path} className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-2">
             <a href={CONTACT.PHONE_TEL} className="flex items-center gap-2 bg-transparent border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold py-2 px-4 rounded-md transition-all duration-300">
              <FaPhoneAlt />
              <span>Call Now</span>
            </a>
            <button onClick={openModal} className="flex items-center gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold py-2 px-4 rounded-md transition-all duration-300">
              <FaWrench />
              <span>Request Service</span>
            </button>
          </div>
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-brand-orange focus:outline-none">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
       {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-blue-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navLinks.map(link => (
                <NavLink key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${linkClass} ${isActive ? activeLinkClass : ''}`}>
                  {link.name}
                </NavLink>
              ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
             {/* Business Hours - Mobile */}
             <div className="flex items-center justify-center text-white/90 text-sm mb-4 px-4">
               <FaClock className="mr-2 text-brand-orange" />
               <div className="flex flex-col leading-tight text-center">
                 <span>{CONTACT.BUSINESS_HOURS.WEEKDAY}</span>
                 <span>{CONTACT.BUSINESS_HOURS.WEEKEND}</span>
               </div>
             </div>
             <div className="flex flex-col items-center space-y-3 px-2">
                <a href={CONTACT.PHONE_TEL} className="w-full text-center flex items-center justify-center gap-2 bg-transparent border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold py-3 px-4 rounded-md transition-all duration-300">
                    <FaPhoneAlt />
                    <span>Call Now</span>
                </a>
                <button onClick={() => { openModal(); setIsMobileMenuOpen(false); }} className="w-full text-center flex items-center justify-center gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold py-3 px-4 rounded-md transition-all duration-300">
                    <FaWrench />
                    <span>Request Service</span>
                </button>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
