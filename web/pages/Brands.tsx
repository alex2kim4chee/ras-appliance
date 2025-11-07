
import React from 'react';
import { BRANDS_DATA, PREMIUM_BRANDS } from '../constants';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const Brands: React.FC = () => {
  return (
    <>
    <SEO 
      title="Brands We Service | Sub-Zero, Wolf, Bosch, Miele"
      description="We are specialists in repairing premium appliance brands including Sub-Zero, Wolf, Bosch, Miele, Liebherr, and more across Brooklyn and Manhattan."
    />
     <div className="bg-brand-light">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-brand-blue sm:text-5xl">Premium Brand Specialists</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            We have extensive experience and training with the world's leading appliance manufacturers. We service all brands for ovens and stoves.
          </p>
        </div>
      </div>
    </div>

    <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
                {BRANDS_DATA.map(brand => (
                    <div key={brand.name} className="p-8 bg-white rounded-lg shadow-md border border-gray-100 grid md:grid-cols-3 gap-8 items-center">
                        <div className="flex justify-center md:justify-start">
                             <img
                                loading="lazy"
                                className="h-12 w-auto object-contain"
                                src={brand.logoUrl}
                                alt={`${brand.name} logo`}
                             />
                        </div>
                        <div className="md:col-span-2">
                             <h2 className="text-2xl font-bold text-brand-blue">{brand.name} Appliance Repair</h2>
                             <p className="mt-2 text-gray-600">{brand.description}</p>
                             <div className="mt-4">
                                <p className="font-semibold text-gray-800">We service:</p>
                                <p className="text-gray-600">{brand.services.join(', ')}</p>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 text-center bg-blue-50 p-10 rounded-lg">
                <h2 className="text-3xl font-bold text-brand-blue">All Major Oven & Stove Brands</h2>
                 <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                    In addition to our premium specializations, our expert technicians are equipped to service ovens, stoves, and cooktops from ALL major brands, including Wolf, Viking, Bosch, GE, Frigidaire, Thermador, LG, Samsung, Electrolux, Miele, and BlueStar.
                </p>
                <div className="mt-6">
                    <Link to="/services/oven" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-md hover:bg-brand-orange-dark transition-colors">
                        Request Oven Repair
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Brands;
