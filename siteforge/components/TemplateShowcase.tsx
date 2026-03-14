"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

/**
 * TemplateShowcase — Horizontal grid of template category cards.
 * Cards lift on hover, emoji bounces, preview button slides up.
 */

const TEMPLATE_ICONS = ["💈", "🍕", "💅", "🏋️", "☕", "📸"];

export default function TemplateShowcase() {
  const { lang } = useLanguage();
  const text = t[lang].templates;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="templates" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header — scale up from center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">
            {text.label}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            {text.title}{" "}
            <span className="gradient-text">{text.titleHighlight}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-12">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {text.categories.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative glass rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer
                         hover:shadow-xl hover:shadow-purple-500/20
                         hover:border-purple-500/50 transition-colors duration-300 overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none" />

              {/* Icon with bounce */}
              <motion.span
                className="text-4xl mb-3 block"
                animate={hoveredIndex === index ? {
                  y: [0, -8, 0],
                  rotate: [0, -5, 5, 0],
                } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {TEMPLATE_ICONS[index]}
              </motion.span>

              {/* Name */}
              <h3 className="font-bold text-white text-sm mb-1">{template.name}</h3>

              {/* Count */}
              <p className="text-white/40 text-xs mb-4">{template.count}</p>

              {/* Preview Button — slides up on hover */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-semibold text-white border border-purple-400 bg-purple-600/30 px-3 py-1.5 rounded-full"
              >
                {text.previewBtn}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* See All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm transition-colors duration-200 group"
          >
            {text.seeAll}
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
