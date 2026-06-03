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
