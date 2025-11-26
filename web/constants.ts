import { Service, Brand, Review, FAQItem, DeviceType } from './types';
import { 
    LuRefrigerator,
    LuWashingMachine,
    LuFan,
    LuUtensilsCrossed,
    LuMicrowave,
    LuCookingPot,
    LuFlame,
    LuWine
} from 'react-icons/lu';

export const CONTACT = {
    PHONE: '+1 (929) 301-0033',
    PHONE_TEL: 'tel:+19293010033',
    ADDRESS: '97 Green St, Brooklyn, NY 11222',
    EMAIL: 'service@fixbyras.com',
    YELP_URL: 'https://www.yelp.com/biz/residential-appliance-services-brooklyn-2',
    BUSINESS_HOURS: {
        WEEKDAY: 'Mon - Fri: 9am - 9pm',
        WEEKEND: 'Sat - Sun: 11am - 9pm'
    }
};

export const SERVICES: Service[] = [
  { id: 'refrigerator', name: 'Refrigerator', icon: LuRefrigerator, image: '/devices/fridge.jpg', description: "Repair for all refrigerator issues, including cooling problems, leaks, and noisy operation.", commonIssues: ['Not cooling', 'Leaking water', 'Freezer is defrosting', 'Making loud noises'] },
  { id: 'washer', name: 'Washer', icon: LuWashingMachine, image: '/devices/washer.jpg', description: "Expert washer repair for leaks, spin cycle issues, and error codes.", commonIssues: ['Not spinning', 'Leaking', 'Won\'t turn on', 'Making strange noises'] },
  { id: 'dryer', name: 'Dryer', icon: LuFan, image: '/devices/dryer.jpg', description: "Fast dryer repair for no-heat problems, tumbling issues, and long drying times.", commonIssues: ['Not heating', 'Not tumbling', 'Takes too long to dry', 'Loud squeaking or grinding'] },
  { id: 'dishwasher', name: 'Dishwasher', icon: LuUtensilsCrossed, image: '/devices/dishwasher.jpg', description: "Complete dishwasher repair services for poor cleaning, leaks, and electronic faults.", commonIssues: ['Not draining', 'Dishes are still dirty', 'Leaking from the door', 'Making unusual noises'] },
  { id: 'oven', name: 'Oven', icon: LuMicrowave, image: '/devices/oven.JPG', description: "Reliable oven repair for all brands. We fix heating elements, thermostats, and more.", commonIssues: ['Not heating', 'Baking unevenly', 'Door won\'t close', 'Self-cleaning not working'] },
  { id: 'stove-range', name: 'Stove/Range', icon: LuCookingPot, image: '/devices/stove.AVIF', description: "Servicing all major stove and range brands for burner, ignition, and control board problems.", commonIssues: ['Burner won\'t light', 'Temperature not accurate', 'Indicator light stays on', 'Control panel not working'] },
  { id: 'cooktop', name: 'Cooktop', icon: LuFlame, image: '/devices/cooktop.JPG', description: "Specialized cooktop repair for induction, electric, and gas models.", commonIssues: ['Element not heating', 'Igniter keeps clicking', 'Cracked glass surface', 'Controls unresponsive'] },
  { id: 'wine-cooler', name: 'Wine Cooler', icon: LuWine, image: '/devices/wine-cooler.JPG', description: "Premium wine cooler and cellar repair to protect your collection.", commonIssues: ['Not cooling', 'Too cold / freezing', 'Leaking water', 'Won\'t turn on'] },
];

export const PREMIUM_BRANDS = [
  { name: 'Sub-Zero', alt: 'Sub-Zero Logo', file: 'subzero_logo.png' },
  { name: 'Bosch', alt: 'Bosch Logo', file: 'Bosch-Logo.png' },
  { name: 'Liebherr', alt: 'Liebherr Logo', file: 'Liebherr-Logo.png' },
  { name: 'Miele', alt: 'Miele Logo', file: 'miele-1-logo-png-transparent.png' },
];

export const BRANDS_DATA: Brand[] = [
    { name: 'Liebherr', logoUrl: '/images/Liebherr-Logo.png', services: ['Refrigerators', 'Ice Makers'], description: 'We are factory-authorized specialists for Liebherr refrigeration, ensuring your premium appliance gets the expert care it needs.' },
    { name: 'Bosch', logoUrl: '/images/Bosch-Logo.png', services: ['Washers', 'Dryers', 'Dishwashers', 'Ovens', 'Stoves', 'Cooktops'], description: 'Our technicians are highly experienced with the full range of Bosch home appliances, from laundry to kitchen.' },
    { name: 'Sub-Zero', logoUrl: '/images/subzero_logo.png', services: ['Refrigerators', 'Wine Coolers'], description: 'Trust our experts to maintain and repair your Sub-Zero refrigeration systems, known for their longevity and performance.' },
    { name: 'Miele', logoUrl: '/images/miele-1-logo-png-transparent.png', services: ['Dishwashers', 'Dryers', 'Washing Machines', 'Ovens'], description: 'We provide meticulous service for Miele appliances, upholding their standard of "Immer Besser" (Forever Better).'},
];


export const REVIEWS: Review[] = [
    { author: 'Sarah J. - Brooklyn', rating: 5, snippet: 'Incredibly fast and professional. The technician diagnosed my Sub-Zero fridge issue in minutes and had the part on his truck. Highly recommend!', date: 'August 2023' },
    { author: 'Michael R. - Manhattan', rating: 5, snippet: 'My Bosch dishwasher was leaking everywhere. They scheduled me for the same day, arrived on time, and fixed it cleanly. Fair pricing too.', date: 'July 2023' },
    { author: 'Emily C. - Brooklyn Heights', rating: 5, snippet: 'The only company I\'ll call for my Wolf range. They know these high-end appliances inside and out. Courteous and knowledgeable.', date: 'June 2023' },
];

export const FAQ_ITEMS: FAQItem[] = [
    { question: 'What is your diagnostic or service call fee?', answer: 'We have a standard diagnostic fee that covers the technician\'s travel and time to thoroughly inspect your appliance and provide a detailed repair estimate. This fee is waived if you proceed with the recommended repair.' },
    { question: 'Do you offer a warranty on your repairs?', answer: 'Yes, we stand by our work. All our repairs are backed by a comprehensive 90-day warranty covering both parts and labor. This ensures your peace of mind and guarantees the quality of our service.' },
    { question: 'How quickly can you come for a repair?', answer: 'We offer same-day service options based on availability. When you call or book online, we will provide you with the earliest available appointment window, often within a few hours.' },
    { question: 'Do you use genuine manufacturer parts?', answer: 'Absolutely. We specialize in premium brands and primarily use original equipment manufacturer (OEM) parts to ensure the highest quality repair, reliability, and longevity for your appliance.' },
];

export const DEVICE_OPTIONS: DeviceType[] = Object.values(DeviceType);

export const TIME_WINDOWS = ['10am - 12pm', '12pm - 2pm', '2pm - 4pm', '4pm - 6pm'];

export const SERVICE_AREAS = {
    brooklyn: ['Williamsburg', 'Greenpoint', 'Brooklyn Heights', 'DUMBO', 'Park Slope', 'Cobble Hill', 'Bushwick'],
    manhattan: ['Upper East Side', 'Upper West Side', 'Midtown', 'Chelsea', 'SoHo', 'Tribeca', 'Financial District'],
}
