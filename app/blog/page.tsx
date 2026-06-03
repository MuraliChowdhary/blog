// import type { Metadata } from "next";
// import { getAllPosts, getAllTags } from "@/lib/posts";
// import BlogClient from "@/components/BlogClient";

// export const metadata: Metadata = {
//   title: "Blog",
//   description: "Writing about backend systems, distributed infrastructure, and AI engineering.",
// };

// export default function BlogPage() {
//   const posts = getAllPosts();
//   const tags = getAllTags();

//   return (
//     <div className="max-w-2xl mx-auto px-6 py-6">

//       {/* Header */}
//       {/* <div className="mb-10">
//         <h1
//           className="text-2xl font-bold tracking-tight mb-2"
//           style={{ fontFamily: "var(--font-sans)" }}
//         >
//           Writing
//         </h1>
//         <p
//           className="text-sm"
//           style={{
//             fontFamily: "var(--font-mono)",
//             color: "oklch(0.52 0 0)",
//           }}
//         >
//           Thoughts on systems, backend engineering, and building things that last.
//         </p>
//       </div> */}

//       {/* Client: search + tags + filtered posts */}
//       <BlogClient posts={posts} tags={tags} />
//     </div>
//   );
// }


import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client";


const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}