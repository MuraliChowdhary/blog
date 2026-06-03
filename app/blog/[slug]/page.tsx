import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/mdx/PortableTextComponents";
import { client } from "@/lib/sanity/client";
import { POST_QUERY, SLUGS_QUERY } from "@/lib/sanity/queries";
import { type SanityPost } from "@/lib/sanity/types";
import { formatDate, getReadTime } from "@/lib/sanity/utils";
import ReadingProgress from "@/components/ReadingProgress";
import TOC from "@/components/TOC";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

const options = { next: { revalidate: 60 } };

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPost>(POST_QUERY, { slug }, options);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<SanityPost>(POST_QUERY, { slug }, options);
  if (!post) notFound();

  const readTime = post.body
    ? getReadTime(post.body as unknown[])
    : "1 min read";

  return (
    <>
      <ReadingProgress />

      <article className="max-w-2xl mx-auto px-6 py-12">

        {/* Back */}
        <div className="mb-10">
          <Link href="/blog"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}>
            ← All posts
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}
                  className="hover:text-foreground transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "oklch(0.58 0 0)",
                  }}>
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-bold tracking-tight leading-tight mb-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                letterSpacing: "-0.03em",
                color: "oklch(0.145 0 0)",
              }}>
            {post.title}
          </h1>

          {post.description && (
            <p className="mb-5" style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              lineHeight: "1.85",
              color: "oklch(0.48 0 0)",
            }}>
              {post.description}
            </p>
          )}

          <div className="flex items-center gap-3 border-t border-border pt-4"
               style={{
                 fontFamily: "var(--font-mono)",
                 fontSize: "0.8rem",
                 color: "oklch(0.56 0 0)",
               }}>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </header>

        {/* TOC */}
        <TOC />

        {/* Body */}
        <div className="prose">
          {post.body && (
            <PortableText
              value={post.body as never}
              components={portableTextComponents}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-border flex items-center justify-between">
          <Link href="/blog"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}>
            ← Back to all posts
          </Link>
          <span className="text-xs text-muted-foreground"
                style={{ fontFamily: "var(--font-mono)" }}>
            Thanks for reading
          </span>
        </footer>

      </article>
    </>
  );
}