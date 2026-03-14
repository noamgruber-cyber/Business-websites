"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts, CATEGORY_COLORS, type BlogPost } from "@/lib/blogPosts";
import { useLanguage } from "@/context/LanguageContext";

const CATEGORIES = ["All", "Guide", "Tips", "Research", "Strategy"] as const;

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const { lang } = useLanguage();
  const title = lang === "he" ? post.titleHe : post.title;
  const excerpt = lang === "he" ? post.excerptHe : post.excerpt;

  const date = new Date(post.publishedAt).toLocaleDateString(
    lang === "he" ? "he-IL" : "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group flex flex-col rounded-2xl overflow-hidden glass hover:border-purple-500/40 transition-colors duration-300 hover:shadow-xl hover:shadow-purple-500/10"
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden bg-white/5 flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-3 start-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-bold text-white text-base leading-snug mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors">
          {title}
        </h2>
        <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span>{date}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group/link"
          >
            Read More
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { lang } = useLanguage();

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">

      {/* ── Hero ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="orb-1 absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
          <div className="orb-2 absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-sm text-white/70"
          >
            📝 SiteForge Blog
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-5"
          >
            Tips & Guides for
            <br />
            <span className="gradient-text">Small Business Owners</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/55 text-lg max-w-xl mx-auto"
          >
            Practical advice on getting your business online, attracting more customers, and growing in the digital age.
          </motion.p>
        </div>
      </section>

      {/* ── Filter pills ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-white/50 hover:text-white border border-white/15 hover:border-white/30"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="blog-filter-pill"
                    className="absolute inset-0 rounded-full shimmer-btn"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-white/40 py-16">No posts in this category yet.</p>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 sm:p-10 text-center"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-black mb-3">Ready to Get Your Business Online?</h2>
            <p className="text-white/50 mb-6 text-sm">
              Stop reading about it — build your website in 5 minutes for free.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 shimmer-btn text-white font-bold px-8 py-3.5 rounded-full shadow-xl shadow-purple-500/25"
            >
              Create My Free Website →
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
