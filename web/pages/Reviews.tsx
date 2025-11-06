
import React from 'react';
import { REVIEWS, CONTACT } from '../constants';
import SEO from '../components/SEO';
import { FaStar, FaYelp } from 'react-icons/fa';

const Reviews: React.FC = () => {
  return (
    <>
      <SEO
        title="Customer Reviews | Residential Appliance Services"
        description="Read reviews from satisfied customers in Brooklyn and Manhattan. See why we are the top-rated choice for premium appliance repair."
      />
      <div className="bg-brand-light">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaStar className="mx-auto h-12 w-12 text-yellow-400" />
            <h1 className="mt-4 text-4xl font-extrabold text-brand-blue sm:text-5xl">Customer Reviews</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              We're proud of our 5-star reputation. Here's what our clients have to say about our service.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <a href={CONTACT.YELP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors text-lg">
                    <FaYelp size={24} />
                    <span>View All Reviews on Yelp</span>
                </a>
            </div>
          <div className="space-y-8">
            {REVIEWS.map((review, index) => (
              <div key={index} className="p-8 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-brand-blue">{review.author}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(review.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400" />)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <blockquote className="mt-4 text-lg text-gray-700 italic border-l-4 border-brand-orange pl-4">
                  "{review.snippet}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
