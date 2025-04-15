import { useState } from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "First Post",
    slug: "first-post",
    description: "My first blog post.",
  },
  {
    title: "Tailwind CSS Guide",
    slug: "tailwind-guide",
    description: "A guide to Tailwind CSS v4.",
  },
  {
    title: "How to Install PyTorch in a Miniconda Environment",
    slug: "install-pytorch-miniconda",
    description:
      "A step-by-step guide to installing PyTorch in a Miniconda environment.",
  },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="blog" className="py-20 px-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Blog
      </h1>
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-6 border rounded-lg dark:bg-gray-800 dark:text-white"
      />
      <ul className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="text-xl font-semibold text-blue-500 dark:text-blue-400 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No matching posts found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Blog;
