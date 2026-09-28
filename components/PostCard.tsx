import Link from "next/link";
import { SanityPost } from "@/lib/sanity/types";

export default function PostCard({ post }: { post: SanityPost }) {
  return (
    <article className="group py-6 border-b border-border last:border-0">
      <Link
        href={`/blog/${post.slug.current}`}
        className="block space-y-2"
      >
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-muted-foreground transition-colors group-hover:text-foreground/70"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          className="
            font-bold
            leading-snug
            tracking-tight
            text-foreground
            transition-opacity
            group-hover:opacity-70
          "
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.05rem",
          }}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          className="
            leading-relaxed
            line-clamp-2
            text-muted-foreground
          "
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            lineHeight: "1.75",
          }}
        >
          {post.description}
        </p>

        {/* Meta */}
        <div
          className="
            flex
            items-center
            gap-2
            pt-1
            text-muted-foreground
          "
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
          }}
        >
          {/* 
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
          */}
        </div>
      </Link>
    </article>
  );
}