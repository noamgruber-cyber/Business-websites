import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact SiteForge — Get in Touch',
  description: 'Have a question or need support? Contact the SiteForge team. We\'re here to help you get your business online.',
  alternates: { canonical: 'https://siteforge.vercel.app/contact' },
  openGraph: {
    title: 'Contact SiteForge — Get in Touch',
    description: 'Have a question or need support? Contact the SiteForge team.',
    url: 'https://siteforge.vercel.app/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
