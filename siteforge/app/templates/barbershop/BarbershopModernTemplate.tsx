'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const INDIGO = '#6366f1';
const DARK   = '#111111';
const GRAY   = '#f8f8f8';
const MID    = '#6b7280';

type Props = { business: BusinessData };

const DAYS: { key: keyof OpeningHours; label: string }[] = [
  { key: 'sunday',    label: 'Sunday' },
  { key: 'monday',    label: 'Monday' },
  { key: 'tuesday',   label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday',  label: 'Thursday' },
  { key: 'friday',    label: 'Friday' },
  { key: 'saturday',  label: 'Saturday' },
];

function fmtHours(v: string) {
  if (!v || v === 'closed') return <span style={{ color: '#ef4444' }}>Closed</span>;
  const [a, b] = v.split('-');
  return <span>{a} – {b}</span>;
}

export default function BarbershopModernTemplate({ business }: Props) {
  const waLink  = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`;
  const igLink  = business.instagram ? `https://instagram.com/${business.instagram.replace('@', '')}` : null;
  const callLink = `tel:${business.phone}`;

  return (
    <div style={{ backgroundColor: '#fff', color: DARK, overflowX: 'hidden', fontFamily: 'var(--font-dm-sans), Inter, system-ui, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav style={{ borderBottom: '1px solid #e5e5e5', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px', color: DARK }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Services', 'Gallery', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: MID, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* ── Hero: Split layout ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', minHeight: '82vh' }}>
        {/* LEFT: text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ padding: '80px 60px 80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <p style={{ color: INDIGO, fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>
            BARBERSHOP
          </p>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, color: DARK, lineHeight: 1.05, margin: '0 0 16px', letterSpacing: '-1.5px' }}>
            {business.businessName}
          </h1>
          <p style={{ fontSize: 18, color: MID, marginBottom: 40, lineHeight: 1.6, maxWidth: 440 }}>
            {business.tagline || business.description}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            {business.whatsapp && (
              <TrackedLink
                slug={business.slug}
                type="whatsapp"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: INDIGO, color: '#fff', padding: '13px 28px',
                  fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6
                }}
              >
                Book Now
              </TrackedLink>
            )}
            <a
              href="#services"
              style={{
                border: `2px solid ${DARK}`, color: DARK, padding: '11px 26px',
                fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center'
              }}
            >
              Our Services
            </a>
          </div>

          <div style={{ borderTop: `1px solid ${DARK}`, paddingTop: 20 }}>
            {business.city && (
              <p style={{ color: MID, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {business.city}
              </p>
            )}
          </div>
        </motion.div>

        {/* RIGHT: photo */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', overflow: 'hidden', backgroundColor: GRAY }}
        >
          {business.coverPhotoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={business.coverPhotoUrl}
              alt={business.businessName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, background: GRAY }}>
              💈
            </div>
          )}
        </motion.div>
      </section>

      {/* ── Services: price list table ── */}
      <section id="services" style={{ backgroundColor: GRAY, padding: '80px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: DARK, marginBottom: 40, letterSpacing: '-0.5px' }}>
            Services & Pricing
          </h2>

          <div>
            {business.services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex', alignItems: 'baseline', padding: '16px 12px',
                  borderBottom: i < business.services.length - 1 ? '1px solid #e0e0e0' : 'none',
                  cursor: 'default',
                }}
                className="group"
                whileHover={{ backgroundColor: '#eff0ff' }}
              >
                <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: DARK }}>{s.name}</span>
                {/* Dotted line */}
                <span style={{ flex: '0 1 80px', borderBottom: '2px dotted #d1d5db', margin: '0 12px', height: 1, alignSelf: 'center' }} />
                <span style={{ fontSize: 17, fontWeight: 700, color: INDIGO, minWidth: 60, textAlign: 'right' }}>
                  {s.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery: 4-col flush ── */}
      {business.galleryPhotos.filter(Boolean).length > 0 && (
        <section id="gallery" style={{ backgroundColor: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 60px' }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: DARK, marginBottom: 32, letterSpacing: '-0.5px' }}>Gallery</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {business.galleryPhotos.filter(Boolean).slice(0, 8).map((url, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: GRAY }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} />
                <div style={{
                  position: 'absolute', inset: 0, backgroundColor: INDIGO, opacity: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#fff',
                  transition: 'opacity 0.3s ease',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  +
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section id="contact" style={{ backgroundColor: GRAY, padding: '80px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>

          {/* Left: info */}
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: DARK, marginBottom: 32, letterSpacing: '-0.5px' }}>
              Find Us
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {business.address && (
                <p style={{ color: MID, fontSize: 14 }}>📍 {business.address}, {business.city}</p>
              )}
              {business.phone && (
                <TrackedLink slug={business.slug} type="phone" href={callLink} style={{ color: MID, fontSize: 14, textDecoration: 'none' }}>
                  📞 {business.phone}
                </TrackedLink>
              )}
              {business.email && (
                <a href={`mailto:${business.email}`} style={{ color: MID, fontSize: 14, textDecoration: 'none' }}>
                  ✉️ {business.email}
                </a>
              )}
            </div>

            {/* Hours table */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: MID, marginBottom: 12 }}>
                Opening Hours
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {DAYS.map(({ key, label }) => (
                    <tr key={key} style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <td style={{ padding: '8px 0', color: MID, fontSize: 13 }}>{label}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, fontSize: 13, color: DARK }}>
                        {fmtHours(business.openingHours[key])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: booking CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: 48, border: `2px solid ${DARK}`, width: '100%' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: INDIGO, marginBottom: 16 }}>
                Ready?
              </p>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: DARK, marginBottom: 12, letterSpacing: '-0.5px' }}>
                Book Your Appointment
              </h3>
              <p style={{ color: MID, fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
                We confirm within minutes. Walk-ins welcome, appointments preferred.
              </p>
              {business.whatsapp && (
                <TrackedLink
                  slug={business.slug}
                  type="whatsapp"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', width: '100%', padding: '14px', backgroundColor: INDIGO,
                    color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Book via WhatsApp →
                </TrackedLink>
              )}
              {igLink && (
                <TrackedLink
                  slug={business.slug}
                  type="instagram"
                  href={igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', marginTop: 12, color: MID, fontSize: 13, textDecoration: 'none', textAlign: 'center' }}
                >
                  @{business.instagram}
                </TrackedLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e5e5', padding: '24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 800, fontSize: 15, color: DARK }}>{business.businessName}</span>
          <span style={{ color: MID, fontSize: 12 }}>© {new Date().getFullYear()} {business.businessName}</span>
          <Link href="/" style={{ color: MID, fontSize: 11, textDecoration: 'none' }}>
            Powered by SiteForge ⚡
          </Link>
        </div>
      </footer>

      {/* Floating badge */}
      <Link
        href="/"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
        style={{ backgroundColor: INDIGO, color: '#fff', backdropFilter: 'blur(8px)' }}
      >
        ⚡ Made with SiteForge
      </Link>
    </div>
  );
}
