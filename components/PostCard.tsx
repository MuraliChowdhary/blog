import Link from "next/link";
import { formatDate } from "@/lib/posts";
import type { Post } from "contentlayer/generated";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group py-6 border-b border-border last:border-0">
      <Link href={post.url} className="block space-y-2">

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "oklch(0.58 0 0)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          className="font-bold leading-snug tracking-tight group-hover:opacity-70 transition-opacity"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.05rem",
            color: "oklch(0.145 0 0)",
          }}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          className="leading-relaxed line-clamp-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "oklch(0.48 0 0)",
            lineHeight: "1.75",
          }}
        >
          {post.description}
        </p>

        {/* Meta */}
        <div
          className="flex items-center gap-2 pt-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "oklch(0.58 0 0)",
          }}
        >
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </Link>
    </article>
  );
}