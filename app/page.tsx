import Link from "next/link";
// import Image from "next/image";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Hero — avatar + intro */}
      <section className="mb-16">
        {/* Avatar */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-full bg-muted border border-border overflow-hidden">
            {/* Replace src with your actual photo */}
            <div className="w-12 h-12 rounded-full bg-muted border border-border" />
          </div>
        </div>

        {/* Intro text */}
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-foreground">
            Hey, I&apos;m Sudireddy. I build backend systems, distributed
            infrastructure, and AI-integrated products.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Currently at{" "}
            <span className="text-foreground font-medium">Accenture</span>,
            learning deeply across Java, AWS, and distributed systems. I write
            about the things I build, break, and eventually understand.
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 mt-6">
          <Link
            href="https://x.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            X / Twitter
          </Link>
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:you@email.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </Link>
        </div>
      </section>

      {/* Recent Writing */}
      {posts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Recent Writing
            </h2>
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              All posts →
            </Link>
          </div>

          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}