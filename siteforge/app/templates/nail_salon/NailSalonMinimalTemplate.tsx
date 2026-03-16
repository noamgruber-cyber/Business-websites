'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

// ── Design tokens ── pure black & white only ─────────────────────────────────
const BLACK = '#000000';
const WHITE = '#ffffff';

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

// ── Minimal fade-in variant (opacity only, no y) ─────────────────────────────
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function NailSalonMinimalTemplate({ business }: { business: BusinessData }) {
  const coverPhoto    = business.coverPhotoUrl ?? business.galleryPhotos?.[0];
  const galleryPhotos = (business.galleryPhotos ?? []).filter(Boolean).slice(0, 8);

  const igHandle = business.instagram ? business.instagram.replace(/^@/, '') : null;
  const igLink   = igHandle ? `https://instagram.com/${igHandle}` : null;
  const waLink   = business.whatsapp
    ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`
    : null;
  const callLink = business.phone ? `tel:${business.phone}` : null;

  return (
    <div
      style={{
        backgroundColor: WHITE,
        color: BLACK,
        overflowX: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ══════════════════════════════════════════════════════
          NAVBAR — minimal, white, 1px black border
      ══════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: WHITE,
          borderBottom: `1px solid ${BLACK}`,
          padding: '0 40px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: business name */}
        <span
          style={{
            ...playfair,
            fontSize: 16,
            fontWeight: 700,
            color: BLACK,
          }}
        >
          {business.businessName}
        </span>

        {/* Right: nav links */}
        <div style={{ display: 'flex', gap: 32 }}>
          {['Services', 'Gallery', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{
                color: BLACK,
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO — pure white, typography only, photo below
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: WHITE,
          padding: '120px 40px 80px',
          textAlign: 'center',
        }}
      >
        {/* Giant business name — Playfair, thin (300) */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={{
            ...playfair,
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: 300,
            color: BLACK,
            lineHeight: 0.9,
            marginBottom: 24,
            wordBreak: 'break-word',
          }}
        >
          {business.businessName}
        </motion.h1>

        {/* Thin black line */}
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: BLACK,
            margin: '24px 0',
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: BLACK,
            fontStyle: 'italic',
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          {business.tagline || business.description || 'Premium nail artistry'}
        </motion.p>

        {/* Two minimal text buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#services"
            style={{
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              fontSize: 14,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              margin: '0 24px',
              color: BLACK,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            — View Services
          </a>
          <a
            href="#contact"
            style={{
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              fontSize: 14,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              margin: '0 24px',
              color: BLACK,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            — Book Now
          </a>
        </motion.div>
      </section>

      {/* Cover photo — full width, below hero text */}
      {coverPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverPhoto}
            alt={business.businessName}
            style={{
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════
          SERVICES — pure typography list
      ══════════════════════════════════════════════════════ */}
      <section id="services" style={{ backgroundColor: WHITE, padding: '80px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Thin black top line above section label */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div style={{ width: '100%', height: 1, backgroundColor: BLACK, marginBottom: 16 }} />
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: 32,
                color: BLACK,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Services
            </p>
          </motion.div>

          {/* Service rows */}
          {(business.services ?? []).map((s, i) => (
            <motion.div
              key={s.id ?? i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: `1px solid ${BLACK}`,
              }}
            >
              {/* Service name — Playfair */}
              <span
                style={{
                  ...playfair,
                  fontSize: 20,
                  color: BLACK,
                  fontWeight: 400,
                }}
              >
                {s.name}
              </span>
              {/* Price */}
              {s.price && (
                <span
                  style={{
                    color: BLACK,
                    fontSize: 16,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    marginLeft: 24,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {s.price}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALLERY — 4-column, grayscale default
      ══════════════════════════════════════════════════════ */}
      {galleryPhotos.length > 0 && (
        <section id="gallery" style={{ backgroundColor: WHITE, padding: '0 0 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 32px' }}>
            <div style={{ width: '100%', height: 1, backgroundColor: BLACK, marginBottom: 16 }} />
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: BLACK,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Gallery
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 4,
            }}
          >
            {galleryPhotos.map((url, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5',
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector<HTMLImageElement>('img');
                  if (img) {
                    img.style.filter = 'grayscale(0%)';
                    img.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector<HTMLImageElement>('img');
                  if (img) {
                    img.style.filter = 'grayscale(100%)';
                    img.style.boxShadow = 'none';
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.35s ease, box-shadow 0.35s ease',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          CONTACT — ultra-minimal
      ══════════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          backgroundColor: WHITE,
          padding: '80px 40px',
          borderTop: `1px solid ${BLACK}`,
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ width: '100%', height: 1, backgroundColor: BLACK, marginBottom: 16 }} />
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: BLACK,
              marginBottom: 48,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Contact
          </p>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 64,
              alignItems: 'start',
            }}
          >
            {/* Left: info + booking link */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* "Book an appointment" as underlined TrackedLink */}
              {waLink ? (
                <TrackedLink
                  slug={business.slug}
                  type="whatsapp"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: BLACK,
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: 4,
                    marginBottom: 8,
                  }}
                >
                  Book an appointment
                </TrackedLink>
              ) : callLink ? (
                <a
                  href={callLink}
                  style={{
                    color: BLACK,
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: 4,
                    marginBottom: 8,
                  }}
                >
                  Book an appointment
                </a>
              ) : null}

              {/* Address */}
              {business.address && (
                <p
                  style={{
                    color: BLACK,
                    fontSize: 14,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {business.address}{business.city ? `, ${business.city}` : ''}
                </p>
              )}

              {/* Phone */}
              {business.phone && callLink && (
                <a
                  href={callLink}
                  style={{
                    color: BLACK,
                    fontSize: 14,
                    textDecoration: 'none',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {business.phone}
                </a>
              )}

              {/* Email */}
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  style={{
                    color: BLACK,
                    fontSize: 14,
                    textDecoration: 'none',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {business.email}
                </a>
              )}

              {/* Instagram */}
              {igLink && igHandle && (
                <TrackedLink
                  slug={business.slug}
                  type="instagram"
                  href={igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: BLACK,
                    fontSize: 13,
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  @{igHandle} on Instagram
                </TrackedLink>
              )}
            </div>

            {/* Right: hours table */}
            {business.openingHours && (
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: BLACK,
                    marginBottom: 16,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  Opening Hours
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {DAYS.map(({ key, label }) => {
                      const h = business.openingHours![key];
                      const closed = !h || h === 'closed';
                      return (
                        <tr key={key} style={{ borderBottom: `1px solid ${BLACK}` }}>
                          <td
                            style={{
                              padding: '10px 0',
                              color: BLACK,
                              fontSize: 13,
                              opacity: closed ? 0.3 : 1,
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                            }}
                          >
                            {label}
                          </td>
                          <td
                            style={{
                              padding: '10px 0',
                              textAlign: 'right',
                              fontSize: 13,
                              color: BLACK,
                              fontWeight: closed ? 400 : 600,
                              opacity: closed ? 0.3 : 1,
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                            }}
                          >
                            {fmtHours(h)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer
        style={{
          backgroundColor: WHITE,
          borderTop: `1px solid ${BLACK}`,
          padding: '32px 40px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            ...playfair,
            fontSize: 18,
            color: BLACK,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          {business.businessName}
        </p>
        <p
          style={{
            color: BLACK,
            fontSize: 12,
            opacity: 0.4,
            marginBottom: 8,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          © {new Date().getFullYear()} {business.businessName}. All rights reserved.
        </p>
        <Link
          href="https://siteforge.io"
          style={{
            color: BLACK,
            fontSize: 11,
            textDecoration: 'underline',
            opacity: 0.4,
            fontFamily: 'system-ui, -apple-system, sans-serif',
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
          backgroundColor: BLACK,
          color: WHITE,
          fontSize: 11,
          fontWeight: 600,
          padding: '6px 12px',
          letterSpacing: '0.05em',
          zIndex: 9999,
          pointerEvents: 'none',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        ⚡ Made with SiteForge
      </div>
    </div>
  );
}
