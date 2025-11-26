
import React from 'react';
import SEO from '../components/SEO';
import { FaShieldAlt, FaCreditCard, FaQrcode } from 'react-icons/fa';
import { SiVenmo, SiZelle, SiSquare, SiPaypal } from 'react-icons/si';

interface PaymentCardProps {
  icon: React.ReactNode;
  name: string;
  details: string[];
  url?: string;
  qrCode?: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ icon, name, details, url, qrCode }) => (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
        <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl text-brand-blue flex-shrink-0">{icon}</div>
            <div className="flex-grow">
                <h3 className="text-2xl font-bold text-brand-blue">{name}</h3>
                <div className="mt-3 space-y-2">
                    {details.map((detail, index) => (
                        <p key={index} className="text-gray-700">{detail}</p>
                    ))}
                </div>
                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-brand-blue hover:text-brand-orange font-semibold underline"
                    >
                        Open Link →
                    </a>
                )}
            </div>
        </div>
        {qrCode && (
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <FaQrcode className="text-brand-orange" />
                    <span className="text-sm font-semibold text-gray-600">Scan QR Code</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                    <img
                        src={qrCode}
                        alt={`${name} QR Code`}
                        className="w-48 h-48 object-contain"
                    />
                </div>
            </div>
        )}
    </div>
);


const Payments: React.FC = () => {
  return (
    <>
      <SEO
        title="Payment Options | Residential Appliance Services"
        description="We offer secure and convenient payment options including Square, Venmo, Zelle, and PayPal. Pay your invoice easily."
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Venmo */}
            <PaymentCard
              icon={<SiVenmo />}
              name="Venmo"
              details={[
                'Phone: (347) 407-1064',
                'Username: @Ilyakurach'
              ]}
              url="https://venmo.com/u/Ilyakurach"
              qrCode="/payments/venmoQR.jpg"
            />

            {/* Zelle */}
            <PaymentCard
              icon={<SiZelle />}
              name="Zelle"
              details={[
                'Phone: (929) 301-0033',
                'Recipient: Unified Step Corp'
              ]}
              qrCode="/payments/zelleQR.jpg"
            />

            {/* PayPal */}
            <PaymentCard
              icon={<SiPaypal />}
              name="PayPal"
              details={[
                'Username: @ILYAKURACH'
              ]}
              qrCode="/payments/paypalQR.jpg"
            />

            {/* Square */}
            <PaymentCard
              icon={<SiSquare />}
              name="Square"
              details={[
                'Pay with any major credit card',
                'Fast and secure checkout'
              ]}
              url="https://square.link/u/MCAjUYGv"
            />
          </div>

          <div className="mt-12 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-start gap-4">
            <FaShieldAlt className="h-10 w-10 text-green-600 flex-shrink-0 mt-1" />
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
