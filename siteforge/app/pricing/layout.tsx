import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — SiteForge Plans',
  description: 'Simple, transparent pricing for your business website. Start free, upgrade when you need more. No hidden fees.',
  alternates: { canonical: 'https://siteforge.vercel.app/pricing' },
  openGraph: {
    title: 'Pricing — SiteForge Plans',
    description: 'Simple, transparent pricing for your business website. Start free, upgrade when you need more.',
    url: 'https://siteforge.vercel.app/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
