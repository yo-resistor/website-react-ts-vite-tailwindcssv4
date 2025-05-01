// import { useParams } from "react-router-dom";
// import { Suspense } from "react";
// import FirstPost from "../content/posts/first-post.mdx";
// import InstallPytorchMiniconda from "../content/posts/pytorch/install-pytorch-miniconda.mdx";

// // Import all MDX blog posts, including those in subfolders
// const posts: Record<string, React.ElementType> = {
//   "first-post": FirstPost,
//   "install-pytorch-miniconda": InstallPytorchMiniconda,
// };

// // Fallback 404 component if post not found
// const NotFound = () => <p>Post not found.</p>;

// const BlogPost = () => {
//   const { slug } = useParams();
//   const PostComponent = posts[slug as keyof typeof posts] || NotFound;

//   return (
//     <div className="p-20">
//       <Suspense fallback={<p>Loading...</p>}>
//         <PostComponent />
//       </Suspense>
//     </div>
//   );
// };

// import { useParams } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import { MDXProvider } from "@mdx-js/react";
// import CodeBlock from "../components/CodeBlock";

// // Dynamically import all MDX files using Vite
// const mdxModules = import.meta.glob<
//   true,
//   string,
//   { default: React.ComponentType<any> }
// >("../content/posts/**/*.mdx");

// type PostsMap = Record<
//   string,
//   React.LazyExoticComponent<React.ComponentType<unknown>>
// >;
// const posts: PostsMap = {};

// for (const path in mdxModules) {
//   const slug = path
//     .replace("../content/posts/", "")
//     .replace(/\/index|\.mdx$/g, "");
//   posts[slug] = lazy(mdxModules[path]);
// }

// const NotFound = () => <p>Post not found.</p>;

// const BlogPost = () => {
//   const { slug } = useParams();
//   const PostComponent = slug && posts[slug] ? posts[slug] : NotFound;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <Suspense fallback={<p>Loading...</p>}>
//         <MDXProvider
//           components={{
//             code: ({
//               children,
//               className,
//             }: {
//               children: string | string[];
//               className?: string;
//             }) => {
//               const language = className?.replace("language-", "") || "bash";
//               return <CodeBlock language={language}>{children}</CodeBlock>;
//             },
//           }}
//         >
//           <PostComponent />
//         </MDXProvider>
//       </Suspense>
//     </div>
//   );
// };

// export default BlogPost;

// src/pages/BlogPost.tsx
// src/pages/BlogPost.tsx
// import { useParams } from "react-router-dom";
// import { Suspense } from "react";
// import FirstPost from "../content/posts/first-post.mdx";
// import InstallPytorchMiniconda from "../content/posts/pytorch/install-pytorch-miniconda.mdx";

// // Import all MDX blog posts, including those in subfolders
// const posts: Record<string, React.ElementType> = {
//   "first-post": FirstPost,
//   "install-pytorch-miniconda": InstallPytorchMiniconda,
// };

// // Fallback 404 component if post not found
// const NotFound = () => <p>Post not found.</p>;

// const BlogPost = () => {
//   const { slug } = useParams();
//   const PostComponent = posts[slug as keyof typeof posts] || NotFound;

//   return (
//     <div className="p-20">
//       <Suspense fallback={<p>Loading...</p>}>
//         <PostComponent />
//       </Suspense>
//     </div>
//   );
// };

// import { useParams } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import { MDXProvider } from "@mdx-js/react";
// import CodeBlock from "../components/CodeBlock";

// // Dynamically import all MDX files using Vite
// const mdxModules = import.meta.glob<
//   true,
//   string,
//   { default: React.ComponentType<any> }
// >("../content/posts/**/*.mdx");

// type PostsMap = Record<
//   string,
//   React.LazyExoticComponent<React.ComponentType<unknown>>
// >;
// const posts: PostsMap = {};

// for (const path in mdxModules) {
//   const slug = path
//     .replace("../content/posts/", "")
//     .replace(/\/index|\.mdx$/g, "");
//   posts[slug] = lazy(mdxModules[path]);
// }

// const NotFound = () => <p>Post not found.</p>;

// const BlogPost = () => {
//   const { slug } = useParams();
//   const PostComponent = slug && posts[slug] ? posts[slug] : NotFound;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <Suspense fallback={<p>Loading...</p>}>
//         <MDXProvider
//           components={{
//             code: ({
//               children,
//               className,
//             }: {
//               children: string | string[];
//               className?: string;
//             }) => {
//               const language = className?.replace("language-", "") || "bash";
//               return <CodeBlock language={language}>{children}</CodeBlock>;
//             },
//           }}
//         >
//           <PostComponent />
//         </MDXProvider>
//       </Suspense>
//     </div>
//   );
// };

// export default BlogPost;

// src/pages/BlogPost.tsx
// src/pages/BlogPost.tsx
import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock";

// Step 1: Glob MDX imports (we’ll refine types later)
const mdxModules = import.meta.glob<{
  default: React.ComponentType<Record<string, unknown>>;
}>("../content/posts/**/*.mdx");

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-2 mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside my-4" {...props} />
  ),
  code: ({ children, className }: { children: string; className?: string }) => (
    <CodeBlock className={className}>{children}</CodeBlock>
  ),
};

const BlogPost: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  // Step 2: Find the matching MDX file
  const mdxPath = Object.keys(mdxModules).find((path) =>
    path.endsWith(`${slug}.mdx`)
  );

  if (!mdxPath) {
    return <p className="p-6 text-red-500">Post not found.</p>;
  }

  const PostComponent = lazy(mdxModules[mdxPath]);

  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-100 leading-relaxed space-y-6">
      <Suspense fallback={<p>Loading...</p>}>
        <MDXProvider components={components}>
          <PostComponent />
        </MDXProvider>
      </Suspense>
    </main>
  );
};

export default BlogPost;

// TODO: Modify the layout based on https://steventey.com/blog and https://avandekleut.github.io/vae/. Please do not forget about the search bar function as well.
// TODO: stuck at displaying code snippet successfully.
