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

import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock";

// Dynamically import all MDX files using Vite
const mdxModules = import.meta.glob<
  true,
  string,
  { default: React.ComponentType<any> }
>("../content/posts/**/*.mdx");

type PostsMap = Record<
  string,
  React.LazyExoticComponent<React.ComponentType<unknown>>
>;
const posts: PostsMap = {};

for (const path in mdxModules) {
  const slug = path
    .replace("../content/posts/", "")
    .replace(/\/index|\.mdx$/g, "");
  posts[slug] = lazy(mdxModules[path]);
}

const NotFound = () => <p>Post not found.</p>;

const BlogPost = () => {
  const { slug } = useParams();
  const PostComponent = slug && posts[slug] ? posts[slug] : NotFound;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Suspense fallback={<p>Loading...</p>}>
        <MDXProvider
          components={{
            code: ({
              children,
              className,
            }: {
              children: string | string[];
              className?: string;
            }) => {
              const language = className?.replace("language-", "") || "bash";
              return <CodeBlock language={language}>{children}</CodeBlock>;
            },
          }}
        >
          <PostComponent />
        </MDXProvider>
      </Suspense>
    </div>
  );
};

export default BlogPost;

// TODO: Modify the layout based on https://steventey.com/blog and https://avandekleut.github.io/vae/. Please do not forget about the search bar function as well.
// TODO: stuck at displaying code snippet successfully.
