import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/posts.ts";

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
    <main className="max-w-2xl lg:max-w-5xl mt-16 sm:mt-32 mx-auto">
      <div className="max-w-2xl mx-5 sm:mx-0">
        <h1 className="text-4xl tracking-tighter text-zinc-800 sm:text-5xl font-bold">
          Writing on software, design, and startups
        </h1>
        <p className="mt-6 text-base text-zinc-600">
          All of my long-form thoughts on programming, product design, and more,
          collected in chronological order.
        </p>
      </div>
      <div className="mx-5 sm:mx-auto mt-16 sm:mt-20 md:border-l md:border-zinc-100 md:pl-6">
        <div className="flex max-w-3xl flex-col space-y-16">
          <article className="md:grid md:grid-cols-4 md:items-baseline">
            <div className="md:col-span-3 group relative flex flex-col items-start">
              <h2 className="text-base font-semibold tracking-tight text-zinc-800">
                <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
                <a href="/blog/chatgpt-plugin">
                  <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                  <span className="relative z-10">
                    How to Build a ChatGPT Plugin with Next.js in 2023
                  </span>
                </a>
              </h2>
              <time
                className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 pl-3.5"
                datetime="2023-05-03"
              >
                <span
                  className="absolute inset-y-0 left-0 flex items-center"
                  aria-hidden="true"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200"></span>
                </span>
                May 3, 2023
              </time>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                When OpenAI announced ChatGPT Plugins in March, it took the
                world by storm. Here's a step-by-step tutorial of how to build
                your own ChatGPT Plugin with Next.js &amp; Vercel.
              </p>
              <div
                aria-hidden="true"
                className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
              >
                Read article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="ml-1 h-4 w-4 stroke-current"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
            <time
              className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400"
              datetime="2023-05-03"
            >
              May 3, 2023
            </time>
          </article>
          <article className="md:grid md:grid-cols-4 md:items-baseline">
            <div className="md:col-span-3 group relative flex flex-col items-start">
              <h2 className="text-base font-semibold tracking-tight text-zinc-800">
                <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
                <a href="/blog/twitter-algorithm">
                  <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                  <span className="relative z-10">
                    How the Twitter Algorithm works in 2023
                  </span>
                </a>
              </h2>
              <time
                className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 pl-3.5"
                datetime="2023-03-31"
              >
                <span
                  className="absolute inset-y-0 left-0 flex items-center"
                  aria-hidden="true"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200"></span>
                </span>
                March 31, 2023
              </time>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                On March 31, 2023, Twitter open-sourced their algorithm. Here
                are some of my takeaways about how their algorithm works after
                diving into their codebase.
              </p>
              <div
                aria-hidden="true"
                className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
              >
                Read article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="ml-1 h-4 w-4 stroke-current"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
            <time
              className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400"
              datetime="2023-03-31"
            >
              March 31, 2023
            </time>
          </article>
        </div>
      </div>
      <div
        id="blog"
        className="mt-30 mb-10 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40"
      >
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
    </main>
  );
};

export default Blog;

//TODO: Adjust the margin of blog list box to make it looking similar to Tey's blog.
//TODO: Fine tune of mobile responsive design for blog posts.
