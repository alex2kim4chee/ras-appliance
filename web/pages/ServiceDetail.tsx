
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES, CONTACT } from '../constants';
import ServiceForm from '../components/ServiceForm';
import SEO from '../components/SEO';
import { FaPhoneAlt, FaWrench, FaCheckCircle } from 'react-icons/fa';

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES.find(s => s.id === serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": `${service.name} Repair`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Residential Appliance Services"
    },
    "areaServed": [
       {
        "@type": "City",
        "name": "Brooklyn"
      },
      {
        "@type": "City",
        "name": "Manhattan"
      }
    ],
    "description": service.description
  };


  return (
    <>
    <SEO 
      title={`${service.name} Repair | Brooklyn & Manhattan`} 
      description={`Expert ${service.name} repair in Brooklyn & Manhattan. We fix common issues like ${service.commonIssues.slice(0, 2).join(', ')}, and more. Call for same-day service.`}
      schema={serviceSchema}
    />
    <div className="bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
            <service.icon className="mx-auto h-16 w-16 text-brand-orange" />
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{service.name} Repair</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">{service.description}</p>
        </div>
    </div>

    <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-brand-blue">Common {service.name} Problems We Solve</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        If you're experiencing any of the following issues with your {service.name.toLowerCase()}, our expert technicians can help.
                    </p>
                    <ul className="mt-6 space-y-4">
                        {service.commonIssues.map((issue, index) => (
                             <li key={index} className="flex items-start">
                                <FaCheckCircle className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" />
                                <span className="ml-3 text-lg text-gray-700">{issue}</span>
                            </li>
                        ))}
                    </ul>
                     <div className="mt-12 p-6 bg-blue-50 border-l-4 border-brand-blue rounded-r-lg">
                        <h3 className="text-xl font-bold text-brand-blue">What to Check Before Calling</h3>
                        <p className="mt-2 text-gray-700">
                            Sometimes, simple issues can be resolved without a service call. Please ensure the appliance is plugged in securely and that the circuit breaker has not been tripped. For other issues, it's best to call a professional to avoid further damage.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <aside className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 sticky top-28">
                        <h3 className="text-2xl font-bold text-brand-blue text-center">Get a Repair Quote</h3>
                        <div className="mt-6">
                            <ServiceForm />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
    </>
  );
};

export default ServiceDetail;
