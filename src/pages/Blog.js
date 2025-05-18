import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react"; // Import useEffect
import { Link, useSearchParams } from "react-router-dom"; // Import useSearchParams
import { posts as blogPosts } from "../data/posts.js"; // Import Post type and alias posts
import dayjs from "dayjs";
const Blog = () => {
    const [searchParams] = useSearchParams(); // Get search params
    const initialTag = searchParams.get("tag"); // Read initial tag from URL
    const [searchQuery, setSearchQuery] = useState("");
    const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)) // Add Post type
    ).sort();
    // Initialize state from URL param
    const [selectedTag, setSelectedTag] = useState(initialTag);
    // Update selectedTag if URL search params change
    useEffect(() => {
        setSelectedTag(searchParams.get("tag"));
    }, [searchParams]);
    const filteredPosts = blogPosts.filter((post) => {
        // Add Post type
        const matchesSearch = post.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        // Compare selectedTag (slug from URL) with slugified versions of post tags
        const matchesTag = selectedTag
            ? post.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === selectedTag)
            : true;
        return matchesSearch && matchesTag;
    });
    return (_jsxs("main", { id: "main-content", className: "max-[200px]:hidden max-w-3xl lg:max-w-5xl w-full h-full min-h-screen flex flex-col bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40", children: [_jsx("p", { className: "max-sm:mt-30 mt-40 mb-6 font-mono text-base text-left text-neutral-800 dark:text-neutral-300", children: "Writing about" }), _jsx("h1", { className: "mb-6 font-sans text-5xl max-sm:text-4xl font-bold text-blue-600 dark:text-blue-500", children: "My Journey" }), _jsxs("div", { className: "mb-6 text-base text-neutral-800 dark:text-neutral-300", children: [_jsx("div", { className: "hidden max-sm:flex", children: "Notes from my journey \u2014 from materials science and side hustles to coding and machine learning." }), _jsx("div", { className: "hidden sm:flex w-full", children: "Ideas, projects, and notes along the way. Some are polished, others more exploratory \u2014 all tracing the path I\u2019ve been carving from materials science and side hustles to coding and machine learning, collected in chronological order." })] }), _jsx("input", { type: "text", id: "search-tag-form", placeholder: "Search blog posts...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-4 py-2 mb-6 border border-neutral-300 dark:border-neutral-600 duration-200 rounded-md bg-white-bg-1 dark:bg-dark-bg-3 text-neutral-800 dark:text-white focus:bg-white dark:focus:bg-dark-bg-4" }), _jsxs("div", { className: "max-sm:hidden flex flex-wrap gap-3 mb-6", children: [_jsx(Link, { to: "/blog", className: `px-3 py-1 rounded-full text-sm ${selectedTag === null
                            ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold"
                            : "bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-dark-bg-6 transition-colors"}`, children: "All" }), allTags.map((tag) => {
                        const tagSlug = tag.toLowerCase().replace(/\s+/g, "-");
                        const isActive = selectedTag === tagSlug; // Check against slugified tag from URL
                        return (
                        // Tag buttons become Links to /blog?tag=...
                        _jsx(Link, { to: `/blog?tag=${encodeURIComponent(tagSlug)}`, className: `px-3 py-1 rounded-full text-sm capitalize ${isActive
                                ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold"
                                : "bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-dark-bg-6 transition-colors"}`, children: tag }, tag));
                    })] }), _jsx("div", { className: "mt-4 md:border-l-2 md:border-neutral-300 md:dark:border-neutral-500 md:pl-6 mb-10", children: _jsx("div", { className: "flex max-w-3xl flex-col space-y-10", children: filteredPosts.map((post) => (_jsxs("article", { className: "md:grid md:grid-cols-4 md:items-baseline", children: [_jsxs("div", { className: "md:col-span-3 group relative flex flex-col items-start transition-all duration-300 ease-in-out active:scale-[0.97]", children: [_jsxs("h2", { className: "text-base font-semibold tracking-tight", children: [_jsx("div", { className: "absolute -inset-y-6 -inset-x-8 z-0 dark:bg-neutral-100 bg-[#fcfcfc] opacity-0 transition duration-300 ease-in-out group-hover:scale-90 max-md:group-hover:scale-95 lg:group-hover:scale-95 group-hover:opacity-100 group-active:scale-90 max-md:group-active:scale-95 lg:group-active:scale-95 group-active:opacity-100 rounded-xl" }), _jsxs(Link, { to: `/blog/${post.slug}`, className: "group w-full py-4 rounded-xl", children: [_jsx("span", { className: "absolute -inset-y-6 -inset-x-4 z-20 md:-inset-x-6 sm:rounded-xl" }), _jsx("span", { className: "relative z-10 md:px-4 dark:text-neutral-300 text-neutral-800 transition duration-300 ease-in-out dark:group-hover:text-blue-500 group-hover:text-blue-600 group-active:text-blue-500 dark:group-active:text-blue-600", children: post.title })] })] }), _jsxs("time", { className: "md:hidden relative z-10 order-first mb-3 flex items-center text-sm pl-3.5 text-neutral-500 dark:text-neutral-400 transition duration-300 ease-in-out group-hover:text-neutral-800 dark:group-hover:text-neutral-800 group-active:text-neutral-800 dark:group-active:text-neutral-800", children: [_jsx("span", { className: "absolute inset-y-0 left-0 flex items-center", "aria-hidden": "true", children: _jsx("span", { className: "h-4 w-0.5 rounded-full bg-neutral-400 dark:bg-neutral-500" }) }), dayjs(post.date).format("MMMM D, YYYY")] }), _jsx("p", { className: "relative z-10 mt-2 text-sm md:px-4 text-neutral-500 dark:text-neutral-400 transition duration-300 ease-in-out group-hover:text-neutral-800 dark:group-hover:text-neutral-800 group-active:text-neutral-800 dark:group-active:text-neutral-800", children: post.excerpt }), _jsx("div", { "aria-hidden": "true", className: "relative z-10 mt-2 md:px-4 flex items-center text-sm font-medium text-teal-600 dark:text-teal-500 transition duration-300 ease-in-out group-hover:underline group-active:underline", children: "Read article \u2192" })] }), _jsx("time", { className: "mt-1 hidden md:block relative z-10 order-first mb-3 items-center text-sm text-neutral-500 dark:text-neutral-400", children: dayjs(post.date).format("MMMM D, YYYY") })] }, post.slug))) }) })] }));
};
export default Blog;
