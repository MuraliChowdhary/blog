import { client } from "./client";
import { POST_QUERY, POSTS_QUERY, RECENT_POSTS_QUERY, SLUGS_QUERY, TAGS_QUERY,POSTS_BY_TAG_QUERY } from "./queries";
import { SanityPost } from "./types";


export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(POSTS_QUERY);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(POST_QUERY, { slug });
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(SLUGS_QUERY);
}

export async function getAllTags(): Promise<string[]> {
  return client.fetch(TAGS_QUERY);
}

export async function getRecentPosts(): Promise<SanityPost[]> {
  return client.fetch(RECENT_POSTS_QUERY);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getPostsByTag(
  tag: string
): Promise<SanityPost[]> {
  return client.fetch(
    POSTS_BY_TAG_QUERY,
    { tag } as Record<string, string>
  );
}


export function getReadTime(body: unknown[]): string {
  const text = JSON.stringify(body);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}