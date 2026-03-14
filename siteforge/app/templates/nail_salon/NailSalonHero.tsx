'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const ROSE = '#d4547a';

type Props = { business: BusinessData };

export default function NailSalonHero({ business }: Props) {
  const waLink = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* ── LEFT: text content ── */}
      <div
        className="flex flex-col justify-center px-8 sm:px-14 py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #ffffff 60%)' }}
      >
        {/* Decorative sparkles */}
        {[
          { top: '10%', left: '5%',  size: 18, delay: 0 },
          { top: '22%', left: '78%', size: 12, delay: 0.5 },
          { top: '65%', left: '12%', size: 14, delay: 1 },
          { top: '80%', left: '70%', size: 10, delay: 1.5 },
          { top: '45%', left: '90%', size: 16, delay: 0.8 },
        ].map((s, i) => (
          <motion.span
            key={i}
            className="absolute pointer-events-none select-none"
            style={{ top: s.top, left: s.left, fontSize: s.size, opacity: 0.35 }}
            animate={{ y: [0, -8, 0], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 3, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✨
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          {/* Label */}
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: ROSE }}
          >
            Luxury Nail Studio
          </p>

          {/* Business name */}
          <h1
            className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            style={{ color: '#1a1a1a' }}
          >
            {business.businessName}
          </h1>

          {/* Tagline */}
          <p
            className="font-cormorant text-xl italic mb-8"
            style={{ color: ROSE }}
          >
            {business.tagline}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:brightness-90 hover:shadow-lg"
              style={{ backgroundColor: ROSE }}
            >
              Book Now
            </a>
            <button
              onClick={() => scrollTo('services')}
              className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-pink-50"
              style={{ border: `1.5px solid ${ROSE}`, color: ROSE }}
            >
              Our Services
            </button>
          </div>

          {/* Walk-ins badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#fff0f5', color: ROSE, border: `1px solid ${ROSE}40` }}
          >
            💅 Walk-ins Welcome
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT: cover photo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative min-h-[50vh] lg:min-h-full overflow-hidden"
        style={{ order: -1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={business.coverPhotoUrl || 'https://picsum.photos/seed/nailsalon/800/1000'}
          alt={business.businessName}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
