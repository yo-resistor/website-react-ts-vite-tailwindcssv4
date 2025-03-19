import { useState, useEffect } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  // Function to get system preference theme
  const getSystemPreference = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Always start in system mode on page load
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isSystemMode, setIsSystemMode] = useState<boolean>(true);

  useEffect(() => {
    const systemTheme = getSystemPreference();
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(systemTheme);
    localStorage.removeItem("theme");
    setIsSystemMode(true);
  }, []);

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = getSystemPreference();
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(systemTheme);
      localStorage.removeItem("theme");
      setIsSystemMode(true);
    } else {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
      setIsSystemMode(false);
    }
  }, [theme]);

  // Toggle between light and dark, ensuring override of system mode
  const toggleTheme = () => {
    if (theme === "system") {
      const systemTheme = getSystemPreference();
      const newTheme = systemTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    } else {
      setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 space-y-6">
      {/* System Mode Status */}
      <div className="p-4 border rounded-lg bg-gray-200 dark:bg-gray-700">
        <span className="text-lg font-bold">
          {isSystemMode ? "System Mode: Active" : "System Mode: Off"}
        </span>
      </div>

      {/* Current Theme Status */}
      <div className="p-4 border rounded-lg bg-gray-200 dark:bg-gray-700">
        <span className="text-lg font-bold">
          Current Theme: {theme === "system" ? getSystemPreference() : theme}
        </span>
      </div>

      {/* Toggle Buttons */}
      <button
        onClick={toggleTheme}
        className="px-6 py-2 rounded-md bg-gray-800 text-white dark:bg-gray-300 dark:text-black hover:bg-gray-700 dark:hover:bg-gray-400 transition-colors duration-300"
      >
        Toggle Light/Dark Mode
      </button>
    </div>
  );
}
