
import React, { useState, createContext, useContext, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ServiceFormModal from './components/ServiceFormModal';
import StickyMobileCTA from './components/StickyMobileCTA';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Brands from './pages/Brands';
import Areas from './pages/Areas';
import Reviews from './pages/Reviews';
import Payments from './pages/Payments';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const modalContextValue = { isModalOpen, openModal, closeModal };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <HashRouter>
        <ScrollToTop />
        <div className="bg-white text-brand-gray font-sans">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/areas" element={<Areas />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <StickyMobileCTA />
          <ServiceFormModal />
        </div>
      </HashRouter>
    </ModalContext.Provider>
  );
};

export default App;
