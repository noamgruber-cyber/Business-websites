import type { Metadata } from 'next';
import Link from 'next/link';
import { getMockBusiness } from '@/lib/getMockBusiness';
import BarbershopTemplate from '@/app/templates/barbershop/BarbershopTemplate';
import RestaurantTemplate from '@/app/templates/restaurant/RestaurantTemplate';

type Props = { params: { slug: string } };

// ── SEO Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const business = getMockBusiness(params.slug);
  if (!business) {
    return { title: 'Business Not Found — SiteForge' };
  }

  const fullDescription = `${business.tagline} ${business.description}`.slice(0, 155);

  return {
    title: `${business.businessName} — ${business.city}`,
    description: fullDescription,
    openGraph: {
      title: `${business.businessName} — ${business.city}`,
      description: fullDescription,
      images: business.coverPhotoUrl ? [{ url: business.coverPhotoUrl }] : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BusinessPage({ params }: Props) {
  const business = getMockBusiness(params.slug);

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
  if (business.category === 'barbershop') {
    return <BarbershopTemplate business={business} />;
  }
  if (business.category === 'restaurant') {
    return <RestaurantTemplate business={business} />;
  }

  // Fallback for categories not yet built
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
