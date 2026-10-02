import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SanityPost } from "@/lib/sanity/types";
import { formatDate, getReadTime } from "@/lib/sanity/fetch";

type Props = {
  post: SanityPost;
};

export default function PostCard({ post }: Props) {
  const visibleTags = post.tags?.slice(0, 3) ?? [];
  const remainingTags = Math.max(
    (post.tags?.length ?? 0) - 3,
    0
  );

  return (
    <article className="group relative border-b border-border">
      <Link
        href={`/blog/${post.slug.current}`}
        className="
          relative
          block
          py-10
          transition-colors
          duration-300
          sm:py-12
        "
      >
        {/* Top metadata */}
        <div className="mb-5 flex items-center justify-between">
          <div
            className="
              flex
              items-center
              gap-3
              font-mono
              text-[0.68rem]
              uppercase
              tracking-[0.12em]
              text-muted-foreground
            "
          >
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-border"
            />

            <span>{getReadTime(post.body ?? [])}</span>
          </div>

          {/* Article indicator */}
          <span
            className="
              hidden
              font-mono
              text-[0.65rem]
              uppercase
              tracking-[0.12em]
              text-muted-foreground/60
              sm:block
            "
          >
            Article
          </span>
        </div>

        {/* Main content */}
        <div className="relative pr-8 sm:pr-12">
          {/* Title */}
          <h2
            className="
              max-w-4xl
              font-sans
              text-[1.7rem]
              font-semibold
              leading-[1.15]
              tracking-[-0.035em]
              text-foreground
              transition-colors
              duration-200
              group-hover:text-foreground/75
              sm:text-[2rem]
              md:text-[2.15rem]
            "
          >
            {post.title}
          </h2>

          {/* Description */}
          <p
            className="
              mt-4
              max-w-3xl
              font-mono
              text-[0.84rem]
              leading-7
              text-muted-foreground
              sm:text-[0.9rem]
            "
          >
            {post.description}
          </p>

          {/* Topics */}
          {visibleTags.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-md
                    border
                    border-border
                    bg-muted/30
                    px-2.5
                    py-1
                    font-mono
                    text-[0.65rem]
                    capitalize
                    tracking-wide
                    text-muted-foreground
                    transition-all
                    duration-200
                    group-hover:border-foreground/20
                    group-hover:text-foreground
                  "
                >
                  {tag}
                </span>
              ))}

              {remainingTags > 0 && (
                <span
                  className="
                    px-1
                    font-mono
                    text-[0.65rem]
                    text-muted-foreground/70
                  "
                >
                  +{remainingTags}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Floating arrow */}
        <div
          className="
            absolute
            right-0
            top-[7.5rem]
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-border
            text-muted-foreground
            opacity-0
            transition-all
            duration-300
            group-hover:-translate-y-1
            group-hover:border-foreground/30
            group-hover:text-foreground
            group-hover:opacity-100
          "
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>
    </article>
  );
}