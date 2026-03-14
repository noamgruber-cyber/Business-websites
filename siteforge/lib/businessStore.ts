'use client';

import { create } from 'zustand';
import { BusinessData, BusinessCategory, ServiceItem, OpeningHours } from './types';

// ===== Default opening hours: Sun–Thu 09–18, Fri 09–14, Sat closed =====
const DEFAULT_OPENING_HOURS: OpeningHours = {
  sunday:    '09:00-18:00',
  monday:    '09:00-18:00',
  tuesday:   '09:00-18:00',
  wednesday: '09:00-18:00',
  thursday:  '09:00-18:00',
  friday:    '09:00-14:00',
  saturday:  'closed',
};

// ===== Pre-seeded services per category =====
function getDefaultServices(category: BusinessCategory): ServiceItem[] {
  const templates: Record<BusinessCategory, ServiceItem[]> = {
    barbershop: [
      { id: '1', name: 'Haircut',    price: '₪60', description: 'Classic cut with wash and style' },
      { id: '2', name: 'Beard Trim', price: '₪40', description: 'Professional beard shaping' },
    ],
    restaurant: [
      { id: '1', name: 'Main Course', price: '₪65', description: "Chef's daily special" },
      { id: '2', name: 'Dessert',     price: '₪30', description: 'Homemade desserts' },
    ],
    nail_salon: [
      { id: '1', name: 'Manicure', price: '₪80', description: 'Classic manicure with polish' },
      { id: '2', name: 'Pedicure', price: '₪90', description: 'Relaxing pedicure treatment' },
    ],
    gym: [
      { id: '1', name: 'Monthly Membership', price: '₪199', description: 'Unlimited access to all equipment' },
      { id: '2', name: 'Personal Training',  price: '₪150', description: '1-hour session with certified trainer' },
    ],
    cafe: [
      { id: '1', name: 'Specialty Coffee', price: '₪18', description: 'Single origin espresso drinks' },
      { id: '2', name: 'Fresh Pastry',     price: '₪22', description: 'Baked fresh daily' },
    ],
    photography: [
      { id: '1', name: 'Portrait Session', price: '₪500',  description: '1-hour indoor/outdoor session' },
      { id: '2', name: 'Event Coverage',   price: '₪1500', description: 'Full day event photography' },
    ],
  };
  return templates[category];
}

// ===== Blank slate used for initialization =====
const EMPTY_BUSINESS: BusinessData = {
  id:           '',
  category:     'barbershop',
  templateId:   'barbershop',
  businessName: '',
  tagline:      '',
  description:  '',
  logoUrl:      '',
  coverPhotoUrl:  '',
  galleryPhotos:  [],
  services:       [],
  phone:    '',
  email:    '',
  address:  '',
  city:     '',
  instagram: '',
  facebook:  '',
  whatsapp:  '',
  openingHours: DEFAULT_OPENING_HOURS,
  slug:        '',
  publishedAt: null,
  createdAt:   '',
};

// ===== Store shape =====
type EditorStore = {
  currentStep:  number;
  businessData: BusinessData;

  setStep:            (step: number) => void;
  updateBusinessData: (updates: Partial<BusinessData>) => void;
  initBusiness:       (id: string, category: BusinessCategory) => void;
  reset:              () => void;
};

// ===== Zustand store =====
export const useEditorStore = create<EditorStore>((set) => ({
  currentStep:  1,
  businessData: EMPTY_BUSINESS,

  setStep: (step) => set({ currentStep: step }),

  updateBusinessData: (updates) =>
    set((state) => ({
      businessData: { ...state.businessData, ...updates },
    })),

  initBusiness: (id, category) =>
    set({
      currentStep: 1,
      businessData: {
        ...EMPTY_BUSINESS,
        id,
        category,
        templateId: category,
        services:   getDefaultServices(category),
        createdAt:  new Date().toISOString(),
      },
    }),

  reset: () => set({ currentStep: 1, businessData: EMPTY_BUSINESS }),
}));
