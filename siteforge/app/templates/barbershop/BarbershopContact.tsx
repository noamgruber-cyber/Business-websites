'use client';

import { motion } from 'framer-motion';
import { BusinessData, OpeningHours } from '@/lib/types';

const GOLD = '#c8a96e';
const BG   = '#0d0d0d';
const CARD = '#1a1a1a';

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

function fmtHours(value: string): JSX.Element {
  if (!value || value === 'closed') {
    return <span style={{ color: '#ef4444' }}>Closed</span>;
  }
  const [from, to] = value.split('-');
  return <span style={{ color: GOLD }}>{from} – {to}</span>;
}

export default function BarbershopContact({ business }: Props) {
  const waLink = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment`;
  const igLink = business.instagram
    ? `https://instagram.com/${business.instagram.replace('@', '')}`
    : null;

  return (
    <section id="contact" style={{ backgroundColor: BG }} className="py-20 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
            Get In Touch
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white">
            Find Us
          </h2>
          <div className="mt-5 mx-auto w-16 h-[2px]" style={{ backgroundColor: GOLD }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT: Contact info + hours */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact details */}
            <div className="space-y-4">
              <ContactRow icon="📍" text={`${business.address}, ${business.city}`} />
              {business.phone && (
                <ContactRow icon="📞" text={business.phone} href={`tel:${business.phone}`} />
              )}
              {business.email && (
                <ContactRow icon="✉️" text={business.email} href={`mailto:${business.email}`} />
              )}
            </div>

            {/* Opening hours table */}
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>
                Opening Hours
              </p>
              <div style={{ borderTop: `1px solid ${GOLD}20` }}>
                {DAY_LABELS.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2.5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span className="text-white/65 text-sm">{label}</span>
                    <span className="text-sm font-medium">
                      {fmtHours(business.openingHours[key])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: WhatsApp CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="h-full flex flex-col items-center justify-center text-center p-10"
              style={{
                backgroundColor: CARD,
                border: `1px solid ${GOLD}40`,
              }}
            >
              {/* WA icon */}
              <div className="text-6xl mb-6">💬</div>

              <h3 className="font-playfair text-3xl font-bold text-white mb-3">
                Ready for a fresh cut?
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
                Book your appointment on WhatsApp — we'll confirm within minutes.
              </p>

              {/* Book button */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-xs py-4 text-center font-bold tracking-wider uppercase text-sm transition-all duration-200 mb-4 hover:brightness-90"
                style={{ backgroundColor: GOLD, color: '#0d0d0d' }}
              >
                Book on WhatsApp →
              </a>

              {/* Instagram link */}
              {igLink && (
                <a
                  href={igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-200 hover:opacity-75"
                  style={{ color: GOLD }}
                >
                  @{business.instagram} on Instagram
                </a>
              )}
            </div>
          </motion.div>
        </div>
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
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
      <span className="text-white/75 text-sm leading-relaxed">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}
