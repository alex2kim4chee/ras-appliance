
import React from 'react';
import SEO from '../components/SEO';
import { CONTACT } from '../constants';
import ServiceForm from '../components/ServiceForm';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact Us | Residential Appliance Services"
        description={`Contact us for appliance repair in Brooklyn & Manhattan. Call ${CONTACT.PHONE}, visit us at ${CONTACT.ADDRESS}, or book your service online.`}
      />
      <div className="bg-brand-light">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-brand-blue sm:text-5xl">Get In Touch</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              We're here to help. Reach out by phone, email, or by filling out the form below.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-brand-blue">Contact Information</h2>
                        <p className="mt-2 text-lg text-gray-600">Our team is ready to assist you with your appliance repair needs.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="h-8 w-8 text-brand-orange mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">Phone</h3>
                                <a href={CONTACT.PHONE_TEL} className="text-lg text-brand-blue hover:underline">{CONTACT.PHONE}</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="h-8 w-8 text-brand-orange mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">Address</h3>
                                <p className="text-lg text-gray-700">{CONTACT.ADDRESS}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <FaEnvelope className="h-8 w-8 text-brand-orange mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">Email</h3>
                                <a href={`mailto:${CONTACT.EMAIL}`} className="text-lg text-brand-blue hover:underline">{CONTACT.EMAIL}</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaClock className="h-8 w-8 text-brand-orange mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">Business Hours</h3>
                                <p className="text-lg text-gray-700">[Hours Placeholder: e.g., Mon-Fri: 8am - 6pm]</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Google Map Embed Placeholder</p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100">
                    <h2 className="text-3xl font-bold text-brand-blue">Send Us a Message</h2>
                    <p className="mt-2 text-gray-600">For the fastest response, please fill out the form below.</p>
                    <div className="mt-6">
                        <ServiceForm />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
