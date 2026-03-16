'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';
import { useState } from 'react';

export default function PhotographyDarkTemplate({ business }: { business: BusinessData }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const coverPhoto = business.coverPhotoUrl || (business.galleryPhotos[0] ?? '');
  const galleryPhotos = business.galleryPhotos ?? [];
  const services = business.services ?? [];

  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const formatHours = (h: string | undefined) => {
    if (!h || h === 'closed') return 'Closed';
    return h.replace('-', ' – ');
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fefce8', fontFamily: "'Courier New', monospace", minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: '#0a0a0a',
        padding: '0 32px',
        height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: "'Courier New', monospace", color: '#f59e0b', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Photography by {business.businessName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {['Portfolio', 'Packages', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'rgba(245,158,11,0.6)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
              {item}
            </a>
          ))}
          {business.email && (
            <a href={`mailto:${business.email}`} style={{ color: 'rgba(245,158,11,0.6)', fontSize: '11px', letterSpacing: '0.15em', textDecoration: 'none' }}>
              {business.email}
            </a>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        position: 'relative', height: '100vh', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src={coverPhoto}
          alt={business.businessName}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: "'Courier New', monospace", color: '#f59e0b', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px' }}
          >
            Photography by
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(36px, 7vw, 80px)',
              color: '#fefce8',
              fontWeight: 300,
              marginBottom: '24px',
              lineHeight: 1.1,
            }}
          >
            {business.businessName}
          </motion.h1>

          {/* Film strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              height: '20px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              display: 'flex',
              gap: '4px',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'fit-content',
              margin: '24px auto',
              padding: '0 12px',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '1px' }} />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ color: '#f59e0b', fontSize: '12px', letterSpacing: '0.2em', marginTop: '40px', fontFamily: "'Courier New', monospace" }}
          >
            ▼ View Work
          </motion.p>
        </div>
      </section>

      {/* Portfolio / Gallery */}
      <section id="portfolio" style={{ backgroundColor: '#0a0a0a', padding: '96px 32px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            color: '#f59e0b',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Portfolio
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {(galleryPhotos.length > 0 ? galleryPhotos : Array.from({ length: 6 }).map((_, i) => `https://placehold.co/800x600/111111/f59e0b?text=Photo+${i + 1}`)).map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={typeof photo === 'string' ? photo : (photo as any).url ?? photo}
                alt={`Gallery ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Film counter */}
              <div style={{
                position: 'absolute', bottom: '8px', right: '8px',
                fontFamily: "'Courier New', monospace",
                color: '#f59e0b',
                fontSize: '10px',
                letterSpacing: '0.2em',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '2px 6px',
              }}>
                {String(i + 1).padStart(3, '0')}
              </div>
              {/* Hover overlay */}
              {hoveredIndex === i && (
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'rgba(245,158,11,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fefce8', fontFamily: "'Courier New', monospace", fontSize: '12px', letterSpacing: '0.2em' }}>View</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" style={{ backgroundColor: '#111111', padding: '96px 32px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            color: '#f59e0b',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Packages
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          {(services.length > 0 ? services : [
            { name: 'Portrait Session', price: '$250', description: '1-hour portrait session, 30 edited images.' },
            { name: 'Wedding Coverage', price: '$1,800', description: 'Full day coverage, 400+ edited images.' },
            { name: 'Commercial Package', price: '$600', description: 'Product & brand photography, 50 images.' },
          ]).map((service: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: 0,
                padding: '28px',
              }}
            >
              <p style={{ fontFamily: "'Courier New', monospace", color: '#f59e0b', fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {service.name}
              </p>
              <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", color: '#f59e0b', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
                {service.price ?? (service.priceRange ? `${service.priceRange.min}–${service.priceRange.max}` : 'Contact us')}
              </p>
              <p style={{ color: 'rgba(254,252,232,0.4)', fontSize: '13px', lineHeight: 1.6 }}>
                {service.description ?? ''}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ backgroundColor: '#0a0a0a', padding: '96px 32px', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            color: '#fefce8',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 300,
            marginBottom: '48px',
          }}
        >
          Let&apos;s Shoot Together
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {business.email && (
            <a
              href={`mailto:${business.email}`}
              style={{ color: '#f59e0b', fontSize: '16px', fontFamily: "'Courier New', monospace", letterSpacing: '0.1em', textDecoration: 'none' }}
            >
              {business.email}
            </a>
          )}

          {business.instagram && (
            <TrackedLink type="instagram" slug={business.slug}
              href={`https://instagram.com/${business.instagram.replace('@', '')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ color: '#f59e0b', fontSize: '14px', fontFamily: "'Courier New', monospace", letterSpacing: '0.15em', textDecoration: 'none' }}>
              Instagram
            </TrackedLink>
          )}

          {business.phone && (
            <TrackedLink type="phone" slug={business.slug}
              href={`tel:${business.phone}`}
              style={{ color: '#f59e0b', fontSize: '14px', fontFamily: "'Courier New', monospace", letterSpacing: '0.15em', textDecoration: 'none' }}>
              {business.phone}
            </TrackedLink>
          )}
        </div>

        {/* Hours */}
        {business.openingHours && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ marginTop: '48px', maxWidth: '400px', margin: '48px auto 0' }}
          >
            <p style={{ fontFamily: "'Courier New', monospace", color: '#f59e0b', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Hours
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {DAYS.map((day) => {
                  const h: string | undefined = (business.openingHours as any)?.[day];
                  const isClosed = !h || h === 'closed';
                  return (
                    <tr key={day}>
                      <td style={{ padding: '4px 0', fontFamily: "'Courier New', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'capitalize', color: isClosed ? 'rgba(254,252,232,0.3)' : '#f59e0b' }}>
                        {day}
                      </td>
                      <td style={{ padding: '4px 0', fontFamily: "'Courier New', monospace", fontSize: '12px', textAlign: 'right', color: isClosed ? 'rgba(254,252,232,0.3)' : '#f59e0b' }}>
                        {h ? formatHours(h) : 'Closed'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(245,158,11,0.1)',
        padding: '32px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", color: '#f59e0b', fontSize: '20px', fontWeight: 400, marginBottom: '8px' }}>
          {business.businessName}
        </p>
        <p style={{ color: 'rgba(254,252,232,0.25)', fontSize: '12px', fontFamily: "'Courier New', monospace", marginBottom: '8px' }}>
          &copy; {new Date().getFullYear()} {business.businessName}. All rights reserved.
        </p>
        <Link href="https://siteforge.io" style={{ color: 'rgba(245,158,11,0.4)', fontSize: '11px', fontFamily: "'Courier New', monospace", letterSpacing: '0.15em', textDecoration: 'none' }}>
          Powered by SiteForge
        </Link>
      </footer>

      {/* Floating badge */}
      <div style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.8)',
        border: '1px solid rgba(245,158,11,0.5)',
        color: '#f59e0b',
        fontFamily: "'Courier New', monospace",
        fontSize: '11px',
        letterSpacing: '0.1em',
        padding: '8px 14px',
      }}>
        ⚡ Made with SiteForge
      </div>

    </div>
  );
}
