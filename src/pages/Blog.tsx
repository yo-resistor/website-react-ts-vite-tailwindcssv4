import { useState } from "react";
import { Link } from "react-router-dom";

const blogPosts = [
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
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const allTags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags))
  ).sort();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

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
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === null
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              selectedTag === tag
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <ul className="relative pl-4 sm:pl-8 border-l border-gray-300 dark:border-gray-600 space-y-16">
        {filteredPosts.map((post) => (
          <li
            key={post.slug}
            className="relative flex flex-col sm:flex-row sm:items-start sm:gap-8"
          >
            {/* Date */}
            <time className="text-sm text-gray-400 whitespace-nowrap mb-4 sm:mb-0 sm:min-w-[9rem] sm:pt-2">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            {/* Post content */}
            <Link
              to={`/blog/${post.slug}`}
              className="group w-full transition hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-4 rounded-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
              <p className="mt-3 text-sm font-medium text-green-600 group-hover:underline">
                Read article →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

//TODO: Adjust the margin of blog list box to make it looking similar to Tey's blog.
//TODO: Fine tune of mobile responsive design for blog posts.
