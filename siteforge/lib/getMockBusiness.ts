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

  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
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

  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'mamas-restaurant',
  publishedAt: '2024-02-10T12:00:00Z',
  createdAt:   '2024-02-10T11:00:00Z',
};

// ===== Nail Salon: "Glamour Nails" =====
const glamourNails: BusinessData = {
  id: 'mock-nailsalon-001',
  category: 'nail_salon',
  templateId: 'nail_salon',
  businessName: 'Glamour Nails',
  tagline: 'Where every detail is perfection.',
  description:
    'A boutique nail studio in Tel Aviv offering luxury manicures, pedicures, and nail art. Our skilled technicians use only top-quality gels and polishes for a lasting finish.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/nailsalon/1200/600',
  galleryPhotos: [
    'https://picsum.photos/seed/nails1/800/800',
    'https://picsum.photos/seed/nails2/800/800',
    'https://picsum.photos/seed/nails3/800/800',
    'https://picsum.photos/seed/nails4/800/800',
    'https://picsum.photos/seed/nails5/800/800',
    'https://picsum.photos/seed/nails6/800/800',
  ],
  services: [
    { id: 'n1', name: 'Classic Manicure',    price: '₪80',  description: 'Shape, buff and polish with your choice of colour' },
    { id: 'n2', name: 'Gel Manicure',        price: '₪120', description: 'Long-lasting gel polish, cured under UV lamp' },
    { id: 'n3', name: 'Nail Art Design',     price: '₪40+', description: 'Custom designs, gems and stickers — per nail' },
    { id: 'n4', name: 'Classic Pedicure',    price: '₪90',  description: 'Full foot care with scrub, massage and polish' },
    { id: 'n5', name: 'Spa Pedicure',        price: '₪140', description: 'Luxury pedicure with paraffin wax treatment' },
    { id: 'n6', name: 'Acrylic Extensions',  price: '₪180', description: 'Full set of sculpted acrylic nails, any length' },
  ],
  phone: '054-7654321',
  email: 'hello@glamournails.co.il',
  address: 'Rothschild Blvd 72, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'glamour_nails_tlv',
  facebook: '',
  whatsapp: '972547654321',
  openingHours: {
    sunday: '10:00-20:00', monday: '10:00-20:00', tuesday: '10:00-20:00',
    wednesday: '10:00-20:00', thursday: '10:00-21:00', friday: '09:00-14:00', saturday: 'closed',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'glamour-nails',
  publishedAt: '2024-03-01T10:00:00Z',
  createdAt:   '2024-03-01T09:00:00Z',
};

// ===== Gym: "IronForge Gym" =====
const ironforgeGym: BusinessData = {
  id: 'mock-gym-001',
  category: 'gym',
  templateId: 'gym',
  businessName: 'IronForge Gym',
  tagline: 'Forge your strongest self.',
  description:
    'Haifa\'s most intense training facility. State-of-the-art equipment, expert coaches, and a community that pushes you beyond your limits. Open early, close late — because champions don\'t have office hours.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/gym/1200/600',
  galleryPhotos: [
    'https://picsum.photos/seed/gym1/800/600',
    'https://picsum.photos/seed/gym2/800/600',
    'https://picsum.photos/seed/gym3/800/600',
    'https://picsum.photos/seed/gym4/800/600',
    'https://picsum.photos/seed/gym5/800/600',
    'https://picsum.photos/seed/gym6/800/600',
  ],
  services: [
    { id: 'g1', name: 'Monthly Membership',  price: '₪220', description: 'Unlimited access to all equipment and group classes' },
    { id: 'g2', name: 'Personal Training',   price: '₪180', description: '60-min 1-on-1 session with a certified trainer' },
    { id: 'g3', name: 'CrossFit Class',      price: '₪60',  description: 'High-intensity functional training, all levels' },
    { id: 'g4', name: 'Spinning Class',      price: '₪45',  description: '45-min indoor cycling to pump-up music' },
    { id: 'g5', name: 'Yoga & Stretch',      price: '₪40',  description: 'Mobility, flexibility and mindfulness session' },
    { id: 'g6', name: 'Annual Membership',   price: '₪1990',description: 'Best value — full year, all-inclusive' },
  ],
  phone: '04-8765432',
  email: 'train@ironforge.co.il',
  address: 'HaNamal St 12, Haifa',
  city: 'Haifa',
  instagram: 'ironforge_gym',
  facebook: '',
  whatsapp: '97248765432',
  openingHours: {
    sunday: '06:00-23:00', monday: '06:00-23:00', tuesday: '06:00-23:00',
    wednesday: '06:00-23:00', thursday: '06:00-23:00', friday: '07:00-18:00', saturday: '08:00-16:00',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'ironforge-gym',
  publishedAt: '2024-03-10T10:00:00Z',
  createdAt:   '2024-03-10T09:00:00Z',
};

// ===== Café: "The Daily Grind" =====
const theDailyGrind: BusinessData = {
  id: 'mock-cafe-001',
  category: 'cafe',
  templateId: 'cafe',
  businessName: 'The Daily Grind',
  tagline: 'Life\'s too short for bad coffee.',
  description:
    'A specialty coffee shop in the heart of Jerusalem\'s Mahane Yehuda neighbourhood. We source single-origin beans, roast in-house, and bake fresh pastries every morning. Slow down, sip, stay awhile.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/cafe/1200/600',
  galleryPhotos: [
    'https://picsum.photos/seed/cafe1/800/600',
    'https://picsum.photos/seed/cafe2/800/700',
    'https://picsum.photos/seed/cafe3/800/600',
    'https://picsum.photos/seed/cafe4/800/800',
    'https://picsum.photos/seed/cafe5/800/600',
    'https://picsum.photos/seed/cafe6/800/700',
  ],
  services: [
    { id: 'c1', name: 'Flat White',          price: '₪18', description: 'Double ristretto, velvety microfoam' },
    { id: 'c2', name: 'Cold Brew',           price: '₪22', description: '18-hour slow-steeped, served over ice' },
    { id: 'c3', name: 'Cardamom Latte',      price: '₪20', description: 'House specialty with Middle Eastern spice blend' },
    { id: 'c4', name: 'Almond Croissant',    price: '₪24', description: 'Flaky, buttery, filled with almond cream' },
    { id: 'c5', name: 'Shakshuka Toast',     price: '₪38', description: 'Poached eggs on spiced tomato, sourdough' },
    { id: 'c6', name: 'Cheesecake Slice',    price: '₪28', description: 'NY-style, baked fresh daily' },
  ],
  phone: '02-1234567',
  email: 'hi@dailygrind.co.il',
  address: 'Agripas St 88, Jerusalem',
  city: 'Jerusalem',
  instagram: 'the_daily_grind_jlm',
  facebook: '',
  whatsapp: '97221234567',
  openingHours: {
    sunday: '07:30-19:00', monday: '07:30-19:00', tuesday: '07:30-19:00',
    wednesday: '07:30-19:00', thursday: '07:30-20:00', friday: '07:30-14:00', saturday: 'closed',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'the-daily-grind',
  publishedAt: '2024-04-01T10:00:00Z',
  createdAt:   '2024-04-01T09:00:00Z',
};

// ===== Photography: "Lens & Light" =====
const lensAndLight: BusinessData = {
  id: 'mock-photography-001',
  category: 'photography',
  templateId: 'photography',
  businessName: 'Lens & Light',
  tagline: 'Every moment deserves to be remembered.',
  description:
    'Award-winning photographer based in Tel Aviv, specialising in portraits, weddings, and editorial work. With a decade of experience and an eye for authentic emotion, Noa captures stories that last a lifetime.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/photography/1200/800',
  galleryPhotos: [
    'https://picsum.photos/seed/photo1/800/1000',
    'https://picsum.photos/seed/photo2/800/600',
    'https://picsum.photos/seed/photo3/800/900',
    'https://picsum.photos/seed/photo4/800/600',
    'https://picsum.photos/seed/photo5/800/1100',
    'https://picsum.photos/seed/photo6/800/700',
  ],
  services: [
    { id: 'p1', name: 'Portrait Session',    price: '₪650',  description: '1-hour session, 20 edited images, indoor or outdoor' },
    { id: 'p2', name: 'Family Shoot',        price: '₪900',  description: '1.5-hour session, 35 edited images, up to 6 people' },
    { id: 'p3', name: 'Wedding Full Day',    price: '₪5500', description: '8 hours coverage, 300+ edited images, online gallery' },
    { id: 'p4', name: 'Branding Shoot',      price: '₪1200', description: 'Half-day, product + headshots, commercial licence' },
    { id: 'p5', name: 'Event Coverage',      price: '₪2200', description: '4 hours, 150+ edited images, 48h delivery' },
    { id: 'p6', name: 'Mini Session',        price: '₪350',  description: '30-min session, 10 edited images — great for headshots' },
  ],
  phone: '052-9988776',
  email: 'noa@lensandlight.co.il',
  address: 'Florentine, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'lensandlight.il',
  facebook: '',
  whatsapp: '972529988776',
  openingHours: {
    sunday: '09:00-18:00', monday: '09:00-18:00', tuesday: '09:00-18:00',
    wednesday: '09:00-18:00', thursday: '09:00-18:00', friday: 'closed', saturday: 'closed',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'lens-and-light',
  publishedAt: '2024-04-15T10:00:00Z',
  createdAt:   '2024-04-15T09:00:00Z',
};

// ===== Lookup map =====
const MOCK_DB: Record<string, BusinessData> = {
  'cohens-barbershop': cohensBarberShop,
  'mamas-restaurant':  mamasRestaurant,
  'glamour-nails':     glamourNails,
  'ironforge-gym':     ironforgeGym,
  'the-daily-grind':   theDailyGrind,
  'lens-and-light':    lensAndLight,
};

export function getMockBusiness(slug: string): BusinessData | null {
  return MOCK_DB[slug] ?? null;
}
