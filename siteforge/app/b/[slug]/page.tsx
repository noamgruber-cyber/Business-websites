import type { Metadata } from 'next';
import Link from 'next/link';
import { getMockBusiness } from '@/lib/getMockBusiness';
import { getBusiness } from '@/lib/firestore';
import { recordView } from '@/lib/analytics';
import BarbershopTemplate   from '@/app/templates/barbershop/BarbershopTemplate';
import RestaurantTemplate   from '@/app/templates/restaurant/RestaurantTemplate';
import NailSalonTemplate    from '@/app/templates/nail_salon/NailSalonTemplate';
import GymTemplate          from '@/app/templates/gym/GymTemplate';
import CafeTemplate         from '@/app/templates/cafe/CafeTemplate';
import PhotographyTemplate  from '@/app/templates/photography/PhotographyTemplate';
import { BusinessData } from '@/lib/types';

type Props = { params: { slug: string } };

// ── Load business: Firestore first, fallback to mock for demo slugs ──────────
async function loadBusiness(slug: string): Promise<BusinessData | null> {
  // Try Firestore first
  try {
    const live = await getBusiness(slug);
    if (live) return live;
  } catch {
    // Firestore unavailable in build/dev — fall through to mock
  }

  // Fallback: mock data for the 6 demo businesses
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

  // Route to the right template
  switch (business.category) {
    case 'barbershop':   return <BarbershopTemplate  business={business} />;
    case 'restaurant':   return <RestaurantTemplate  business={business} />;
    case 'nail_salon':   return <NailSalonTemplate   business={business} />;
    case 'gym':          return <GymTemplate         business={business} />;
    case 'cafe':         return <CafeTemplate        business={business} />;
    case 'photography':  return <PhotographyTemplate business={business} />;
    default:
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
