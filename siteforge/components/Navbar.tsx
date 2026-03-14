"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

/**
 * Navbar — Sticky top navigation with frosted glass on scroll.
 * Mobile: hamburger menu with animated dropdown.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { lang, toggleLang } = useLanguage();
  const text = t[lang].nav;

  // Detect scroll position to apply frosted glass style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: text.features,  href: "/#how-it-works" },
    { label: text.templates, href: "/#templates" },
    { label: text.pricing,   href: "/pricing" },
    { label: text.examples,  href: "/examples" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* ===== Logo ===== */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-2xl" aria-label="lightning bolt">⚡</span>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">SiteForge</span>
          </span>
        </a>

        {/* ===== Desktop Nav Links ===== */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ===== Desktop right side: lang toggle + CTA ===== */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-full transition-all duration-200"
            aria-label="Toggle language"
          >
            {text.langToggle}
          </button>

          {!loading && (
            user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/20"
              >
                {user.photoURL && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full" />
                )}
                {text.dashboard}
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/20"
              >
                {text.signIn}
              </Link>
            )
          )}
        </div>

        {/* ===== Mobile Hamburger ===== */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* ===== Mobile Menu Dropdown ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base font-medium text-white/80 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 flex items-center gap-3">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    {text.dashboard}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    {text.signIn}
                  </Link>
                )}
                <button
                  onClick={() => { toggleLang(); setMenuOpen(false); }}
                  className="text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-3 py-2 rounded-full transition-all duration-200"
                >
                  {text.langToggle}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
