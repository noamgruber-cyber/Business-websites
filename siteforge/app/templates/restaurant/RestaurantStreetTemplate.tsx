'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const oswald = "var(--font-oswald), 'Oswald', Impact, sans-serif";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

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

export default function RestaurantStreetTemplate({ business }: { business: BusinessData }) {
  const hours = business.openingHours as OpeningHours | undefined;

  const menuItems = business.services;

  const galleryImages: string[] = (business.galleryPhotos as string[]) ?? Array(6).fill(business.coverPhotoUrl ?? '');

  const instagramHandle = (business as { instagramHandle?: string }).instagramHandle;

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', fontFamily: 'sans-serif', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav
        style={{
          backgroundColor: '#111',
          borderLeft: '4px solid #f97316',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <span style={{ fontFamily: oswald, fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: 2, textTransform: 'uppercase' }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {['Menu', 'Gallery', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{ color: '#ccc', textDecoration: 'none', fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              {label}
            </a>
          ))}
          {business.whatsapp && (
            <TrackedLink
              slug={business.slug}
              type="whatsapp"
              href={`https://wa.me/${business.whatsapp}`}
              style={{
                backgroundColor: '#f97316',
                color: '#fff',
                padding: '8px 20px',
                fontFamily: oswald,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              ORDER NOW
            </TrackedLink>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
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
        {/* Orange gradient overlay from bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(249,115,22,0.9) 0%, transparent 60%)',
          }}
        />

        {/* Floating ORDER NOW badge */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 32,
            backgroundColor: '#f97316',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 9999,
            fontFamily: oswald,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 2,
            zIndex: 10,
            animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
          }}
        >
          🔥 ORDER NOW
        </div>

        {/* Business name top-left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            top: '20%',
            left: 40,
            zIndex: 5,
          }}
        >
          <h1
            style={{
              fontFamily: oswald,
              fontSize: 'clamp(48px, 10vw, 120px)',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: 2,
              transform: 'rotate(-3deg)',
              transformOrigin: 'left center',
              textShadow: '2px 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {business.businessName}
          </h1>
        </motion.div>

        {/* Bottom content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: 32,
            right: 32,
            zIndex: 5,
          }}
        >
          {business.tagline && (
            <p style={{ color: '#fbbf24', fontFamily: oswald, fontSize: 20, fontWeight: 400, letterSpacing: 2, marginBottom: 20, textTransform: 'uppercase' }}>
              {business.tagline}
            </p>
          )}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {business.whatsapp && (
              <TrackedLink
                slug={business.slug}
                type="whatsapp"
                href={`https://wa.me/${business.whatsapp}`}
                style={{
                  backgroundColor: '#f97316',
                  color: '#fff',
                  padding: '14px 28px',
                  fontFamily: oswald,
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'background 0.2s',
                }}
              >
                ORDER VIA WHATSAPP →
              </TrackedLink>
            )}
            <a
              href="#menu"
              style={{
                border: '2px solid #fff',
                color: '#fff',
                padding: '14px 28px',
                fontFamily: oswald,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
            >
              SEE MENU
            </a>
          </div>
        </motion.div>
      </section>

      {/* Menu */}
      <section id="menu" style={{ backgroundColor: '#1a1a1a', padding: '80px 32px' }}>
        <div style={{ borderTop: '1px solid rgba(251,146,60,0.2)', paddingTop: 48 }}>
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: oswald, fontSize: 'clamp(32px, 5vw, 52px)', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, margin: 0 }}>
              🍽️ Our Menu
            </h2>
          </motion.div>

          <div style={{ maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeUp}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                whileHover={{ scale: 1.01 }}
                style={{
                  backgroundColor: '#222',
                  borderLeft: '4px solid #f97316',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  cursor: 'default',
                }}
              >
                {/* Colored circle with first letter */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: idx % 2 === 0 ? '#f97316' : '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: oswald,
                    fontWeight: 700,
                    fontSize: 20,
                    color: '#fff',
                    flexShrink: 0,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: oswald, fontWeight: 700, fontSize: 18, color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>
                    {item.name}
                  </div>
                  {item.description && (
                    <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>{item.description}</div>
                  )}
                </div>
                <div style={{ fontFamily: oswald, fontWeight: 700, fontSize: 24, color: '#f97316', flexShrink: 0 }}>
                  {item.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" style={{ backgroundColor: '#1a1a1a', padding: '80px 32px' }}>
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: oswald, fontSize: 'clamp(28px, 4vw, 44px)', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, margin: 0 }}>
            Gallery
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 200px)',
            gap: 12,
            maxWidth: 900,
          }}
        >
          {galleryImages.slice(0, 6).map((src, idx) => (
            <motion.div
              key={idx}
              {...fadeUp}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              style={{
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const inner = e.currentTarget.querySelector('.gallery-ring') as HTMLElement;
                if (inner) inner.style.boxShadow = 'inset 0 0 0 3px #f97316';
              }}
              onMouseLeave={(e) => {
                const inner = e.currentTarget.querySelector('.gallery-ring') as HTMLElement;
                if (inner) inner.style.boxShadow = 'none';
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
                className="gallery-ring"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 12,
                  transition: 'box-shadow 0.2s ease',
                }}
              />
            </motion.div>
          ))}
        </div>

        {instagramHandle && (
          <p style={{ color: '#666', fontSize: 14, marginTop: 16 }}>@{instagramHandle}</p>
        )}
      </section>

      {/* Contact */}
      <section id="contact" style={{ backgroundColor: '#111', padding: '80px 32px', borderTop: '4px solid #f97316' }}>
        <motion.div {...fadeUp} transition={{ duration: 0.7 }} style={{ maxWidth: 700 }}>
          <h2 style={{ fontFamily: oswald, fontSize: 'clamp(36px, 6vw, 72px)', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, margin: '0 0 40px' }}>
            WHERE TO FIND US
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {business.address && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ color: '#f97316', fontWeight: 700, marginTop: 2 }}>▸</span>
                <span style={{ color: '#ddd', fontSize: 16 }}>{business.address}</span>
              </div>
            )}
            {business.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#f97316', fontWeight: 700 }}>▸</span>
                <a href={`tel:${business.phone}`} style={{ color: '#ddd', fontSize: 16, textDecoration: 'none' }}>{business.phone}</a>
              </div>
            )}
            {business.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#f97316', fontWeight: 700 }}>▸</span>
                <a href={`mailto:${business.email}`} style={{ color: '#ddd', fontSize: 16, textDecoration: 'none' }}>{business.email}</a>
              </div>
            )}
          </div>

          {hours && (
            <div style={{ marginBottom: 40 }}>
              {days.map((day) => {
                const isClosed = hours[day] === 'closed';
                return (
                  <div
                    key={day}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: isClosed ? '#ef4444' : '#22c55e',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ color: '#aaa', fontSize: 14, textTransform: 'capitalize', fontFamily: oswald, letterSpacing: 1 }}>
                        {dayLabels[day]}
                      </span>
                    </div>
                    <span style={{ color: isClosed ? '#555' : '#fff', fontSize: 14 }}>
                      {isClosed ? 'Closed' : hours[day]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {business.whatsapp && (
            <TrackedLink
              slug={business.slug}
              type="whatsapp"
              href={`https://wa.me/${business.whatsapp}`}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: '#f97316',
                color: '#fff',
                padding: '18px 0',
                textAlign: 'center',
                fontFamily: oswald,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 3,
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s',
                boxSizing: 'border-box',
              }}
            >
              Order on WhatsApp
            </TrackedLink>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0d0d0d', padding: '40px 32px', textAlign: 'center', borderTop: '1px solid rgba(249,115,22,0.15)' }}>
        <div style={{ fontFamily: oswald, fontSize: 22, color: '#fff', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
          {business.businessName}
        </div>
        <p style={{ color: '#444', fontSize: 12, margin: '0 0 8px' }}>
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
          backgroundColor: '#f97316',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: oswald,
          letterSpacing: 1,
          zIndex: 200,
          pointerEvents: 'none',
        }}
      >
        ⚡ Made with SiteForge
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
