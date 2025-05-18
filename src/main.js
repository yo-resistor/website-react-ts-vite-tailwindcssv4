import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(HelmetProvider, { children: _jsxs(BrowserRouter, { children: [_jsx(NavBar, {}), _jsxs(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: [" ", _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/projects", element: _jsx(Projects, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/blog", element: _jsx(Blog, {}) }), _jsx(Route, { path: "/blog/:slug", element: _jsx(BlogPost, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }), " "] }) }) }));
