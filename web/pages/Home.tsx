
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../App';
import { CONTACT, SERVICES, PREMIUM_BRANDS, FAQ_ITEMS } from '../constants';
import { FaPhoneAlt, FaWrench, FaStar, FaShieldAlt, FaShippingFast, FaCheckCircle, FaYelp } from 'react-icons/fa';
import ServiceForm from '../components/ServiceForm';
import SEO from '../components/SEO';

interface YelpReview {
  name: string;
  location: string;
  date: string;
  text: string;
}

const AccordionItem: React.FC<{ item: { question: string; answer: string }, open: boolean, onToggle: () => void }> = ({ item, open, onToggle }) => (
    <div className="border-b">
        <h2>
            <button
                type="button"
                className="flex justify-between items-center w-full p-5 font-medium text-left text-gray-700 hover:bg-gray-100"
                onClick={onToggle}
                aria-expanded={open}
            >
                <span>{item.question}</span>
                <svg className={`w-6 h-6 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
        </h2>
        <div className={`p-5 border-t-0 ${open ? 'block' : 'hidden'}`}>
            <p className="text-gray-600">{item.answer}</p>
        </div>
    </div>
);


const Home: React.FC = () => {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [yelpReviews, setYelpReviews] = useState<YelpReview[]>([]);

  useEffect(() => {
    fetch('/yelp.json')
      .then(res => res.json())
      .then(data => setYelpReviews(data.slice(0, 9))) // Take first 9 reviews
      .catch(err => console.error('Failed to load reviews:', err));
  }, []);

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Residential Appliance Services",
    "image": "https://picsum.photos/1200/630?random=1",
    "url": "https://example.com/",
    "telephone": CONTACT.PHONE,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "97 Green St",
      "addressLocality": "Brooklyn",
      "addressRegion": "NY",
      "postalCode": "11222",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7289,
      "longitude": -73.955
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
    "sameAs": [
      CONTACT.YELP_URL
    ]
  };

  return (
    <>
    <SEO title="Residential Appliance Services | Brooklyn & Manhattan" description="Expert, same-day appliance repair for Sub-Zero, Wolf, Bosch, Miele & more in Brooklyn and Manhattan. Licensed & insured. Call (929) 301-0033 or book online." schema={homeSchema} />
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            <div className="flex justify-center items-center gap-2 text-brand-orange">
                <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">Expert Appliance Repair in Brooklyn & Manhattan</h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                Specializing in premium brands like Sub-Zero, Wolf, Bosch & Miele. Same-day options available. Licensed & Insured.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                 <a href={CONTACT.PHONE_TEL} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold py-4 px-8 rounded-md transition-all duration-300 text-lg">
                    <FaPhoneAlt />
                    <span>Call Now</span>
                </a>
                <button onClick={openModal} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-brand-blue hover:bg-gray-200 font-bold py-4 px-8 rounded-md transition-all duration-300 text-lg">
                    <FaWrench />
                    <span>Request Service</span>
                </button>
            </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-brand-light">
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center py-8 px-4">
            <div className="flex flex-col items-center gap-2 text-brand-gray">
                <FaCheckCircle className="text-brand-orange text-3xl md:text-4xl" />
                <span className="font-semibold text-base md:text-lg text-center">Specialists in Premium Brands</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-brand-gray">
                <FaShieldAlt className="text-brand-orange text-3xl md:text-4xl" />
                <span className="font-semibold text-base md:text-lg text-center">Licensed & Insured</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-brand-gray">
                <FaShippingFast className="text-brand-orange text-3xl md:text-4xl" />
                <span className="font-semibold text-base md:text-lg text-center">Same-Day Options Available</span>
            </div>
         </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-brand-blue sm:text-4xl">Our Services</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">We repair all major home appliances with precision and care.</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.slice(0, 8).map(service => (
                    <Link key={service.id} to={`/services/${service.id}`} className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 text-center">
                        <div className="flex justify-center items-center">
                            <service.icon className="h-12 w-12 text-brand-orange" />
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-brand-blue">{service.name}</h3>
                        <p className="mt-2 text-base text-gray-500">{service.description.split('.')[0]}.</p>
                    </Link>
                ))}
            </div>
            <div className="mt-12 text-center">
                 <Link to="/services" className="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-md hover:bg-brand-blue-dark transition-colors">View All Services</Link>
            </div>
        </div>
      </section>
      
      {/* Brands We Service */}
      <section className="bg-brand-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-brand-blue sm:text-4xl">Premium Brands We Specialize In</h2>
                <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">Our technicians are factory-trained and experienced with the leading high-end appliance brands.</p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8 items-center">
                {PREMIUM_BRANDS.map(brand => (
                    <div key={brand.name} className="flex justify-center w-32">
                        <img
                          loading="lazy"
                          className="h-10 w-auto object-contain"
                          src={`/images/${brand.file}`}
                          alt={brand.alt}
                        />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials - Yelp Reviews Widget */}
       <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FaYelp size={48} color="#d32323" />
                  <h2 className="text-3xl font-extrabold text-brand-blue sm:text-4xl">What Our Customers Say</h2>
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        <FaStar size={24} color="#d32323" />
                      </span>
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-gray-600 text-lg">
                  Based on <span className="font-semibold">189 reviews</span> on Yelp
                </p>
            </div>

            {/* Desktop: 3 Column Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
              {yelpReviews.slice(0, 3).map((review, index) => (
                <YelpReviewCard key={index} review={review} />
              ))}
            </div>

            {/* Tablet: 2 Column Grid */}
            <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 mb-8">
              {yelpReviews.slice(0, 2).map((review, index) => (
                <YelpReviewCard key={index} review={review} />
              ))}
            </div>

            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 mb-8">
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {yelpReviews.slice(0, 3).map((review, index) => (
                  <div key={index} style={{ width: '85vw', maxWidth: '400px' }}>
                    <YelpReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
                <Link to="/reviews" className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors mr-4">
                  View All Reviews
                </Link>
                <a href={CONTACT.YELP_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-md hover:bg-brand-blue-dark transition-colors">
                  Read on Yelp
                </a>
            </div>
        </div>
      </section>
      
      {/* CTA and Form Section */}
      <section className="bg-brand-orange py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="text-white">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">Get Your Appliance Fixed Today</h2>
                    <p className="mt-4 text-lg">Don't let a broken appliance disrupt your day. Our expert technicians are ready to help. Schedule your repair online for a fast and convenient service.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-2xl">
                    <h3 className="text-2xl font-bold text-brand-blue text-center">Book Your Service Now</h3>
                    <div className="mt-6">
                        <ServiceForm />
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                 <h2 className="text-3xl font-extrabold text-brand-blue sm:text-4xl">Frequently Asked Questions</h2>
            </div>
            <div className="mt-12">
                 {FAQ_ITEMS.map((item, index) => (
                    <AccordionItem 
                        key={index} 
                        item={item} 
                        open={openFaq === index} 
                        onToggle={() => setOpenFaq(openFaq === index ? null : index)} 
                    />
                 ))}
            </div>
        </div>
      </section>
    </div>
    </>
  );
};

// Yelp Review Card Component for Home Page
const YelpReviewCard: React.FC<{ review: YelpReview }> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = review.text.length > 150;
  const displayText = isExpanded || !shouldTruncate ? review.text : review.text.slice(0, 150) + '...';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            <FaStar size={18} color="#d32323" />
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3 flex-grow">
        {displayText}
      </p>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-600 font-semibold text-sm hover:text-red-700 mb-3 text-left"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Author Info */}
      <div className="border-t border-gray-100 pt-3 mt-auto">
        <p className="font-bold text-gray-900 text-sm">{review.name}</p>
        <p className="text-gray-500 text-xs">{review.location}</p>
        <p className="text-gray-400 text-xs mt-1">{formatDate(review.date)}</p>
      </div>
    </div>
  );
};

export default Home;
