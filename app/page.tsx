// import Link from "next/link";
// import { client } from "@/lib/sanity/client";
// import { RECENT_POSTS_QUERY } from "@/lib/sanity/queries";
// import { type SanityPost } from "@/lib/sanity/types";
// import { formatDate } from "@/lib/sanity/utils";

// const options = { next: { revalidate: 60 } };

// export default async function HomePage() {
//   const posts = await client.fetch<SanityPost[]>(
//     RECENT_POSTS_QUERY, {}, options
//   );

//   return (
//     <div className="max-w-2xl mx-auto px-6 py-12">

//       {/* Hero */}
//       <section className="mb-16">
//         <div className="w-12 h-12 rounded-full bg-muted border border-border mb-6" />

//         <div className="space-y-4">
//           <p className="text-base leading-relaxed text-foreground"
//              style={{ fontFamily: "var(--font-sans)" }}>
//             Hey, I&apos;m Sudireddy. I build backend systems, distributed
//             infrastructure, and AI-integrated products.
//           </p>
//           <p className="text-base leading-relaxed"
//              style={{
//                fontFamily: "var(--font-mono)",
//                fontSize: "0.9rem",
//                color: "oklch(0.48 0 0)",
//              }}>
//             Currently at{" "}
//             <span className="font-semibold text-foreground">Accenture</span>
//             , learning deeply across Java, AWS, and distributed systems.
//             I write about the things I build, break, and eventually understand.
//           </p>
//         </div>

//         <div className="flex items-center gap-4 mt-6">
//           {[
//             { label: "X / Twitter", href: "https://x.com/yourusername" },
//             { label: "GitHub", href: "https://github.com/yourusername" },
//             { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
//             { label: "Email", href: "mailto:you@email.com" },
//           ].map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-muted-foreground hover:text-foreground transition-colors"
//               style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Recent posts */}
//       {posts.length > 0 && (
//         <section>
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-xs font-semibold tracking-widest uppercase"
//                 style={{
//                   fontFamily: "var(--font-mono)",
//                   color: "oklch(0.56 0 0)",
//                 }}>
//               Recent Writing
//             </h2>
//             <Link
//               href="/blog"
//               className="text-xs text-muted-foreground hover:text-foreground transition-colors"
//               style={{ fontFamily: "var(--font-mono)" }}
//             >
//               All posts →
//             </Link>
//           </div>

//           <div>
//             {posts.map((post) => (
//               <article key={post._id} className="group py-5 border-b border-border last:border-0">
//                 <Link href={`/blog/${post.slug.current}`} className="block space-y-1.5">
//                   {post.tags && post.tags.length > 0 && (
//                     <div className="flex gap-2">
//                       {post.tags.slice(0, 2).map((tag) => (
//                         <span key={tag} style={{
//                           fontFamily: "var(--font-mono)",
//                           fontSize: "0.72rem",
//                           color: "oklch(0.58 0 0)",
//                         }}>
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   <h3 className="font-bold leading-snug tracking-tight group-hover:opacity-70 transition-opacity"
//                       style={{ fontFamily: "var(--font-sans)", fontSize: "1rem" }}>
//                     {post.title}
//                   </h3>
//                   {post.description && (
//                     <p className="line-clamp-2" style={{
//                       fontFamily: "var(--font-mono)",
//                       fontSize: "0.85rem",
//                       color: "oklch(0.48 0 0)",
//                       lineHeight: "1.7",
//                     }}>
//                       {post.description}
//                     </p>
//                   )}
//                   <p style={{
//                     fontFamily: "var(--font-mono)",
//                     fontSize: "0.78rem",
//                     color: "oklch(0.58 0 0)",
//                   }}>
//                     {formatDate(post.publishedAt)}
//                   </p>
//                 </Link>
//               </article>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }


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