import Link from 'next/link';
import { BusinessData } from '@/lib/types';
import CafeHero    from './CafeHero';
import CafeMenu    from './CafeMenu';
import CafeGallery from './CafeGallery';
import CafeContact from './CafeContact';

const BROWN   = '#6f4e37';
const CARAMEL = '#d4a96a';

type Props = { business: BusinessData };

export default function CafeTemplate({ business }: Props) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <CafeHero    business={business} />
      <CafeMenu    business={business} />
      <CafeGallery business={business} />
      <CafeContact business={business} />

      {/* Footer */}
      <footer className="py-10 px-6 sm:px-14 text-center" style={{ backgroundColor: '#2a1d14' }}>
        <p className="font-lora text-xl font-bold text-white mb-1">{business.businessName}</p>
        <p className="font-lora italic text-sm mb-5" style={{ color: CARAMEL }}>{business.tagline}</p>
        <div className="w-10 h-px mx-auto mb-5" style={{ backgroundColor: CARAMEL + '50' }} />
        <p className="text-white/20 text-xs mb-2">
          © {new Date().getFullYear()} {business.businessName}
        </p>
        <Link href="/" className="text-white/20 hover:text-white/45 text-xs transition-colors">
          Powered by SiteForge
        </Link>
      </footer>

      <Link
        href="/"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white transition-colors"
        style={{ backgroundColor: `${BROWN}dd`, backdropFilter: 'blur(8px)', border: `1px solid ${CARAMEL}30` }}
      >
        ⚡ Made with SiteForge
      </Link>
    </div>
  );
}
