// src/pages/BlogPost.tsx
import React, { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom"; // Assuming you use React Router
import { MDXProvider } from "@mdx-js/react"; // Import MDXProvider
import { getPostBySlug, Post, formatDate } from "../data/posts";
import CodeBlock from "../components/CodeBlock";
import { Calendar, Timer, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async"; // Import Helmet

// Placeholder icons - consider replacing with actual icon components (e.g., from react-icons or your own SVGs)
// Added className prop to allow styling
interface PlaceholderIconProps {
  className?: string;
}

const IconSize = 16;
const FaCalendarAlt: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="calendar icon" className={className}>
    <Calendar size={IconSize} />
  </span>
);
const FaClock: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="clock icon" className={className}>
    <Timer size={IconSize} />
  </span>
);
const FaTags: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="tags icon" className={className}>
    <Tag size={IconSize} />
  </span>
);
// Comment function is not activated yet
// const FaComments: React.FC<PlaceholderIconProps> = ({ className }) => (
//   <span role="img" aria-label="comments icon" className={className}>
//     <MessageSquare size={IconSize} />
//   </span>
// );

// interface BlogPostPageProps {} // Remove empty interface

const BlogPostPage: React.FC = () => {
  // Changed to React.FC
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [MdxContent, setMdxContent] = useState<React.ComponentType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Use import.meta.glob to get all MDX modules
  // The key will be like '../content/posts/your-post-name.mdx'
  // The value is a function that returns a Promise for the module
  const mdxModules = import.meta.glob("../content/posts/*.mdx") as Record<
    string,
    () => Promise<{ default: React.ComponentType }>
  >;

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
        } else {
          console.error(`MDX module not found for path: ${modulePath}`);
          setError(
            `Could not find blog post content for: ${currentPost.title}`
          );
          setMdxContent(null);
        }
      } catch (e) {
        console.error("Failed to load MDX content:", e);
        setError("Could not load blog post content.");
        setMdxContent(null);
      }
    };

    importMdx();
  }, [slug, mdxModules]);

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!post || !MdxContent) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-center text-neutral-800 dark:text-neutral-300">
        Loading post...
      </div>
    );
  }

  // Define styled components for MDX headers
  const StyledH1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold mt-8 mb-4 text-neutral-800 dark:text-neutral-300 hidden"
      {...props}
    />
  );
  const StyledH2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-semibold mt-6 mb-4 text-neutral-800 dark:text-neutral-300"
      {...props}
    />
  );
  const StyledH3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold mt-4 mb-4 text-neutral-800 dark:text-neutral-300"
      {...props}
    />
  );
  const StyledUl = (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-2" {...props} /> // Added padding-left and vertical margin
  );
  const StyledLi = (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1" {...props} /> // Added margin-bottom
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

  return (
    <div
      id="main-content"
      className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-gray-900 dark:text-gray-100"
    >
      {post && (
        <Helmet>
          <title>{post.title} - Yunsik Ohm</title>
          <meta name="description" content={post.excerpt} />
          {/* Open Graph */}
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          {post.imageUrl && (
            <meta property="og:image" content={post.imageUrl} />
          )}
          <meta
            property="og:url"
            content={`https://yourwebsiteurl.com/blog/${post.slug}`}
          />{" "}
          {/* Replace with your website URL */}
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={post.date} />
          {/* Add modified time if available in your post data */}
          {/* <meta property="article:modified_time" content={post.modifiedDate} /> */}
          {post.tags &&
            post.tags.map((tag) => (
              <meta property="article:tag" content={tag} key={tag} />
            ))}
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@yourtwitterhandle" />{" "}
          {/* Replace with your Twitter handle */}
          <meta name="twitter:creator" content="@yourtwitterhandle" />{" "}
          {/* Replace with your Twitter handle */}
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.excerpt} />
          {post.imageUrl && (
            <meta name="twitter:image" content={post.imageUrl} />
          )}
          {/* JSON-LD Structured Data */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "${post.title.replace(/"/g, '\\"')}",
                "description": "${post.excerpt.replace(/"/g, '\\"')}",
                ${post.imageUrl ? `"image": ["${post.imageUrl}"],` : ""}
                "datePublished": "${post.date}",
                ${/* Add dateModified if available */ ""}
                ${/* "dateModified": "${post.modifiedDate}", */ ""}
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
                  "@id": "https://yourwebsiteurl.com/blog/${
                    post.slug
                  }" {/* Replace with your website URL */}
                }
                ${
                  post.tags && post.tags.length > 0
                    ? `, "keywords": "${post.tags.join(", ")}"`
                    : ""
                }
              }
            `}
          </script>
        </Helmet>
      )}
      {/* Re-add prose classes for default styling + image border removal */}
      <article className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert mx-auto">
        {/* Post Header */}
        <header className="mb-6">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={`${post.title} cover image`}
              className="w-full h-auto max-h-96 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-neutral-800 dark:text-neutral-200">
            {/* Title text color: neutral-200 dark, neutral-800 light */}
            {post.title}
          </h1>
          <p className="text-base text-neutral-500 dark:text-neutral-400 mb-4">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center space-x-2.5">
              <FaCalendarAlt />
              <span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FaClock />
              <span>{post.readingTime}</span>
            </div>
            {/* <div className="flex items-center space-x-1.5">
              <FaComments />
              <span>{post.commentsCount} comments</span>
            </div> */}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <FaTags className="text-gray-500 dark:text-gray-400" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  // Update link to use query parameter on the main blog page
                  to={`/blog?tag=${encodeURIComponent(
                    tag.toLowerCase().replace(/\s+/g, "-")
                  )}`}
                  className="text-sm px-3 py-1 rounded-full bg-neutral-200 dark:bg-dark-bg-5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-dark-bg-6 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* MDX Content */}
        {/* Pass the full components map to MDXProvider */}
        <MDXProvider components={mdxComponents}>
          <Suspense
            fallback={
              <div className="px-4 sm:px-6 lg:px-8 max-sm:mt-20 mt-30 text-neutral-800 dark:text-neutral-300">
                Loading content...
              </div>
            }
          >
            {MdxContent && <MdxContent />}
          </Suspense>
        </MDXProvider>

        {/* Footer actions like "Back to Blog" or social sharing could go here */}
        <footer className="mt-12 pt-8 mb-10 border-t border-gray-200 dark:border-gray-700 text-center">
          <Link
            to="/blog"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 hover:underline"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostPage;
