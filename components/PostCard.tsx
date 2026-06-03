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
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-base font-semibold leading-snug tracking-tight group-hover:text-muted-foreground transition-colors">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs text-muted-foreground">
            {formatDate(post.date)}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {post.readTime}
          </span>
        </div>
      </Link>
    </article>
  );
}