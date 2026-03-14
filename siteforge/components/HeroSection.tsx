"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/**
 * HeroSection — Full-viewport hero with animated gradient orbs,
 * bold headline, CTAs, social proof, and a browser mockup preview.
 */
export default function HeroSection() {
  const { user } = useAuth();
  const ctaHref = user ? '/create' : '/login';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ===== Animated Background Orbs ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Orb 1 — large purple, top-left */}
        <div className="orb-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px]" />
        {/* Orb 2 — large blue, bottom-right */}
        <div className="orb-2 absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[140px]" />
        {/* Orb 3 — small accent, top-right */}
        <div className="orb-3 absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-500/15 blur-[80px]" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-sm text-white/70"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now in public beta — free forever plan available
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          Your Business Deserves
          <br />
          <span className="gradient-text">a Beautiful Website</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Create a stunning website for your business in under 5 minutes.
          No coding. No designers. Just pick a template and go.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link
            href={ctaHref}
            className="gradient-btn text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-xl shadow-purple-500/25 w-full sm:w-auto text-center"
          >
            Get Started Free →
          </Link>
          <Link
            href="/examples"
            className="inline-flex items-center justify-center text-base font-semibold px-8 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200 w-full sm:w-auto"
          >
            View Examples
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-white/40 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          <span>✓ Free forever plan</span>
          <span>✓ No credit card required</span>
          <span>✓ Live in 5 minutes</span>
        </motion.p>
      </div>

      {/* ===== Browser Mockup ===== */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mt-16 w-full max-w-4xl mx-auto"
      >
        {/* Browser Chrome */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
          {/* Browser Top Bar */}
          <div className="bg-[#1a1a2e] px-4 py-3 flex items-center gap-3">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* URL Bar */}
            <div className="flex-1 max-w-sm mx-auto">
              <div className="bg-[#0d0d1a] rounded-md px-3 py-1 text-xs text-white/40 text-center">
                mycohensbarbershop.siteforge.com
              </div>
            </div>
          </div>

          {/* Browser Content — Fake Business Website Preview */}
          <div className="bg-[#f8f4ef] overflow-hidden" style={{ height: "380px" }}>
            {/* Fake Website Navbar */}
            <div className="bg-[#1a0a00] px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500" />
                <span className="text-white font-bold text-sm">Cohen&apos;s Barbershop</span>
              </div>
              <div className="hidden sm:flex gap-4">
                {["Services", "Gallery", "Book Now"].map((item) => (
                  <div key={item} className="text-white/60 text-xs">{item}</div>
                ))}
              </div>
            </div>

            {/* Fake Hero */}
            <div className="bg-gradient-to-br from-amber-900 to-amber-700 px-8 py-10 text-center">
              <div className="text-white text-xl font-black mb-2">Premium Cuts & Grooming</div>
              <div className="text-amber-200 text-sm mb-6">Est. 2010 · Tel Aviv · Walk-ins Welcome</div>
              <div className="inline-block bg-amber-500 text-white text-xs font-bold px-5 py-2 rounded-full">
                Book an Appointment
              </div>
            </div>

            {/* Fake Services Row */}
            <div className="bg-[#f8f4ef] px-6 py-5">
              <div className="text-center text-[#1a0a00] text-xs font-bold mb-4 uppercase tracking-widest">Our Services</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Haircut", price: "₪60", icon: "✂️" },
                  { label: "Beard Trim", price: "₪40", icon: "🪒" },
                  { label: "Full Service", price: "₪90", icon: "💈" },
                ].map((svc) => (
                  <div key={svc.label} className="bg-white rounded-lg p-3 text-center shadow-sm border border-amber-100">
                    <div className="text-xl mb-1">{svc.icon}</div>
                    <div className="text-[#1a0a00] text-xs font-semibold">{svc.label}</div>
                    <div className="text-amber-600 text-xs font-bold">{svc.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow beneath browser */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />
      </motion.div>
    </section>
  );
}
