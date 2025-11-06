
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  return (
    <>
    <SEO 
      title="Appliance Repair Services | Brooklyn & Manhattan" 
      description="We offer expert repair services for refrigerators, washers, dryers, dishwashers, ovens, and more. Specializing in premium brands."
    />
    <div className="bg-brand-light">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-brand-blue sm:text-5xl">Our Repair Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            We provide fast, reliable repairs for a wide range of home appliances. Click on an appliance to learn more.
          </p>
        </div>
      </div>
    </div>
    <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map(service => (
                    <div key={service.id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="p-8 flex-grow">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-orange/10 mx-auto">
                                <service.icon className="h-10 w-10 text-brand-orange" />
                            </div>
                            <h3 className="mt-6 text-2xl font-bold text-brand-blue text-center">{service.name} Repair</h3>
                            <p className="mt-4 text-base text-gray-600 text-center">{service.description}</p>
                        </div>
                        <div className="p-6 bg-gray-50">
                            <Link to={`/services/${service.id}`} className="block w-full text-center bg-brand-blue text-white font-bold py-3 px-6 rounded-md hover:bg-brand-blue-dark transition-colors">
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  );
};

export default Services;
