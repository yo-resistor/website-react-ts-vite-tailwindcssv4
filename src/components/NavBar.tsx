// Navigation bar
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logoDarkBG from "../assets/logo_dark_bg.svg";
import logoWhiteBG from "../assets/logo_white_bg.svg";

const NavBar = () => {
  const location = useLocation(); // Get the current route
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const menuRef = useRef<HTMLDivElement>(null); // Ref for detecting clicks outside

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/70 dark:bg-dark-bg-3 backdrop-blur-md shadow-md z-50 font-mono">
        <div className="mx-auto flex items-center justify-between py-2 px-4 md:px-14 sm:px-10">
          {/* Logo / Home Link */}
          <Link to="/">
            <img
              src={logoWhiteBG}
              alt="Logo White Background"
              className="block dark:hidden h-10 transition-opacity duration-300"
            />
            <img
              src={logoDarkBG}
              alt="Logo Dark Background"
              className="dark:block hidden h-10 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-between space-x-6">
            <NavLink to="/about" path={location.pathname} label="About" />
            <NavLink
              to="/experience"
              path={location.pathname}
              label="Experience"
            />
            <NavLink to="/projects" path={location.pathname} label="Projects" />
            <NavLink to="/blog" path={location.pathname} label="Blog" />
            <NavLink to="/contact" path={location.pathname} label="Contact" />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex flex-row items-center sm:hidden gap-x-4">
            <ThemeToggle /> {/* Ensure it stays in Mobile Navbar */}
            <button
              className="text-2xl pb-1.5 text-neutral-900 dark:text-white-bg-1"
              onClick={() => setIsOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Background Blur Effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)} // Clicking the background closes the menu
        />
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          ref={menuRef} // Attach ref for outside click detection
          className="fixed top-0 right-0 w-3/4 h-screen bg-white dark:bg-dark-bg-3 sm:hidden shadow-lg transition-transform transform duration-300 ease-in-out z-50 p-6"
        >
          <button
            className="text-3xl self-end mb-4 text-gray-900 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          <div className="flex flex-col space-y-6">
            <NavLink to="/about" path={location.pathname} label="About" />
            <NavLink
              to="/experience"
              path={location.pathname}
              label="Experience"
            />
            <NavLink to="/projects" path={location.pathname} label="Projects" />
            <NavLink to="/blog" path={location.pathname} label="Blog" />
            <NavLink to="/contact" path={location.pathname} label="Contact" />
          </div>
        </div>
      )}
    </>
  );
};

/* Component for Navigation Links with Active State */
const NavLink = ({
  to,
  path,
  label,
}: {
  to: string;
  path: string;
  label: string;
}) => (
  <Link
    to={to}
    className={`text-xl font-medium ${
      path === to
        ? "text-blue-500 dark:text-blue-300 underline"
        : "text-gray-900 dark:text-white hover:text-blue-500"
    }`}
  >
    {label}
  </Link>
);

export default NavBar;

// DONE: Apply ThemeToggle to the NavBar.
// DONE: Apply logo and other pages to the NavBar.
// DONE: Apply shade for the NavBar as well -> Take a look at yunsikohm.com
// TODO: Mobile friendly UI/UX.
// DONE: Hamburger that contains other pages. ThemeToggle won't go inside. Maybe we can think about simplifying ThemeToggle as just one icon without the slider bar.
// DONE: When Hamburger is activated, blur the background.
// TODO: When users click/touch outside of the popped hamburger section or navigation bar, deactivate the popped hamburger.
// TODO: Fine change of font size of texts of nav bar.
