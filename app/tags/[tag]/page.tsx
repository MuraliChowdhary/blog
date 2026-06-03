import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import Link from "next/link";

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `All posts tagged with ${tag}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link
          href="/blog"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
        >
          ← All posts
        </Link>
        <h1 className="text-xl font-semibold tracking-tight">
          #{tag}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}