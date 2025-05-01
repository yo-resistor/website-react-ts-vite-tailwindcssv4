// src/data/posts.ts
export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  date: string;
}

export const blogPosts: BlogPostMeta[] = [
  {
    title: "First Post",
    slug: "first-post",
    description: "My first blog post.",
    tags: ["general"],
    date: "2024-01-01",
  },
  {
    title: "Tailwind CSS Guide",
    slug: "tailwind-guide",
    description: "A guide to Tailwind CSS v4.",
    tags: ["frontend", "tailwind"],
    date: "2024-01-10",
  },
  {
    title: "How to Install PyTorch in a Miniconda Environment",
    slug: "install-pytorch-miniconda",
    description:
      "A step-by-step guide to installing PyTorch in a Miniconda environment.",
    tags: ["machine learning", "pytorch"],
    date: "2024-01-15",
  },
  {
    title: "Make Your Code Snippets Look Like VSCode",
    slug: "code-snippets-look-like-vscode",
    description:
      "A quick guide to making your blog code blocks feel like you're still in your favorite editor.",
    tags: ["frontend", "tailwind"],
    date: "2024-05-02",
  },
];
