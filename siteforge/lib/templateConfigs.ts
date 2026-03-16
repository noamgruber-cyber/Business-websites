import { BusinessCategory } from './types';

export type TemplateConfig = {
  id: string;
  category: BusinessCategory;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  accentColor: string;
  bgColor: string;
  vibe: string;
  vibeHe: string;
  previewColors: string[];
  isPremium: boolean;
};

export const templateConfigs: TemplateConfig[] = [
  // ── Barbershop ──────────────────────────────────────────────────────────────
  {
    id: 'barbershop_classic',
    category: 'barbershop',
    name: 'The Classic',
    nameHe: 'הקלאסי',
    description: 'Dark and gold — timeless masculinity',
    descriptionHe: 'כהה וזהב — מאסקוליני ונצחי',
    accentColor: '#c8a96e',
    bgColor: '#0d0d0d',
    vibe: 'Masculine',
    vibeHe: 'מאסקולינ',
    previewColors: ['#0d0d0d', '#c8a96e', '#1a1a1a'],
    isPremium: false,
  },
  {
    id: 'barbershop_modern',
    category: 'barbershop',
    name: 'The Modern',
    nameHe: 'המודרני',
    description: 'Clean white with indigo — sharp and minimal',
    descriptionHe: 'לבן ואינדיגו — נקי ומינימליסטי',
    accentColor: '#6366f1',
    bgColor: '#ffffff',
    vibe: 'Clean',
    vibeHe: 'נקי',
    previewColors: ['#ffffff', '#6366f1', '#f8f8f8'],
    isPremium: false,
  },
  {
    id: 'barbershop_bold',
    category: 'barbershop',
    name: 'The Bold',
    nameHe: 'הנועז',
    description: 'Black and red — raw power',
    descriptionHe: 'שחור ואדום — עוצמה גולמית',
    accentColor: '#ef4444',
    bgColor: '#0a0a0a',
    vibe: 'Aggressive',
    vibeHe: 'נועז',
    previewColors: ['#0a0a0a', '#ef4444', '#1a1a1a'],
    isPremium: true,
  },

  // ── Restaurant ───────────────────────────────────────────────────────────────
  {
    id: 'restaurant_warmth',
    category: 'restaurant',
    name: 'The Warmth',
    nameHe: 'החמימות',
    description: 'Warm cream and deep red — family bistro feel',
    descriptionHe: 'קרם חמים ואדום עמוק — תחושת ביסטרו משפחתי',
    accentColor: '#c0392b',
    bgColor: '#faf7f2',
    vibe: 'Family',
    vibeHe: 'משפחתי',
    previewColors: ['#faf7f2', '#c0392b', '#f0ebe3'],
    isPremium: false,
  },
  {
    id: 'restaurant_upscale',
    category: 'restaurant',
    name: 'The Upscale',
    nameHe: 'היוקרתי',
    description: 'Near-black and champagne gold — Michelin-star elegance',
    descriptionHe: 'שחור וזהב שמפניה — אלגנטיות על-קלאסית',
    accentColor: '#d4af37',
    bgColor: '#0f0f0f',
    vibe: 'Luxury',
    vibeHe: 'יוקרה',
    previewColors: ['#0f0f0f', '#d4af37', '#1a1a1a'],
    isPremium: false,
  },
  {
    id: 'restaurant_street',
    category: 'restaurant',
    name: 'The Street',
    nameHe: 'הרחוב',
    description: 'Dark with electric orange — street food energy',
    descriptionHe: 'כהה עם כתום — אנרגיית אוכל רחוב',
    accentColor: '#f97316',
    bgColor: '#1a1a1a',
    vibe: 'Casual',
    vibeHe: "קז'ואל",
    previewColors: ['#1a1a1a', '#f97316', '#222222'],
    isPremium: true,
  },

  // ── Nail Salon ───────────────────────────────────────────────────────────────
  {
    id: 'nail_salon_glamour',
    category: 'nail_salon',
    name: 'The Glamour',
    nameHe: 'הגלאמור',
    description: 'Blush white and rose — feminine and glam',
    descriptionHe: 'לבן ורדרד וורוד — נשי וגלאמורי',
    accentColor: '#d4547a',
    bgColor: '#fff9fb',
    vibe: 'Feminine',
    vibeHe: 'נשי',
    previewColors: ['#fff9fb', '#d4547a', '#ffffff'],
    isPremium: false,
  },
  {
    id: 'nail_salon_luxury',
    category: 'nail_salon',
    name: 'The Luxury',
    nameHe: 'הלוקסוס',
    description: 'Dark with purple and gold — luxury spa feel',
    descriptionHe: 'כהה עם סגול וזהב — תחושת ספא יוקרתי',
    accentColor: '#9b59b6',
    bgColor: '#0d0d0d',
    vibe: 'Premium',
    vibeHe: 'פרמיום',
    previewColors: ['#0d0d0d', '#9b59b6', '#1a1a1a'],
    isPremium: false,
  },
  {
    id: 'nail_salon_minimal',
    category: 'nail_salon',
    name: 'The Minimal',
    nameHe: 'המינימלי',
    description: 'Pure white and black — Vogue editorial aesthetic',
    descriptionHe: 'לבן ושחור — אסתטיקה עיתונאית',
    accentColor: '#000000',
    bgColor: '#ffffff',
    vibe: 'Editorial',
    vibeHe: 'עיתונאי',
    previewColors: ['#ffffff', '#000000', '#f5f5f5'],
    isPremium: true,
  },

  // ── Gym ──────────────────────────────────────────────────────────────────────
  {
    id: 'gym_fire',
    category: 'gym',
    name: 'The Fire',
    nameHe: 'האש',
    description: 'Black and orange — intense and powerful',
    descriptionHe: 'שחור וכתום — אינטנסיבי ועוצמתי',
    accentColor: '#f97316',
    bgColor: '#0a0a0a',
    vibe: 'Intense',
    vibeHe: 'אינטנסיבי',
    previewColors: ['#0a0a0a', '#f97316', '#1a1a1a'],
    isPremium: false,
  },
  {
    id: 'gym_athlete',
    category: 'gym',
    name: 'The Athlete',
    nameHe: 'הספורטאי',
    description: 'Dark navy and electric blue — professional sports club',
    descriptionHe: 'כחול נייבי כהה — מועדון ספורט מקצועי',
    accentColor: '#3b82f6',
    bgColor: '#0f172a',
    vibe: 'Professional',
    vibeHe: 'מקצועי',
    previewColors: ['#0f172a', '#3b82f6', '#1e2f45'],
    isPremium: false,
  },
  {
    id: 'gym_zen',
    category: 'gym',
    name: 'The Zen',
    nameHe: 'הזן',
    description: 'Light green and emerald — yoga & wellness studio',
    descriptionHe: 'ירוק בהיר ואמרלד — סטודיו יוגה ווליינס',
    accentColor: '#10b981',
    bgColor: '#f0faf5',
    vibe: 'Wellness',
    vibeHe: 'ווליינס',
    previewColors: ['#f0faf5', '#10b981', '#ffffff'],
    isPremium: true,
  },

  // ── Café ─────────────────────────────────────────────────────────────────────
  {
    id: 'cafe_cozy',
    category: 'cafe',
    name: 'The Cozy',
    nameHe: 'הנעים',
    description: 'Warm cream and coffee brown — artisan café',
    descriptionHe: 'קרם חמים וחום קפה — קפה אומנותי',
    accentColor: '#6f4e37',
    bgColor: '#fdf8f3',
    vibe: 'Artisan',
    vibeHe: 'אומנותי',
    previewColors: ['#fdf8f3', '#6f4e37', '#f5ede0'],
    isPremium: false,
  },
  {
    id: 'cafe_urban',
    category: 'cafe',
    name: 'The Urban',
    nameHe: 'האורבני',
    description: 'Dark with yellow accents — late-night coffee bar',
    descriptionHe: 'כהה עם צהוב — בר קפה לילי',
    accentColor: '#f59e0b',
    bgColor: '#1a1a1a',
    vibe: 'Modern',
    vibeHe: 'מודרני',
    previewColors: ['#1a1a1a', '#f59e0b', '#222222'],
    isPremium: false,
  },
  {
    id: 'cafe_garden',
    category: 'cafe',
    name: 'The Garden',
    nameHe: 'הגן',
    description: 'Light green and forest green — botanical garden café',
    descriptionHe: 'ירוק בהיר וירוק יער — קפה גן בוטני',
    accentColor: '#16a34a',
    bgColor: '#f7fdf4',
    vibe: 'Natural',
    vibeHe: 'טבעי',
    previewColors: ['#f7fdf4', '#16a34a', '#ffffff'],
    isPremium: true,
  },

  // ── Photography ──────────────────────────────────────────────────────────────
  {
    id: 'photography_minimal',
    category: 'photography',
    name: 'The Minimal',
    nameHe: 'המינימלי',
    description: 'Pure white and black — editorial portfolio',
    descriptionHe: 'לבן ושחור — פורטפוליו עיתונאי',
    accentColor: '#000000',
    bgColor: '#ffffff',
    vibe: 'Editorial',
    vibeHe: 'עיתונאי',
    previewColors: ['#ffffff', '#000000', '#f5f5f5'],
    isPremium: false,
  },
  {
    id: 'photography_dark',
    category: 'photography',
    name: 'The Dark Room',
    nameHe: 'חדר החושך',
    description: 'Pure black and amber — cinematic film aesthetic',
    descriptionHe: 'שחור ואמבר — אסתטיקה קולנועית',
    accentColor: '#f59e0b',
    bgColor: '#0a0a0a',
    vibe: 'Dramatic',
    vibeHe: 'דרמטי',
    previewColors: ['#0a0a0a', '#f59e0b', '#111111'],
    isPremium: false,
  },
  {
    id: 'photography_studio',
    category: 'photography',
    name: 'The Studio',
    nameHe: 'הסטודיו',
    description: 'Near-white and purple — commercial studio energy',
    descriptionHe: 'לבן-כמעט וסגול — אנרגיית סטודיו מסחרי',
    accentColor: '#8b5cf6',
    bgColor: '#fafafa',
    vibe: 'Vibrant',
    vibeHe: 'תוסס',
    previewColors: ['#fafafa', '#8b5cf6', '#f5f5f5'],
    isPremium: true,
  },
];

export function getTemplatesForCategory(category: BusinessCategory): TemplateConfig[] {
  return templateConfigs.filter((t) => t.category === category);
}

export function getTemplateConfig(id: string): TemplateConfig | undefined {
  return templateConfigs.find((t) => t.id === id);
}

/** Returns the first template for a category — used as default/fallback */
export function getDefaultTemplateForCategory(category: BusinessCategory): TemplateConfig {
  return getTemplatesForCategory(category)[0] ?? templateConfigs[0];
}
