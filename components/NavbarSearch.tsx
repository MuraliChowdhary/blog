"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { SanityPost } from "@/lib/sanity/types";

type Props = {
  posts: SanityPost[];
};

export default function NavbarSearch({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------
  // Debounce
  // ---------------------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // ---------------------------------------
  // Search logic
  // ---------------------------------------
  const suggestions =
    debouncedQuery.length > 0
      ? posts
          .filter((post) => {
            const normalizedQuery = debouncedQuery.toLowerCase();

            const matchesTitle = post.title
              ?.toLowerCase()
              .includes(normalizedQuery);

            const matchesDescription = post.description
              ?.toLowerCase()
              .includes(normalizedQuery);

            const matchesTags = post.tags?.some((tag) =>
              tag.toLowerCase().includes(normalizedQuery)
            );

            return matchesTitle || matchesDescription || matchesTags;
          })
          .slice(0, 6)
      : [];

  const showSuggestions =
    isFocused && debouncedQuery.length > 0;

  // ---------------------------------------
  // Close when clicking outside
  // ---------------------------------------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="relative w-full max-w-sm"
    >
      {/* Search input */}
      <div
        className="
          flex
          h-11
          items-center
          rounded-full
          border
          border-border
          bg-background
          px-4
          transition-all
          duration-200
          focus-within:border-foreground/30
          focus-within:ring-2
          focus-within:ring-foreground/5
        "
      >
        <Search
          className="
            mr-3
            h-4
            w-4
            shrink-0
            text-muted-foreground
          "
        />

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search posts..."
          aria-label="Search posts"
          className="
            min-w-0
            flex-1
            bg-transparent
            font-mono
            text-sm
            text-foreground
            outline-none
            placeholder:text-muted-foreground
          "
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setDebouncedQuery("");
            }}
            aria-label="Clear search"
            className="
              ml-2
              rounded-full
              p-1
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+10px)]
            z-50
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-background
            shadow-lg
          "
        >
          {suggestions.length > 0 ? (
            <div className="p-2">
              <div
                className="
                  px-3
                  pb-2
                  pt-1
                  font-mono
                  text-[0.68rem]
                  uppercase
                  tracking-wider
                  text-muted-foreground
                "
              >
                Suggestions
              </div>

              {suggestions.map((post) => (
                <Link
                  key={post.slug.current}
                  href={`/blog/${post.slug.current}`}
                  onClick={() => {
                    setIsFocused(false);
                  }}
                  className="
                    group
                    flex
                    items-start
                    justify-between
                    gap-4
                    rounded-xl
                    px-3
                    py-3
                    transition-colors
                    hover:bg-muted
                  "
                >
                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        font-sans
                        text-sm
                        font-medium
                        text-foreground
                      "
                    >
                      {post.title}
                    </p>

                    {post.description && (
                      <p
                        className="
                          mt-1
                          line-clamp-1
                          font-mono
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {post.description}
                      </p>
                    )}

                    {post.tags?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="
                              rounded-full
                              bg-muted
                              px-2
                              py-0.5
                              font-mono
                              text-[0.65rem]
                              text-muted-foreground
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ArrowUpRight
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-muted-foreground
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                    "
                  />
                </Link>
              ))}

              {suggestions.length > 0 && (
                <div
                  className="
                    mt-1
                    border-t
                    border-border
                    px-3
                    py-2
                    font-mono
                    text-[0.68rem]
                    text-muted-foreground
                  "
                >
                  {suggestions.length} matching{" "}
                  {suggestions.length === 1
                    ? "post"
                    : "posts"}
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <Search className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />

              <p className="font-mono text-sm text-muted-foreground">
                No posts found
              </p>

              <p className="mt-1 font-mono text-xs text-muted-foreground/70">
                Try another keyword or topic
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}