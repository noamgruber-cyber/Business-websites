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

const TRAINING_PROGRAMS = [
  {
    name: 'Strength & Conditioning',
    price: '$79/mo',
    description:
      'Build raw power and endurance with structured barbell and bodyweight programming led by certified strength coaches.',
  },
  {
    name: 'HIIT Bootcamp',
    price: '$59/mo',
    description:
      'High-intensity interval training sessions designed to torch calories and elevate your cardiovascular fitness.',
  },
  {
    name: 'Elite Performance',
    price: '$129/mo',
    description:
      'Exclusive small-group coaching for competitive athletes targeting peak sports performance.',
  },
  {
    name: 'Open Gym Access',
    price: '$39/mo',
    description:
      'Unlimited floor access to all equipment, free weights, and cardio machines at your own pace.',
  },
];

export default function GymAthleteTemplate({ business }: { business: BusinessData }) {
  const hours = business.openingHours as OpeningHours | undefined;
  const coverPhoto = business.coverPhotoUrl || (business.galleryPhotos[0] ?? '');
  const galleryPhotos = business.galleryPhotos ?? [];

  return (
    <div
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        backgroundColor: '#0f172a',
        color: '#fff',
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
          backgroundColor: '#0f172a',
          borderBottom: '1px solid rgba(59,130,246,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '18px', color: '#fff', letterSpacing: '0.02em' }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {['About', 'Programs', 'Gallery', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: '#93c5fd',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              {item}
            </Link>
          ))}
          <Link
            href="#contact"
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              padding: '10px 22px',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            JOIN NOW
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
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom right, rgba(15,23,42,0.85), rgba(15,23,42,0.6))',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '48px',
            maxWidth: '600px',
          }}
        >
          <p
            style={{
              color: '#3b82f6',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: 0,
            }}
          >
            WELCOME TO
          </p>

          <h1
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(40px, 7vw, 80px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1,
              margin: '8px 0 0',
            }}
          >
            {business.businessName}
          </h1>

          {/* Animated blue underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            style={{
              height: '4px',
              backgroundColor: '#3b82f6',
              marginTop: '8px',
              marginBottom: '16px',
            }}
          />

          <p
            style={{
              color: '#93c5fd',
              fontSize: '18px',
              marginBottom: '32px',
              marginTop: 0,
              lineHeight: 1.5,
            }}
          >
            {business.tagline ?? 'Train Hard. Live Strong. No Excuses.'}
          </p>

          {/* Stats bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              marginBottom: '32px',
            }}
          >
            {[
              { num: '500+', label: 'Members' },
              { num: '12', label: 'Classes' },
              { num: '8', label: 'Trainers' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '0 20px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{stat.num}</div>
                  <div
                    style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {stat.label}
                  </div>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      width: '1px',
                      height: '36px',
                      backgroundColor: '#3b82f6',
                      opacity: 0.6,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <TrackedLink
            type="whatsapp"
            slug={business.slug}
              href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20join`}
              target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#3b82f6',
              color: '#fff',
              textDecoration: 'none',
              padding: '16px 40px',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: 0,
            }}
          >
            JOIN THE TEAM →
          </TrackedLink>
        </div>
      </section>

      {/* ── Training Programs ── */}
      <section
        id="programs"
        style={{
          backgroundColor: '#0f172a',
          padding: '96px 48px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              color: '#3b82f6',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            TRAINING PROGRAMS
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#fff',
              marginTop: 0,
              marginBottom: '48px',
            }}
          >
            Classes &amp; Memberships
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {TRAINING_PROGRAMS.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ backgroundColor: '#263a52' }}
              style={{
                backgroundColor: '#1e2f45',
                borderLeft: '4px solid #3b82f6',
                padding: '24px',
                cursor: 'default',
                transition: 'background-color 0.2s ease',
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '18px',
                  marginTop: 0,
                  marginBottom: '8px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {program.name}
              </h3>
              <p
                style={{
                  color: '#3b82f6',
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: '0 0 12px',
                }}
              >
                {program.price}
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {program.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section
        id="gallery"
        style={{
          backgroundColor: '#0f172a',
          padding: '96px 48px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              color: '#3b82f6',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            OUR FACILITY
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#fff',
              marginTop: 0,
              marginBottom: '40px',
            }}
          >
            The Arena
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
                style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}
                className="gym-gallery-item"
              >
                <img
                  src={photo}
                  alt={`${business.businessName} facility ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '8px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(59,130,246,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '8px',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = '0')}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Gallery coming soon.</p>
        )}
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        style={{
          backgroundColor: '#0a1020',
          padding: '96px 48px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: '#fff',
              marginTop: 0,
              marginBottom: '48px',
            }}
          >
            FIND YOUR GYM
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {business.address && (
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Address
                </span>
                <p style={{ color: '#fff', marginTop: '4px', marginBottom: 0 }}>{business.address}</p>
              </div>
            )}
            {business.phone && (
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Phone
                </span>
                <p style={{ color: '#fff', marginTop: '4px', marginBottom: 0 }}>{business.phone}</p>
              </div>
            )}
            {business.email && (
              <div style={{ marginBottom: '24px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Email
                </span>
                <p style={{ color: '#fff', marginTop: '4px', marginBottom: 0 }}>{business.email}</p>
              </div>
            )}

            <TrackedLink
              type="whatsapp"
              slug={business.slug}
              href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20book`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#25d366',
                color: '#fff',
                textDecoration: 'none',
                padding: '14px 32px',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.05em',
                borderRadius: '4px',
                marginBottom: '16px',
              }}
            >
              Chat on WhatsApp
            </TrackedLink>
          </motion.div>

          {/* Hours */}
          {hours && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span
                style={{
                  color: '#3b82f6',
                  fontWeight: 600,
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Opening Hours
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
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <span
                      style={{
                        color: isClosed ? 'rgba(255,255,255,0.35)' : '#93c5fd',
                        fontWeight: isClosed ? 400 : 600,
                        fontSize: '14px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {day}
                    </span>
                    <span
                      style={{
                        color: isClosed ? 'rgba(255,255,255,0.3)' : '#fff',
                        fontSize: '14px',
                      }}
                    >
                      {isClosed ? 'Closed' : value}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* JOIN NOW full-width button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ marginTop: '48px' }}
        >
          <TrackedLink
            type="whatsapp"
            slug={business.slug}
              href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20join`}
              target="_blank" rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: '#3b82f6',
              color: '#fff',
              textDecoration: 'none',
              padding: '20px',
              fontWeight: 700,
              fontSize: '16px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: 0,
            }}
          >
            JOIN NOW
          </TrackedLink>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: '#0f172a',
          borderTop: '1px solid rgba(59,130,246,0.15)',
          padding: '40px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span style={{ fontWeight: 700, fontSize: '18px', color: '#fff' }}>{business.businessName}</span>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '4px', marginBottom: 0 }}>
            &copy; {new Date().getFullYear()} {business.businessName}. All rights reserved.
          </p>
        </div>
        <Link
          href="https://siteforge.co.za"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
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
          backgroundColor: '#3b82f6',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          zIndex: 100,
          boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
          letterSpacing: '0.03em',
        }}
      >
        ⚡ Made with SiteForge
      </div>
    </div>
  );
}
