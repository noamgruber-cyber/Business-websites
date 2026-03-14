'use client';

import { motion } from 'framer-motion';
import { BusinessData } from '@/lib/types';

const GOLD = '#c8a96e';

type Props = { business: BusinessData };

export default function BarbershopGallery({ business }: Props) {
  const photos = business.galleryPhotos.filter(Boolean);
  if (photos.length === 0) return null;

  const igLink = business.instagram
    ? `https://instagram.com/${business.instagram.replace('@', '')}`
    : null;

  return (
    <section id="gallery" className="py-20 px-6 sm:px-12" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Portfolio
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white">
            The Work
          </h2>
          <div className="mt-5 mx-auto w-16 h-[2px]" style={{ backgroundColor: GOLD }} />
        </motion.div>

        {/* Masonry grid via CSS columns */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ columnCount: 'auto', columnWidth: '260px', columnGap: '8px' }}
        >
          {photos.map((url, i) => (
            <div
              key={i}
              className="group relative overflow-hidden mb-2 break-inside-avoid cursor-pointer"
              style={{ breakInside: 'avoid' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: 'block' }}
              />
              {/* Gold hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: `${GOLD}33` }}
              >
                <svg
                  className="w-8 h-8 text-white drop-shadow-lg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        {igLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <a
              href={igLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 hover:opacity-75"
              style={{ color: GOLD }}
            >
              {/* Instagram icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow us @{business.instagram}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
