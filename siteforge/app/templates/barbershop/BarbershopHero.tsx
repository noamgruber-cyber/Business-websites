'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const GOLD = '#c8a96e';

type Props = { business: BusinessData };

export default function BarbershopHero({ business }: Props) {
  const waLink = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${business.coverPhotoUrl})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/72" />
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.018) 12px, rgba(255,255,255,0.018) 24px)',
        }}
      />

      {/* ── Top bar ── */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-8">
        <span
          className="font-playfair text-lg font-bold tracking-wide"
          style={{ color: GOLD }}
        >
          {business.businessName}
        </span>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-none border transition-all duration-200"
          style={{ borderColor: GOLD, color: GOLD }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = GOLD;
            (e.currentTarget as HTMLAnchorElement).style.color = '#0d0d0d';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLAnchorElement).style.color = GOLD;
          }}
        >
          Book Now
        </a>
      </div>

      {/* ── Center content ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Est. badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 px-4 py-1.5 rounded-full border text-xs font-bold tracking-[0.25em] uppercase"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          Est. 2010
        </motion.div>

        {/* Business name */}
        <h1
          className="font-playfair text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none mb-5 tracking-tight"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
        >
          {business.businessName}
        </h1>

        {/* Tagline */}
        <p
          className="font-playfair text-xl sm:text-2xl italic mb-10"
          style={{ color: GOLD }}
        >
          {business.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:brightness-90"
            style={{ backgroundColor: GOLD, color: '#0d0d0d' }}
          >
            Book Appointment
          </a>
          <button
            onClick={() => scrollTo('services')}
            className="px-8 py-3.5 font-bold text-sm tracking-wider uppercase border text-white transition-all duration-200 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.5)' }}
          >
            View Services ↓
          </button>
        </div>
      </motion.div>

      {/* ── Stats strip at the bottom ── */}
      <div className="relative z-10" style={{ borderTop: `1px solid ${GOLD}40` }}>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto py-7 px-6 text-center">
          {[
            { num: '14+', label: 'Years Experience' },
            { num: '500+', label: 'Happy Clients' },
            { num: '6',   label: 'Days a Week' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p
                className="font-playfair text-3xl sm:text-4xl font-bold mb-1"
                style={{ color: GOLD }}
              >
                {num}
              </p>
              <p className="text-white/55 text-xs sm:text-sm tracking-wide uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
