
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, SERVICE_AREAS, PREMIUM_BRANDS } from '../constants';
import { FaPhoneAlt, FaMapMarkerAlt, FaYelp } from 'react-icons/fa';

const Footer: React.FC = () => {
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Brands', path: '/brands' },
        { name: 'Areas', path: '/areas' },
        { name: 'Reviews', path: '/reviews' },
        { name: 'Payments', path: '/payments' },
        { name: 'Contact', path: '/contact' },
    ];
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-orange">Residential Appliance Services</h3>
            <p className="text-gray-300">Your trusted local experts for premium appliance repair.</p>
            <div className="space-y-2">
              <a href={CONTACT.PHONE_TEL} className="flex items-center gap-3 hover:text-brand-orange transition-colors">
                <FaPhoneAlt className="text-brand-orange" />
                <span>{CONTACT.PHONE}</span>
              </a>
              <p className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-brand-orange mt-1 flex-shrink-0" />
                <span>{CONTACT.ADDRESS}</span>
              </p>
               <a href={CONTACT.YELP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-orange transition-colors">
                <FaYelp className="text-brand-orange" />
                <span>Find us on Yelp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(link => (
                  <li key={link.path}>
                      <Link to={link.path} className="text-base text-gray-300 hover:text-white">{link.name}</Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase">Service Areas</h3>
            <div className="mt-4 space-y-4">
                <div>
                    <h4 className="font-bold">Brooklyn, NY</h4>
                    <p className="text-sm text-gray-400">{SERVICE_AREAS.brooklyn.slice(0, 4).join(', ')} & more</p>
                </div>
                 <div>
                    <h4 className="font-bold">Manhattan, NY</h4>
                    <p className="text-sm text-gray-400">{SERVICE_AREAS.manhattan.slice(0, 4).join(', ')} & more</p>
                </div>
            </div>
          </div>
          
          {/* Brands */}
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase">We Service</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {PREMIUM_BRANDS.map(brand => (
                <span key={brand.name} className="text-gray-300">{brand.name}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-base text-gray-400">
          <p>&copy; {new Date().getFullYear()} Residential Appliance Services. All Rights Reserved.</p>
          <p className="text-sm mt-1">
            Website by{' '}
            <a
              href="https://pecanstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:text-white transition-colors"
            >
              Pecan Studio Web Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
