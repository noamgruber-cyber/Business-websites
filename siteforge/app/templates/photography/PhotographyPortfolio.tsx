'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BusinessData } from '@/lib/types';

type Props = { business: BusinessData };

export default function PhotographyPortfolio({ business }: Props) {
  const photos = business.galleryPhotos.filter(Boolean);
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <section id="portfolio" className="bg-white py-16 px-6 sm:px-14">
        <div className="max-w-5xl mx-auto">
          {/* Masonry via CSS columns — no title, just images */}
          <div style={{ columnCount: 'auto', columnWidth: '260px', columnGap: '8px' }}>
            {photos.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="mb-2 break-inside-avoid cursor-pointer group relative overflow-hidden"
                style={{ breakInside: 'avoid' }}
                onClick={() => setLightbox(url)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Portfolio ${i + 1}`}
                  className="w-full object-cover block transition-all duration-500"
                  style={{ filter: 'grayscale(100%)' }}
                  onMouseEnter={(e) => ((e.target as HTMLImageElement).style.filter = 'grayscale(0%)')}
                  onMouseLeave={(e) => ((e.target as HTMLImageElement).style.filter = 'grayscale(100%)')}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl leading-none"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ×
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[90vh]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox}
                alt="Full size"
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
