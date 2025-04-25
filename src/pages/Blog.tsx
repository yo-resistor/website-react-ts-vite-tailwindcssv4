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
    <main className="max-[200px]:hidden max-w-2xl lg:max-w-5xl w-full h-full min-h-screen flex flex-col bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40">
      <h2 className="max-sm:mt-20 mt-30 mb-6 font-mono text-base text-left text-neutral-800 dark:text-neutral-300">
        Writing about
      </h2>
      <h1 className="mb-6 font-sans text-5xl max-sm:text-4xl font-bold text-blue-600 dark:text-blue-500">
        My Journey
      </h1>
      <div className="mb-6 text-base text-neutral-800 dark:text-neutral-300">
        <div className="hidden max-sm:flex">
          Notes from my journey — from materials science and side hustles to
          coding and machine learning.
        </div>
        <div className="hidden sm:flex w-full">
          Ideas, projects, and notes along the way. Some are polished, others
          more exploratory — all tracing the path I’ve been carving from
          materials science and side hustles to coding and machine learning,
          collected in chronological order.
        </div>
      </div>
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-dark-bg-2 text-neutral-800 dark:text-white"
      />
      <div className="max-sm:hidden flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === null
              ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold"
              : "bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300"
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
                ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold"
                : "bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="x-5 sm:mx-auto mt-16 sm:mt-20 md:border-l md:border-neutral-300 md:dark:border-neutral-600 md:pl-6">
        <div className="flex max-w-3xl flex-col space-y-16">
          {filteredPosts.map((post) => (
            <article className="md:grid md:grid-cols-4 md:items-baseline">
              <div
                key={post.slug}
                className="md:col-span-3 group relative flex flex-col items-start"
              >
                <h2 className="text-base font-semibold tracking-tight text-zinc-800">
                  <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group w-full transition hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-4 rounded-md"
                  >
                    <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                    <span className="relative z-10">{post.title}</span>
                  </Link>
                </h2>
                {/* Date */}
                <time className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 pl-3.5">
                  <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                  >
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200"></span>
                  </span>
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="relative z-10 mt-2 text-sm text-zinc-600">
                  {post.description}
                </p>
                <div
                  aria-hidden="true"
                  className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-600 dark:text-teal-500 group-hover:underline"
                >
                  Read article →
                </div>
              </div>
              <time className="mt-1 md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400">
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </article>
          ))}
        </div>
      </div>
      {/* //////////////////////////////////// */}
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
                dateTime="2023-05-03"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4 stroke-current"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
            <time
              className="mt-1 md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400"
              dateTime="2023-05-03"
            >
              May 13, 2023
            </time>
          </article>
        </div>
      </div>
      {/* //////////////////////////////////// */}
      <div
        id="blog"
        className="mt-30 mb-10 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40"
      >
        {/* //////////////////////////////////// */}
        <article className="relative pl-4 sm:pl-8 border-l border-gray-300 dark:border-gray-600 space-y-16">
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
        </article>
      </div>
    </main>
  );
};

export default Blog;

//TODO: Adjust the margin of blog list box to make it looking similar to Tey's blog.
//TODO: Fine tune of mobile responsive design for blog posts.

//TODO: Follow Contact page layout.
//TODO: Come up with the header and the paragraph.
//TODO: Minimalistic and almost hidden looking search bar.
//TODO: Refactor the blog post list based on the
