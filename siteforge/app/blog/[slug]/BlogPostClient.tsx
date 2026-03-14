"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost, CATEGORY_COLORS } from "@/lib/blogPosts";
import { useLanguage } from "@/context/LanguageContext";

type TocItem = { id: string; text: string };

type Props = {
  post: BlogPost;
  related: BlogPost[];
  toc: TocItem[];
};

// ── Inject IDs into H2 tags for TOC anchor links ──────────────────────────────
function addIdsToHeadings(html: string): string {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h2 id="${id}">${text}</h2>`;
  });
}

export default function BlogPostClient({ post, related, toc }: Props) {
  const { lang } = useLanguage();

  const title = lang === "he" ? post.titleHe : post.title;
  const content = lang === "he" ? post.contentHe : post.content;
  const processedContent = addIdsToHeadings(content);

  const date = new Date(post.publishedAt).toLocaleDateString(
    lang === "he" ? "he-IL" : "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-16">

      {/* ── Cover ── */}
      <div className="relative h-80 sm:h-[400px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={title}
          className="w-full h-full object-cover opacity-60 ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 start-6">
          <Link href="/blog" className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
            ← Blog
          </Link>
        </div>
      </div>

      {/* ── Content layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

          {/* ── Main article ── */}
          <article>
            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-white/30 text-sm">{date}</span>
                <span className="text-white/30 text-sm">·</span>
                <span className="text-white/30 text-sm">{post.readTime} min read</span>
              </div>

              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {title}
              </h1>
            </motion.div>

            {/* Article body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 rounded-2xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))", border: "1px solid rgba(139,92,246,0.25)" }}
            >
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-black text-white mb-2">Ready to build your website?</h3>
              <p className="text-white/50 text-sm mb-5">
                Everything in this article can be done in minutes with SiteForge. Free forever.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 shimmer-btn text-white font-bold px-7 py-3 rounded-full shadow-lg shadow-purple-500/25 text-sm"
              >
                Create My Free Website →
              </Link>
            </motion.div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Table of contents */}
            {toc.length > 0 && (
              <div className="glass rounded-2xl p-5 lg:sticky lg:top-24">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">In this article</h4>
                <nav>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-white/55 hover:text-purple-300 transition-colors leading-snug block py-0.5"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Related posts */}
            {related.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Related Articles</h4>
                <div className="space-y-4">
                  {related.map((rel) => {
                    const relTitle = lang === "he" ? rel.titleHe : rel.title;
                    return (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rel.coverImage}
                          alt={relTitle}
                          className="w-16 h-12 rounded-lg object-cover flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                        <div>
                          <p className="text-sm font-semibold text-white/80 group-hover:text-purple-300 transition-colors leading-snug line-clamp-2">
                            {relTitle}
                          </p>
                          <p className="text-xs text-white/35 mt-1">{rel.readTime} min read</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mini CTA */}
            <div className="glass rounded-2xl p-5 text-center">
              <p className="text-xs text-white/40 mb-2">Start for free</p>
              <Link
                href="/create"
                className="block shimmer-btn text-white font-bold px-4 py-2.5 rounded-xl text-sm"
              >
                Build My Website ⚡
              </Link>
            </div>
          </aside>

        </div>
      </div>

      {/* Blog typography styles */}
      <style jsx global>{`
        .prose-blog { color: rgba(255,255,255,0.7); line-height: 1.8; font-size: 17px; }
        .prose-blog h2 {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 800;
          margin: 2.5rem 0 1rem;
          scroll-margin-top: 100px;
        }
        .prose-blog h3 { color: #fff; font-size: 1.2rem; font-weight: 700; margin: 2rem 0 0.75rem; }
        .prose-blog p { margin-bottom: 1.25rem; }
        .prose-blog ul { list-style: none; padding: 0; margin: 1.25rem 0; }
        .prose-blog ul li { padding-left: 1.5rem; position: relative; margin-bottom: 0.5rem; }
        .prose-blog ul li::before { content: "•"; position: absolute; left: 0; color: #a78bfa; font-weight: bold; }
        .prose-blog ol { padding-left: 1.5rem; margin: 1.25rem 0; }
        .prose-blog ol li { margin-bottom: 0.5rem; }
        .prose-blog strong { color: rgba(255,255,255,0.95); font-weight: 700; }
        .prose-blog em { font-style: italic; }
        .prose-blog code { background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.25); padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.9em; color: #c4b5fd; font-family: monospace; }
        .prose-blog table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; }
        .prose-blog table td, .prose-blog table th { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .prose-blog a { color: #a78bfa; text-decoration: underline; }
      `}</style>
    </main>
  );
}
