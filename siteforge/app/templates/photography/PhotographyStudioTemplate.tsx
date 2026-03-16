'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';
import { useState } from 'react';

export default function PhotographyStudioTemplate({ business }: { business: BusinessData }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const coverPhoto = business.coverPhotoUrl || (business.galleryPhotos[0] ?? '');
  const galleryPhotos = business.galleryPhotos ?? [];
  const services = business.services ?? [];

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    border: `1px solid ${focusedField === field ? '#8b5cf6' : '#e5e5e5'}`,
    padding: '12px 16px',
    fontSize: '15px',
    marginBottom: '16px',
    outline: 'none',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxSizing: 'border-box',
    borderRadius: 0,
    display: 'block',
  });

  return (
    <div style={{ backgroundColor: '#fafafa', color: '#111111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '0 32px',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111111', fontWeight: 700, fontSize: '16px' }}>
          {business.businessName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {['Portfolio', 'Packages', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', fontFamily: 'Inter, system-ui, sans-serif' }}>
              {item}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              backgroundColor: '#8b5cf6',
              color: '#ffffff',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: 'Inter, system-ui, sans-serif',
              borderRadius: 0,
            }}
          >
            Book a Shoot
          </a>
        </div>
      </nav>

      {/* Hero — split layout */}
      <section style={{ display: 'grid', gridTemplateColumns: '40% 60%', height: '100vh', paddingTop: '60px' }}>
        {/* Left */}
        <div style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 48px',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ color: '#8b5cf6', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}
          >
            Photography Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 800,
              color: '#111111',
              lineHeight: 1,
              marginBottom: '16px',
            }}
          >
            {business.businessName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ color: '#6b7280', fontSize: '18px', marginBottom: '32px', lineHeight: 1.5 }}
          >
            {business.tagline ?? 'Professional photography that tells your story.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}
          >
            <a
              href="#portfolio"
              style={{
                backgroundColor: '#8b5cf6',
                color: '#ffffff',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                borderRadius: 0,
              }}
            >
              See Portfolio
            </a>
            <a
              href="#contact"
              style={{
                border: '1px solid #111111',
                color: '#111111',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                borderRadius: 0,
                backgroundColor: 'transparent',
              }}
            >
              Book a Shoot
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}
          >
            <span style={{ color: '#9ca3af', fontSize: '12px', marginRight: '4px' }}>Trusted by:</span>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} style={{ backgroundColor: '#9ca3af', opacity: 0.2, width: '60px', height: '16px', display: 'inline-block', margin: '0 6px', borderRadius: '2px' }} />
            ))}
          </motion.div>
        </div>

        {/* Right — cover photo */}
        <div style={{ overflow: 'hidden', height: '100%' }}>
          <img
            src={coverPhoto}
            alt={business.businessName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* Portfolio / Gallery */}
      <section id="portfolio" style={{ backgroundColor: '#ffffff', padding: '96px 32px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#111111',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Portfolio
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {(galleryPhotos.length > 0 ? galleryPhotos : Array.from({ length: 9 }).map((_, i) => `https://placehold.co/600x600/f5f5f5/8b5cf6?text=Photo+${i + 1}`)).map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={typeof photo === 'string' ? photo : (photo as any).url ?? photo}
                alt={`Gallery ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {hoveredIndex === i && (
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'rgba(139,92,246,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif' }}>
                    View →
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" style={{ backgroundColor: '#f5f5f5', padding: '96px 32px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#111111',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 800,
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
            { name: 'Portrait Session', price: '$250', description: '1-hour session, 30 edited high-res images.' },
            { name: 'Wedding Coverage', price: '$1,800', description: 'Full day + evening coverage, 400+ images.' },
            { name: 'Commercial Package', price: '$600', description: 'Brand & product photography, 50 images.' },
          ]).map((service: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                backgroundColor: '#ffffff',
                borderTop: '3px solid #8b5cf6',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <p style={{ color: '#8b5cf6', fontWeight: 700, fontSize: '16px', marginBottom: '12px', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {service.name}
              </p>
              <p style={{ color: '#111111', fontSize: '32px', fontWeight: 800, marginBottom: '12px', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {service.price ?? (service.priceRange ? `${service.priceRange.min}–${service.priceRange.max}` : 'Contact us')}
              </p>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {service.description ?? ''}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ backgroundColor: '#ffffff', padding: '96px 32px' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#111111',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            Book Your Session
          </motion.h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center', padding: '48px 24px', color: '#111111', fontSize: '18px', fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Thanks! I&apos;ll be in touch soon 🙌
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('name')}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('email')}
                required
              />
              <textarea
                placeholder="Tell me about your shoot..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={5}
                style={{ ...inputStyle('message'), resize: 'vertical' }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#8b5cf6',
                  color: '#ffffff',
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  borderRadius: 0,
                }}
              >
                Send Message
              </button>
            </motion.form>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
          >
            {business.whatsapp && (
              <TrackedLink type="whatsapp" slug={business.slug}
                href={`https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20a%20session`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', border: '1px solid #8b5cf6', color: '#8b5cf6', padding: '10px 24px', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif', cursor: 'pointer', textDecoration: 'none' }}>
                Chat on WhatsApp
              </TrackedLink>
            )}

            {business.instagram && (
              <TrackedLink type="instagram" slug={business.slug}
                href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', color: '#8b5cf6', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif', cursor: 'pointer', textDecoration: 'underline' }}>
                Follow on Instagram
              </TrackedLink>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e5e5',
        padding: '32px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111111', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
          {business.businessName}
        </p>
        <p style={{ color: '#9ca3af', fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', marginBottom: '8px' }}>
          &copy; {new Date().getFullYear()} {business.businessName}. All rights reserved.
        </p>
        <Link href="https://siteforge.io" style={{ color: '#8b5cf6', fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', textDecoration: 'none' }}>
          Powered by SiteForge
        </Link>
      </footer>

      {/* Floating badge */}
      <div style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 200,
        backgroundColor: '#8b5cf6',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        padding: '8px 14px',
        borderRadius: 0,
      }}>
        ⚡ Made with SiteForge
      </div>

    </div>
  );
}
