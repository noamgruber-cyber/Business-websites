'use client';

import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

const ORANGE = '#f97316';

type Props = { business: BusinessData };

const DAY_LABELS: { key: keyof OpeningHours; label: string }[] = [
  { key: 'sunday',    label: 'Sun' },
  { key: 'monday',    label: 'Mon' },
  { key: 'tuesday',   label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday',  label: 'Thu' },
  { key: 'friday',    label: 'Fri' },
  { key: 'saturday',  label: 'Sat' },
];

function fmtHours(value: string) {
  if (!value || value === 'closed') return <span className="text-gray-600">Closed</span>;
  const [from, to] = value.split('-');
  return <span style={{ color: ORANGE }}>{from} – {to}</span>;
}

export default function GymContact({ business }: Props) {
  const waLink   = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20join%20the%20gym`;
  const callLink = `tel:${business.phone}`;

  return (
    <section id="contact" className="py-20 px-6 sm:px-16" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="font-oswald text-sm tracking-[0.35em] uppercase mb-2" style={{ color: ORANGE }}>
            Location &amp; Hours
          </p>
          <h2 className="font-oswald text-5xl font-bold text-white uppercase">FIND US</h2>
          <div className="mt-3 w-16 h-1" style={{ backgroundColor: ORANGE }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT: info + hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-3">
              {[
                { icon: '📍', text: `${business.address}, ${business.city}` },
                ...(business.phone ? [{ icon: '📞', text: business.phone, href: callLink }] : []),
                ...(business.email ? [{ icon: '✉️', text: business.email, href: `mailto:${business.email}` }] : []),
              ].map(({ icon, text, href }: { icon: string; text: string; href?: string }) =>
                href ? (
                  <a key={text} href={href} className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                    <span style={{ color: ORANGE }}>{icon}</span> {text}
                  </a>
                ) : (
                  <p key={text} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span style={{ color: ORANGE }}>{icon}</span> {text}
                  </p>
                )
              )}
            </div>

            <div>
              <p className="font-oswald text-sm tracking-widest uppercase mb-4" style={{ color: ORANGE }}>
                Opening Hours
              </p>
              <div>
                {DAY_LABELS.map(({ key, label }, i) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 text-sm"
                    style={{ borderBottom: i < DAY_LABELS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <span className="text-gray-500 font-oswald uppercase tracking-wider">{label}</span>
                    <span className="font-medium">{fmtHours(business.openingHours[key])}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: big CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <div className="w-full p-10 text-center" style={{ border: `2px solid ${ORANGE}30`, backgroundColor: '#0a0a0a' }}>
              <p className="font-oswald text-4xl font-bold text-white uppercase mb-2">Ready to<br />Start?</p>
              <p className="text-gray-500 text-sm mb-8">{business.description.slice(0, 100)}…</p>
              <TrackedLink
                slug={business.slug}
                type="whatsapp"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 font-oswald text-xl font-bold uppercase tracking-widest text-black text-center transition-all duration-200 hover:brightness-90"
                style={{ backgroundColor: ORANGE }}
              >
                JOIN NOW →
              </TrackedLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
