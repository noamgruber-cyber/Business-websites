import Link from 'next/link';
import { BusinessData } from '@/lib/types';
import PhotographyHero      from './PhotographyHero';
import PhotographyPortfolio from './PhotographyPortfolio';
import PhotographyPackages  from './PhotographyPackages';
import PhotographyContact   from './PhotographyContact';

type Props = { business: BusinessData };

export default function PhotographyTemplate({ business }: Props) {
  return (
    <div style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <PhotographyHero      business={business} />
      <PhotographyPortfolio business={business} />
      <PhotographyPackages  business={business} />
      <PhotographyContact   business={business} />

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-center border-t border-white/5">
        <p className="font-dm-sans text-white/30 text-xs mb-1">
          © {new Date().getFullYear()} {business.businessName}
        </p>
        <Link href="/" className="font-dm-sans text-white/20 hover:text-white/40 text-xs transition-colors">
          Powered by SiteForge
        </Link>
      </footer>

      {/* Floating badge */}
      <Link
        href="/"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        ⚡ Made with SiteForge
      </Link>
    </div>
  );
}
