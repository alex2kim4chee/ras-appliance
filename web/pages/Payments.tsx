
import React from 'react';
import SEO from '../components/SEO';
import { FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { SiVenmo, SiZelle, SiSquare, SiBitcoin } from 'react-icons/si';

const PaymentOption: React.FC<{ icon: React.ReactNode, name: string, description: string, url: string }> = ({ icon, name, description, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100">
        <div className="flex items-center gap-4">
            <div className="text-4xl text-brand-blue">{icon}</div>
            <div>
                <h3 className="text-2xl font-bold text-brand-blue">{name}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    </a>
);


const Payments: React.FC = () => {
  return (
    <>
      <SEO
        title="Payment Options | Residential Appliance Services"
        description="We offer secure and convenient payment options including Square, Venmo, Zelle, and Crypto. Pay your invoice easily."
      />
      <div className="bg-brand-light">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaCreditCard className="mx-auto h-12 w-12 text-brand-orange" />
            <h1 className="mt-4 text-4xl font-extrabold text-brand-blue sm:text-5xl">Payment Options</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Secure, convenient payment methods for your peace of mind.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            <PaymentOption icon={<SiSquare />} name="Square" description="Pay with any major credit card." url="#" />
            <PaymentOption icon={<SiVenmo />} name="Venmo" description="Send payment via the Venmo app." url="#" />
            <PaymentOption icon={<SiZelle />} name="Zelle" description="Transfer funds directly from your bank." url="#" />
            <PaymentOption icon={<SiBitcoin />} name="Crypto" description="We accept major cryptocurrencies." url="#" />
          </div>
          <div className="mt-12 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center gap-4">
            <FaShieldAlt className="h-10 w-10 text-green-600 flex-shrink-0" />
            <div>
                <h3 className="text-xl font-bold text-green-800">Your Security is Our Priority</h3>
                <p className="mt-1 text-green-700">All digital transactions are processed through secure, encrypted platforms to protect your financial information.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
