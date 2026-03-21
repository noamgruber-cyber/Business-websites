'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const RED   = '#c0392b';
const CREAM = '#faf7f2';
const CREAM2 = '#f0ebe1';

type Props = { business: BusinessData };

export default function RestaurantMenu({ business }: Props) {
  if (!business.services || business.services.length === 0) return null;

  const half = Math.ceil(business.services.length / 2);
  const col1 = business.services.slice(0, half);
  const col2 = business.services.slice(half);

  return (
    <section id="menu" style={{ color: '#2c2c2c' }}>

      {/* ── First half — cream ── */}
      <div style={{ backgroundColor: CREAM }} className="py-20 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-playfair text-5xl sm:text-6xl font-black" style={{ color: '#2c2c2c' }}>
              Our Menu
            </h2>
            {/* Decorative red line ornament */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-px w-12" style={{ backgroundColor: RED }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RED }} />
              <div className="h-px w-12" style={{ backgroundColor: RED }} />
            </div>
          </motion.div>

          {/* Two-column menu layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
            <MenuColumn items={col1} />
            <MenuColumn items={col2} />
          </div>
        </div>
      </div>

      {/* ── Second half / about — warmer cream ── */}
      <div style={{ backgroundColor: CREAM2 }} className="py-16 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: RED }}>
              Our Story
            </p>
            <p
              className="font-playfair text-xl sm:text-2xl leading-relaxed"
              style={{ color: '#4a4a4a' }}
            >
              {business.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MenuColumn({
  items,
}: {
  items: BusinessData['services'];
}) {
  return (
    <div>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          viewport={{ once: true }}
          className="py-5"
          style={{ borderBottom: '1px solid rgba(44,44,44,0.12)' }}
        >
          {/* Name + dotted line + price */}
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-base" style={{ color: '#2c2c2c' }}>
              {item.name}
            </span>
            {/* Dotted line filler */}
            <span
              className="flex-1 border-b border-dotted min-w-4"
              style={{ borderColor: 'rgba(44,44,44,0.25)', marginBottom: '3px' }}
            />
            <span className="font-bold text-base flex-shrink-0" style={{ color: '#c0392b' }}>
              {item.price}
            </span>
          </div>
          {/* Description */}
          {item.description && (
            <p className="text-sm italic mt-1" style={{ color: '#888' }}>
              {item.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
