"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getT } from "@/lib/translations";

/**
 * HowItWorks — 3-step process section with glassmorphism cards.
 * Scroll-triggered fade-in animations + hover lift + radar pulse badges.
 */

const STEP_ICONS = ["🎨", "✏️", "🚀"];
const STEP_NUMBERS = ["01", "02", "03"];

export default function HowItWorks() {
  const { lang } = useLanguage();
  const text = getT(lang).howItWorks;

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header — text from left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {text.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="relative group glass rounded-2xl p-8 hover:border-purple-500/40 transition-colors duration-300 hover:shadow-xl hover:shadow-purple-500/15 cursor-default"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/8 group-hover:to-blue-600/8 transition-all duration-300 pointer-events-none" />

              {/* Connector line (desktop only) */}
              {index < text.steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -end-4 w-8 h-[2px] bg-gradient-to-r from-purple-500/40 to-transparent z-10 rtl:bg-gradient-to-l" />
              )}

              {/* Number Badge with radar pulse */}
              <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-black mb-6 shadow-lg shadow-purple-500/30">
                {STEP_NUMBERS[index]}
                {/* Radar pulse rings */}
                <motion.span
                  className="absolute inset-0 rounded-full border border-purple-500/40"
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.6, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-purple-400/20"
                  animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.6 + 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Icon with bounce on hover */}
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
              >
                {STEP_ICONS[index]}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-white/55 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
