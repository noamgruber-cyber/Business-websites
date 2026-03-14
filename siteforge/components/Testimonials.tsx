"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

/**
 * Testimonials — Social proof section with 3 glassmorphism quote cards.
 */

const AVATAR_COLORS = [
  "from-amber-500 to-orange-600",
  "from-red-500 to-pink-600",
  "from-violet-500 to-purple-600",
];
const AVATAR_INITIALS = ["AC", "MR", "DL"];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useLanguage();
  const text = t[lang].testimonials;

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">
            {text.label}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            {text.title}{" "}
            <span className="gradient-text">{text.titleHighlight}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {text.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass rounded-2xl p-8 flex flex-col gap-5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              {/* Stars */}
              <StarRating count={5} />

              {/* Quote */}
              <p className="text-white/70 leading-relaxed flex-1 text-sm">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {AVATAR_INITIALS[index]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-white/40 text-xs">{item.biz}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center"
        >
          {text.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black gradient-text">{stat.value}</p>
              <p className="text-white/40 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
