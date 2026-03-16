import type { Metadata } from 'next';
import Link from 'next/link';
import { getMockBusiness } from '@/lib/getMockBusiness';
import { getBusiness } from '@/lib/firestore';
import { recordView } from '@/lib/analytics';

// ── Barbershop ────────────────────────────────────────────────────────────────
import BarbershopTemplate        from '@/app/templates/barbershop/BarbershopTemplate';
import BarbershopClassicTemplate from '@/app/templates/barbershop/BarbershopClassicTemplate';
import BarbershopModernTemplate  from '@/app/templates/barbershop/BarbershopModernTemplate';
import BarbershopBoldTemplate    from '@/app/templates/barbershop/BarbershopBoldTemplate';
// ── Restaurant ────────────────────────────────────────────────────────────────
import RestaurantTemplate        from '@/app/templates/restaurant/RestaurantTemplate';
import RestaurantWarmthTemplate  from '@/app/templates/restaurant/RestaurantWarmthTemplate';
import RestaurantUpscaleTemplate from '@/app/templates/restaurant/RestaurantUpscaleTemplate';
import RestaurantStreetTemplate  from '@/app/templates/restaurant/RestaurantStreetTemplate';
// ── Nail Salon ────────────────────────────────────────────────────────────────
import NailSalonTemplate         from '@/app/templates/nail_salon/NailSalonTemplate';
import NailSalonGlamourTemplate  from '@/app/templates/nail_salon/NailSalonGlamourTemplate';
import NailSalonLuxuryTemplate   from '@/app/templates/nail_salon/NailSalonLuxuryTemplate';
import NailSalonMinimalTemplate  from '@/app/templates/nail_salon/NailSalonMinimalTemplate';
// ── Gym ───────────────────────────────────────────────────────────────────────
import GymTemplate               from '@/app/templates/gym/GymTemplate';
import GymFireTemplate           from '@/app/templates/gym/GymFireTemplate';
import GymAthleteTemplate        from '@/app/templates/gym/GymAthleteTemplate';
import GymZenTemplate            from '@/app/templates/gym/GymZenTemplate';
// ── Café ──────────────────────────────────────────────────────────────────────
import CafeTemplate              from '@/app/templates/cafe/CafeTemplate';
import CafeCozyTemplate          from '@/app/templates/cafe/CafeCozyTemplate';
import CafeUrbanTemplate         from '@/app/templates/cafe/CafeUrbanTemplate';
import CafeGardenTemplate        from '@/app/templates/cafe/CafeGardenTemplate';
// ── Photography ───────────────────────────────────────────────────────────────
import PhotographyTemplate       from '@/app/templates/photography/PhotographyTemplate';
import PhotographyMinimalTemplate from '@/app/templates/photography/PhotographyMinimalTemplate';
import PhotographyDarkTemplate   from '@/app/templates/photography/PhotographyDarkTemplate';
import PhotographyStudioTemplate from '@/app/templates/photography/PhotographyStudioTemplate';

import { BusinessData } from '@/lib/types';

type Props = { params: { slug: string } };

// ── Load business: Firestore first, fallback to mock for demo slugs ──────────
async function loadBusiness(slug: string): Promise<BusinessData | null> {
  try {
    const live = await getBusiness(slug);
    if (live) return live;
  } catch {
    // Firestore unavailable in build/dev — fall through to mock
  }
  return getMockBusiness(slug);
}

// ── SEO Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const business = await loadBusiness(params.slug);
  if (!business) return { title: 'Business Not Found — SiteForge' };

  const desc = `${business.tagline} ${business.description}`.slice(0, 155);
  return {
    title: `${business.businessName} — ${business.city}`,
    description: desc,
    openGraph: {
      title: `${business.businessName} — ${business.city}`,
      description: desc,
      images: business.coverPhotoUrl ? [{ url: business.coverPhotoUrl }] : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function BusinessPage({ params }: Props) {
  const business = await loadBusiness(params.slug);

  // Fire-and-forget analytics — don't slow down page load
  recordView(params.slug).catch(() => {});

  // 404
  if (!business) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl sm:text-9xl font-black mb-4 gradient-text leading-none">404</h1>
          <p className="text-white/60 text-xl mb-2">We couldn't find this business</p>
          <p className="text-white/30 text-sm mb-10">
            The link might be wrong, or this business hasn't published yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            ← Go back to SiteForge
          </Link>
        </div>
      </main>
    );
  }

  // Route to the right template based on templateId, with category fallback
  const tid = business.templateId ?? business.category;
  switch (tid) {
    // ── Barbershop ──
    case 'barbershop_classic': return <BarbershopClassicTemplate business={business} />;
    case 'barbershop_modern':  return <BarbershopModernTemplate  business={business} />;
    case 'barbershop_bold':    return <BarbershopBoldTemplate    business={business} />;
    case 'barbershop':         return <BarbershopTemplate        business={business} />;
    // ── Restaurant ──
    case 'restaurant_warmth':  return <RestaurantWarmthTemplate  business={business} />;
    case 'restaurant_upscale': return <RestaurantUpscaleTemplate business={business} />;
    case 'restaurant_street':  return <RestaurantStreetTemplate  business={business} />;
    case 'restaurant':         return <RestaurantTemplate        business={business} />;
    // ── Nail Salon ──
    case 'nail_salon_glamour': return <NailSalonGlamourTemplate  business={business} />;
    case 'nail_salon_luxury':  return <NailSalonLuxuryTemplate   business={business} />;
    case 'nail_salon_minimal': return <NailSalonMinimalTemplate  business={business} />;
    case 'nail_salon':         return <NailSalonTemplate         business={business} />;
    // ── Gym ──
    case 'gym_fire':           return <GymFireTemplate           business={business} />;
    case 'gym_athlete':        return <GymAthleteTemplate        business={business} />;
    case 'gym_zen':            return <GymZenTemplate            business={business} />;
    case 'gym':                return <GymTemplate               business={business} />;
    // ── Café ──
    case 'cafe_cozy':          return <CafeCozyTemplate          business={business} />;
    case 'cafe_urban':         return <CafeUrbanTemplate         business={business} />;
    case 'cafe_garden':        return <CafeGardenTemplate        business={business} />;
    case 'cafe':               return <CafeTemplate              business={business} />;
    // ── Photography ──
    case 'photography_minimal': return <PhotographyMinimalTemplate business={business} />;
    case 'photography_dark':    return <PhotographyDarkTemplate    business={business} />;
    case 'photography_studio':  return <PhotographyStudioTemplate  business={business} />;
    case 'photography':         return <PhotographyTemplate        business={business} />;

    default: {
      // Fallback by category
      switch (business.category) {
        case 'barbershop':   return <BarbershopTemplate  business={business} />;
        case 'restaurant':   return <RestaurantTemplate  business={business} />;
        case 'nail_salon':   return <NailSalonTemplate   business={business} />;
        case 'gym':          return <GymTemplate         business={business} />;
        case 'cafe':         return <CafeTemplate        business={business} />;
        case 'photography':  return <PhotographyTemplate business={business} />;
      }
      return (
        <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h1 className="text-3xl font-black text-white mb-3">Template Coming Soon</h1>
            <p className="text-white/45 mb-8">
              The <strong>{business.category}</strong> template is being built.
            </p>
            <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
              ← Back to SiteForge
            </Link>
          </div>
        </main>
      );
    }
  }
}
