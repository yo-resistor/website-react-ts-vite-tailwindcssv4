import { useParams } from "react-router-dom";
import { Suspense } from "react";
import FirstPost from "../content/posts/first-post.mdx";
import InstallPytorchMiniconda from "../content/posts/pytorch/install-pytorch-miniconda.mdx";

// Import all MDX blog posts, including those in subfolders
const posts: Record<string, React.ElementType> = {
  "first-post": FirstPost,
  "install-pytorch-miniconda": InstallPytorchMiniconda,
};

// Fallback 404 component if post not found
const NotFound = () => <p>Post not found.</p>;

const BlogPost = () => {
  const { slug } = useParams();
  const PostComponent = posts[slug as keyof typeof posts] || NotFound;

  return (
    <div className="p-20">
      <Suspense fallback={<p>Loading...</p>}>
        <PostComponent />
      </Suspense>
    </div>
  );
};

export default BlogPost;

// TODO: Modify the layout based on https://steventey.com/blog and https://avandekleut.github.io/vae/. Please do not forget about the search bar function as well.
