'use client';

import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';

const RED = '#c0392b';
const DARK = '#2c2c2c';

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
  if (!value || value === 'closed') {
    return <span style={{ color: 'rgba(255,255,255,0.3)' }}>Closed</span>;
  }
  const [from, to] = value.split('-');
  return <span style={{ color: RED }}>{from} – {to}</span>;
}

export default function RestaurantContact({ business }: Props) {
  const waLink  = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20reserve%20a%20table`;
  const callLink = `tel:${business.phone}`;

  return (
    <section id="contact" style={{ backgroundColor: DARK }} className="py-20 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: info + hours */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-8">
            Come Visit Us
          </h2>

          {/* Contact details */}
          <div className="space-y-4 mb-10">
            <ContactRow icon="📍" text={`${business.address}, ${business.city}`} />
            {business.phone && (
              <ContactRow icon="📞" text={business.phone} href={callLink} />
            )}
            {business.email && (
              <ContactRow icon="✉️" text={business.email} href={`mailto:${business.email}`} />
            )}
          </div>

          {/* Opening hours */}
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: RED }}>
              Opening Hours
            </p>
            <div>
              {DAY_LABELS.map(({ key, label }, i) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2.5"
                  style={{
                    borderBottom: i < DAY_LABELS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <span className="text-white/55 text-sm">{label}</span>
                  <span className="text-sm font-medium">
                    {fmtHours(business.openingHours[key])}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center"
        >
          <div className="w-full bg-white rounded-2xl p-10 text-center shadow-2xl">
            <div className="text-5xl mb-5">🍽️</div>
            <h3 className="font-playfair text-3xl font-bold mb-3" style={{ color: DARK }}>
              Join us for a meal
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#777' }}>
              Call us or send a WhatsApp message to reserve your table. We'd love to have you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {business.phone && (
                <a
                  href={callLink}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:brightness-90"
                  style={{ backgroundColor: DARK }}
                >
                  📞 Call Now
                </a>
              )}
              {business.whatsapp && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:brightness-90"
                  style={{ backgroundColor: RED }}
                >
                  💬 WhatsApp
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  text,
  href,
}: {
  icon: string;
  text: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
      <span className="text-white/65 text-sm leading-relaxed">{text}</span>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}
