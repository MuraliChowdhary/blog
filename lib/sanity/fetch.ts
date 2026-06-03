
import { client } from "./client";
import {
  allPostsQuery,
  postBySlugQuery,
  allSlugsQuery,
  allTagsQuery,
  recentPostsQuery,
} from "./queries";

export type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  coverImage?: {
    asset: { url: string };
    alt?: string;
  };
  body?: unknown[];
};

export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(allPostsQuery);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(postBySlugQuery, { slug });
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allSlugsQuery);
}

export async function getAllTags(): Promise<string[]> {
  return client.fetch(allTagsQuery);
}

export async function getRecentPosts(): Promise<SanityPost[]> {
  return client.fetch(recentPostsQuery);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getReadTime(body: unknown[]): string {
  const text = JSON.stringify(body);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}