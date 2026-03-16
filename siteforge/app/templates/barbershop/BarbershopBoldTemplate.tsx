'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const RED   = '#ef4444';
const BLACK = '#0a0a0a';
const WHITE = '#ffffff';
const DIM   = 'rgba(255,255,255,0.45)';

type Props = { business: BusinessData };

const DAYS: { key: keyof OpeningHours; label: string }[] = [
  { key: 'sunday',    label: 'SUN' },
  { key: 'monday',    label: 'MON' },
  { key: 'tuesday',   label: 'TUE' },
  { key: 'wednesday', label: 'WED' },
  { key: 'thursday',  label: 'THU' },
  { key: 'friday',    label: 'FRI' },
  { key: 'saturday',  label: 'SAT' },
];

function fmtHours(v: string) {
  if (!v || v === 'closed') return <span style={{ color: RED }}>CLOSED</span>;
  const [a, b] = v.split('-');
  return <span>{a} – {b}</span>;
}

export default function BarbershopBoldTemplate({ business }: Props) {
  const waLink   = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`;
  const igLink   = business.instagram ? `https://instagram.com/${business.instagram.replace('@', '')}` : null;
  const callLink = `tel:${business.phone}`;

  const serviceNames = business.services.slice(0, 5).map((s) => s.name).join(' / ');

  return (
    <div style={{ backgroundColor: BLACK, color: WHITE, overflowX: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav style={{
        padding: '16px 40px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'fixed', top: 0,
        width: '100%', zIndex: 50, background: 'rgba(10,10,10,0.92)',
        borderBottom: `1px solid rgba(239,68,68,0.2)`,
        backdropFilter: 'blur(8px)', boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
          fontWeight: 700, fontSize: 20, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: WHITE,
        }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Services', 'Gallery', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: DIM, fontSize: 11, fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>{l}</a>
          ))}
          {business.whatsapp && (
            <TrackedLink
              slug={business.slug}
              type="whatsapp"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: RED, color: WHITE, padding: '8px 20px',
                fontSize: 11, fontWeight: 700, textDecoration: 'none',
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}
            >
              BOOK NOW
            </TrackedLink>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '120px 40px 80px',
        position: 'relative', overflow: 'hidden', backgroundColor: BLACK,
      }}>
        {/* Noise texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
        }} />

        {/* Red diagonal accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '30vw', height: '4px',
          backgroundColor: RED, transformOrigin: 'right top',
        }} />

        {/* Business name — giant typographic hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <p style={{
            fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', color: RED,
            textTransform: 'uppercase', marginBottom: 24,
          }}>
            ✦ BARBERSHOP ✦
          </p>

          <h1 style={{
            fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
            fontSize: 'clamp(56px, 12vw, 160px)',
            fontWeight: 900, lineHeight: 0.9, color: RED,
            textTransform: 'uppercase', letterSpacing: '-0.02em',
            transform: 'rotate(-2deg)', display: 'inline-block',
            margin: '0 0 24px', maxWidth: '80vw',
          }}>
            {business.businessName}
          </h1>

          {/* Red divider */}
          <div style={{ height: 3, backgroundColor: RED, width: '100%', maxWidth: 600, margin: '32px 0' }} />

          <p style={{ fontSize: 16, color: DIM, maxWidth: 480, lineHeight: 1.6, marginBottom: 40 }}>
            {business.tagline || business.description}
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 60 }}>
            {business.whatsapp && (
              <TrackedLink
                slug={business.slug}
                type="whatsapp"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: RED, color: WHITE, padding: '16px 40px',
                  fontSize: 13, fontWeight: 700, textDecoration: 'none',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  display: 'inline-block',
                }}
              >
                BOOK NOW →
              </TrackedLink>
            )}
            <a
              href="#services"
              style={{
                border: `2px solid ${RED}`, color: RED, padding: '14px 38px',
                fontSize: 13, fontWeight: 700, textDecoration: 'none',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                display: 'inline-block',
              }}
            >
              SERVICES
            </a>
          </div>

          {/* Service names ticker */}
          {serviceNames && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {serviceNames}
            </p>
          )}
        </motion.div>

        {/* Large background "CUTS" watermark */}
        <div style={{
          position: 'absolute', right: '-5vw', bottom: '-5vh',
          fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
          fontSize: 'clamp(120px, 25vw, 320px)', fontWeight: 900, color: WHITE,
          opacity: 0.03, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          textTransform: 'uppercase',
        }}>
          CUTS
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{ backgroundColor: '#111111', padding: '80px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.05em', color: WHITE,
            marginBottom: 8,
          }}>
            SERVICES
          </h2>
          <div style={{ height: 3, backgroundColor: RED, width: 60, marginBottom: 48 }} />

          <div>
            {business.services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ backgroundColor: RED }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'default', transition: 'background-color 0.2s',
                }}
                className="group"
              >
                <span style={{
                  fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
                  fontSize: 22, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.05em', color: WHITE,
                }}>
                  {s.name}
                </span>
                <span style={{ fontSize: 22, fontWeight: 700, color: RED, fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif' }}>
                  {s.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery: 2 large + 4 small grid ── */}
      {business.galleryPhotos.filter(Boolean).length > 0 && (
        <section id="gallery" style={{ backgroundColor: BLACK }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px' }}>
            <h2 style={{
              fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
              fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '0.05em', color: WHITE,
              marginBottom: 8,
            }}>
              GALLERY
            </h2>
            <div style={{ height: 3, backgroundColor: RED, width: 60, marginBottom: 40 }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 3,
            maxWidth: 1200, margin: '0 auto',
          }}>
            {business.galleryPhotos.filter(Boolean).slice(0, 6).map((url, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  aspectRatio: i === 0 ? '4/3' : '1/1',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  gridColumn: i === 0 ? '1 / 2' : undefined,
                  gridRow: i === 0 ? '1 / 3' : undefined,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    filter: 'grayscale(100%) contrast(1.2)',
                    transition: 'filter 0.4s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'none')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%) contrast(1.2)')}
                />
                {/* Red duotone overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, rgba(239,68,68,0.3), transparent)`,
                  mixBlendMode: 'multiply',
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section id="contact" style={{ backgroundColor: '#111111', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* "FIND US" large watermark */}
        <div style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
          fontSize: 'clamp(80px, 15vw, 180px)', fontWeight: 900,
          color: WHITE, opacity: 0.03, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none', textTransform: 'uppercase',
          letterSpacing: '-0.02em', whiteSpace: 'nowrap',
        }}>
          FIND US
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.05em', color: WHITE,
            marginBottom: 8,
          }}>
            CONTACT
          </h2>
          <div style={{ height: 3, backgroundColor: RED, width: 60, marginBottom: 48 }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>

            {/* Left: info + hours */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                {business.address && (
                  <p style={{ color: DIM, fontSize: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: RED }}>▸</span> {business.address}, {business.city}
                  </p>
                )}
                {business.phone && (
                  <TrackedLink slug={business.slug} type="phone" href={callLink} style={{ color: DIM, fontSize: 14, textDecoration: 'none', display: 'flex', gap: 8 }}>
                    <span style={{ color: RED }}>▸</span> {business.phone}
                  </TrackedLink>
                )}
                {business.email && (
                  <a href={`mailto:${business.email}`} style={{ color: DIM, fontSize: 14, textDecoration: 'none', display: 'flex', gap: 8 }}>
                    <span style={{ color: RED }}>▸</span> {business.email}
                  </a>
                )}
              </div>

              {/* Hours */}
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: 16 }}>
                HOURS
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {DAYS.map(({ key, label }) => (
                    <tr key={key} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '8px 0', color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif' }}>{label}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, fontSize: 13, color: WHITE }}>
                        {fmtHours(business.openingHours[key])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: booking CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 20, marginBottom: 32 }}>
                <h3 style={{
                  fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
                  fontSize: 36, fontWeight: 900, textTransform: 'uppercase',
                  letterSpacing: '0.05em', color: WHITE, lineHeight: 1, marginBottom: 8,
                }}>
                  BOOK YOUR SESSION
                </h3>
                <p style={{ color: DIM, fontSize: 14, lineHeight: 1.6 }}>
                  Walk-ins welcome. Appointments get priority.
                </p>
              </div>

              {business.whatsapp && (
                <TrackedLink
                  slug={business.slug}
                  type="whatsapp"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', width: '100%', padding: '18px',
                    backgroundColor: RED, color: WHITE, fontWeight: 700,
                    fontSize: 13, textDecoration: 'none', textAlign: 'center',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    boxSizing: 'border-box',
                  }}
                >
                  BOOK VIA WHATSAPP →
                </TrackedLink>
              )}
              {igLink && (
                <TrackedLink
                  slug={business.slug}
                  type="instagram"
                  href={igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', width: '100%', padding: '16px',
                    border: `2px solid rgba(255,255,255,0.15)`, color: DIM,
                    fontSize: 12, textDecoration: 'none', textAlign: 'center',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    boxSizing: 'border-box',
                  }}
                >
                  {business.instagram} ↗
                </TrackedLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: BLACK, borderTop: `1px solid rgba(239,68,68,0.2)`, padding: '24px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'var(--font-oswald), Oswald, Impact, sans-serif',
            fontWeight: 700, fontSize: 16, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: WHITE,
          }}>
            {business.businessName}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>© {new Date().getFullYear()}</span>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, textDecoration: 'none' }}>
            Powered by SiteForge ⚡
          </Link>
        </div>
      </footer>

      {/* Floating badge */}
      <Link
        href="/"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors"
        style={{ backgroundColor: RED, color: WHITE }}
      >
        ⚡ Made with SiteForge
      </Link>
    </div>
  );
}
