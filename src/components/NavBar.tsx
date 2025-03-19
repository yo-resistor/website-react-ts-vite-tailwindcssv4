import { useState, useEffect } from "react";
import "./NavBar.css";

export default function NavBar() {
  // Function to apply the correct theme on page load
  const applyTheme = () => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  // Set theme state based on localStorage or system preference
  const getPreferredTheme = (): "light" | "dark" => {
    if (localStorage.theme === "light" || localStorage.theme === "dark") {
      return localStorage.theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getPreferredTheme);

  useEffect(() => {
    applyTheme(); // Apply the theme on page load
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      localStorage.theme = "light";
      setTheme("light");
    } else {
      localStorage.theme = "dark";
      setTheme("dark");
    }
    applyTheme(); // Apply the new theme immediately
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-black text-black dark:text-white border-b border-gray-300 dark:border-gray-700">
      <span className="text-lg font-bold">NavBar</span>
      <button
        onClick={toggleTheme}
        className="peer px-4 py-2 rounded-lg transition-colors duration-300 bg-gray-800 text-white dark:bg-gray-300 dark:text-black hover:bg-gray-700 dark:hover:bg-gray-400"
      >
        Toggle Theme
      </button>
    </nav>
  );
}

// TODO: Apply ThemeToggle to the NavBar.
// TODO: Apply logo and other pages to the NavBar.
// TODO: Apply shade for the NavBar as well -> Take a look at yunsikohm.com
// TODO: Mobile friendly UI/UX.
// TODO: Hamburger that contains other pages. ThemeToggle won't go inside. Maybe we can think about simplifying ThemeToggle as just one icon without the slider bar.
// TODO: When Hamburger is activated, blur the background.
// TODO: When users click/touch outside of the popped hamburger section or navigation bar, deactivate the popped hamburger.
