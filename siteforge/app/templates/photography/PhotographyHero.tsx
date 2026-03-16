'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

type Props = { business: BusinessData };

export default function PhotographyHero({ business }: Props) {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Ken Burns slow zoom (gradient fallback if no cover photo) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: business.coverPhotoUrl
            ? `url(${business.coverPhotoUrl})`
            : 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)',
        }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Minimal bottom-left: business name */}
      <div className="absolute bottom-8 left-8 z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-dm-sans text-white text-sm font-medium tracking-widest uppercase"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
        >
          {business.businessName}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-dm-sans text-white/50 text-xs mt-1 tracking-wider"
        >
          {business.city}
        </motion.p>
      </div>

      {/* Bottom-right: scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 right-8 z-10"
      >
        <p className="font-dm-sans text-white/50 text-xs tracking-widest uppercase">↓ scroll</p>
      </motion.div>
    </section>
  );
}
