import { useState, useEffect } from "react"; // Import useEffect
import { Link, useSearchParams } from "react-router-dom"; // Import useSearchParams
import { posts as blogPosts, Post } from "../data/posts.ts"; // Import Post type and alias posts
import dayjs from "dayjs";

const Blog = () => {
  const [searchParams] = useSearchParams(); // Get search params
  const initialTag = searchParams.get("tag"); // Read initial tag from URL

  const [searchQuery, setSearchQuery] = useState("");

  const allTags = Array.from(
    new Set(blogPosts.flatMap((post: Post) => post.tags)) // Add Post type
  ).sort();
  // Initialize state from URL param
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

  // Update selectedTag if URL search params change
  useEffect(() => {
    setSelectedTag(searchParams.get("tag"));
  }, [searchParams]);

  const filteredPosts = blogPosts.filter((post: Post) => {
    // Add Post type
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // Compare selectedTag (slug from URL) with slugified versions of post tags
    const matchesTag = selectedTag
      ? post.tags.some(
          (tag) => tag.toLowerCase().replace(/\s+/g, "-") === selectedTag
        )
      : true;
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
        className="w-full px-4 py-2 mb-6 border border-neutral-300 dark:border-neutral-600 duration-200 rounded-md bg-white-bg-1 dark:bg-dark-bg-3 text-neutral-800 dark:text-white focus:bg-white dark:focus:bg-dark-bg-4"
      />
      <div className="max-sm:hidden flex flex-wrap gap-3 mb-6">
        {/* "All" button becomes a Link to /blog */}
        <Link
          to="/blog"
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === null
              ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold"
              : "bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-dark-bg-6 transition-colors"
          }`}
        >
          All
        </Link>
        {allTags.map((tag) => {
          const tagSlug = tag.toLowerCase().replace(/\s+/g, "-");
          const isActive = selectedTag === tagSlug; // Check against slugified tag from URL
          return (
            // Tag buttons become Links to /blog?tag=...
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tagSlug)}`}
              className={`px-3 py-1 rounded-full text-sm capitalize ${
                isActive
                  ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold"
                  : "bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-dark-bg-6 transition-colors"
              }`}
            >
              {tag}
            </Link>
          );
        })}
      </div>
      <div className="mt-4 md:border-l-2 md:border-neutral-300 md:dark:border-neutral-500 md:pl-6 mb-10">
        <div className="flex max-w-3xl flex-col space-y-10">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="md:grid md:grid-cols-4 md:items-baseline"
            >
              <div className="md:col-span-3 group relative flex flex-col items-start transition-all duration-300 ease-in-out active:scale-[0.97]">
                <h2 className="text-base font-semibold tracking-tight">
                  <div className="absolute -inset-y-6 -inset-x-8 z-0 dark:bg-neutral-100 bg-[#fcfcfc] opacity-0 transition duration-300 ease-in-out group-hover:scale-90 max-md:group-hover:scale-95 lg:group-hover:scale-95 group-hover:opacity-100 group-active:scale-90 max-md:group-active:scale-95 lg:group-active:scale-95 group-active:opacity-100 rounded-xl"></div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group w-full py-4 rounded-xl"
                  >
                    <span className="absolute -inset-y-6 -inset-x-4 z-20 md:-inset-x-6 sm:rounded-xl"></span>
                    <span className="relative z-10 md:px-4 dark:text-neutral-300 text-neutral-800 transition duration-300 ease-in-out dark:group-hover:text-blue-500 group-hover:text-blue-600 group-active:text-blue-500 dark:group-active:text-blue-600">
                      {post.title}
                    </span>
                  </Link>
                </h2>
                {/* Date for smaller window*/}
                <time className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm pl-3.5 text-neutral-500 dark:text-neutral-400 transition duration-300 ease-in-out group-hover:text-neutral-800 dark:group-hover:text-neutral-800 group-active:text-neutral-800 dark:group-active:text-neutral-800">
                  <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                  >
                    <span className="h-4 w-0.5 rounded-full bg-neutral-400 dark:bg-neutral-500"></span>
                  </span>
                  {dayjs(post.date).format("MMMM D, YYYY")}
                </time>
                <p className="relative z-10 mt-2 text-sm md:px-4 text-neutral-500 dark:text-neutral-400 transition duration-300 ease-in-out group-hover:text-neutral-800 dark:group-hover:text-neutral-800 group-active:text-neutral-800 dark:group-active:text-neutral-800">
                  {post.excerpt}
                </p>
                <div
                  aria-hidden="true"
                  className="relative z-10 mt-2 md:px-4 flex items-center text-sm font-medium text-teal-600 dark:text-teal-500 transition duration-300 ease-in-out group-hover:underline group-active:underline"
                >
                  Read article →
                </div>
              </div>
              {/* Date for larger window */}
              <time className="mt-1 hidden md:block relative z-10 order-first mb-3 items-center text-sm text-neutral-500 dark:text-neutral-400">
                {dayjs(post.date).format("MMMM D, YYYY")}
              </time>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Blog;

//DONE: Adjust the margin of blog list box to make it looking similar to Tey's blog.
//DONE: Fine tune of mobile responsive design for blog posts.

//DONE: Follow Contact page layout.
//DONE: Come up with the header and the paragraph.
//DONE: Minimalistic and almost hidden looking search bar.
//DONE: Refactor the blog post list based on the
