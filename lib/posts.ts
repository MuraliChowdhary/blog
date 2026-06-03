import { allPosts } from "contentlayer/generated";

export function getAllPosts() {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug);
}

export function getAllTags() {
  const tags = allPosts.flatMap((post) => post.tags ?? []);
  return [...new Set(tags)];
}

export function getPostsByTag(tag: string) {
  const decoded = decodeURIComponent(tag);
  return allPosts
    .filter((post) => post.published && post.tags?.includes(decoded))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}