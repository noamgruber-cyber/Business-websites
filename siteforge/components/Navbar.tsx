"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/**
 * Navbar — Sticky top navigation with frosted glass on scroll.
 * Mobile: hamburger menu with animated dropdown.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  // Detect scroll position to apply frosted glass style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#how-it-works" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "#pricing" },
    { label: "Examples", href: "#templates" },
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
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl" aria-label="lightning bolt">⚡</span>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">SiteForge</span>
          </span>
        </a>

        {/* ===== Desktop Nav Links ===== */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ===== Desktop CTA ===== */}
        {!loading && (
          user ? (
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center gap-2 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/20"
            >
              {user.photoURL && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full" />
              )}
              Dashboard →
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-1 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/20"
            >
              Sign In →
            </Link>
          )
        )}

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
                  <a
                    href={link.href}
                    className="text-base font-medium text-white/80 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard →
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In →
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
