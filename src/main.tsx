// React entry point
import { StrictMode, lazy, Suspense } from "react"; // Import lazy and Suspense
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.js";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider

// Lazy load pages
const Contact = lazy(() => import("./pages/Contact.js"));
const About = lazy(() => import("./pages/About.js"));
const Projects = lazy(() => import("./pages/Projects.js"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog.js"));
const BlogPost = lazy(() => import("./pages/BlogPost.js"));

// Components
import NavBar from "./components/layout/NavBar.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          {/* Add Suspense fallback */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>{" "}
        {/* Close Suspense */}
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
