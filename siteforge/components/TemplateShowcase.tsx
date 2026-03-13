"use client";

import { motion } from "framer-motion";

/**
 * TemplateShowcase — Horizontal grid of template category cards.
 * Cards lift on hover with a glowing purple border effect.
 */

const templates = [
  { icon: "💈", name: "Barbershop", count: "12 templates" },
  { icon: "🍕", name: "Restaurant", count: "18 templates" },
  { icon: "💅", name: "Nail Salon", count: "10 templates" },
  { icon: "🏋️", name: "Gym & Fitness", count: "8 templates" },
  { icon: "☕", name: "Café", count: "14 templates" },
  { icon: "📸", name: "Photography", count: "11 templates" },
];

export default function TemplateShowcase() {
  return (
    <section id="templates" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Industry Templates
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Templates For{" "}
            <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-12">
            Professional designs tailored to your industry — ready to customize in minutes.
          </p>
        </motion.div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative glass rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer
                         hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20
                         hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none" />

              {/* Icon */}
              <span className="text-4xl mb-3 block">{template.icon}</span>

              {/* Name */}
              <h3 className="font-bold text-white text-sm mb-1">{template.name}</h3>

              {/* Count */}
              <p className="text-white/40 text-xs mb-4">{template.count}</p>

              {/* Preview Button */}
              <button className="text-xs font-semibold text-purple-400 group-hover:text-white border border-purple-500/30 group-hover:border-purple-400 group-hover:bg-purple-600/20 px-3 py-1.5 rounded-full transition-all duration-200">
                Preview
              </button>
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
            See All Templates
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
