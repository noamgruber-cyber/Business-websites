import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Examples — SiteForge Business Websites',
  description: 'Browse beautiful website examples built with SiteForge. See templates for barbershops, restaurants, nail salons, gyms, cafes, and photography studios.',
  openGraph: {
    title: 'Examples — SiteForge Business Websites',
    description: 'Browse beautiful website examples built with SiteForge for barbershops, restaurants, nail salons, gyms, cafes, and photography studios.',
    url: 'https://siteforge.vercel.app/examples',
  },
};

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
