import { getAllPosts } from "@/lib/sanity/fetch";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getAllPosts();

  const baseUrl = "https://muralichowdhary.com";

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description ?? ""}]]></description>
      <link>${baseUrl}/blog/${post.slug.current}</link>
      <guid>${baseUrl}/blog/${post.slug.current}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Murali — Engineering Blog</title>
    <description>
      Writing about systems, backend engineering, and AI.
    </description>
    <link>${baseUrl}</link>
    <atom:link
      href="${baseUrl}/feed.xml"
      rel="self"
      type="application/rss+xml"
    />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}