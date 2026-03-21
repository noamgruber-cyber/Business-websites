'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const BROWN   = '#6f4e37';
const CARAMEL = '#d4a96a';
const CREAM   = '#fdf8f3';

type Props = { business: BusinessData };

// Infer a simple category from the service name
function inferCategory(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('coffee') || lower.includes('espresso') || lower.includes('latte') ||
      lower.includes('cappuccino') || lower.includes('flat') || lower.includes('cardamom') ||
      lower.includes('americano') || lower.includes('macchiato')) return '☕ Hot Drinks';
  if (lower.includes('cold') || lower.includes('ice') || lower.includes('lemonade') ||
      lower.includes('smoothie') || lower.includes('juice') || lower.includes('iced')) return '🧊 Cold Drinks';
  return '🥐 Food';
}

export default function CafeMenu({ business }: Props) {
  if (!business.services || business.services.length === 0) return null;

  // Group services by inferred category
  const groups: Record<string, typeof business.services> = {};
  business.services.forEach((svc) => {
    const cat = inferCategory(svc.name);
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(svc);
  });

  return (
    <section id="menu" style={{ backgroundColor: CREAM }} className="py-20 px-6 sm:px-14">
      <div className="max-w-2xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-lora text-5xl sm:text-6xl font-bold" style={{ color: BROWN }}>
            What We&apos;re Brewing
          </h2>
          {/* Ornament */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-12" style={{ backgroundColor: CARAMEL }} />
            <span style={{ color: CARAMEL, fontSize: 16 }}>✦</span>
            <div className="h-px w-12" style={{ backgroundColor: CARAMEL }} />
          </div>
        </motion.div>

        {/* Groups */}
        {Object.entries(groups).map(([cat, items], gi) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Category header */}
            <p className="font-lora font-bold text-lg mb-5" style={{ color: CARAMEL }}>
              {cat}
            </p>

            {/* Items */}
            {items.map((item, i) => (
              <div
                key={item.id}
                className="py-4"
                style={{
                  borderBottom: i < items.length - 1
                    ? `1px dotted ${BROWN}30`
                    : `1px solid ${BROWN}15`,
                }}
              >
                {/* Name + price row */}
                <div className="flex items-baseline gap-2">
                  <span className="font-lora font-bold text-base" style={{ color: '#2c2c2c' }}>
                    {item.name}
                  </span>
                  <span className="flex-1 border-b border-dotted" style={{ borderColor: `${BROWN}25`, marginBottom: 3 }} />
                  <span className="font-bold text-sm flex-shrink-0" style={{ color: BROWN }}>
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p className="font-lora italic text-sm mt-1" style={{ color: '#999' }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
