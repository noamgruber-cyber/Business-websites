'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const RED = '#c0392b';

type Props = { business: BusinessData };

export default function RestaurantGallery({ business }: Props) {
  const photos = business.galleryPhotos.filter(Boolean);
  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="py-20 px-6 sm:px-12 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color: RED }}>
            Gallery
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black" style={{ color: '#2c2c2c' }}>
            A Taste of Our World
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-12" style={{ backgroundColor: RED }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RED }} />
            <div className="h-px w-12" style={{ backgroundColor: RED }} />
          </div>
        </motion.div>

        {/* Photo grid — horizontal scroll on mobile, 3-col on desktop */}
        <div className="hidden sm:grid grid-cols-3 gap-5">
          {photos.map((url, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ outline: '2px solid transparent', outlineOffset: '2px' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.outline = `2px solid ${RED}`)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.outline = '2px solid transparent')
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal scroll strip */}
        <div
          className="sm:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {photos.map((url, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 overflow-hidden rounded-2xl shadow-md"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full h-52 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
