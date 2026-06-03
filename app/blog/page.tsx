import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts, getAllTags } from "@/lib/posts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about systems, backend engineering, and AI.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-xl font-semibold tracking-tight mb-2">
          Writing
        </h1>
        <p className="text-sm text-muted-foreground">
          {posts.length} posts on systems, backend, and engineering depth.
        </p>
      </div>

      {/* Tags filter row */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1 hover:text-foreground hover:border-foreground transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Post list */}
      <div>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        )}
      </div>
    </div>
  );
}