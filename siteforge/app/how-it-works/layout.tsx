import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — SiteForge',
  description: 'See how easy it is to build a website for your business with SiteForge. 3 simple steps to get online in minutes.',
  alternates: { canonical: 'https://siteforge.vercel.app/how-it-works' },
  openGraph: {
    title: 'How It Works — SiteForge',
    description: 'See how easy it is to build a website for your business with SiteForge. 3 simple steps to get online in minutes.',
    url: 'https://siteforge.vercel.app/how-it-works',
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
