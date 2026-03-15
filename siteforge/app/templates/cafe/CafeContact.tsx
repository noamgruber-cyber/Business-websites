'use client';

import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const BROWN   = '#6f4e37';
const CARAMEL = '#d4a96a';

type Props = { business: BusinessData };

const DAY_LABELS: { key: keyof OpeningHours; label: string }[] = [
  { key: 'sunday',    label: 'Sunday' },
  { key: 'monday',    label: 'Monday' },
  { key: 'tuesday',   label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday',  label: 'Thursday' },
  { key: 'friday',    label: 'Friday' },
  { key: 'saturday',  label: 'Saturday' },
];

function fmtHours(value: string) {
  if (!value || value === 'closed') return <span style={{ color: 'rgba(255,255,255,0.25)' }}>Closed</span>;
  const [from, to] = value.split('-');
  return <span style={{ color: CARAMEL }}>{from} – {to}</span>;
}

export default function CafeContact({ business }: Props) {
  const igLink = business.instagram
    ? `https://instagram.com/${business.instagram.replace('@', '')}`
    : null;

  return (
    <section id="contact" className="py-20 px-6 sm:px-14" style={{ backgroundColor: '#3d2b1f' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* LEFT: info + hours */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-lora text-4xl sm:text-5xl font-bold text-white mb-8">
            Come Say Hello
          </h2>

          <div className="space-y-3 mb-10">
            <p className="text-sm flex items-start gap-2" style={{ color: '#c9a97a' }}>
              <span>📍</span> {business.address}, {business.city}
            </p>
            {business.phone && (
              <a href={`tel:${business.phone}`} className="text-sm flex items-start gap-2 hover:opacity-70 transition-opacity" style={{ color: '#c9a97a' }}>
                <span>📞</span> {business.phone}
              </a>
            )}
            {business.email && (
              <a href={`mailto:${business.email}`} className="text-sm flex items-start gap-2 hover:opacity-70 transition-opacity" style={{ color: '#c9a97a' }}>
                <span>✉️</span> {business.email}
              </a>
            )}
          </div>

          {/* Hours */}
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: CARAMEL }}>
              Opening Hours
            </p>
            <div style={{ borderTop: `1px solid rgba(212,169,106,0.2)` }}>
              {DAY_LABELS.map(({ key, label }, i) => (
                <div
                  key={key}
                  className="flex justify-between py-2.5 text-sm"
                  style={{ borderBottom: i < DAY_LABELS.length - 1 ? '1px solid rgba(212,169,106,0.1)' : 'none' }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                  <span className="font-medium">{fmtHours(business.openingHours[key])}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: social CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center"
        >
          <div className="w-full text-center" style={{ padding: '40px', border: `1px solid ${CARAMEL}30`, borderRadius: 16 }}>
            <span className="text-5xl block mb-5">☕</span>
            <h3 className="font-lora text-3xl font-bold text-white mb-3">
              {business.businessName}
            </h3>
            <p className="font-lora italic mb-8" style={{ color: CARAMEL }}>
              {business.tagline}
            </p>

            {igLink && (
              <TrackedLink
                slug={business.slug}
                type="instagram"
                href={igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:brightness-90"
                style={{ backgroundColor: CARAMEL, color: BROWN }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Find us on Instagram
              </TrackedLink>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
