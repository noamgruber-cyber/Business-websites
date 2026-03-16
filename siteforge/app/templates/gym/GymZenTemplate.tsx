'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const DAYS: (keyof OpeningHours)[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const ZEN_CLASSES = [
  {
    name: 'Morning Flow Yoga',
    price: '$55/mo',
    description:
      'Gentle sun salutations and breathwork to energise your body and calm your mind to start the day.',
  },
  {
    name: 'Yin & Restore',
    price: '$55/mo',
    description:
      'Deep passive stretching held for longer durations to release tension and nurture your connective tissue.',
  },
  {
    name: 'Vinyasa Power',
    price: '$65/mo',
    description:
      'A dynamic flow linking breath to movement — building strength, balance, and flexibility.',
  },
  {
    name: 'Meditation & Mindfulness',
    price: '$45/mo',
    description:
      'Guided meditation sessions designed to reduce stress, sharpen focus, and cultivate inner stillness.',
  },
];

const headingFont = "var(--font-lora, 'Lora', Georgia, serif)";
const bodyFont = 'Inter, system-ui, sans-serif';

export default function GymZenTemplate({ business }: { business: BusinessData }) {
  const hours = business.openingHours as OpeningHours | undefined;
  const coverPhoto = business.coverPhotoUrl || (business.galleryPhotos[0] ?? '');
  const galleryPhotos = business.galleryPhotos ?? [];

  return (
    <div
      style={{
        fontFamily: bodyFont,
        backgroundColor: '#f0faf5',
        color: '#064e3b',
        margin: 0,
        padding: 0,
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: '#fff',
          borderBottom: '1px solid rgba(16,185,129,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
        }}
      >
        <span
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: '20px',
            color: '#064e3b',
          }}
        >
          {business.businessName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {['About', 'Classes', 'Gallery', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: '#10b981',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {item}
            </Link>
          ))}
          <Link
            href="#contact"
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              padding: '10px 22px',
              fontWeight: 600,
              fontSize: '13px',
              textDecoration: 'none',
              borderRadius: '9999px',
            }}
          >
            Book Class
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        id="about"
        style={{
          minHeight: '100vh',
          position: 'relative',
          backgroundImage: `url(${coverPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(240,250,245,0.6)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px', lineHeight: 1 }}>🌿</div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              color: '#064e3b',
              marginTop: 0,
              marginBottom: '8px',
              lineHeight: 1.1,
            }}
          >
            {business.businessName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            style={{
              color: '#10b981',
              fontStyle: 'italic',
              fontSize: '20px',
              marginBottom: '32px',
              marginTop: 0,
              fontFamily: headingFont,
            }}
          >
            {business.tagline ?? 'Find your calm. Find your strength.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <TrackedLink
              type="whatsapp"
              slug={business.slug}
              href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20join`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#10b981',
                color: '#fff',
                textDecoration: 'none',
                padding: '14px 40px',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: '9999px',
                letterSpacing: '0.02em',
              }}
            >
              Begin Your Journey →
            </TrackedLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              color: '#10b981',
              fontSize: '13px',
              marginTop: '20px',
              marginBottom: 0,
              fontWeight: 500,
            }}
          >
            ✓ All levels welcome &nbsp;&nbsp; ✓ First class free
          </motion.p>
        </div>
      </section>

      {/* ── Classes ── */}
      <section
        id="classes"
        style={{
          backgroundColor: '#fff',
          padding: '96px 48px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2
            style={{
              fontFamily: headingFont,
              color: '#064e3b',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              margin: 0,
            }}
          >
            🌿 Our Classes
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {ZEN_CLASSES.map((cls, index) => (
            <motion.div
              key={cls.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                backgroundColor: '#fff',
                borderLeft: '3px solid #10b981',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(16,185,129,0.1)',
                cursor: 'default',
              }}
            >
              <h3
                style={{
                  fontFamily: headingFont,
                  color: '#064e3b',
                  fontSize: '18px',
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: '8px',
                }}
              >
                {cls.name}
              </h3>
              <p
                style={{
                  color: '#10b981',
                  fontSize: '20px',
                  fontWeight: 700,
                  margin: '0 0 12px',
                  fontFamily: bodyFont,
                }}
              >
                {cls.price}
              </p>
              <p
                style={{
                  color: '#6b7280',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: bodyFont,
                }}
              >
                {cls.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section
        id="gallery"
        style={{
          backgroundColor: '#f0faf5',
          padding: '96px 48px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2
            style={{
              fontFamily: headingFont,
              color: '#064e3b',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Our Space
          </h2>
        </motion.div>

        {galleryPhotos.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            {galleryPhotos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={photo}
                  alt={`${business.businessName} space ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '16px',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.boxShadow = '0 8px 24px rgba(16,185,129,0.25)';
                    img.style.outline = '1px solid rgba(16,185,129,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.boxShadow = 'none';
                    img.style.outline = 'none';
                  }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center' }}>Gallery coming soon.</p>
        )}
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        style={{
          backgroundColor: '#d1fae5',
          padding: '96px 48px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2
            style={{
              fontFamily: headingFont,
              color: '#064e3b',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Come Find Your Peace
          </h2>
        </motion.div>

        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              backgroundColor: '#fff',
              borderRadius: '24px',
              boxShadow: '0 4px 24px rgba(16,185,129,0.12)',
              padding: '32px',
              marginBottom: '24px',
            }}
          >
            {business.address && (
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    color: '#10b981',
                    fontWeight: 600,
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: bodyFont,
                  }}
                >
                  Address
                </span>
                <p
                  style={{
                    color: '#064e3b',
                    marginTop: '4px',
                    marginBottom: 0,
                    fontFamily: bodyFont,
                    fontSize: '15px',
                  }}
                >
                  {business.address}
                </p>
              </div>
            )}
            {business.phone && (
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    color: '#10b981',
                    fontWeight: 600,
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: bodyFont,
                  }}
                >
                  Phone
                </span>
                <p
                  style={{
                    color: '#064e3b',
                    marginTop: '4px',
                    marginBottom: 0,
                    fontFamily: bodyFont,
                    fontSize: '15px',
                  }}
                >
                  {business.phone}
                </p>
              </div>
            )}
            {business.email && (
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    color: '#10b981',
                    fontWeight: 600,
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: bodyFont,
                  }}
                >
                  Email
                </span>
                <p
                  style={{
                    color: '#064e3b',
                    marginTop: '4px',
                    marginBottom: 0,
                    fontFamily: bodyFont,
                    fontSize: '15px',
                  }}
                >
                  {business.email}
                </p>
              </div>
            )}

            {/* Opening Hours */}
            {hours && (
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    color: '#10b981',
                    fontWeight: 600,
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: bodyFont,
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  Hours
                </span>
                {DAYS.map((day) => {
                  const value = hours[day];
                  const isClosed = !value || value === 'closed';
                  return (
                    <div
                      key={day}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '7px 0',
                        borderBottom: '1px solid rgba(16,185,129,0.1)',
                      }}
                    >
                      <span
                        style={{
                          color: isClosed ? '#9ca3af' : '#064e3b',
                          fontWeight: isClosed ? 400 : 600,
                          fontSize: '14px',
                          textTransform: 'capitalize',
                          fontFamily: bodyFont,
                        }}
                      >
                        {day}
                      </span>
                      <span
                        style={{
                          color: isClosed ? '#9ca3af' : '#10b981',
                          fontSize: '14px',
                          fontWeight: isClosed ? 400 : 500,
                          fontFamily: bodyFont,
                        }}
                      >
                        {isClosed ? 'Closed' : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* WhatsApp CTA */}
            <TrackedLink
              type="whatsapp"
              slug={business.slug}
              href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20book`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#10b981',
                color: '#fff',
                textDecoration: 'none',
                padding: '14px 32px',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: '9999px',
                letterSpacing: '0.02em',
                fontFamily: bodyFont,
              }}
            >
              WhatsApp Us 🌿
            </TrackedLink>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: '#f0faf5',
          borderTop: '1px solid rgba(16,185,129,0.15)',
          padding: '40px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: '18px',
              color: '#064e3b',
            }}
          >
            {business.businessName}
          </span>
          <p
            style={{
              color: '#6b7280',
              fontSize: '13px',
              marginTop: '4px',
              marginBottom: 0,
              fontFamily: bodyFont,
            }}
          >
            &copy; {new Date().getFullYear()} {business.businessName}. All rights reserved.
          </p>
        </div>
        <Link
          href="https://siteforge.co.za"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#10b981',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
            fontFamily: bodyFont,
          }}
        >
          Powered by SiteForge
        </Link>
      </footer>

      {/* ── Floating Badge ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#10b981',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          zIndex: 100,
          boxShadow: '0 4px 16px rgba(16,185,129,0.35)',
          letterSpacing: '0.03em',
          fontFamily: bodyFont,
        }}
      >
        ⚡ Made with SiteForge
      </div>
    </div>
  );
}
