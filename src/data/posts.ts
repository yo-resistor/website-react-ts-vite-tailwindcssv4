// src/data/posts.ts

export interface Author {
  name: string;
  avatarUrl?: string; // Optional avatar URL
  profileUrl?: string; // Optional link to author's profile
}

export interface Post {
  slug: string; // Unique identifier, used for URL and finding the MDX file
  title: string;
  date: string; // ISO 8601 date string (e.g., "2024-05-06T10:00:00Z")
  author: Author;
  tags: string[];
  excerpt: string; // A short summary of the post
  readingTime: string; // E.g., "5 min read"
  commentsCount: number;
  imageUrl?: string; // Optional cover image for the post
  mdxFile: string; // Path to the mdx file, relative to a base content directory
}

export const posts: Post[] = [
  {
    slug: "example-modern-post",
    title: "My Example Modern Blog Post with MDX",
    date: "2024-05-06T10:00:00Z", // Example: May 6, 2024
    author: {
      name: "AI Roo",
      avatarUrl: "https://placehold.co/40", // Use placehold.co
      profileUrl: "#",
    },
    tags: ["React", "TypeScript", "TailwindCSS", "MDX"],
    excerpt:
      "A deep dive into creating modern blog posts using MDX, React, and Tailwind CSS v4, featuring text, images, and code snippets.",
    readingTime: "7 min read",
    commentsCount: 12,
    imageUrl: "https://placehold.co/800x400?text=Blog+Post+Cover", // Use placehold.co
    mdxFile: "example-modern-post.mdx", // Assumes posts are in src/content/posts/
  },
  {
    slug: "second-example-post",
    title: "Exploring Advanced React Patterns",
    date: "2024-05-07T10:00:00Z", // Example: May 7, 2024
    author: {
      name: "AI Roo",
      avatarUrl: "https://placehold.co/40", // Use placehold.co
      profileUrl: "#",
    },
    tags: ["React", "Advanced", "Patterns", "TypeScript"],
    excerpt:
      "A look into some advanced React patterns like Higher-Order Components (HOCs) and Render Props, with TypeScript examples.",
    readingTime: "9 min read", // Estimated reading time
    commentsCount: 5, // Mock comments count
    imageUrl: "https://placehold.co/800x400?text=Advanced+React", // Use placehold.co
    mdxFile: "second-example-post.mdx", // Path to the mdx file
  },
  // Add more mock posts here
];

// Helper function to get a post by slug
export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find((post) => post.slug === slug);
};

// Helper function to format date (optional, can be done in component)
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
