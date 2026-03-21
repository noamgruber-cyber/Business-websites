'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const ORANGE = '#f97316';
const BG     = '#111111';
const ROW_BG = '#0a0a0a';

type Props = { business: BusinessData };

export default function GymClasses({ business }: Props) {
  if (!business.services || business.services.length === 0) return null;

  return (
    <section id="classes" style={{ backgroundColor: BG }} className="py-20 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p
            className="font-oswald text-sm font-medium tracking-[0.35em] uppercase mb-2"
            style={{ color: ORANGE }}
          >
            What We Offer
          </p>
          <h2 className="font-oswald text-5xl sm:text-6xl font-bold text-white uppercase">
            OUR CLASSES
          </h2>
          <div className="mt-3 w-16 h-1" style={{ backgroundColor: ORANGE }} />
        </motion.div>

        {/* Service rows */}
        <div className="space-y-1">
          {business.services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group flex items-center gap-5 px-5 py-5 transition-all duration-200 cursor-default"
              style={{
                backgroundColor: ROW_BG,
                borderLeft: `3px solid ${ORANGE}30`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = '#1a1a1a';
                el.style.borderLeftColor = ORANGE;
                el.style.boxShadow = `2px 0 20px ${ORANGE}22`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = ROW_BG;
                el.style.borderLeftColor = `${ORANGE}30`;
                el.style.boxShadow = 'none';
              }}
            >
              {/* Name */}
              <span className="font-oswald text-xl sm:text-2xl font-bold text-white uppercase flex-1 leading-none">
                {service.name}
              </span>

              {/* Description */}
              {service.description && (
                <span className="hidden sm:block text-gray-500 text-sm flex-1 max-w-xs">
                  {service.description}
                </span>
              )}

              {/* Price */}
              <span
                className="font-oswald text-xl font-bold flex-shrink-0"
                style={{ color: ORANGE }}
              >
                {service.price}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
