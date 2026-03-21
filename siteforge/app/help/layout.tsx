import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center — SiteForge',
  description: 'Find answers to common questions about SiteForge. Learn how to build, publish, and manage your business website.',
  alternates: { canonical: 'https://siteforge.vercel.app/help' },
  openGraph: {
    title: 'Help Center — SiteForge',
    description: 'Find answers to common questions about SiteForge. Learn how to build, publish, and manage your business website.',
    url: 'https://siteforge.vercel.app/help',
  },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
