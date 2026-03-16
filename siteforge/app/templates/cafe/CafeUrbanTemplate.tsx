'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const headingFont = "'Space Grotesk', 'DM Sans', system-ui, sans-serif";

const DAYS: (keyof OpeningHours)[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default function CafeUrbanTemplate({ business }: { business: BusinessData }) {
  const coverPhoto = business.coverPhotoUrl || (business.galleryPhotos[0] ?? '');
  const galleryPhotos = business.galleryPhotos ?? [];

  const menuCategories = business.services ?? [];

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', margin: 0, padding: 0 }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 64,
      }}>
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a href="#menu" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', letterSpacing: '0.05em' }}>MENU</a>
          <a href="#gallery" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', letterSpacing: '0.05em' }}>GALLERY</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', letterSpacing: '0.05em' }}>FIND US</a>
          <a href="#menu" style={{
            border: '1px solid rgba(255,255,255,0.7)',
            color: '#fff',
            fontSize: 11,
            letterSpacing: '0.12em',
            padding: '7px 18px',
            textDecoration: 'none',
            fontWeight: 600,
          }}>SEE MENU</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {coverPhoto && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${coverPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
        }} />

        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: '8%',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '40%',
            zIndex: 2,
          }}
        >
          <p style={{ color: '#f59e0b', fontSize: 16, marginBottom: 16, letterSpacing: '0.08em', fontWeight: 500 }}>
            {business.tagline ?? 'Specialty Coffee'}
          </p>
          <h1 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 32px 0',
          }}>
            {business.businessName}
          </h1>
          <a href="#menu" style={{
            display: 'inline-block',
            border: '1px solid #fff',
            color: '#fff',
            padding: '12px 32px',
            fontSize: 13,
            letterSpacing: '0.1em',
            fontWeight: 600,
            textDecoration: 'none',
            backgroundColor: 'transparent',
          }}>
            SEE MENU
          </a>
        </motion.div>

        {/* Right vertical text */}
        <div style={{
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          zIndex: 2,
          color: '#fff',
          fontSize: 10,
          letterSpacing: '0.4em',
          opacity: 0.3,
          whiteSpace: 'nowrap',
        }}>
          SPECIALTY COFFEE
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" style={{ backgroundColor: '#1a1a1a', padding: '80px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: 960, margin: '0 auto' }}
        >
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}>
            Our Menu
          </h2>
          <div style={{ width: 40, height: 2, backgroundColor: '#f59e0b', marginBottom: 48 }} />

          {menuCategories.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Menu coming soon.</p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {menuCategories.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: itemIdx * 0.05 }}
                    style={{
                      backgroundColor: '#222222',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 0,
                      padding: 20,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <span style={{ fontFamily: headingFont, fontWeight: 700, color: '#fff', fontSize: 16 }}>
                        {item.name}
                      </span>
                      <span style={{ color: '#f59e0b', fontSize: 18, fontWeight: 700, marginLeft: 16, flexShrink: 0 }}>
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                        {item.description}
                      </p>
                    )}
                  </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── GALLERY ── */}
      {galleryPhotos.length > 0 && (
        <section id="gallery" style={{ backgroundColor: '#1a1a1a' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ padding: '80px 40px', maxWidth: 960, margin: '0 auto' }}
          >
            <h2 style={{
              fontFamily: headingFont,
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}>
              Gallery
            </h2>
            <div style={{ width: 40, height: 2, backgroundColor: '#f59e0b', marginBottom: 48 }} />
          </motion.div>

          {/* Row 1 — dark */}
          {galleryPhotos.length > 0 && (
            <div style={{ backgroundColor: '#1a1a1a', padding: '0 40px 40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, maxWidth: 960, margin: '0 auto' }}>
                {galleryPhotos.slice(0, 3).map((photo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    style={{
                      aspectRatio: '1/1',
                      backgroundImage: `url(${photo})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Row 2 — slightly lighter */}
          {galleryPhotos.length > 3 && (
            <div style={{ backgroundColor: '#222', padding: '40px 40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, maxWidth: 960, margin: '0 auto' }}>
                {galleryPhotos.slice(3, 6).map((photo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    style={{
                      aspectRatio: '1/1',
                      backgroundImage: `url(${photo})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" style={{ backgroundColor: '#1a1a1a', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Watermark heading */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: headingFont,
          fontSize: 'clamp(80px, 15vw, 160px)',
          fontWeight: 700,
          color: '#f59e0b',
          opacity: 0.04,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
          zIndex: 0,
        }}>
          FIND US
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#f59e0b',
            marginBottom: 40,
            letterSpacing: '-0.02em',
          }}>
            FIND US
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
            {business.address && (
              <div>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.2em', display: 'block', marginBottom: 4 }}>ADDRESS</span>
                <span style={{ color: '#fff', fontSize: 15 }}>{business.address}</span>
              </div>
            )}
            {business.phone && (
              <div>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.2em', display: 'block', marginBottom: 4 }}>PHONE</span>
                <TrackedLink type="phone" slug={business.slug} href={`tel:${business.phone}`} style={{ color: '#fff', fontSize: 15, textDecoration: 'none' }}>
                  {business.phone}
                </TrackedLink>
              </div>
            )}
            {business.email && (
              <div>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.2em', display: 'block', marginBottom: 4 }}>EMAIL</span>
                <span style={{ color: '#fff', fontSize: 15 }}>{business.email}</span>
              </div>
            )}
          </div>

          {/* Hours */}
          {business.openingHours && (
            <div style={{ marginBottom: 48 }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.2em', display: 'block', marginBottom: 16 }}>HOURS</span>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {DAYS.map((day) => {
                    const val = business.openingHours?.[day];
                    if (!val) return null;
                    return (
                      <tr key={day} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px 0', color: 'rgba(255,255,255,0.5)', fontSize: 13, textTransform: 'capitalize', width: 120 }}>
                          {day}
                        </td>
                        <td style={{ padding: '10px 0', color: val === 'closed' ? 'rgba(255,255,255,0.25)' : '#fff', fontSize: 13, textAlign: 'right' }}>
                          {val === 'closed' ? 'Closed' : val}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* WhatsApp */}
          {business.whatsapp && (
            <TrackedLink
              type="whatsapp"
              slug={business.slug}
              href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20book`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#f59e0b',
                color: '#000',
                padding: '12px 32px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textDecoration: 'none',
              }}
            >
              WHATSAPP US
            </TrackedLink>
          )}
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#0d0d0d', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: headingFont, fontWeight: 700, color: '#fff', fontSize: 16, letterSpacing: '-0.02em' }}>
          {business.businessName}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
          &copy; {new Date().getFullYear()} {business.businessName}. All rights reserved.
        </span>
        <Link href="https://siteforge.co" style={{ color: '#f59e0b', fontSize: 12, textDecoration: 'none', fontWeight: 600, letterSpacing: '0.05em' }}>
          Powered by SiteForge
        </Link>
      </footer>

      {/* ── FLOATING BADGE ── */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        backgroundColor: '#f59e0b',
        color: '#000',
        fontSize: 12,
        fontWeight: 700,
        padding: '8px 16px',
        borderRadius: 4,
        zIndex: 9999,
        letterSpacing: '0.02em',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}>
        ⚡ Made with SiteForge
      </div>
    </div>
  );
}
