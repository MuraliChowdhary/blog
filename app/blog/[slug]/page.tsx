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

  const primaryTag = post.tags?.[0];

  return (
    <>
      <ReadingProgress />

      <article
        className="
          min-h-screen
          bg-background
          text-foreground
          selection:bg-foreground/10
          select-text
        "
      >
        {/* =====================================================
            ARTICLE HEADER
        ===================================================== */}

        <header
          className="
            mx-auto
            max-w-6xl
            px-6
            pb-14
            pt-14
            sm:px-8
            sm:pb-16
            sm:pt-16
            lg:pt-20
          "
        >
          <div className="mx-auto max-w-4xl text-center">

            {/* Primary topic */}
            {primaryTag && (
              <Link
                href={`/tags/${encodeURIComponent(primaryTag)}`}
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-border
                  bg-muted/30
                  px-3.5
                  py-1.5
                  font-mono
                  text-[0.68rem]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-muted-foreground
                  transition-all
                  duration-200
                  hover:border-foreground/20
                  hover:bg-muted/50
                  hover:text-foreground
                "
              >
                {primaryTag}
              </Link>
            )}

            {/* Title */}
            <h1
              className="
                mx-auto
                mt-6
                max-w-3xl
                font-sans
                text-[clamp(1.9rem,3.5vw,3.25rem)]
                font-bold
                leading-[1.08]
                tracking-[-0.035em]
                text-foreground
              "
            >
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p
                className="
                  mx-auto
                  mt-6
                  max-w-2xl
                  font-sans
                  text-base
                  leading-7
                  text-muted-foreground
                  sm:text-[1.05rem]
                  sm:leading-8
                "
              >
                {post.description}
              </p>
            )}

            {/* Metadata */}
            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-3
                font-mono
                text-[0.7rem]
                text-muted-foreground
              "
            >
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>

              <span
                aria-hidden="true"
                className="text-border"
              >
                ·
              </span>

              <span>{readTime}</span>
            </div>
          </div>
        </header>

        {/* =====================================================
            ARTICLE CONTENT
        ===================================================== */}

        <main className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl">

            {/* Table of contents */}
            <TOC />

            {/* Article body */}
            <div
              className="
                pb-16
                pt-8
                sm:pt-10
              "
            >
              {post.body && (
                <div className="prose">
                  <PortableText
                    value={post.body as never}
                    components={portableTextComponents}
                  />
                </div>
              )}
            </div>

            {/* =================================================
                ARTICLE END
            ================================================= */}

            <section className="pb-20">

              {/* Completion */}
        
              {/* Footer */}
             {/* Article completion + navigation */}
              <section className="pb-20">
  <footer
    className="
      mt-10
      flex
      flex-col
      gap-6
      border-t
      border-border
      pt-6
      sm:flex-row
      sm:items-center
      sm:justify-between
    "
  >
    {/* Left — Back to posts */}
    <Link
      href="/"
      className="
        inline-flex
        shrink-0
        items-center
        gap-2
        font-mono
        text-xs
        text-muted-foreground
        transition-colors
        hover:text-foreground
      "
    >
      <span aria-hidden="true">←</span>
      <span>Back to all posts</span>
    </Link>

    {/* Right — Article completion */}
    <div
  className="
    flex
    items-center
    gap-5
    sm:text-right
  "
>
  {/* End of article */}
  <div className="shrink-0">
    <p
      className="
        font-mono
        text-[0.65rem]
        uppercase
        tracking-[0.16em]
        text-muted-foreground
      "
    >
      End of article
    </p>

    <p
      className="
        mt-1
        font-sans
        text-sm
        text-foreground
      "
    >
      Thanks for reading.
    </p>
  </div>

  {/* Topics */}
  {post.tags && post.tags.length > 0 && (
    <div
      className="
        flex
        max-w-[260px]
        flex-wrap
        items-center
        justify-end
        gap-1.5
      "
    >
      {post.tags.slice(0, 3).map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-border
            bg-muted/30
            px-2.5
            py-1
            font-mono
            text-[0.65rem]
            text-muted-foreground
            transition-all
            duration-200
            hover:border-foreground/20
            hover:bg-muted/50
            hover:text-foreground
          "
        >
          {tag}
        </Link>
      ))}

      {/* Remaining topics */}
      {post.tags.length > 3 && (
        <span
          className="
            inline-flex
            items-center
            rounded-full
            px-2
            py-1
            font-mono
            text-[0.65rem]
            text-muted-foreground
          "
          title={post.tags.slice(3).join(", ")}
        >
          +{post.tags.length - 3}
        </span>
      )}
    </div>
  )}
</div>
  </footer>
</section>

            </section>
          </div>
        </main>
      </article>
    </>
  );
}