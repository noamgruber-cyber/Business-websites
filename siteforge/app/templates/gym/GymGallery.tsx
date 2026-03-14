'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const ORANGE = '#f97316';

type Props = { business: BusinessData };

export default function GymGallery({ business }: Props) {
  const photos = business.galleryPhotos.filter(Boolean);
  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="py-20 px-6 sm:px-16" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-oswald text-5xl sm:text-6xl font-bold text-white uppercase">
            THE GYM
          </h2>
          <div className="mt-3 w-16 h-1" style={{ backgroundColor: ORANGE }} />
        </motion.div>

        {/* Desktop: 3-column masonry via CSS columns */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="hidden sm:block"
          style={{ columnCount: 3, columnGap: '6px' }}
        >
          {photos.map((url, i) => (
            <div
              key={i}
              className="group relative overflow-hidden mb-1.5 break-inside-avoid cursor-pointer"
              style={{ breakInside: 'avoid' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Gym ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: 'block' }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: `${ORANGE}44` }}
              />
            </div>
          ))}
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div
          className="sm:hidden flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {photos.map((url, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Gym ${i + 1}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
