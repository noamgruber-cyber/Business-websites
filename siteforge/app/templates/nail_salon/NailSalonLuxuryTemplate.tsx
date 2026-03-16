'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

// ── Design tokens ───────────────────────────────────────────────────────────
const NEAR_BLACK  = '#0d0d0d';
const PURPLE      = '#9b59b6';
const PURPLE_DARK = '#7d3c98';
const GOLD        = '#d4af37';
const WHITE       = '#ffffff';

const playfair: React.CSSProperties = {
  fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const DAYS: { key: keyof OpeningHours; label: string }[] = [
  { key: 'monday',    label: 'Monday' },
  { key: 'tuesday',   label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday',  label: 'Thursday' },
  { key: 'friday',    label: 'Friday' },
  { key: 'saturday',  label: 'Saturday' },
  { key: 'sunday',    label: 'Sunday' },
];

function fmtHours(h: OpeningHours[keyof OpeningHours]): string {
  if (!h || h === 'closed') return 'Closed';
  return String(h).replace('-', ' – ');
}

// ── Component ────────────────────────────────────────────────────────────────
export default function NailSalonLuxuryTemplate({ business }: { business: BusinessData }) {
  const coverPhoto    = business.coverPhotoUrl ?? business.galleryPhotos?.[0];
  const galleryPhotos = (business.galleryPhotos ?? []).filter(Boolean).slice(0, 6);
  const topServices   = (business.services ?? []).slice(0, 3);

  const igHandle = business.instagram
    ? business.instagram.replace(/^@/, '')
    : null;
  const igLink  = igHandle ? `https://instagram.com/${igHandle}` : null;
  const waLink  = business.whatsapp
    ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`
    : null;

  return (
    <div
      style={{
        backgroundColor: NEAR_BLACK,
        color: WHITE,
        overflowX: 'hidden',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* ══════════════════════════════════════════════════════
          HERO — split grid (left: photo | right: content)
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          minHeight: '100vh',
        }}
      >
        {/* Left: cover photo, full height, no overlay */}
        <div style={{ position: 'relative', minHeight: '50vh', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
          {coverPhoto ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={coverPhoto}
              alt={business.businessName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                position: 'absolute',
                inset: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1a0a2e 0%, #0d0d0d 100%)',
              }}
            />
          )}
        </div>

        {/* Right: dark text panel */}
        <div
          style={{
            backgroundColor: NEAR_BLACK,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 48px',
            minHeight: '50vh',
          }}
        >
          <div style={{ maxWidth: 480, width: '100%' }}>
            {/* Gold badge */}
            <div
              style={{
                display: 'inline-block',
                border: `1px solid ${GOLD}`,
                color: GOLD,
                fontSize: 10,
                fontVariant: 'small-caps',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '4px 12px',
                marginBottom: 28,
              }}
            >
              ✦ LUXURY NAIL SPA
            </div>

            {/* Business name */}
            <h1
              style={{
                ...playfair,
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 700,
                color: WHITE,
                lineHeight: 1.1,
                margin: '0 0 8px',
              }}
            >
              {business.businessName}
            </h1>

            {/* Tagline */}
            {(business.tagline || business.description) && (
              <p
                style={{
                  color: PURPLE,
                  fontStyle: 'italic',
                  fontSize: 16,
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                {business.tagline || business.description}
              </p>
            )}

            {/* Thin gold horizontal line */}
            <div
              style={{
                width: 80,
                height: 1,
                backgroundColor: GOLD,
                marginBottom: 24,
              }}
            />

            {/* Top 3 services */}
            {topServices.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {topServices.map((s, i) => (
                  <li
                    key={s.id ?? i}
                    style={{
                      fontSize: 13,
                      color: GOLD,
                      margin: '8px 0',
                      letterSpacing: '0.05em',
                    }}
                  >
                    ✦ {s.name}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA — sharp corners, gradient purple */}
            {waLink ? (
              <TrackedLink
                slug={business.slug}
                type="whatsapp"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})`,
                  color: WHITE,
                  padding: '14px 32px',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  borderRadius: 0,
                }}
              >
                Book Appointment →
              </TrackedLink>
            ) : (
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})`,
                  color: WHITE,
                  padding: '14px 32px',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  borderRadius: 0,
                }}
              >
                Book Appointment →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════ */}
      <section id="services" style={{ backgroundColor: '#111111', padding: '80px 24px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            ...playfair,
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: GOLD,
            textAlign: 'center',
            marginBottom: 48,
            fontWeight: 600,
          }}
        >
          ✦ Our Services
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          {(business.services ?? []).map((s, i) => (
            <motion.div
              key={s.id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ backgroundColor: '#222222' }}
              style={{
                backgroundColor: '#1a1a1a',
                borderTop: `3px solid ${PURPLE}`,
                padding: 24,
              }}
            >
              <p
                style={{
                  ...playfair,
                  color: GOLD,
                  fontSize: 18,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {s.name}
              </p>
              {s.price && (
                <p
                  style={{
                    color: WHITE,
                    fontSize: 20,
                    fontWeight: 700,
                    marginTop: 4,
                    marginBottom: 0,
                  }}
                >
                  {s.price}
                </p>
              )}
              {s.description && (
                <p
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 13,
                    marginTop: 8,
                    marginBottom: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {s.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALLERY — 3-column grid, purple hover overlay + ✦
      ══════════════════════════════════════════════════════ */}
      {galleryPhotos.length > 0 && (
        <section id="gallery" style={{ backgroundColor: NEAR_BLACK, padding: '80px 0' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              ...playfair,
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: GOLD,
              textAlign: 'center',
              fontWeight: 600,
              marginBottom: 32,
              padding: '0 24px',
            }}
          >
            ✦ Gallery
          </motion.h2>

          {/* 3-column grid, gap 4px */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
            }}
          >
            {galleryPhotos.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  const overlay = e.currentTarget.querySelector<HTMLElement>('[data-overlay]');
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  const overlay = e.currentTarget.querySelector<HTMLElement>('[data-overlay]');
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Gallery ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Purple hover overlay */}
                <div
                  data-overlay="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(155,89,182,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <span style={{ color: WHITE, fontSize: 32 }}>✦</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Instagram follow line */}
          {igHandle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                color: GOLD,
                textAlign: 'center',
                marginTop: 32,
                fontSize: 14,
                letterSpacing: '0.05em',
              }}
            >
              Follow us @{igHandle}
            </motion.p>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          backgroundColor: NEAR_BLACK,
          padding: '80px 24px',
          borderTop: '1px solid #1a1a1a',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}
        >
          <h2
            style={{
              ...playfair,
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: WHITE,
              fontWeight: 600,
              marginBottom: 48,
            }}
          >
            Book Your Session
          </h2>

          {/* Opening hours table — 7 days */}
          {business.openingHours && (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: 40,
                textAlign: 'left',
              }}
            >
              <tbody>
                {DAYS.map(({ key, label }) => {
                  const h = business.openingHours![key];
                  const open = typeof h === 'string' && h !== 'closed';
                  return (
                    <tr key={key}>
                      <td
                        style={{
                          padding: '8px 0',
                          color: open ? PURPLE : 'rgba(255,255,255,0.25)',
                          fontSize: 13,
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid #1a1a1a',
                          width: '50%',
                        }}
                      >
                        {label}
                      </td>
                      <td
                        style={{
                          padding: '8px 0',
                          color: open ? WHITE : 'rgba(255,255,255,0.25)',
                          fontSize: 13,
                          borderBottom: '1px solid #1a1a1a',
                          textAlign: 'right',
                        }}
                      >
                        {fmtHours(h)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Address & phone */}
          {business.address && (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 6 }}>
              {business.address}{business.city ? `, ${business.city}` : ''}
            </p>
          )}
          {business.phone && (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32 }}>
              {business.phone}
            </p>
          )}

          {/* WhatsApp CTA — full width, gradient purple */}
          {waLink && (
            <TrackedLink
              slug={business.slug}
              type="whatsapp"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})`,
                color: WHITE,
                padding: '16px 32px',
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                borderRadius: 0,
                textAlign: 'center',
                boxSizing: 'border-box',
                marginBottom: 16,
              }}
            >
              Book via WhatsApp
            </TrackedLink>
          )}

          {/* Instagram link */}
          {igLink && igHandle && (
            <TrackedLink
              slug={business.slug}
              type="instagram"
              href={igLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: GOLD,
                fontSize: 13,
                textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              @{igHandle}
            </TrackedLink>
          )}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer
        style={{
          backgroundColor: NEAR_BLACK,
          borderTop: '1px solid #1a1a1a',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            ...playfair,
            color: GOLD,
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          {business.businessName}
        </p>
        <p
          style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          © {new Date().getFullYear()} {business.businessName}. All rights reserved.
        </p>
        <Link
          href="https://siteforge.io"
          style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: 11,
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          Powered by SiteForge
        </Link>
      </footer>

      {/* ══════════════════════════════════════════════════════
          FLOATING BADGE
      ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: PURPLE,
          color: WHITE,
          fontSize: 11,
          fontWeight: 600,
          padding: '6px 12px',
          letterSpacing: '0.05em',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        ⚡ Made with SiteForge
      </div>
    </div>
  );
}
