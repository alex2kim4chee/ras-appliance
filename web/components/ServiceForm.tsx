import React, { useState } from 'react';
import { CONTACT, DEVICE_OPTIONS, TIME_WINDOWS } from '../constants';
import { ServiceRequestPayload } from '../types';

const SERVICE_REQUEST_ENDPOINT = import.meta.env.VITE_SERVICE_REQUEST_ENDPOINT || '/api/service-request';

const createDefaultFormState = (): ServiceRequestPayload => ({
  name: '',
  phone: '',
  email: '',
  device: DEVICE_OPTIONS[0],
  issue: '',
  zip: '',
  time: TIME_WINDOWS[0],
});

interface ServiceFormProps {
  onSuccess?: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<ServiceRequestPayload>(() => createDefaultFormState());
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.issue.trim()) newErrors.issue = 'Please describe the issue.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    setFeedbackMessage(null);
    try {
        const response = await fetch(SERVICE_REQUEST_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString(),
            source: 'website',
          }),
        });

        let responseBody: { message?: string; error?: string } | null = null;
        try {
          responseBody = await response.json();
        } catch {
          responseBody = null;
        }

        if (!response.ok) {
          throw new Error(responseBody?.error || 'We could not submit your request. Please try again.');
        }

        setStatus('success');
        setFeedbackMessage(responseBody?.message || 'Your service request has been submitted. We will contact you shortly.');
        if (onSuccess) onSuccess();
    } catch (error) {
        setStatus('error');
        setFeedbackMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again or call us directly.');
    }
  };

  if (status === 'success') {
    return (
        <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800">Thank You!</h3>
            <p className="mt-2 text-green-700">
              {feedbackMessage || `Your service request has been submitted. We will contact you shortly at ${formData.phone} to confirm your appointment.`}
            </p>
        </div>
    );
  }
  
  if (status === 'error') {
      return (
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-2xl font-bold text-red-800">Something went wrong.</h3>
            <p className="mt-2 text-red-700">{feedbackMessage || "We couldn't submit your request. Please try again or call us directly."}</p>
            <button
              onClick={() => {
                setStatus('idle');
                setFeedbackMessage(null);
              }}
              className="mt-4 bg-brand-blue text-white font-bold py-2 px-6 rounded-md hover:bg-brand-blue-dark"
            >
              Try Again
            </button>
        </div>
      );
  }


  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue`} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone *</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue`} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
          <label htmlFor="device" className="block text-sm font-medium text-gray-700">Appliance Type</label>
          <select name="device" id="device" value={formData.device} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-50 border-gray-300 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md">
            {DEVICE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input type="text" name="zip" id="zip" value={formData.zip} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
        </div>
      </div>
      <div>
        <label htmlFor="issue" className="block text-sm font-medium text-gray-700">Describe the Issue *</label>
        <textarea name="issue" id="issue" rows={4} value={formData.issue} onChange={handleChange} required className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${errors.issue ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue`}></textarea>
        {errors.issue && <p className="mt-1 text-sm text-red-600">{errors.issue}</p>}
      </div>
       <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Arrival Window</label>
          <select name="time" id="time" value={formData.time} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-50 border-gray-300 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md">
            {TIME_WINDOWS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      <div>
        <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-brand-orange hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange-dark disabled:bg-gray-400">
          {status === 'loading' ? 'Submitting...' : 'Request Service'}
        </button>
      </div>
      <div className="text-center">
          <p className="text-sm text-gray-500">Same-day options based on availability.</p>
          <p className="mt-2 text-sm">Prefer to call? <a href={CONTACT.PHONE_TEL} className="font-medium text-brand-blue hover:underline">{CONTACT.PHONE}</a></p>
      </div>
    </form>
  );
};

export default ServiceForm;
