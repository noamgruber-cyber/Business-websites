// ===== Core Business Types =====

export type BusinessCategory =
  | 'barbershop'
  | 'restaurant'
  | 'nail_salon'
  | 'gym'
  | 'cafe'
  | 'photography';

export type ServiceItem = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export type OpeningHours = {
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
};

export type BusinessData = {
  id: string;
  category: BusinessCategory;
  templateId: string;

  // Basic Info
  businessName: string;
  tagline: string;
  description: string;
  logoUrl: string;

  // Photos
  coverPhotoUrl: string;
  galleryPhotos: string[]; // array of local object URLs (max 6)

  // Services
  services: ServiceItem[];

  // Contact & Hours
  phone: string;
  email: string;
  address: string;
  city: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  openingHours: OpeningHours;

  // Owner (populated when published via auth)
  ownerUid:      string;
  ownerEmail:    string;
  ownerName:     string;
  ownerPhotoUrl: string;

  // Meta
  slug: string;              // URL slug e.g. "cohen-barbershop-tlv"
  publishedAt: string | null;
  createdAt: string;
};

// ===== Category metadata =====
export type CategoryMeta = {
  id: BusinessCategory;
  emoji: string;
  name: string;
  description: string;
};

export const CATEGORIES: CategoryMeta[] = [
  { id: 'barbershop',   emoji: '💈', name: 'Barbershop',    description: 'Haircuts, styling & grooming' },
  { id: 'restaurant',   emoji: '🍕', name: 'Restaurant',    description: 'Full menu, reservations & delivery' },
  { id: 'nail_salon',   emoji: '💅', name: 'Nail Salon',    description: 'Manicure, pedicure & nail art' },
  { id: 'gym',          emoji: '🏋️', name: 'Gym / Fitness', description: 'Classes, trainers & memberships' },
  { id: 'cafe',         emoji: '☕', name: 'Café',           description: 'Coffee, pastries & cozy atmosphere' },
  { id: 'photography',  emoji: '📸', name: 'Photography',   description: 'Portraits, events & studios' },
];

// ===== Category brand colors for the live preview =====
export type CategoryColors = {
  primary: string;
  bg: string;
  light: string;
};

export const CATEGORY_COLORS: Record<BusinessCategory, CategoryColors> = {
  barbershop:  { primary: '#dc2626', bg: '#1a0505', light: '#fecaca' },
  restaurant:  { primary: '#ea580c', bg: '#1a0800', light: '#fed7aa' },
  nail_salon:  { primary: '#db2777', bg: '#1a0515', light: '#fbcfe8' },
  gym:         { primary: '#2563eb', bg: '#050a1a', light: '#bfdbfe' },
  cafe:        { primary: '#d97706', bg: '#1a1005', light: '#fde68a' },
  photography: { primary: '#6b7280', bg: '#111827', light: '#d1d5db' },
};
