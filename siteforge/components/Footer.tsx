"use client";

import { motion } from "framer-motion";

/**
 * Footer — 4-column links, logo/tagline, copyright, gradient top border.
 */

const footerLinks = [
  {
    heading: "Product",
    links: ["Features", "Templates", "Pricing", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
  },
  {
    heading: "Social",
    links: ["Twitter / X", "Instagram", "LinkedIn", "Facebook"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-transparent">
      {/* Gradient Top Border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #8b5cf6 30%, #3b82f6 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative bg-[#050508] px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16"
          >
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <span className="text-xl font-bold">
                  <span className="gradient-text">SiteForge</span>
                </span>
              </a>
              <p className="text-white/45 text-sm leading-relaxed">
                The easiest way to get your business online. No code. No complexity.
              </p>
              {/* Mini social icons row */}
              <div className="flex items-center gap-3 mt-6">
                {["𝕏", "📷", "in"].map((icon) => (
                  <button
                    key={icon}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/45 text-sm hover:text-white/80 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2025 SiteForge. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">
              Built with ❤️ for local businesses everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
