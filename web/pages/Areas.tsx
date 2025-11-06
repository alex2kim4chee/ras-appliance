
import React from 'react';
import { SERVICE_AREAS, CONTACT } from '../constants';
import SEO from '../components/SEO';
import { useModal } from '../App';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Areas: React.FC = () => {
    const { openModal } = useModal();
  return (
    <>
    <SEO 
        title="Service Areas | Brooklyn & Manhattan Appliance Repair"
        description="We proudly provide expert appliance repair services throughout Brooklyn and Manhattan, including Williamsburg, Park Slope, the Upper East Side, and more."
    />
     <div className="bg-brand-light">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <FaMapMarkerAlt className="mx-auto h-12 w-12 text-brand-orange" />
          <h1 className="mt-4 text-4xl font-extrabold text-brand-blue sm:text-5xl">Serving Brooklyn & Manhattan</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Our licensed technicians are local, ensuring prompt and reliable service across New York City's key boroughs.
          </p>
        </div>
      </div>
    </div>

    <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Brooklyn */}
                <div className="p-8 bg-white rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-3xl font-bold text-brand-blue">Brooklyn, NY</h2>
                    <p className="mt-2 text-gray-600">From historic brownstones to modern high-rises, we are the trusted appliance repair choice for homeowners across Brooklyn. Some of the neighborhoods we frequently serve include:</p>
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {SERVICE_AREAS.brooklyn.map(area => (
                            <span key={area} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{area}</span>
                        ))}
                         <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">And more...</span>
                    </div>
                </div>

                {/* Manhattan */}
                <div className="p-8 bg-white rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-3xl font-bold text-brand-blue">Manhattan, NY</h2>
                    <p className="mt-2 text-gray-600">We provide expert service for high-end appliances in Manhattan, understanding the unique needs of city living. Our technicians are dispatched throughout:</p>
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {SERVICE_AREAS.manhattan.map(area => (
                            <span key={area} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{area}</span>
                        ))}
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">And more...</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-20 text-center bg-brand-orange text-white p-10 rounded-lg">
                <h2 className="text-3xl font-extrabold">Ready for Service in Your Area?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg">
                    Schedule a visit from our friendly, professional technicians today.
                </p>
                <div className="mt-8">
                    <button onClick={openModal} className="inline-block bg-white text-brand-blue font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors">
                        Book Online Now
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Areas;
