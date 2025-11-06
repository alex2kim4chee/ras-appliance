
import React from 'react';
import { useModal } from '../App';
import { CONTACT } from '../constants';
import { FaPhoneAlt, FaWrench } from 'react-icons/fa';

const StickyMobileCTA: React.FC = () => {
  const { openModal } = useModal();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-blue/95 backdrop-blur-sm shadow-lg z-40 p-2 border-t border-brand-orange/50">
      <div className="flex justify-around items-center gap-2">
        <button 
          onClick={openModal} 
          className="flex-1 flex items-center justify-center gap-2 bg-brand-orange text-white text-lg font-bold py-3 px-4 rounded-md transition-all duration-300 active:bg-brand-orange-dark"
        >
          <FaWrench />
          <span>Request Service</span>
        </button>
        <a 
          href={CONTACT.PHONE_TEL}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-brand-blue text-lg font-bold py-3 px-4 rounded-md transition-all duration-300 active:bg-gray-200"
        >
          <FaPhoneAlt />
          <span>Call Now</span>
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
