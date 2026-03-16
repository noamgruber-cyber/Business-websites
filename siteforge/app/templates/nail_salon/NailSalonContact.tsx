'use client';

import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const ROSE = '#d4547a';

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
  if (!value || value === 'closed') return <span className="text-gray-300">Closed</span>;
  const [from, to] = value.split('-');
  return <span style={{ color: ROSE }}>{from} – {to}</span>;
}

export default function NailSalonContact({ business }: Props) {
  const waLink   = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`;
  const callLink = `tel:${business.phone}`;

  return (
    <section id="contact" className="py-20 px-6 sm:px-14" style={{ backgroundColor: '#fff0f5' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: hours + address */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-cormorant text-4xl font-bold mb-8" style={{ color: '#1a1a1a' }}>
            Find Us
          </h2>

          <div className="space-y-3 mb-10">
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <span>📍</span> {business.address}, {business.city}
            </p>
            {business.phone && (
              <a href={callLink} className="text-sm text-gray-600 flex items-start gap-2 hover:opacity-70 transition-opacity">
                <span>📞</span> {business.phone}
              </a>
            )}
            {business.email && (
              <a href={`mailto:${business.email}`} className="text-sm text-gray-600 flex items-start gap-2 hover:opacity-70 transition-opacity">
                <span>✉️</span> {business.email}
              </a>
            )}
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: ROSE }}>
              Opening Hours
            </p>
            <div style={{ borderTop: `1px solid ${ROSE}20` }}>
              {DAY_LABELS.map(({ key, label }) => (
                <div
                  key={key}
                  className="flex justify-between py-2.5 text-sm"
                  style={{ borderBottom: '1px solid rgba(212,84,122,0.08)' }}
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium">{fmtHours(business.openingHours[key])}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: booking CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center"
        >
          <div
            className="w-full bg-white rounded-2xl p-10 text-center"
            style={{ border: `1.5px solid ${ROSE}30` }}
          >
            <span className="text-5xl block mb-5">💅</span>
            <h3 className="font-cormorant text-3xl font-bold mb-3" style={{ color: '#1a1a1a' }}>
              Book Your Appointment
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Reach us on WhatsApp or give us a call — we&apos;d love to pamper you.
            </p>

            <div className="flex flex-col gap-3">
              {business.whatsapp && (
                <TrackedLink
                  slug={business.slug}
                  type="whatsapp"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:brightness-90"
                  style={{ backgroundColor: ROSE }}
                >
                  💬 Book on WhatsApp
                </TrackedLink>
              )}
              {business.phone && (
                <TrackedLink
                  slug={business.slug}
                  type="phone"
                  href={callLink}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-pink-50"
                  style={{ border: `1.5px solid ${ROSE}`, color: ROSE }}
                >
                  📞 Call Us
                </TrackedLink>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
