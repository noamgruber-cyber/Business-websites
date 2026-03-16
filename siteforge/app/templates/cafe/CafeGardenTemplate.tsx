'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const headingFont = "var(--font-playfair), 'Playfair Display', Georgia, serif";

const DAYS: (keyof OpeningHours)[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default function CafeGardenTemplate({ business }: { business: BusinessData }) {
  const coverPhoto = business.coverPhotoUrl || (business.galleryPhotos[0] ?? '');
  const galleryPhotos = business.galleryPhotos ?? [];
  const menuCategories = business.services ?? [];

  return (
    <div style={{ backgroundColor: '#f7fdf4', color: '#1a1a1a', fontFamily: 'Inter, system-ui, sans-serif', margin: 0, padding: 0 }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(22,163,74,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 64,
      }}>
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 20, color: '#064e3b' }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a href="#menu" style={{ color: '#16a34a', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Menu</a>
          <a href="#gallery" style={{ color: '#16a34a', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Gallery</a>
          <a href="#contact" style={{ color: '#16a34a', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Contact</a>
          <a href="#contact" style={{
            backgroundColor: '#16a34a',
            color: '#fff',
            fontSize: 14,
            padding: '9px 22px',
            borderRadius: 9999,
            textDecoration: 'none',
            fontWeight: 600,
          }}>
            Visit Us 🌿
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        {/* Soft gradient overlay from bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(255,255,255,0.5) 0%, transparent 60%)',
        }} />

        {/* Floating plant emojis */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 100, left: '6%', fontSize: 48, opacity: 0.6, zIndex: 1, pointerEvents: 'none' }}>🌿</div>
        <div aria-hidden="true" style={{ position: 'absolute', top: 120, right: '7%', fontSize: 40, opacity: 0.6, zIndex: 1, pointerEvents: 'none' }}>🍃</div>
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 120, left: '10%', fontSize: 36, opacity: 0.6, zIndex: 1, pointerEvents: 'none' }}>🌱</div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: 700,
          }}
        >
          <h1 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 700,
            color: '#064e3b',
            lineHeight: 1.1,
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
          }}>
            {business.businessName}
          </h1>
          <p style={{
            color: '#78350f',
            fontSize: 18,
            fontStyle: 'italic',
            marginBottom: 32,
            fontFamily: headingFont,
          }}>
            {business.tagline ?? 'A garden café experience'}
          </p>
          <a href="#menu" style={{
            display: 'inline-block',
            backgroundColor: '#16a34a',
            color: '#fff',
            borderRadius: 9999,
            padding: '14px 40px',
            fontWeight: 600,
            fontSize: 16,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(22,163,74,0.25)',
          }}>
            Explore Our Menu 🌿
          </a>
        </motion.div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" style={{ backgroundColor: '#fff', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Large leaf watermark */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 200,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 0,
          lineHeight: 1,
        }}>
          🌿
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#064e3b',
            marginBottom: 48,
            textAlign: 'center',
          }}>
            Our Menu
          </h2>

          {menuCategories.length === 0 && (
            <p style={{ color: '#78350f', fontSize: 14, textAlign: 'center' }}>Menu coming soon.</p>
          )}

          {menuCategories.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0' }}>
                      {/* Green dot */}
                      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16a34a', flexShrink: 0 }} />
                      {/* Name */}
                      <span style={{
                        fontFamily: headingFont,
                        color: '#064e3b',
                        fontSize: 16,
                        fontWeight: 600,
                        flex: 1,
                      }}>
                        {item.name}
                        {item.description && (
                          <span style={{ display: 'block', fontFamily: 'Inter, system-ui, sans-serif', color: '#78716c', fontSize: 12, fontWeight: 400, fontStyle: 'normal', marginTop: 2 }}>
                            {item.description}
                          </span>
                        )}
                      </span>
                      {/* Price */}
                      <span style={{ color: '#16a34a', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
                        {item.price}
                      </span>
                    </div>
                    {itemIdx < menuCategories.length - 1 && (
                      <div style={{ height: 1, backgroundColor: 'rgba(22,163,74,0.1)', marginLeft: 20 }} />
                    )}
                  </div>
          ))}
        </motion.div>
      </section>

      {/* ── GALLERY ── */}
      {galleryPhotos.length > 0 && (
        <section id="gallery" style={{ backgroundColor: '#f7fdf4', padding: '80px 40px' }}>
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
              color: '#064e3b',
              marginBottom: 40,
              textAlign: 'center',
            }}>
              Gallery
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {galleryPhotos.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    aspectRatio: '1/1',
                    backgroundImage: `url(${photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 16,
                    border: '2px solid transparent',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(22,163,74,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#16a34a';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(22,163,74,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(22,163,74,0.08)';
                  }}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" style={{ backgroundColor: '#d1fae5', padding: '80px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: 560, margin: '0 auto' }}
        >
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#064e3b',
            marginBottom: 40,
            textAlign: 'center',
          }}>
            Visit Us 🌿
          </h2>

          {/* White card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: '36px 36px',
            boxShadow: '0 4px 24px rgba(22,163,74,0.08)',
            marginBottom: 24,
          }}>
            {/* Address */}
            {business.address && (
              <div style={{ marginBottom: 20 }}>
                <span style={{ color: '#16a34a', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Address</span>
                <span style={{ color: '#064e3b', fontSize: 15 }}>{business.address}</span>
              </div>
            )}

            {/* Phone */}
            {business.phone && (
              <div style={{ marginBottom: 20 }}>
                <span style={{ color: '#16a34a', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Phone</span>
                <TrackedLink type="phone" slug={business.slug} href={`tel:${business.phone}`} style={{ color: '#064e3b', fontSize: 15, textDecoration: 'none' }}>
                  {business.phone}
                </TrackedLink>
              </div>
            )}

            {/* Email */}
            {business.email && (
              <div style={{ marginBottom: 20 }}>
                <span style={{ color: '#16a34a', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Email</span>
                <span style={{ color: '#064e3b', fontSize: 15 }}>{business.email}</span>
              </div>
            )}

            {/* Hours */}
            {business.openingHours && (
              <div>
                <span style={{ color: '#16a34a', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Hours</span>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {DAYS.map((day) => {
                      const val = business.openingHours?.[day];
                      if (!val) return null;
                      return (
                        <tr key={day} style={{ borderBottom: '1px solid rgba(22,163,74,0.1)' }}>
                          <td style={{ padding: '9px 0', color: '#78716c', fontSize: 13, textTransform: 'capitalize', width: 120 }}>
                            {day}
                          </td>
                          <td style={{ padding: '9px 0', color: val === 'closed' ? '#a3a3a3' : '#064e3b', fontSize: 13, textAlign: 'right', fontWeight: val === 'closed' ? 400 : 500 }}>
                            {val === 'closed' ? 'Closed' : val}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* WhatsApp */}
          {business.whatsapp && (
            <TrackedLink
              type="whatsapp"
              slug={business.slug}
              href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20book`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: '#16a34a',
                color: '#fff',
                borderRadius: 9999,
                padding: '14px 40px',
                fontWeight: 600,
                fontSize: 16,
                textDecoration: 'none',
                textAlign: 'center',
                marginBottom: 12,
                boxShadow: '0 4px 16px rgba(22,163,74,0.2)',
              }}
            >
              WhatsApp Us 🌿
            </TrackedLink>
          )}

          {/* Instagram */}
          {business.instagram && (
            <TrackedLink
              type="instagram"
              slug={business.slug}
              href={`https://instagram.com/${(business.instagram ?? '').replace('@', '')}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: 'transparent',
                border: '2px solid #16a34a',
                color: '#16a34a',
                borderRadius: 9999,
                padding: '12px 40px',
                fontWeight: 600,
                fontSize: 15,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Follow us on Instagram
            </TrackedLink>
          )}
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#f7fdf4', padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(22,163,74,0.12)' }}>
        <div style={{ fontFamily: headingFont, fontWeight: 700, color: '#064e3b', fontSize: 20, marginBottom: 8 }}>
          {business.businessName}
        </div>
        <p style={{ color: '#78716c', fontSize: 12, marginBottom: 8 }}>
          &copy; {new Date().getFullYear()} {business.businessName}. All rights reserved.
        </p>
        <Link href="https://siteforge.co" style={{ color: '#16a34a', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
          Powered by SiteForge
        </Link>
      </footer>

      {/* ── FLOATING BADGE ── */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        backgroundColor: '#16a34a',
        color: '#fff',
        fontSize: 12,
        fontWeight: 700,
        padding: '8px 16px',
        borderRadius: 8,
        zIndex: 9999,
        letterSpacing: '0.02em',
        boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
      }}>
        ⚡ Made with SiteForge
      </div>
    </div>
  );
}
