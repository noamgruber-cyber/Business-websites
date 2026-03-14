'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

type Props = { business: BusinessData };

export default function PhotographyPackages({ business }: Props) {
  const waLink = `https://wa.me/${business.whatsapp}?text=Hi%2C%20I'd%20like%20to%20book%20a%20session`;

  return (
    <section id="packages" className="bg-white py-20 px-6 sm:px-14">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="font-dm-sans text-4xl sm:text-5xl font-bold text-black">
            Investment
          </h2>
          <div className="mt-3 w-10 h-px bg-black/20" />
        </motion.div>

        {/* Package cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.services.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="p-7 border border-black/10 hover:border-black/30 transition-colors duration-200"
            >
              <p className="font-dm-sans font-bold text-base text-black mb-2">{pkg.name}</p>
              <p className="font-dm-sans text-3xl font-bold text-black mb-3">{pkg.price}</p>
              {pkg.description && (
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{pkg.description}</p>
              )}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm-sans text-sm font-medium text-black underline underline-offset-4 hover:text-gray-500 transition-colors"
              >
                Book This Package
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
