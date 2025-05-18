"use strict";
// src/data/posts.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.getPostBySlug = exports.posts = void 0;
exports.posts = [
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
        excerpt: "A deep dive into creating modern blog posts using MDX, React, and Tailwind CSS v4, featuring text, images, and code snippets.",
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
        excerpt: "A look into some advanced React patterns like Higher-Order Components (HOCs) and Render Props, with TypeScript examples.",
        readingTime: "9 min read", // Estimated reading time
        commentsCount: 5, // Mock comments count
        imageUrl: "https://placehold.co/800x400?text=Advanced+React", // Use placehold.co
        mdxFile: "second-example-post.mdx", // Path to the mdx file
    },
    // Add more mock posts here
];
// Helper function to get a post by slug
var getPostBySlug = function (slug) {
    return exports.posts.find(function (post) { return post.slug === slug; });
};
exports.getPostBySlug = getPostBySlug;
// Helper function to format date (optional, can be done in component)
var formatDate = function (dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
exports.formatDate = formatDate;
