import { BusinessData } from './types';

// ===== Barbershop: "Cohen's Barbershop" =====
const cohensBarberShop: BusinessData = {
  id: 'mock-barbershop-001',
  category: 'barbershop',
  templateId: 'barbershop',

  businessName: "Cohen's Barbershop",
  tagline: 'Sharp cuts. Sharp style.',
  description:
    "Tel Aviv's finest barbershop since 2010. We specialize in classic cuts, hot towel shaves, and beard sculpting. Walk-ins welcome, appointments preferred.",
  logoUrl: '',

  coverPhotoUrl: 'https://picsum.photos/seed/barbershop/1200/600',
  galleryPhotos: [
    'https://picsum.photos/seed/barber1/800/600',
    'https://picsum.photos/seed/barber2/800/900',
    'https://picsum.photos/seed/barber3/800/600',
    'https://picsum.photos/seed/barber4/800/700',
    'https://picsum.photos/seed/barber5/800/600',
    'https://picsum.photos/seed/barber6/800/800',
  ],

  services: [
    { id: 's1', name: 'Classic Haircut',       price: '₪70',  description: 'Scissor or clipper cut, includes wash & blow dry' },
    { id: 's2', name: 'Beard Trim & Shape',    price: '₪45',  description: 'Precision beard sculpting and line-up' },
    { id: 's3', name: 'Hot Towel Shave',       price: '₪80',  description: 'Traditional straight razor shave with hot towel treatment' },
    { id: 's4', name: 'Hair + Beard Combo',    price: '₪110', description: 'Full haircut and beard treatment together' },
    { id: 's5', name: 'Kids Cut (under 12)',   price: '₪50',  description: 'Patient and gentle cuts for the little ones' },
    { id: 's6', name: 'Hair Coloring',         price: '₪120', description: 'Full color or highlights, consultation included' },
  ],

  phone: '050-1234567',
  email: 'cohens@barbershop.co.il',
  address: 'Dizengoff St 142, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'cohens_barbershop',
  facebook: '',
  whatsapp: '972501234567',

  openingHours: {
    sunday:    '09:00-19:00',
    monday:    '09:00-19:00',
    tuesday:   '09:00-19:00',
    wednesday: '09:00-19:00',
    thursday:  '09:00-19:00',
    friday:    '09:00-14:00',
    saturday:  'closed',
  },

  slug: 'cohens-barbershop',
  publishedAt: '2024-01-15T10:00:00Z',
  createdAt:   '2024-01-15T09:00:00Z',
};

// ===== Restaurant: "Mama's Kitchen" =====
const mamasRestaurant: BusinessData = {
  id: 'mock-restaurant-001',
  category: 'restaurant',
  templateId: 'restaurant',

  businessName: "Mama's Kitchen",
  tagline: 'Home-cooked flavors, restaurant quality.',
  description:
    'A family restaurant serving traditional Israeli-Mediterranean cuisine in the heart of Haifa. Every dish is made fresh daily with love, just like Grandma used to make.',
  logoUrl: '',

  coverPhotoUrl: 'https://picsum.photos/seed/restaurant/1200/600',
  galleryPhotos: [
    'https://picsum.photos/seed/food1/800/600',
    'https://picsum.photos/seed/food2/800/700',
    'https://picsum.photos/seed/food3/800/600',
    'https://picsum.photos/seed/food4/800/800',
    'https://picsum.photos/seed/food5/800/600',
    'https://picsum.photos/seed/food6/800/700',
  ],

  services: [
    { id: 'm1', name: 'Shakshuka',           price: '₪52', description: 'Two eggs in spiced tomato sauce, served with fresh bread' },
    { id: 'm2', name: 'Grilled Sea Bass',    price: '₪98', description: 'Whole fish, lemon butter, seasonal vegetables' },
    { id: 'm3', name: 'Lamb Kebab Plate',    price: '₪85', description: 'Homemade spiced kebabs, hummus, and Israeli salad' },
    { id: 'm4', name: 'Vegetable Moussaka',  price: '₪68', description: 'Layers of eggplant, potato, and béchamel' },
    { id: 'm5', name: 'Baklava',             price: '₪28', description: 'Fresh homemade baklava with pistachios and honey' },
    { id: 'm6', name: 'Mint Lemonade',       price: '₪22', description: 'Freshly squeezed with garden mint' },
  ],

  phone: '04-9876543',
  email: 'hello@mamaskitchen.co.il',
  address: 'Masada St 33, Haifa',
  city: 'Haifa',
  instagram: 'mamas_kitchen_haifa',
  facebook: '',
  whatsapp: '97249876543',

  openingHours: {
    sunday:    '12:00-22:00',
    monday:    '12:00-22:00',
    tuesday:   '12:00-22:00',
    wednesday: '12:00-22:00',
    thursday:  '12:00-22:00',
    friday:    '12:00-15:00',
    saturday:  '19:00-23:00',
  },

  slug: 'mamas-restaurant',
  publishedAt: '2024-02-10T12:00:00Z',
  createdAt:   '2024-02-10T11:00:00Z',
};

// ===== Lookup map =====
const MOCK_DB: Record<string, BusinessData> = {
  'cohens-barbershop': cohensBarberShop,
  'mamas-restaurant':  mamasRestaurant,
};

export function getMockBusiness(slug: string): BusinessData | null {
  return MOCK_DB[slug] ?? null;
}
