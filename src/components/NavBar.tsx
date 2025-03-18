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

// export default function NavBar() {
//   const getPreferredTheme = (): "light" | "dark" => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "light" || storedTheme === "dark") {
//       return storedTheme;
//     }
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   };

//   const [theme, setTheme] = useState<"light" | "dark">(getPreferredTheme);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme); // Ensures Tailwind detects theme change
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 bg-white dark:bg-black text-black dark:text-white border-b border-gray-300 dark:border-gray-700">
//       <span className="text-lg font-bold">NavBar</span>
//       <button
//         onClick={toggleTheme}
//         className="peer px-4 py-2 rounded-lg transition-colors duration-300 bg-gray-800 text-white dark:bg-gray-300 dark:text-black hover:bg-gray-700 dark:hover:bg-gray-400"
//       >
//         Toggle Theme
//       </button>
//     </nav>
//   );
// }

// TODO: navigation bar with darkmode toggle button.
