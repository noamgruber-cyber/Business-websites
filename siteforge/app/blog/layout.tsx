import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — SiteForge Business Tips',
  description: 'Guides, tips, and insights to help small business owners grow their online presence. Website building advice from SiteForge.',
  alternates: { canonical: 'https://siteforge.vercel.app/blog' },
  openGraph: {
    title: 'Blog — SiteForge Business Tips',
    description: 'Guides, tips, and insights to help small business owners grow their online presence.',
    url: 'https://siteforge.vercel.app/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
