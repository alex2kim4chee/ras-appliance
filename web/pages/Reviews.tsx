
import React, { useState, useEffect } from 'react';
import { CONTACT } from '../constants';
import SEO from '../components/SEO';
import { FaStar, FaYelp } from 'react-icons/fa';

interface YelpReview {
  name: string;
  location: string;
  date: string;
  text: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<YelpReview[]>([]);

  useEffect(() => {
    fetch('/yelp.json')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Failed to load reviews:', err));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <SEO
        title="Customer Reviews | Residential Appliance Services"
        description="Read 189 reviews from satisfied customers in Brooklyn and Manhattan. See why we have a 4.9-star rating on Yelp."
      />

      {/* Hero Section with Yelp Branding */}
      <div className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Yelp Logo */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaYelp size={64} color="#d32323" />
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Yelp Reviews
              </h1>
            </div>

            {/* Company Rating */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Residential Appliance Services</h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      <FaStar size={28} color="#d32323" />
                    </span>
                  ))}
                </div>
                <span className="text-3xl font-bold text-gray-900">4.9</span>
              </div>
              <p className="text-gray-600 mt-2 text-lg">
                Based on <span className="font-semibold">189 reviews</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href={CONTACT.YELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                <FaYelp size={28} />
                <span>Read All Reviews on Yelp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid with Horizontal Scroll */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">What Our Customers Say</h3>

          {/* Desktop: 3 Column Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} formatDate={formatDate} />
            ))}
          </div>

          {/* Tablet: 2 Column Grid */}
          <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} formatDate={formatDate} />
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {reviews.map((review, index) => (
                <div key={index} style={{ width: '85vw', maxWidth: '400px' }}>
                  <ReviewCard review={review} formatDate={formatDate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Satisfied Customers
          </h3>
          <p className="text-gray-600 mb-6">
            Need appliance repair? We're here to help with same-day service!
          </p>
          <a
            href={`tel:${CONTACT.PHONE_TEL.replace('tel:', '')}`}
            className="inline-block bg-brand-orange text-white font-bold py-4 px-8 rounded-lg hover:bg-brand-orange-dark transition-colors text-lg shadow-lg"
          >
            Call {CONTACT.PHONE}
          </a>
        </div>
      </div>
    </>
  );
};

// Review Card Component
const ReviewCard: React.FC<{ review: YelpReview; formatDate: (date: string) => string }> = ({ review, formatDate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = review.text.length > 200;
  const displayText = isExpanded || !shouldTruncate ? review.text : review.text.slice(0, 200) + '...';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            <FaStar size={20} color="#d32323" />
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
        {displayText}
      </p>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-600 font-semibold text-sm hover:text-red-700 mb-4 text-left"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Author Info */}
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <p className="font-bold text-gray-900">{review.name}</p>
        <p className="text-gray-500 text-sm">{review.location}</p>
        <p className="text-gray-400 text-xs mt-1">{formatDate(review.date)}</p>
      </div>
    </div>
  );
};

export default Reviews;
