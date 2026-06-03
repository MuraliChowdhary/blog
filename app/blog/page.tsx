import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY, TAGS_QUERY } from "@/lib/sanity/queries";
import { type SanityPost } from "@/lib/sanity/types";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about backend systems, distributed infrastructure, and AI engineering.",
};

const options = { next: { revalidate: 60 } };

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    client.fetch<SanityPost[]>(POSTS_QUERY, {}, options),
    client.fetch<string[]>(TAGS_QUERY, {}, options),
  ]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "var(--font-sans)" }}>
          Writing
        </h1>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          color: "oklch(0.52 0 0)",
        }}>
          Thoughts on systems, backend engineering, and building things that last.
        </p>
      </div>

      <BlogClient posts={posts} tags={tags ?? []} />
    </div>
  );
}