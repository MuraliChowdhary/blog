// All published posts — blog list + home
export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current) && published == true]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags,
    featured
  }
`;

// Single post by slug
export const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags,
    coverImage,
    body
  }
`;

// All slugs for generateStaticParams
export const SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current) && published == true] {
    "slug": slug.current
  }
`;

// All tags
export const TAGS_QUERY = `
  array::unique(
    *[_type == "post" && published == true].tags[]
  )
`;

// Recent 3 for home page
export const RECENT_POSTS_QUERY = `
  *[_type == "post" && defined(slug.current) && published == true]
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags
  }
`;


export const POSTS_BY_TAG_QUERY = `
  *[
    _type == "post" &&
    published == true &&
    $tag in tags
  ]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    publishedAt,
    tags,
    featured
  }
`;