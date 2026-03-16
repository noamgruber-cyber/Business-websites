'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const cormorant = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

const goldLine = (
  <div style={{ width: 80, height: 1, backgroundColor: '#d4af37', margin: '0 auto 20px' }} />
);

const ornament = (
  <div style={{ color: '#d4af37', fontSize: 13, letterSpacing: 4, marginBottom: 16, textAlign: 'center' }}>
    ——— ✦ ———
  </div>
);

const days: (keyof OpeningHours)[] = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
];

const dayLabels: Record<keyof OpeningHours, string> = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
};

export default function RestaurantUpscaleTemplate({ business }: { business: BusinessData }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hours = business.openingHours as OpeningHours | undefined;

  const menuItems = business.services;

  const galleryImages: string[] = (business.galleryPhotos as string[]) ?? [
    business.coverPhotoUrl ?? '',
    business.coverPhotoUrl ?? '',
    business.coverPhotoUrl ?? '',
  ];

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', fontFamily: 'Georgia, serif', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled ? 'rgba(15,15,15,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : 'none',
        }}
      >
        <span style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 18, color: '#d4af37', letterSpacing: 2 }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Menu', 'Gallery', 'Reserve'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontFamily: cormorant,
                opacity: 0.85,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4af37')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {business.coverPhotoUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${business.coverPhotoUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: 700 }}
        >
          {goldLine}
          {ornament}
          <h1
            style={{
              fontFamily: cormorant,
              fontSize: 'clamp(40px, 8vw, 72px)',
              fontWeight: 300,
              color: '#fff',
              margin: '0 0 16px',
              letterSpacing: 4,
              lineHeight: 1.1,
            }}
          >
            {business.businessName}
          </h1>
          {business.tagline && (
            <p style={{ fontStyle: 'italic', color: '#d4af37', fontSize: 16, marginBottom: 24, letterSpacing: 1 }}>
              {business.tagline}
            </p>
          )}
          {goldLine}
          <a
            href="#reserve"
            style={{
              display: 'inline-block',
              marginTop: 8,
              padding: '14px 40px',
              border: '1px solid #d4af37',
              color: '#d4af37',
              backgroundColor: 'transparent',
              fontFamily: cormorant,
              fontSize: 13,
              letterSpacing: 3,
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.3s, color 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4af37';
              e.currentTarget.style.color = '#0f0f0f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#d4af37';
            }}
          >
            Reserve a Table
          </a>
        </motion.div>
      </section>

      {/* Menu */}
      <section id="menu" style={{ backgroundColor: '#0f0f0f', padding: '100px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <h2
            style={{
              fontFamily: cormorant,
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 400,
              color: '#d4af37',
              margin: '0 0 12px',
              letterSpacing: 4,
            }}
          >
            Our Menu
          </h2>
          {ornament}
        </motion.div>

        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: '0 60px',
          }}
        >
          {menuItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div style={{ padding: '24px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontFamily: cormorant, fontSize: 22, color: '#fff', letterSpacing: 1 }}>
                    {item.name}
                  </span>
                  <span style={{ color: '#d4af37', fontFamily: cormorant, fontSize: 18, marginLeft: 16, whiteSpace: 'nowrap' }}>
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p style={{ fontStyle: 'italic', color: '#888', fontSize: 13, margin: 0, letterSpacing: 0.5 }}>
                    {item.description}
                  </p>
                )}
              </div>
              <div style={{ height: 1, backgroundColor: '#d4af37', opacity: 0.2 }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" style={{ backgroundColor: '#000' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {galleryImages.slice(0, 3).map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{ position: 'relative', height: 400, overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.gallery-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.gallery-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              {src && (
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(212,175,55,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <span style={{ color: '#0f0f0f', fontFamily: cormorant, fontSize: 20, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' }}>
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Reserve */}
      <section id="reserve" style={{ backgroundColor: '#111', padding: '100px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: cormorant,
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 400,
              color: '#d4af37',
              margin: '0 0 12px',
              letterSpacing: 4,
            }}
          >
            Reserve Your Table
          </h2>
          {ornament}

          {hours && (
            <div style={{ marginBottom: 48 }}>
              {days.map((day) => (
                <div
                  key={day}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(212,175,55,0.12)',
                    fontFamily: cormorant,
                    fontSize: 16,
                  }}
                >
                  <span style={{ color: '#aaa', letterSpacing: 1, textTransform: 'capitalize' }}>{dayLabels[day]}</span>
                  <span style={{ color: hours[day] === 'closed' ? '#555' : '#fff' }}>
                    {hours[day] === 'closed' ? 'Closed' : hours[day]}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {business.phone && (
              <TrackedLink
                slug={business.slug}
                type="phone"
                href={`tel:${business.phone}`}
                style={{
                  padding: '14px 36px',
                  border: '1px solid #d4af37',
                  color: '#d4af37',
                  backgroundColor: 'transparent',
                  fontFamily: cormorant,
                  fontSize: 14,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                📞 Call
              </TrackedLink>
            )}
            {business.whatsapp && (
              <TrackedLink
                slug={business.slug}
                type="whatsapp"
                href={`https://wa.me/${business.whatsapp}`}
                style={{
                  padding: '14px 36px',
                  border: '1px solid #d4af37',
                  color: '#d4af37',
                  backgroundColor: 'transparent',
                  fontFamily: cormorant,
                  fontSize: 14,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                💬 WhatsApp
              </TrackedLink>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0a0a0a', padding: '48px 40px', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ fontFamily: cormorant, fontSize: 24, color: '#d4af37', letterSpacing: 4, marginBottom: 12 }}>
          {business.businessName}
        </div>
        <p style={{ color: '#444', fontSize: 12, letterSpacing: 1, margin: '0 0 8px' }}>
          © {new Date().getFullYear()} {business.businessName}. All rights reserved.
        </p>
        <Link href="/" style={{ color: '#555', fontSize: 11, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase' }}>
          Powered by SiteForge
        </Link>
      </footer>

      {/* Floating SiteForge badge */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#0f0f0f',
          border: '1px solid #d4af37',
          color: '#d4af37',
          padding: '8px 16px',
          fontSize: 11,
          letterSpacing: 1,
          fontFamily: cormorant,
          zIndex: 200,
          pointerEvents: 'none',
        }}
      >
        ⚡ Made with SiteForge
      </div>
    </div>
  );
}
