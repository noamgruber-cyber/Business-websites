import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SiteForge — Our Mission',
  description: 'Learn about SiteForge and our mission to help small businesses in Israel get online quickly and affordably. No coding required.',
  openGraph: {
    title: 'About SiteForge — Our Mission',
    description: 'Learn about SiteForge and our mission to help small businesses in Israel get online quickly and affordably.',
    url: 'https://siteforge.vercel.app/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
