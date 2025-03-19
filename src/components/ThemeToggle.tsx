import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  // Function to get system preference theme
  const getSystemPreference = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Always start in system mode on page load
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  // const [isSystemMode, setIsSystemMode] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    getSystemPreference() === "dark"
  );

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = getSystemPreference();
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(systemTheme);
      localStorage.removeItem("theme");
      // setIsSystemMode(true);
      setIsDarkMode(systemTheme === "dark");
    } else {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
      // setIsSystemMode(false);
      setIsDarkMode(theme === "dark");
    }
  }, [theme]);

  // Listen for system theme changes dynamically
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
        setIsDarkMode(newTheme === "dark");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  // Toggle between light and dark using slider
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
      {/* <div className="p-4 border rounded-lg bg-gray-200 dark:bg-gray-700">
        <span className="text-lg font-bold">
          {isSystemMode ? "System Mode: Active" : "System Mode: Off"}
        </span>
      </div> */}

      {/* Current Theme Status */}
      {/* <div className="p-4 border rounded-lg bg-gray-200 dark:bg-gray-700">
        <span className="text-lg font-bold">
          Current Theme: {theme === "system" ? getSystemPreference() : theme}
        </span>
      </div> */}

      {/* Slider Bar for Light/Dark Mode */}
      <div
        className="relative w-20 h-10 rounded-full p-1 flex items-center bg-yellow-400 dark:bg-blue-900 cursor-pointer transition-colors duration-500"
        onClick={toggleTheme}
      >
        <div
          className={`absolute w-8 h-8 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-500 ${
            isDarkMode ? "translate-x-0 bg-gray-800" : "translate-x-10 bg-white"
          }`}
        >
          {isDarkMode ? (
            <Moon className="text-white" size={20} />
          ) : (
            <Sun className="text-yellow-500" size={20} />
          )}
        </div>
      </div>
    </div>
  );
}
