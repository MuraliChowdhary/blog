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

type Props = {
  params: Promise<{ slug: string }>;
};

const options = {
  next: { revalidate: 60 },
};

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(SLUGS_QUERY);

  return slugs.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await client.fetch<SanityPost>(
    POST_QUERY,
    { slug },
    options
  );

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

  const post = await client.fetch<SanityPost>(
    POST_QUERY,
    { slug },
    options
  );

  if (!post) notFound();

  const readTime = post.body
    ? getReadTime(post.body as unknown[])
    : "1 min read";

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-2xl px-6 py-12 select-text">

        {/* =========================
            Back
        ========================= */}
        <div className="mb-10">
          <Link
            href="/"
            className="
              font-mono
              text-xs
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            ← All posts
          </Link>
        </div>

        {/* =========================
            Header
        ========================= */}
        <header className="mb-10">

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="
                    font-mono
                    text-xs
                    text-muted-foreground
                    transition-colors
                    hover:text-foreground
                  "
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="
              mb-4
              font-sans
              text-foreground
              font-bold
              tracking-tight
              leading-tight
              text-[clamp(1.6rem,4vw,2.2rem)]
            "
          >
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p
              className="
                mb-5
                font-mono
                text-[0.9rem]
                leading-[1.85]
                text-muted-foreground
              "
            >
              {post.description}
            </p>
          )}

          {/* Metadata */}
          <div
            className="
              flex
              items-center
              gap-3
              border-t
              border-border
              pt-4
              font-mono
              text-xs
              text-muted-foreground
            "
          >
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>

            <span>·</span>

            <span>{readTime}</span>
          </div>
        </header>

        {/* =========================
            Table of Contents
        ========================= */}
        <TOC />

        {/* =========================
            Article body
        ========================= */}
        <div className="prose select-text">
          {post.body && (
            <PortableText
              value={post.body as never}
              components={portableTextComponents}
            />
          )}
        </div>

        {/* =========================
            Footer
        ========================= */}
        <footer
          className="
            mt-16
            flex
            items-center
            justify-between
            border-t
            border-border
            pt-6
          "
        >
          <Link
            href="/blog"
            className="
              font-mono
              text-xs
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            ← Back to all posts
          </Link>

          <span
            className="
              font-mono
              text-xs
              text-muted-foreground
            "
          >
            Thanks for reading
          </span>
        </footer>

      </article>
    </>
  );
}