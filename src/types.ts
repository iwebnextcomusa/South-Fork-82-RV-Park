export type Page = 'home' | 'about' | 'amenities' | 'rates' | 'gallery' | 'attractions' | 'contact';

export interface Amenity {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: 'Utilities' | 'Comfort & Convenience' | 'Site Features' | 'Atmosphere';
}

export interface RatePlan {
  id: string;
  type: 'Nightly' | 'Weekly' | 'Monthly';
  price: string;
  period: string;
  subtitle: string;
  popular?: boolean;
  features: string[];
  note?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: 'Grounds' | 'Amenities' | 'Surrounding Nature' | 'RVs & Sites';
}

export interface LocalAttraction {
  id: string;
  name: string;
  category: 'Fishing & Lakes' | 'Parks & Trails' | 'Historic & Shopping' | 'Dining';
  distance: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  stayType: 'Nightly' | 'Weekly' | 'Monthly' | 'General Inquiry';
  checkIn: string;
  checkOut: string;
  rvLength: string;
  ampNeed: '30 Amp' | '50 Amp' | 'Not Sure';
  pets: string;
  notes: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
