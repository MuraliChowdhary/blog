import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx/MDXComponents";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/posts";
import ReadingProgress from "@/components/ReadingProgress";
import TOC from "@/components/TOC";
// import { useMDXComponent } from "next-contentlayer2/hooks";
import Link from "next/link";
import MDXRenderer from "@/components/MDXRenderer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Sudireddy"],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const components = getMDXComponents();

  return (  
    <>
      <ReadingProgress />

      <article className="max-w-2xl mx-auto px-6 py-12">

        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All posts
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-10">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl font-bold tracking-tight leading-snug mb-4">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5"
        style={{
            fontFamily: "var(--font-mono)",
            color: "oklch(0.48 0 0)",
            fontSize: "0.9rem",
            lineHeight: "1.85"
        }}>
        {post.description}
        </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <TOC />

        {/* MDX content */}
        <div className="prose">
        <MDXRenderer code={post.body.code} />
        </div>

        {/* Article footer */}
        <footer className="mt-16 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to all posts
            </Link>
            <span className="text-xs text-muted-foreground">
              Thanks for reading
            </span>
          </div>
        </footer>
      </article>
    </>
  );
}