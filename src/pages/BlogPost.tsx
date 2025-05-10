// src/pages/BlogPost.tsx
import React, { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom"; // Assuming you use React Router
import { MDXProvider } from "@mdx-js/react"; // Import MDXProvider
import { getPostBySlug, Post, formatDate, Author } from "../data/posts";
import CodeBlock from "../components/CodeBlock";

// Placeholder icons - consider replacing with actual icon components (e.g., from react-icons or your own SVGs)
// Added className prop to allow styling
interface PlaceholderIconProps {
  className?: string;
}

const FaCalendarAlt: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="calendar icon" className={className}>
    📅
  </span>
);
const FaUser: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="user icon" className={className}>
    👤
  </span>
);
const FaClock: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="clock icon" className={className}>
    🕒
  </span>
);
const FaTags: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="tags icon" className={className}>
    🏷️
  </span>
);
const FaComments: React.FC<PlaceholderIconProps> = ({ className }) => (
  <span role="img" aria-label="comments icon" className={className}>
    💬
  </span>
);

// interface BlogPostPageProps {} // Remove empty interface

const BlogPostPage: React.FC = () => {
  // Changed to React.FC
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [MdxContent, setMdxContent] = useState<React.ComponentType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

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

    // Dynamically import the MDX file
    const importMdx = async () => {
      try {
        // Vite's dynamic import needs a somewhat static path structure.
        const mdxModule = await import(
          /* @vite-ignore */ `../content/posts/${currentPost.mdxFile}`
        );
        setMdxContent(() => mdxModule.default); // .default usually holds the MDX component
      } catch (e) {
        console.error("Failed to load MDX content:", e);
        setError("Could not load blog post content.");
        setMdxContent(null);
      }
    };

    importMdx();
  }, [slug]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!post || !MdxContent) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-700 dark:text-gray-300">
        Loading post...
      </div>
    );
  }

  const AuthorInfo: React.FC<{ author: Author }> = ({ author }) => {
    const [avatarError, setAvatarError] = useState(false); // State to track avatar loading error

    useEffect(() => {
      setAvatarError(false); // Reset error state when author changes
    }, [author]);

    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {author.avatarUrl && !avatarError ? ( // Conditionally render img
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="w-6 h-6 rounded-full object-cover" // Added object-cover
            onError={() => setAvatarError(true)} // Set error state on load failure
          />
        ) : (
          <FaUser className="w-6 h-6" /> // Show user icon if no avatar URL or error
        )}
        {author.profileUrl ? (
          <a
            href={author.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {author.name}
          </a>
        ) : (
          <span>{author.name}</span>
        )}
      </div>
    );
  };

  // Define styled components for MDX headers
  const StyledH1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 dark:text-white" {...props} />
  );
  const StyledH2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-semibold mt-6 mb-3 dark:text-white"
      {...props}
    />
  );
  const StyledH3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold mt-4 mb-2 dark:text-white"
      {...props}
    />
  );
  const StyledUl = (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-4" {...props} /> // Added padding-left and vertical margin
  );
  const StyledLi = (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2" {...props} /> // Added margin-bottom
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
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      {/* Re-add prose classes for default styling + image border removal */}
      <article className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert mx-auto">
        {/* Post Header */}
        <header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={`${post.title} cover image`}
              className="w-full h-auto max-h-96 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <AuthorInfo author={post.author} />
            <div className="flex items-center space-x-1">
              <FaCalendarAlt />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaComments />
              <span>{post.commentsCount} comments</span>
            </div>
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
                  className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {tag}
                </Link>
                // TODO: When I click the tag, it will reroute me to tag sorted blog page. This should be done in Blog.tsx
              ))}
            </div>
          )}
        </header>

        {/* MDX Content */}
        {/* Pass the full components map to MDXProvider */}
        <MDXProvider components={mdxComponents}>
          <Suspense
            fallback={
              <div className="text-center py-8">Loading content...</div>
            }
          >
            {MdxContent && <MdxContent />}
          </Suspense>
        </MDXProvider>

        {/* Footer actions like "Back to Blog" or social sharing could go here */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <Link
            to="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostPage;
