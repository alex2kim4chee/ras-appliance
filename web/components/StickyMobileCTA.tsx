
import React from 'react';
import { useModal } from '../App';
import { CONTACT } from '../constants';
import { FaPhoneAlt, FaWrench } from 'react-icons/fa';

const StickyMobileCTA: React.FC = () => {
  const { openModal } = useModal();
  
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-brand-blue/95 backdrop-blur-sm border-t border-brand-orange/50 shadow-lg px-3 py-2">
      <div className="mx-auto w-full max-w-md">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 rounded-md bg-brand-orange py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 active:bg-brand-orange-dark sm:text-base"
          >
            <FaWrench className="text-lg" />
            <span>Request Service</span>
          </button>
          <a
            href={CONTACT.PHONE_TEL}
            className="flex items-center justify-center gap-2 rounded-md bg-white py-3 text-sm font-bold uppercase tracking-wide text-brand-blue transition-all duration-300 active:bg-gray-200 sm:text-base"
          >
            <FaPhoneAlt className="text-lg" />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
