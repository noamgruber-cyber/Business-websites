'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const RED = '#c0392b';

type Props = { business: BusinessData };

export default function RestaurantHero({ business }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const waLink = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20reserve%20a%20table`;

  return (
    <>
      {/* ── Sticky nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <span
            className="font-playfair text-lg font-bold tracking-wide transition-colors duration-300"
            style={{ color: scrolled ? '#2c2c2c' : 'white' }}
          >
            {business.businessName}
          </span>

          <div className="hidden sm:flex items-center gap-6">
            {['menu', 'gallery', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="capitalize text-sm font-medium transition-colors duration-200"
                style={{ color: scrolled ? '#2c2c2c' : 'rgba(255,255,255,0.85)' }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = RED)}
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.color = scrolled
                    ? '#2c2c2c'
                    : 'rgba(255,255,255,0.85)')
                }
              >
                {id === 'menu' ? 'Menu' : id === 'gallery' ? 'Gallery' : 'Contact'}
              </button>
            ))}

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-sm font-bold text-white transition-all duration-200 hover:brightness-90"
              style={{ backgroundColor: RED }}
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative h-screen flex flex-col justify-end overflow-hidden"
      >
        {/* Cover photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${business.coverPhotoUrl})` }}
        />
        {/* Warm gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Center-bottom content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 text-center pb-20 px-6"
        >
          {/* Decorative fork & knife ornament */}
          <div className="flex items-center justify-center gap-4 mb-6 opacity-70">
            <div className="h-px w-16 sm:w-24 bg-white/60" />
            <span className="text-2xl">🍴</span>
            <div className="h-px w-16 sm:w-24 bg-white/60" />
          </div>

          {/* Business name */}
          <h1 className="font-playfair text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none mb-4 tracking-tight">
            {business.businessName}
          </h1>

          {/* Tagline */}
          <p className="font-playfair text-lg sm:text-xl italic text-white/75 mb-10">
            {business.tagline}
          </p>

          {/* CTA button */}
          <button
            onClick={() => scrollTo('menu')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-gray-900 font-bold text-sm tracking-wide transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
          >
            See Our Menu ↓
          </button>
        </motion.div>
      </section>
    </>
  );
}
