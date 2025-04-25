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
    <main className="max-[200px]:hidden max-w-3xl lg:max-w-5xl w-full h-full min-h-screen flex flex-col bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40">
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
        className="w-full px-4 py-2 mb-6 border border-neutral-300 dark:border-neutral-600 duration-200 rounded-md bg-white dark:bg-dark-bg-2 text-neutral-800 dark:text-white"
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
      <div className="mt-4 md:border-l-2 md:border-neutral-300 md:dark:border-neutral-500 md:pl-6 mb-20">
        <div className="flex max-w-3xl flex-col space-y-10">
          {filteredPosts.map((post) => (
            <article className="md:grid md:grid-cols-4 md:items-baseline">
              <div
                key={post.slug}
                className="md:col-span-3 group relative flex flex-col items-start transition-all duration-300 ease-in-out active:scale-[0.9] active:opacity-90"
              >
                <h2 className="text-base font-semibold tracking-tight pl-3.5">
                  <div className="absolute -inset-y-6 -inset-x-4 z-0 dark:bg-neutral-100 bg-white opacity-0 transition duration-300 ease-in-out group-hover:scale-90 max-md:group-hover:scale-95 lg:group-hover:scale-95 group-hover:opacity-100 sm:-inset-x-6 rounded-2xl"></div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group w-full py-4 rounded-md"
                  >
                    <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                    <span className="relative z-10 dark:text-neutral-300 text-neutral-800 transition duration-300 ease-in-out dark:group-hover:text-blue-500 group-hover:text-blue-600">
                      {post.title}
                    </span>
                  </Link>
                </h2>
                {/* Date for smaller window*/}
                <time className="md:hidden relative z-10 inset-x-4 order-first mb-3 flex items-center text-sm pl-3.5 text-neutral-500 dark:text-neutral-400 transition duration-300 ease-in-out group-hover:text-neutral-800 dark:group-hover:text-neutral-800">
                  <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                  >
                    <span className="h-4 w-0.5 rounded-full bg-neutral-400 dark:bg-neutral-500"></span>
                  </span>
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="relative z-10 mt-2 pl-3.5 text-sm text-neutral-500 dark:text-neutral-400 transition duration-300 ease-in-out group-hover:text-neutral-800 dark:group-hover:text-neutral-800">
                  {post.description}
                </p>
                <div
                  aria-hidden="true"
                  className="relative z-10 mt-2 pl-3.5 flex items-center text-sm font-medium text-teal-600 dark:text-teal-500 transition duration-300 ease-in-out group-hover:underline"
                >
                  Read article →
                </div>
              </div>
              {/* Date for larger window */}
              <time className="mt-1 hidden md:block relative z-10 order-first mb-3 items-center text-sm text-neutral-500 dark:text-neutral-400">
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
