'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const BROWN   = '#6f4e37';
const CARAMEL = '#d4a96a';

type Props = { business: BusinessData };

// Falling coffee beans animation (purely decorative)
const BEANS = [
  { left: '10%', delay: 0,   dur: 6 },
  { left: '25%', delay: 1.5, dur: 7 },
  { left: '50%', delay: 0.8, dur: 5.5 },
  { left: '70%', delay: 2.2, dur: 6.5 },
  { left: '85%', delay: 0.3, dur: 7.2 },
];

export default function CafeHero({ business }: Props) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background (gradient fallback if no cover photo) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: business.coverPhotoUrl
            ? `url(${business.coverPhotoUrl})`
            : 'linear-gradient(135deg, #1a1005 0%, #3d2a00 50%, #1a0e00 100%)',
        }}
      />
      {/* Warm gradient overlay from bottom */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BROWN}cc 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.25) 100%)` }} />

      {/* Falling beans */}
      {BEANS.map((b, i) => (
        <motion.span
          key={i}
          className="absolute top-0 pointer-events-none select-none text-xl"
          style={{ left: b.left, opacity: 0.3 }}
          animate={{ y: ['0vh', '110vh'] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'linear' }}
        >
          ☕
        </motion.span>
      ))}

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 text-center px-6"
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          style={{ backgroundColor: `${BROWN}cc`, color: CARAMEL, border: `1px solid ${CARAMEL}40` }}
        >
          ☕ Specialty Coffee
        </div>

        {/* Name */}
        <h1
          className="font-lora text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          {business.businessName}
        </h1>

        {/* Tagline */}
        <p
          className="font-lora italic text-lg sm:text-2xl mb-10"
          style={{ color: CARAMEL }}
        >
          {business.tagline}
        </p>

        {/* CTA */}
        <button
          onClick={() => scrollTo('menu')}
          className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:brightness-90 hover:shadow-lg"
          style={{ backgroundColor: CARAMEL, color: BROWN }}
        >
          See Our Menu ↓
        </button>
      </motion.div>
    </section>
  );
}
