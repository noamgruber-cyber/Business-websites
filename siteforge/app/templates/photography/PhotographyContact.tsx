'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';
import TrackedLink from '@/components/TrackedLink';

type Props = { business: BusinessData };

export default function PhotographyContact({ business }: Props) {
  const igLink = business.instagram
    ? `https://instagram.com/${business.instagram.replace('@', '')}`
    : null;

  return (
    <section id="contact" className="py-24 px-6 sm:px-14" style={{ backgroundColor: '#000' }}>
      <div className="max-w-2xl mx-auto">

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-dm-sans text-3xl sm:text-4xl italic text-white/80 leading-relaxed mb-16 text-center"
        >
          "Every moment deserves to be remembered."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <p className="font-dm-sans text-sm font-bold text-white/40 tracking-widest uppercase">
            Get in Touch
          </p>
          <h2 className="font-dm-sans text-3xl font-bold text-white">{business.businessName}</h2>

          <div className="flex flex-col items-center gap-3 pt-4">
            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="font-dm-sans text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors"
              >
                {business.email}
              </a>
            )}
            {business.phone && (
              <TrackedLink
                slug={business.slug}
                type="phone"
                href={`tel:${business.phone}`}
                className="font-dm-sans text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors"
              >
                {business.phone}
              </TrackedLink>
            )}
            {igLink && (
              <TrackedLink
                slug={business.slug}
                type="instagram"
                href={igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm-sans text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors"
              >
                @{business.instagram}
              </TrackedLink>
            )}
            {business.address && (
              <p className="font-dm-sans text-white/30 text-xs mt-2">
                {business.address}, {business.city}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
