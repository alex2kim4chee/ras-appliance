
import { IconType } from 'react-icons';

export interface Service {
  id: string;
  name: string;
  icon: IconType;
  image?: string;
  description: string;
  commonIssues: string[];
}

export interface Brand {
  name: string;
  logoUrl: string;
  services: string[];
  description: string;
}

export interface Review {
  author: string;
  rating: number;
  snippet: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum DeviceType {
    REFRIGERATOR = 'Refrigerator',
    STOVE_RANGE = 'Stove/Range',
    OVEN = 'Oven',
    COOKTOP = 'Cooktop',
    WASHER = 'Washer',
    DRYER = 'Dryer',
    DISHWASHER = 'Dishwasher',
    GRILL = 'Grill',
    WINE_COOLER = 'Wine cooler',
}

export interface ServiceRequestPayload {
  name: string;
  phone: string;
  email: string;
  device: DeviceType;
  issue: string;
  zip: string;
  time: string;
}
