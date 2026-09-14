import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getPostBySlug, getRelatedPosts, CATEGORY_COLORS } from "@/lib/blogPosts";
import BlogPostClient from "./BlogPostClient";

type Props = { params: Promise<{ slug: string }> };

// ── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// ── SEO metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found — SiteForge Blog" };
  return {
    title: `${post.title} | SiteForge Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 2);

  // Extract H2 headings from HTML for table of contents
  const tocRegex = /<h2>(.*?)<\/h2>/g;
  const toc: { id: string; text: string }[] = [];
  let match;
  while ((match = tocRegex.exec(post.content)) !== null) {
    toc.push({
      id: match[1].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      text: match[1],
    });
  }

  return <BlogPostClient post={post} related={related} toc={toc} />;
}
