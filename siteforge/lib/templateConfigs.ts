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
  // ── Other categories (future templates) ─────────────────────────────────────
  {
    id: 'restaurant',
    category: 'restaurant',
    name: 'The Bistro',
    nameHe: 'הביסטרו',
    description: 'Warm and inviting — classic restaurant feel',
    descriptionHe: 'חם ומזמין — תחושת מסעדה קלאסית',
    accentColor: '#dc2626',
    bgColor: '#1a0a00',
    vibe: 'Warm',
    vibeHe: 'חם',
    previewColors: ['#1a0a00', '#dc2626', '#2a1a0a'],
    isPremium: false,
  },
  {
    id: 'nail_salon',
    category: 'nail_salon',
    name: 'The Studio',
    nameHe: 'הסטודיו',
    description: 'Elegant feminine — pink and white',
    descriptionHe: 'אלגנטי ונשי — ורוד ולבן',
    accentColor: '#d4547a',
    bgColor: '#fff0f5',
    vibe: 'Elegant',
    vibeHe: 'אלגנטי',
    previewColors: ['#fff0f5', '#d4547a', '#ffffff'],
    isPremium: false,
  },
  {
    id: 'gym',
    category: 'gym',
    name: 'The Forge',
    nameHe: 'הפורג׳',
    description: 'Bold and energetic — dark with orange',
    descriptionHe: 'נועז ואנרגטי — כהה עם כתום',
    accentColor: '#f97316',
    bgColor: '#0a0a0a',
    vibe: 'Intense',
    vibeHe: 'אינטנסיבי',
    previewColors: ['#0a0a0a', '#f97316', '#1a1a1a'],
    isPremium: false,
  },
  {
    id: 'cafe',
    category: 'cafe',
    name: 'The Corner',
    nameHe: 'הפינה',
    description: 'Cozy and warm — coffee shop vibes',
    descriptionHe: 'נעים וחמים — אווירת קפה',
    accentColor: '#d4a96a',
    bgColor: '#3d2b1f',
    vibe: 'Cozy',
    vibeHe: 'נעים',
    previewColors: ['#3d2b1f', '#d4a96a', '#2a1a0f'],
    isPremium: false,
  },
  {
    id: 'photography',
    category: 'photography',
    name: 'The Portfolio',
    nameHe: 'הפורטפוליו',
    description: 'Minimal black — let your work speak',
    descriptionHe: 'מינימליסטי שחור — תן לעבודה לדבר',
    accentColor: '#6b7280',
    bgColor: '#000000',
    vibe: 'Minimal',
    vibeHe: 'מינימליסטי',
    previewColors: ['#000000', '#6b7280', '#111111'],
    isPremium: false,
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
