'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const CARAMEL = '#d4a96a';
const CREAM   = '#fdf8f3';

type Props = { business: BusinessData };

export default function CafeGallery({ business }: Props) {
  const photos = business.galleryPhotos.filter(Boolean);
  if (photos.length === 0) return null;

  return (
    <section id="gallery" style={{ backgroundColor: CREAM }} className="py-20 px-6 sm:px-14">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-lora text-5xl font-bold" style={{ color: '#6f4e37' }}>
            Our Cozy Corner
          </h2>
          <div className="mt-4 mx-auto w-14 h-0.5" style={{ backgroundColor: CARAMEL }} />
        </motion.div>

        {/* Pinterest-style 3-col grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((url, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Café ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: i % 3 === 1 ? '3/4' : '1/1' }}
              />
              {/* Caramel overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: `${CARAMEL}44` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
