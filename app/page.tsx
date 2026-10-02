import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY, TAGS_QUERY } from "@/lib/sanity/queries";
import { type SanityPost } from "@/lib/sanity/types";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about backend systems, distributed infrastructure, and AI engineering.",
};

const options = {
  next: {
    revalidate: 60,
  },
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    client.fetch<SanityPost[]>(POSTS_QUERY, {}, options),
    client.fetch<string[]>(TAGS_QUERY, {}, options),
  ]);

  return (
    <main className="min-h-screen">
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-12
          sm:px-8
          lg:px-10
          lg:py-16
        "
      >
        {/* Page heading */}
        {/* <header className="mb-12 max-w-2xl">
          <p
            className="
              mb-3
              font-mono
              text-[0.68rem]
              uppercase
              tracking-[0.18em]
              text-muted-foreground
            "
          >
            Writing
          </p>

          <h1
            className="
              font-sans
              text-3xl
              font-semibold
              tracking-[-0.04em]
              text-foreground
              sm:text-4xl
            "
          >
            Thoughts, systems & ideas.
          </h1>

          <p
            className="
              mt-4
              max-w-xl
              font-mono
              text-sm
              leading-7
              text-muted-foreground
            "
          >
            Writing about backend systems, distributed infrastructure,
            AI engineering, and the ideas behind the software we build.
          </p>
        </header> */}

        <BlogClient
          posts={posts}
          tags={tags ?? []}
        />
      </div>
    </main>
  );
}