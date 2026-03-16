'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const ORANGE = '#f97316';

type Props = { business: BusinessData };

export default function GymHero({ business }: Props) {
  const waLink = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20join%20the%20gym`;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center overflow-hidden">
      {/* Background (gradient fallback if no cover photo) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: business.coverPhotoUrl
            ? `url(${business.coverPhotoUrl})`
            : 'linear-gradient(135deg, #050a1a 0%, #0a1535 50%, #040810 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-16 max-w-5xl mx-auto w-full">
        {/* Big condensed heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-oswald text-7xl sm:text-9xl font-bold text-white leading-none mb-3 uppercase tracking-tight"
        >
          PUSH YOUR<br />
          <span style={{ color: ORANGE }}>LIMITS</span>
        </motion.h1>

        {/* Business name */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-oswald text-2xl sm:text-3xl font-medium uppercase tracking-widest mb-3"
          style={{ color: ORANGE }}
        >
          {business.businessName}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/70 text-lg mb-10 max-w-lg"
        >
          {business.tagline}
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-8 mb-12"
        >
          {[
            { num: '500+', label: 'Members' },
            { num: '20+',  label: 'Classes/Week' },
            { num: '5',    label: 'Expert Trainers' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-oswald text-3xl font-bold" style={{ color: ORANGE }}>{num}</p>
              <p className="text-white/50 text-xs uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap gap-4"
        >
          <div className="relative">
            {/* Pulsing orange glow */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: ORANGE, filter: 'blur(16px)', opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-oswald text-lg font-bold tracking-widest uppercase px-10 py-4 text-black transition-all duration-200 hover:brightness-90"
              style={{ backgroundColor: ORANGE, display: 'block' }}
            >
              JOIN NOW →
            </a>
          </div>
          <button
            onClick={() => scrollTo('classes')}
            className="font-oswald text-lg font-bold tracking-widest uppercase px-10 py-4 text-white border-2 transition-all duration-200 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.3)' }}
          >
            Our Classes
          </button>
        </motion.div>
      </div>
    </section>
  );
}
