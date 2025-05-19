// src/pages/BlogPost.tsx
import React, { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom"; // Assuming you use React Router
import { MDXProvider } from "@mdx-js/react"; // Import MDXProvider
import { getPostBySlug, Post, formatDate } from "../data/posts";
import { Calendar, Timer, Tag, MoveLeft } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

// Placeholder icons - consider replacing with actual icon components (e.g., from react-icons or your own SVGs)
// Added className prop to allow styling
interface PlaceholderIconProps {
  className?: string;
}

const IconSize = 16;
const StrokeWidth = 2;
const FaCalendarAlt: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="calendar icon" className={className}>
    <Calendar size={IconSize} strokeWidth={StrokeWidth} />
  </span>
);
const FaClock: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="clock icon" className={className}>
    <Timer size={IconSize} strokeWidth={StrokeWidth} />
  </span>
);
const FaTags: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="tags icon" className={className}>
    <Tag size={IconSize} strokeWidth={StrokeWidth} />
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

  // const AuthorInfo: React.FC<{ author: Author }> = ({ author }) => {
  //   const [avatarError, setAvatarError] = useState(false); // State to track avatar loading error

  //   useEffect(() => {
  //     setAvatarError(false); // Reset error state when author changes
  //   }, [author]);

  //   return (
  //     <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
  //       {author.avatarUrl && !avatarError ? ( // Conditionally render img
  //         <img
  //           src={author.avatarUrl}
  //           alt={author.name}
  //           className="w-6 h-6 rounded-full object-cover" // Added object-cover
  //           onError={() => setAvatarError(true)} // Set error state on load failure
  //         />
  //       ) : (
  //         <FaUser className="w-6 h-6" /> // Show user icon if no avatar URL or error
  //       )}
  //       {author.profileUrl ? (
  //         <a
  //           href={author.profileUrl}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
  //         >
  //           {author.name}
  //         </a>
  //       ) : (
  //         <span>{author.name}</span>
  //       )}
  //     </div>
  //   );
  // };

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-8 text-neutral-800 dark:text-neutral-200">
            {/* Title text color: neutral-200 dark, neutral-800 light */}
            {post.title}
          </h1>
          <p className="text-base text-neutral-500 dark:text-neutral-400 mb-4 font-mono">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center space-x-2.5">
              <FaCalendarAlt />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center space-x-1.5">
              <FaClock />
              <span>{post.readingTime}</span>
            </div>
            {/* <div className="flex items-center space-x-1">
              <FaComments />
              <span>{post.commentsCount} comments</span>
            </div> */}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 mb-8 flex flex-wrap items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <FaTags />
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
        <footer className="mt-12 pt-8 mb-10 border-t border-neutral-200 dark:border-neutral-700 text-center">
          <Link
            to="/blog"
            className="flex flex-row items-center justify-center font-mono text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 hover:underline gap-x-3"
          >
            <span role="img" aria-label="arrow icon">
              <MoveLeft size={IconSize} strokeWidth={StrokeWidth} />
            </span>
            <span>Back to all posts</span>
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostPage;
