"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import { SanityPost } from "@/lib/sanity/types";
import { X } from "lucide-react";

type Props = {
  posts: SanityPost[];
  tags: string[];
};

export default function BlogClient({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  const filtered = useMemo(() => {
    if (!activeTag) return posts;

    return posts.filter((post) =>
      post.tags?.includes(activeTag)
    );
  }, [posts, activeTag]);

  /*
   * Show the most important topics first.
   * We don't want the sidebar to become huge.
   */
  const visibleTags = showAllTags ? tags : tags.slice(0, 5);
  const remainingTags = Math.max(tags.length - 5, 0);

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-12
        lg:grid-cols-[190px_minmax(0,680px)_1fr]
        lg:gap-14
      "
    >
      {/* ====================================================== */}
      {/* LEFT — TOPICS                                          */}
      {/* ====================================================== */}

      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="flex items-center justify-between lg:block">
          <div>
            <p
              className="
                font-mono
                text-[0.65rem]
                uppercase
                tracking-[0.18em]
                text-muted-foreground
              "
            >
              Explore
            </p>

            <h2
              className="
                mt-1
                font-sans
                text-base
                font-semibold
                tracking-tight
                text-foreground
              "
            >
              Topics
            </h2>
          </div>

          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="
                inline-flex
                items-center
                gap-1
                font-mono
                text-[0.65rem]
                text-muted-foreground
                transition-colors
                hover:text-foreground
                lg:mt-3
              "
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        {/* Topic list */}
        <div className="mt-5">
          <nav
            className={`
              space-y-1
              ${showAllTags ? "max-h-64 overflow-y-auto pr-2" : ""}
            `}
          >
            {/* All posts */}
            <button
              onClick={() => setActiveTag(null)}
              className={`
                flex
                w-full
                items-center
                justify-between
                rounded-lg
                px-3
                py-2
                text-left
                transition-all
                duration-200

                ${
                  activeTag === null
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              <span className="font-mono text-[0.72rem]">
                All posts
              </span>

              <span
                className={`
                  font-mono
                  text-[0.62rem]
                  ${
                    activeTag === null
                      ? "text-background/60"
                      : "text-muted-foreground/60"
                  }
                `}
              >
                {posts.length}
              </span>
            </button>

            {/* Tags */}
            {visibleTags.map((tag) => {
              const isActive = activeTag === tag;

              const count = posts.filter((post) =>
                post.tags?.includes(tag)
              ).length;

              return (
                <button
                  key={tag}
                  onClick={() =>
                    setActiveTag(isActive ? null : tag)
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  <span
                    className="
                      truncate
                      font-mono
                      text-[0.72rem]
                      capitalize
                    "
                  >
                    {tag}
                  </span>

                  <span
                    className={`
                      ml-3
                      shrink-0
                      font-mono
                      text-[0.62rem]

                      ${
                        isActive
                          ? "text-background/60"
                          : "text-muted-foreground/60"
                      }
                    `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Show more / less */}
          {remainingTags > 0 && (
            <button
              onClick={() => setShowAllTags((prev) => !prev)}
              className="
                mt-2
                px-3
                py-2
                font-mono
                text-[0.68rem]
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              {showAllTags
                ? "Show less"
                : `+${remainingTags} more`}
            </button>
          )}
        </div>
      </aside>

      {/* ====================================================== */}
      {/* CENTER — POSTS                                         */}
      {/* ====================================================== */}

      <section className="min-w-0">
        {/* Results header */}
        <div
          className="
            mb-2
            flex
            items-end
            justify-between
            border-b
            border-border
            pb-4
          "
        >
          <div>
            <p
              className="
                font-mono
                text-[0.65rem]
                uppercase
                tracking-[0.15em]
                text-muted-foreground
              "
            >
              {activeTag ? "Topic" : "Latest"}
            </p>

            <h2
              className="
                mt-1
                font-sans
                text-xl
                font-semibold
                tracking-tight
                text-foreground
              "
            >
              {activeTag || "All writing"}
            </h2>
          </div>

          <span
            className="
              font-mono
              text-[0.65rem]
              text-muted-foreground
            "
          >
            {filtered.length}{" "}
            {filtered.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {/* Posts */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p
              className="
                font-mono
                text-sm
                text-muted-foreground
              "
            >
              No articles found in this topic.
            </p>

            <button
              onClick={() => setActiveTag(null)}
              className="
                mt-4
                font-mono
                text-xs
                text-muted-foreground
                underline
                underline-offset-4
                transition-colors
                hover:text-foreground
              "
            >
              View all articles
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
      </section>

      {/* ====================================================== */}
      {/* RIGHT — RESERVED FOR FUTURE                            */}
      {/* ====================================================== */}

      <aside className="hidden lg:block">
        {/* 
          Reserved for future features.

          Possible additions:
          - Featured article
          - Newsletter
          - Archive
          - Reading progress
          - Popular posts
          - About author
        */}
      </aside>
    </div>
  );
}