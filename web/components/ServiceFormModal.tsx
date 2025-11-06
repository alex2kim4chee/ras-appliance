
import React, { useEffect } from 'react';
import { useModal } from '../App';
import ServiceForm from './ServiceForm';
import { FaTimes } from 'react-icons/fa';

const ServiceFormModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);
  
  if (!isModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
                <div>
                    <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-brand-blue">Request Service Online</h2>
                    <p className="mt-1 text-gray-600">Fill out the form and we'll call you to confirm.</p>
                </div>
                 <button 
                    onClick={closeModal} 
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close modal"
                >
                    <FaTimes size={24} />
                </button>
            </div>
            <div className="mt-6">
                <ServiceForm onSuccess={closeModal} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFormModal;
