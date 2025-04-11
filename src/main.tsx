// React entry point
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";

// Pages
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import Projects from "./pages/Projects.tsx";
import NotFound from "./pages/NotFound";

// Components
import NavBar from "./components/layout/NavBar.tsx";
// import SocialSide from "./components/SocialSide.tsx";
// import EmailSide from "./components/EmailSide.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        {/* <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
