import { groq } from "next-sanity";

// All published posts — for blog list
export const allPostsQuery = groq`
  *[_type == "post" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags,
    featured,
    coverImage {
      asset->,
      alt
    }
  }
`;

// Single post by slug — for article page
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags,
    featured,
    coverImage {
      asset->,
      alt
    },
    body
  }
`;

// All slugs — for generateStaticParams
export const allSlugsQuery = groq`
  *[_type == "post" && published == true] {
    "slug": slug.current
  }
`;

// All tags
export const allTagsQuery = groq`
  array::unique(*[_type == "post" && published == true].tags[])
`;

// Featured posts — for home page
export const featuredPostsQuery = groq`
  *[_type == "post" && published == true && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags
  }
`;

// Recent posts — for home page fallback
export const recentPostsQuery = groq`
  *[_type == "post" && published == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags
  }
`;