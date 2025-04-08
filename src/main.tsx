// React entry point
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import NavBar from "./components/NavBar.tsx";

// Components
// import NavBar from "./components/NavBar.tsx";
// import ThemeToggle from "./components/ThemeToggle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
