import { BusinessData } from './types';

// ===== Barbershop: "Cohen's Barbershop" =====
const cohensBarberShop: BusinessData = {
  id: 'mock-barbershop-001',
  category: 'barbershop',
  templateId: 'barbershop_classic',

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

// ===== Restaurant: "Mama's Kitchen" (Warmth) =====
const mamasRestaurant: BusinessData = {
  id: 'mock-restaurant-001',
  category: 'restaurant',
  templateId: 'restaurant_warmth',

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

// ===== Restaurant: "Noir & Gold" (Upscale) =====
const noirGoldRestaurant: BusinessData = {
  id: 'mock-restaurant-002',
  category: 'restaurant',
  templateId: 'restaurant_upscale',

  businessName: 'Noir & Gold',
  tagline: 'An experience beyond dining.',
  description:
    'Tel Aviv\'s most exclusive fine-dining destination. Our chef curates a seasonal tasting menu inspired by Mediterranean heritage and modern French technique. Every detail is considered, every moment is precious.',
  logoUrl: '',

  coverPhotoUrl: 'https://picsum.photos/seed/upscalerest/1200/800',
  galleryPhotos: [
    'https://picsum.photos/seed/finedine1/1200/700',
    'https://picsum.photos/seed/finedine2/1200/700',
    'https://picsum.photos/seed/finedine3/1200/700',
  ],

  services: [
    { id: 'u1', name: 'Tasting Menu (7 courses)',    price: '₪420', description: 'Chef\'s seasonal journey — wine pairing available' },
    { id: 'u2', name: 'Wagyu Beef Tenderloin',       price: '₪285', description: 'A5 grade, truffle jus, roasted shallots' },
    { id: 'u3', name: 'Lobster Bisque',              price: '₪110', description: 'Atlantic lobster, saffron cream, brioche croutons' },
    { id: 'u4', name: 'Foie Gras Torchon',           price: '₪130', description: 'House-cured, brioche toast, fig compote' },
    { id: 'u5', name: 'Chocolate Fondant',           price: '₪72',  description: 'Valrhona dark chocolate, salted caramel ice cream' },
    { id: 'u6', name: 'Sommelier Wine Pairing',      price: '₪180', description: 'Curated bottle selection to complement your meal' },
  ],

  phone: '03-5678901',
  email: 'reservations@noirgold.co.il',
  address: 'Rothschild Blvd 5, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'noirgold_tlv',
  facebook: '',
  whatsapp: '97235678901',

  openingHours: {
    sunday:    'closed',
    monday:    '19:00-23:30',
    tuesday:   '19:00-23:30',
    wednesday: '19:00-23:30',
    thursday:  '19:00-00:00',
    friday:    '19:00-00:00',
    saturday:  '19:00-00:00',
  },

  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'upscale-restaurant',
  publishedAt: '2024-05-01T12:00:00Z',
  createdAt:   '2024-05-01T11:00:00Z',
};

// ===== Restaurant: "Street Eats TLV" (Street) =====
const streetEatsRestaurant: BusinessData = {
  id: 'mock-restaurant-003',
  category: 'restaurant',
  templateId: 'restaurant_street',

  businessName: 'Street Eats TLV',
  tagline: 'Real food. No fuss. Big flavour.',
  description:
    'Tel Aviv\'s boldest street food joint. Shawarma, burgers, loaded fries — everything is made fresh and served fast. Late night, loud music, huge portions.',
  logoUrl: '',

  coverPhotoUrl: 'https://picsum.photos/seed/streetfood/1200/700',
  galleryPhotos: [
    'https://picsum.photos/seed/street1/800/800',
    'https://picsum.photos/seed/street2/800/800',
    'https://picsum.photos/seed/street3/800/800',
    'https://picsum.photos/seed/street4/800/800',
    'https://picsum.photos/seed/street5/800/800',
    'https://picsum.photos/seed/street6/800/800',
  ],

  services: [
    { id: 'st1', name: 'Smash Burger',         price: '₪68', description: 'Double patty, secret sauce, American cheese' },
    { id: 'st2', name: 'Lamb Shawarma Wrap',   price: '₪52', description: 'Slow-roasted lamb, tahini, pickles, hot sauce' },
    { id: 'st3', name: 'Loaded Fries',         price: '₪38', description: 'Crispy fries, pulled meat, cheese, jalapeños' },
    { id: 'st4', name: 'Fried Chicken Bucket', price: '₪75', description: '4 pieces, spicy coating, coleslaw' },
    { id: 'st5', name: 'Soft Serve',           price: '₪18', description: 'Vanilla or chocolate, waffle cone' },
    { id: 'st6', name: 'Street Combo',         price: '₪85', description: 'Burger + fries + drink — best value' },
  ],

  phone: '050-9876543',
  email: 'eat@streeteatstlv.co.il',
  address: 'HaCarmel Market, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'street_eats_tlv',
  facebook: '',
  whatsapp: '972509876543',

  openingHours: {
    sunday:    '12:00-01:00',
    monday:    '12:00-01:00',
    tuesday:   '12:00-01:00',
    wednesday: '12:00-02:00',
    thursday:  '12:00-03:00',
    friday:    '12:00-04:00',
    saturday:  '14:00-04:00',
  },

  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'street-eats',
  publishedAt: '2024-05-10T12:00:00Z',
  createdAt:   '2024-05-10T11:00:00Z',
};

// ===== Nail Salon: "Glamour Nails" =====
const glamourNails: BusinessData = {
  id: 'mock-nailsalon-001',
  category: 'nail_salon',
  templateId: 'nail_salon_glamour',
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

// ===== Nail Salon: "Velvet Spa" (Luxury) =====
const velvetSpaNails: BusinessData = {
  id: 'mock-nailsalon-002',
  category: 'nail_salon',
  templateId: 'nail_salon_luxury',
  businessName: 'Velvet Spa',
  tagline: 'Luxury is in the details.',
  description:
    'Tel Aviv\'s premier luxury nail spa. Set in a serene dark environment with purple and gold accents, Velvet Spa offers the ultimate in nail care and relaxation. Appointments only.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/luxurynails/1200/800',
  galleryPhotos: [
    'https://picsum.photos/seed/luxnail1/800/800',
    'https://picsum.photos/seed/luxnail2/800/800',
    'https://picsum.photos/seed/luxnail3/800/800',
    'https://picsum.photos/seed/luxnail4/800/800',
    'https://picsum.photos/seed/luxnail5/800/800',
    'https://picsum.photos/seed/luxnail6/800/800',
  ],
  services: [
    { id: 'lx1', name: 'Signature Manicure',     price: '₪160', description: 'Premium gel with cuticle treatment and massage' },
    { id: 'lx2', name: 'Couture Pedicure',        price: '₪200', description: 'Full spa pedicure, paraffin wax, 45-min' },
    { id: 'lx3', name: 'Diamond Nail Art',        price: '₪80+', description: 'Swarovski crystals, 24K gold leaf designs' },
    { id: 'lx4', name: 'Nail Reconstruction',     price: '₪250', description: 'Damaged nail restoration, full set' },
    { id: 'lx5', name: 'VIP Package (2hr)',        price: '₪450', description: 'Full mani + pedi + hand massage + champagne' },
    { id: 'lx6', name: 'Bridal Package',           price: '₪650', description: 'Bridal nails + trial + day-of touch-up' },
  ],
  phone: '03-9876543',
  email: 'hello@velvetspa.co.il',
  address: 'Ibn Gabirol St 88, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'velvet_spa_tlv',
  facebook: '',
  whatsapp: '97239876543',
  openingHours: {
    sunday: 'closed', monday: '10:00-20:00', tuesday: '10:00-20:00',
    wednesday: '10:00-20:00', thursday: '10:00-21:00', friday: '09:00-15:00', saturday: 'closed',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'luxury-nails',
  publishedAt: '2024-05-20T10:00:00Z',
  createdAt:   '2024-05-20T09:00:00Z',
};

// ===== Nail Salon: "Studio N" (Minimal) =====
const studioNNails: BusinessData = {
  id: 'mock-nailsalon-003',
  category: 'nail_salon',
  templateId: 'nail_salon_minimal',
  businessName: 'Studio N',
  tagline: 'Less is more. Always.',
  description:
    'Studio N is a minimalist nail studio in Neve Tzedek, Tel Aviv. Clean lines, curated palettes, and meticulous technique. No clutter — just perfect nails.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/minimalnails/1200/700',
  galleryPhotos: [
    'https://picsum.photos/seed/minnail1/800/600',
    'https://picsum.photos/seed/minnail2/800/600',
    'https://picsum.photos/seed/minnail3/800/600',
    'https://picsum.photos/seed/minnail4/800/600',
  ],
  services: [
    { id: 'mn1', name: 'Essential Manicure',    price: '₪90',  description: 'Shape, cuticle care, one-coat polish' },
    { id: 'mn2', name: 'Gel Color',             price: '₪130', description: 'Long-lasting gel, 200+ colour options' },
    { id: 'mn3', name: 'Graphic Nail Art',      price: '₪60+', description: 'Minimalist geometric designs, per nail' },
    { id: 'mn4', name: 'Clean Pedicure',        price: '₪100', description: 'Medical-grade care, no frills' },
  ],
  phone: '054-1112233',
  email: 'hi@studionails.co.il',
  address: 'Shabazi St 12, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'studio_n_nails',
  facebook: '',
  whatsapp: '972541112233',
  openingHours: {
    sunday: 'closed', monday: '10:00-19:00', tuesday: '10:00-19:00',
    wednesday: '10:00-19:00', thursday: '10:00-19:00', friday: '09:00-14:00', saturday: 'closed',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'minimal-nails',
  publishedAt: '2024-06-01T10:00:00Z',
  createdAt:   '2024-06-01T09:00:00Z',
};

// ===== Gym: "IronForge Gym" (Fire) =====
const ironforgeGym: BusinessData = {
  id: 'mock-gym-001',
  category: 'gym',
  templateId: 'gym_fire',
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

// ===== Gym: "Pro Sports Club" (Athlete) =====
const proSportsClub: BusinessData = {
  id: 'mock-gym-002',
  category: 'gym',
  templateId: 'gym_athlete',
  businessName: 'Pro Sports Club',
  tagline: 'Train like a professional.',
  description:
    'Jerusalem\'s leading professional training facility. Cutting-edge equipment, certified coaches, and structured training programs for every level — from beginner to elite athlete.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/athletegym/1200/700',
  galleryPhotos: [
    'https://picsum.photos/seed/sport1/800/600',
    'https://picsum.photos/seed/sport2/800/600',
    'https://picsum.photos/seed/sport3/800/600',
    'https://picsum.photos/seed/sport4/800/600',
    'https://picsum.photos/seed/sport5/800/600',
    'https://picsum.photos/seed/sport6/800/600',
  ],
  services: [
    { id: 'ps1', name: 'Athlete Membership',   price: '₪299', description: 'Full access + 2 PT sessions/month' },
    { id: 'ps2', name: 'Strength & Conditioning', price: '₪200', description: '6-week structured program with coach' },
    { id: 'ps3', name: 'HIIT Bootcamp',        price: '₪55',  description: '45-min group training, max 10 people' },
    { id: 'ps4', name: '1-on-1 Coaching',      price: '₪220', description: '90-min personalized session' },
    { id: 'ps5', name: 'Sports Physio',        price: '₪180', description: 'Injury prevention & recovery session' },
    { id: 'ps6', name: 'Annual Elite Plan',    price: '₪2490', description: 'All-inclusive: training + nutrition + physio' },
  ],
  phone: '02-3456789',
  email: 'info@prosportsclub.co.il',
  address: 'Herzl St 55, Jerusalem',
  city: 'Jerusalem',
  instagram: 'pro_sports_club',
  facebook: '',
  whatsapp: '97223456789',
  openingHours: {
    sunday: '06:00-22:00', monday: '06:00-22:00', tuesday: '06:00-22:00',
    wednesday: '06:00-22:00', thursday: '06:00-22:00', friday: '07:00-17:00', saturday: '08:00-15:00',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'athlete-gym',
  publishedAt: '2024-06-10T10:00:00Z',
  createdAt:   '2024-06-10T09:00:00Z',
};

// ===== Gym: "Balance Yoga Studio" (Zen) =====
const balanceYogaStudio: BusinessData = {
  id: 'mock-gym-003',
  category: 'gym',
  templateId: 'gym_zen',
  businessName: 'Balance Yoga',
  tagline: 'Find your centre. Find yourself.',
  description:
    'A serene yoga and wellness studio in the heart of Tel Aviv. Whether you\'re a complete beginner or an advanced practitioner, our experienced teachers guide you to deeper awareness, strength, and peace.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/yogastudio/1200/700',
  galleryPhotos: [
    'https://picsum.photos/seed/yoga1/800/600',
    'https://picsum.photos/seed/yoga2/800/600',
    'https://picsum.photos/seed/yoga3/800/600',
    'https://picsum.photos/seed/yoga4/800/600',
  ],
  services: [
    { id: 'ys1', name: 'Hatha Yoga (90 min)',  price: '₪80',  description: 'Foundation class, all levels, breath & posture focus' },
    { id: 'ys2', name: 'Vinyasa Flow',          price: '₪85',  description: 'Dynamic flow, strength & flexibility' },
    { id: 'ys3', name: 'Yin & Restorative',     price: '₪75',  description: 'Deep stretching, stress release, 90 min' },
    { id: 'ys4', name: 'Private Session',       price: '₪280', description: '60-min one-on-one, fully personalised' },
    { id: 'ys5', name: 'Monthly Unlimited',     price: '₪350', description: 'All classes, any time' },
    { id: 'ys6', name: 'Intro Week',            price: '₪99',  description: 'First 7 days unlimited — new students only' },
  ],
  phone: '050-3344556',
  email: 'hello@balanceyoga.co.il',
  address: 'Shenkin St 18, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'balance_yoga_tlv',
  facebook: '',
  whatsapp: '972503344556',
  openingHours: {
    sunday: '07:00-21:00', monday: '07:00-21:00', tuesday: '07:00-21:00',
    wednesday: '07:00-21:00', thursday: '07:00-21:00', friday: '07:00-15:00', saturday: '09:00-14:00',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'zen-studio',
  publishedAt: '2024-06-20T10:00:00Z',
  createdAt:   '2024-06-20T09:00:00Z',
};

// ===== Café: "The Daily Grind" (Cozy) =====
const theDailyGrind: BusinessData = {
  id: 'mock-cafe-001',
  category: 'cafe',
  templateId: 'cafe_cozy',
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

// ===== Café: "Neon Coffee" (Urban) =====
const neonCoffee: BusinessData = {
  id: 'mock-cafe-002',
  category: 'cafe',
  templateId: 'cafe_urban',
  businessName: 'Neon Coffee',
  tagline: 'Coffee after midnight is still coffee.',
  description:
    'Florentin\'s darkest and most beloved coffee bar. Open late, loud playlist, serious espresso. A meeting point for artists, night owls, and anyone who takes their coffee black.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/urbancafe/1200/700',
  galleryPhotos: [
    'https://picsum.photos/seed/urbcaf1/800/700',
    'https://picsum.photos/seed/urbcaf2/800/700',
    'https://picsum.photos/seed/urbcaf3/800/700',
    'https://picsum.photos/seed/urbcaf4/800/700',
    'https://picsum.photos/seed/urbcaf5/800/700',
    'https://picsum.photos/seed/urbcaf6/800/700',
  ],
  services: [
    { id: 'nc1', name: 'Black Espresso',       price: '₪14', description: 'Single origin, dialed in daily' },
    { id: 'nc2', name: 'Signature Cold Brew',  price: '₪26', description: '24-hour steep, served with oat milk' },
    { id: 'nc3', name: 'Nitro Coffee',         price: '₪28', description: 'Nitrogen-infused, creamy and cold' },
    { id: 'nc4', name: 'Avocado Toast',        price: '₪36', description: 'Sourdough, smashed avo, chili flakes' },
    { id: 'nc5', name: 'Matcha Latte',         price: '₪22', description: 'Ceremonial grade, oat milk' },
    { id: 'nc6', name: 'Late Night Pancakes',  price: '₪42', description: 'Buttermilk, maple, crispy bacon' },
  ],
  phone: '050-8877665',
  email: 'hi@neoncoffee.co.il',
  address: 'Vital St 24, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'neon_coffee_tlv',
  facebook: '',
  whatsapp: '972508877665',
  openingHours: {
    sunday: '10:00-01:00', monday: '10:00-01:00', tuesday: '10:00-01:00',
    wednesday: '10:00-02:00', thursday: '10:00-03:00', friday: '10:00-04:00', saturday: '12:00-04:00',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'urban-coffee',
  publishedAt: '2024-07-01T10:00:00Z',
  createdAt:   '2024-07-01T09:00:00Z',
};

// ===== Café: "The Garden Café" (Garden) =====
const theGardenCafe: BusinessData = {
  id: 'mock-cafe-003',
  category: 'cafe',
  templateId: 'cafe_garden',
  businessName: 'The Garden Café',
  tagline: 'Nature\'s table, always set.',
  description:
    'Nestled inside Ein Hod\'s botanical garden, The Garden Café serves organic, seasonal food and freshly brewed coffee surrounded by plants, birdsong, and natural light. A genuine escape.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/gardencafe/1200/700',
  galleryPhotos: [
    'https://picsum.photos/seed/gard1/800/600',
    'https://picsum.photos/seed/gard2/800/600',
    'https://picsum.photos/seed/gard3/800/600',
    'https://picsum.photos/seed/gard4/800/600',
  ],
  services: [
    { id: 'gc1', name: 'Garden Latte',          price: '₪20', description: 'Lavender or rose, house-made syrups' },
    { id: 'gc2', name: 'Granola Bowl',           price: '₪38', description: 'House granola, seasonal fruits, yoghurt' },
    { id: 'gc3', name: 'Herbal Tea Pot',         price: '₪22', description: 'Fresh herbs from our garden, pot serves 2' },
    { id: 'gc4', name: 'Garden Salad',           price: '₪44', description: 'Picked fresh daily, lemon-herb dressing' },
    { id: 'gc5', name: 'Carrot Cake',            price: '₪30', description: 'Wholesome, walnut, cream cheese frosting' },
    { id: 'gc6', name: 'Picnic Basket (2 pax)',  price: '₪120', description: 'For two, with sandwiches, pastries and juice' },
  ],
  phone: '04-9988776',
  email: 'hello@thegardencafe.co.il',
  address: 'Ein Hod Artists Village',
  city: 'Ein Hod',
  instagram: 'the_garden_cafe',
  facebook: '',
  whatsapp: '97249988776',
  openingHours: {
    sunday: '08:00-17:00', monday: '08:00-17:00', tuesday: '08:00-17:00',
    wednesday: '08:00-17:00', thursday: '08:00-17:00', friday: '08:00-15:00', saturday: '09:00-16:00',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'garden-cafe',
  publishedAt: '2024-07-10T10:00:00Z',
  createdAt:   '2024-07-10T09:00:00Z',
};

// ===== Photography: "Lens & Light" (Minimal) =====
const lensAndLight: BusinessData = {
  id: 'mock-photography-001',
  category: 'photography',
  templateId: 'photography_minimal',
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

// ===== Photography: "Darkroom Studio" (Dark) =====
const darkroomStudio: BusinessData = {
  id: 'mock-photography-002',
  category: 'photography',
  templateId: 'photography_dark',
  businessName: 'Darkroom Studio',
  tagline: 'Light. Shadow. Truth.',
  description:
    'Haifa-based fine-art and documentary photographer. Shooting exclusively on film and high-end digital. Specialising in moody portraiture, street photography, and editorial work that tells real stories.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/darkroom/1200/800',
  galleryPhotos: [
    'https://picsum.photos/seed/dark1/1200/800',
    'https://picsum.photos/seed/dark2/1200/800',
    'https://picsum.photos/seed/dark3/1200/800',
    'https://picsum.photos/seed/dark4/1200/800',
    'https://picsum.photos/seed/dark5/1200/800',
    'https://picsum.photos/seed/dark6/1200/800',
  ],
  services: [
    { id: 'dr1', name: 'Documentary Portrait', price: '₪700',  description: '2-hour street or location shoot, 15 edited prints' },
    { id: 'dr2', name: 'Film Roll Session',     price: '₪500',  description: '1 roll of 36 exp. medium format, hand-developed' },
    { id: 'dr3', name: 'Editorial Package',     price: '₪2500', description: 'Half-day, publication-ready, includes print license' },
    { id: 'dr4', name: 'Darkroom Workshop',     price: '₪320',  description: 'Learn to develop your own black & white prints' },
    { id: 'dr5', name: 'Cinematic Wedding',     price: '₪6500', description: 'Full day, film + digital hybrid, 350+ images' },
    { id: 'dr6', name: 'Print Order',           price: '₪180',  description: 'Fine-art darkroom print, signed & framed' },
  ],
  phone: '052-1122334',
  email: 'dan@darkroomstudio.co.il',
  address: 'German Colony, Haifa',
  city: 'Haifa',
  instagram: 'darkroom.studio.il',
  facebook: '',
  whatsapp: '972521122334',
  openingHours: {
    sunday: 'closed', monday: '10:00-18:00', tuesday: '10:00-18:00',
    wednesday: '10:00-18:00', thursday: '10:00-18:00', friday: '10:00-14:00', saturday: 'closed',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'dark-room-photography',
  publishedAt: '2024-07-20T10:00:00Z',
  createdAt:   '2024-07-20T09:00:00Z',
};

// ===== Photography: "VISIO Studio" (Studio) =====
const visioStudio: BusinessData = {
  id: 'mock-photography-003',
  category: 'photography',
  templateId: 'photography_studio',
  businessName: 'VISIO Studio',
  tagline: 'Where brands come to life.',
  description:
    'Tel Aviv\'s leading commercial photography studio. We work with brands, agencies, and individuals to create stunning visual content — from product photography to fashion campaigns.',
  logoUrl: '',
  coverPhotoUrl: 'https://picsum.photos/seed/visiostudio/1200/800',
  galleryPhotos: [
    'https://picsum.photos/seed/vis1/1200/800',
    'https://picsum.photos/seed/vis2/1200/800',
    'https://picsum.photos/seed/vis3/1200/800',
    'https://picsum.photos/seed/vis4/1200/800',
    'https://picsum.photos/seed/vis5/1200/800',
    'https://picsum.photos/seed/vis6/1200/800',
  ],
  services: [
    { id: 'vs1', name: 'Product Photography',  price: '₪800',  description: '1 hour, 20 images, white/colour backdrop' },
    { id: 'vs2', name: 'Brand Campaign',       price: '₪3500', description: 'Half-day, concept + shoot + retouching' },
    { id: 'vs3', name: 'Headshot Session',     price: '₪500',  description: '45-min, 5 final images, 3 backgrounds' },
    { id: 'vs4', name: 'Fashion Editorial',    price: '₪4500', description: 'Full day, stylist included, print-ready' },
    { id: 'vs5', name: 'Social Media Pack',    price: '₪1200', description: '30 images optimised for Instagram + TikTok' },
    { id: 'vs6', name: 'Studio Rental',        price: '₪600',  description: 'Per half-day, full lighting kit included' },
  ],
  phone: '03-7654321',
  email: 'book@visiostudio.co.il',
  address: 'HaBarzel St 22, Tel Aviv',
  city: 'Tel Aviv',
  instagram: 'visio.studio.il',
  facebook: '',
  whatsapp: '97237654321',
  openingHours: {
    sunday: '09:00-18:00', monday: '09:00-18:00', tuesday: '09:00-18:00',
    wednesday: '09:00-18:00', thursday: '09:00-19:00', friday: '09:00-14:00', saturday: 'closed',
  },
  ownerUid:      'mock-owner',
  ownerEmail:    'demo@siteforge.com',
  ownerName:     'Demo User',
  ownerPhotoUrl: '',
  slug: 'studio-photography',
  publishedAt: '2024-08-01T10:00:00Z',
  createdAt:   '2024-08-01T09:00:00Z',
};

// ===== Lookup map =====
const MOCK_DB: Record<string, BusinessData> = {
  // Barbershop
  'cohens-barbershop':     cohensBarberShop,
  // Restaurant
  'mamas-restaurant':      mamasRestaurant,
  'upscale-restaurant':    noirGoldRestaurant,
  'street-eats':           streetEatsRestaurant,
  // Nail Salon
  'glamour-nails':         glamourNails,
  'luxury-nails':          velvetSpaNails,
  'minimal-nails':         studioNNails,
  // Gym
  'ironforge-gym':         ironforgeGym,
  'athlete-gym':           proSportsClub,
  'zen-studio':            balanceYogaStudio,
  // Café
  'the-daily-grind':       theDailyGrind,
  'urban-coffee':          neonCoffee,
  'garden-cafe':           theGardenCafe,
  // Photography
  'lens-and-light':        lensAndLight,
  'dark-room-photography': darkroomStudio,
  'studio-photography':    visioStudio,
};

export function getMockBusiness(slug: string): BusinessData | null {
  return MOCK_DB[slug] ?? null;
}
