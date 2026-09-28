"use client";

import { useState, useMemo } from "react";
import PostCard from "@/components/PostCard";
import { SanityPost } from "@/lib/sanity/types";

type Props = {
  posts: SanityPost[];
  tags: string[];
};

export default function BlogClient({ posts, tags }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = activeTag
        ? post.tags?.includes(activeTag)
        : true;

      const matchesQuery = normalizedQuery
        ? post.title.toLowerCase().includes(normalizedQuery) ||
          post.description.toLowerCase().includes(normalizedQuery) ||
          post.tags?.some((tag) =>
            tag.toLowerCase().includes(normalizedQuery)
          )
        : true;

      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          aria-label="Search posts"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
          }}
          className="
            w-full
            pl-9
            pr-10
            py-2.5
            rounded-2xl
            border
            border-border
            bg-background
            text-foreground
            placeholder:text-muted-foreground
            focus:outline-none
            focus:ring-1
            focus:ring-ring
            transition-all
          "
        />

        {/* Clear */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="
              absolute
              right-3.5
              top-1/2
              -translate-y-1/2
              text-muted-foreground
              hover:text-foreground
              transition-colors
            "
            aria-label="Clear search"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* All */}
        <button
          onClick={() => setActiveTag(null)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
          }}
          className={`
            px-3
            py-1
            rounded-full
            border
            transition-colors

            ${
              activeTag === null
                ? "border-foreground text-foreground bg-foreground/5"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }
          `}
        >
          all
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setActiveTag(activeTag === tag ? null : tag)
            }
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
            }}
            className={`
              px-3
              py-1
              rounded-full
              border
              transition-colors

              ${
                activeTag === tag
                  ? "border-foreground text-foreground bg-foreground/5"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }
            `}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Result count */}
      <div
        className="mb-4 text-muted-foreground"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
        }}
      >
        {filtered.length === posts.length
          ? `${posts.length} posts`
          : `${filtered.length} of ${posts.length} posts`}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          >
            No posts match &quot;{query}&quot;
          </p>

          <button
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
            className="
              mt-3
              text-muted-foreground
              hover:text-foreground
              transition-colors
              underline
              underline-offset-4
            "
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div>
          {filtered.map((post) => (
            <PostCard
              key={post.slug.current}
              post={post}
            />
          ))}
        </div>
      )}
    </div>
  );
}