'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const ROSE = '#d4547a';
const BG   = '#fff9fb';

type Props = { business: BusinessData };

export default function NailSalonServices({ business }: Props) {
  return (
    <section id="services" style={{ backgroundColor: BG }} className="py-20 px-6 sm:px-14">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold" style={{ color: '#1a1a1a' }}>
            Our Services
          </h2>
          {/* Rose underline ornament */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-10" style={{ backgroundColor: ROSE }} />
            <span style={{ color: ROSE, fontSize: 14 }}>💅</span>
            <div className="h-px w-10" style={{ backgroundColor: ROSE }} />
          </div>
        </motion.div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {business.services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative bg-white p-6 transition-colors duration-200"
              style={{ border: `1px solid ${ROSE}30`, borderRadius: 16 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#fff0f5';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';
              }}
            >
              {/* Nail polish icon */}
              <span className="absolute top-4 right-4 text-lg opacity-30 group-hover:opacity-60 transition-opacity select-none">
                💅
              </span>

              <h3
                className="font-cormorant text-xl font-bold mb-1 pr-6"
                style={{ color: '#1a1a1a' }}
              >
                {service.name}
              </h3>
              <p
                className="font-cormorant text-2xl font-bold mb-2"
                style={{ color: ROSE }}
              >
                {service.price}
              </p>
              {service.description && (
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
