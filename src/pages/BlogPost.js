import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/BlogPost.tsx
import { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom"; // Assuming you use React Router
import { MDXProvider } from "@mdx-js/react"; // Import MDXProvider
import { getPostBySlug, formatDate } from "../data/posts";
import CodeBlock from "../components/CodeBlock";
import { Calendar, Timer, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async"; // Import Helmet
const IconSize = 16;
const FaCalendarAlt = ({ className }) => (_jsx("span", { role: "img", "aria-label": "calendar icon", className: className, children: _jsx(Calendar, { size: IconSize }) }));
const FaClock = ({ className }) => (_jsx("span", { role: "img", "aria-label": "clock icon", className: className, children: _jsx(Timer, { size: IconSize }) }));
const FaTags = ({ className }) => (_jsx("span", { role: "img", "aria-label": "tags icon", className: className, children: _jsx(Tag, { size: IconSize }) }));
// Comment function is not activated yet
// const FaComments: React.FC<PlaceholderIconProps> = ({ className }) => (
//   <span role="img" aria-label="comments icon" className={className}>
//     <MessageSquare size={IconSize} />
//   </span>
// );
// interface BlogPostPageProps {} // Remove empty interface
const BlogPostPage = () => {
    // Changed to React.FC
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [MdxContent, setMdxContent] = useState(null);
    const [error, setError] = useState(null);
    // Use import.meta.glob to get all MDX modules
    // The key will be like '../content/posts/your-post-name.mdx'
    // The value is a function that returns a Promise for the module
    const mdxModules = import.meta.glob("../content/posts/*.mdx");
    useEffect(() => {
        if (!slug) {
            setError("No post slug provided.");
            setPost(null);
            setMdxContent(null);
            return;
        }
        const currentPost = getPostBySlug(slug);
        if (!currentPost) {
            setError("Post not found.");
            setPost(null);
            setMdxContent(null);
            return;
        }
        setPost(currentPost);
        setError(null);
        // Dynamically import the MDX file using the glob result
        const importMdx = async () => {
            try {
                const modulePath = `../content/posts/${currentPost.mdxFile}`;
                const moduleLoader = mdxModules[modulePath];
                if (moduleLoader) {
                    const mdxModule = await moduleLoader();
                    setMdxContent(() => mdxModule.default); // .default usually holds the MDX component
                }
                else {
                    console.error(`MDX module not found for path: ${modulePath}`);
                    setError(`Could not find blog post content for: ${currentPost.title}`);
                    setMdxContent(null);
                }
            }
            catch (e) {
                console.error("Failed to load MDX content:", e);
                setError("Could not load blog post content.");
                setMdxContent(null);
            }
        };
        importMdx();
    }, [slug, mdxModules]);
    if (error) {
        return (_jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-red-500 dark:text-red-400", children: error }));
    }
    if (!post || !MdxContent) {
        return (_jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-center text-neutral-800 dark:text-neutral-300", children: "Loading post..." }));
    }
    // Define styled components for MDX headers
    const StyledH1 = (props) => (_jsx("h1", { className: "text-3xl font-bold mt-8 mb-4 text-neutral-800 dark:text-neutral-300 hidden", ...props }));
    const StyledH2 = (props) => (_jsx("h2", { className: "text-2xl font-semibold mt-6 mb-4 text-neutral-800 dark:text-neutral-300", ...props }));
    const StyledH3 = (props) => (_jsx("h3", { className: "text-xl font-semibold mt-4 mb-4 text-neutral-800 dark:text-neutral-300", ...props }));
    const StyledUl = (props) => (_jsx("ul", { className: "list-disc pl-6 my-2", ...props }) // Added padding-left and vertical margin
    );
    const StyledLi = (props) => (_jsx("li", { className: "mb-1", ...props }) // Added margin-bottom
    );
    // Add more (h4, p, a, etc.) if needed
    // Combine components for MDXProvider
    const mdxComponents = {
        pre: CodeBlock,
        h1: StyledH1,
        h2: StyledH2,
        h3: StyledH3,
        ul: StyledUl,
        li: StyledLi,
        // You can map other elements like p, a here if needed
    };
    return (_jsxs("div", { id: "main-content", className: "container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-gray-900 dark:text-gray-100", children: [post && (_jsxs(Helmet, { children: [_jsxs("title", { children: [post.title, " - Yunsik Ohm"] }), _jsx("meta", { name: "description", content: post.excerpt }), _jsx("meta", { property: "og:title", content: post.title }), _jsx("meta", { property: "og:description", content: post.excerpt }), post.imageUrl && (_jsx("meta", { property: "og:image", content: post.imageUrl })), _jsx("meta", { property: "og:url", content: `https://yourwebsiteurl.com/blog/${post.slug}` }), " ", _jsx("meta", { property: "og:type", content: "article" }), _jsx("meta", { property: "article:published_time", content: post.date }), post.tags &&
                        post.tags.map((tag) => (_jsx("meta", { property: "article:tag", content: tag }, tag))), _jsx("meta", { name: "twitter:card", content: "summary_large_image" }), _jsx("meta", { name: "twitter:site", content: "@yourtwitterhandle" }), " ", _jsx("meta", { name: "twitter:creator", content: "@yourtwitterhandle" }), " ", _jsx("meta", { name: "twitter:title", content: post.title }), _jsx("meta", { name: "twitter:description", content: post.excerpt }), post.imageUrl && (_jsx("meta", { name: "twitter:image", content: post.imageUrl })), _jsx("script", { type: "application/ld+json", children: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "${post.title.replace(/"/g, '\\"')}",
                "description": "${post.excerpt.replace(/"/g, '\\"')}",
                ${post.imageUrl ? `"image": ["${post.imageUrl}"],` : ""}
                "datePublished": "${post.date}",
                ${ /* Add dateModified if available */""}
                ${ /* "dateModified": "${post.modifiedDate}", */""}
                "author": {
                  "@type": "Person",
                  "name": "Yunsik Ohm" {/* Replace with your name */}
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Yunsik Ohm's Portfolio", {/* Replace with your website name */}
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://yourwebsiteurl.com/logo_dark_bg.svg" {/* Replace with your website logo URL */}
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://yourwebsiteurl.com/blog/${post.slug}" {/* Replace with your website URL */}
                }
                ${post.tags && post.tags.length > 0
                            ? `, "keywords": "${post.tags.join(", ")}"`
                            : ""}
              }
            ` })] })), _jsxs("article", { className: "prose prose-sm sm:prose lg:prose-lg dark:prose-invert mx-auto", children: [_jsxs("header", { className: "mb-6", children: [post.imageUrl && (_jsx("img", { src: post.imageUrl, alt: `${post.title} cover image`, className: "w-full h-auto max-h-96 object-cover rounded-lg mb-6" })), _jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-neutral-800 dark:text-neutral-200", children: post.title }), _jsx("p", { className: "text-base text-neutral-500 dark:text-neutral-400 mb-4", children: post.excerpt }), _jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400", children: [_jsxs("div", { className: "flex items-center space-x-2.5", children: [_jsx(FaCalendarAlt, {}), _jsx("span", { children: _jsx("time", { dateTime: post.date, children: formatDate(post.date) }) })] }), _jsxs("div", { className: "flex items-center space-x-1.5", children: [_jsx(FaClock, {}), _jsx("span", { children: post.readingTime })] })] }), post.tags && post.tags.length > 0 && (_jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [_jsx(FaTags, { className: "text-gray-500 dark:text-gray-400" }), post.tags.map((tag) => (_jsx(Link, { 
                                        // Update link to use query parameter on the main blog page
                                        to: `/blog?tag=${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`, className: "text-sm px-3 py-1 rounded-full bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-dark-bg-6 transition-colors", children: tag }, tag)))] }))] }), _jsx(MDXProvider, { components: mdxComponents, children: _jsx(Suspense, { fallback: _jsx("div", { className: "px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-neutral-800 dark:text-neutral-300", children: "Loading content..." }), children: MdxContent && _jsx(MdxContent, {}) }) }), _jsx("footer", { className: "mt-12 pt-8 mb-10 border-t border-gray-200 dark:border-gray-700 text-center", children: _jsx(Link, { to: "/blog", className: "text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 hover:underline", children: "\u2190 Back to all posts" }) })] })] }));
};
export default BlogPostPage;
