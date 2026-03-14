'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const GOLD = '#c8a96e';
const BG    = '#0d0d0d';
const CARD  = '#1a1a1a';

type Props = { business: BusinessData };

export default function BarbershopServices({ business }: Props) {
  return (
    <section id="services" style={{ backgroundColor: BG }} className="py-20 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Our Services
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white">
            What We Offer
          </h2>
          {/* Gold rule */}
          <div className="mt-5 mx-auto w-16 h-[2px]" style={{ backgroundColor: GOLD }} />
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {business.services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: CARD,
                borderLeft: `3px solid ${GOLD}`,
                padding: '24px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#222222';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${GOLD}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = CARD;
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Scissors icon top-right */}
              <span
                className="absolute top-4 right-4 text-lg opacity-25 group-hover:opacity-50 transition-opacity"
                aria-hidden
              >
                ✂️
              </span>

              <p className="text-white font-bold text-lg mb-1 pr-8">{service.name}</p>
              <p
                className="font-playfair font-bold text-2xl mb-3"
                style={{ color: GOLD }}
              >
                {service.price}
              </p>
              {service.description && (
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
