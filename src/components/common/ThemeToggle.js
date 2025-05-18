import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
    // Function to get system preference theme
    const getSystemPreference = () => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };
    // Always start in system mode on page load
    const [theme, setTheme] = useState("system");
    // const [isSystemMode, setIsSystemMode] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = useState(getSystemPreference() === "dark");
    useEffect(() => {
        if (theme === "system") {
            const systemTheme = getSystemPreference();
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(systemTheme);
            localStorage.removeItem("theme");
            // setIsSystemMode(true);
            setIsDarkMode(systemTheme === "dark");
        }
        else {
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
        const handleSystemThemeChange = (e) => {
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
    // Sync isDarkMode when screen size changes or component re-renders
    useEffect(() => {
        const handleResize = () => {
            const isDark = document.documentElement.classList.contains("dark");
            setIsDarkMode(isDark);
            setTheme(isDark ? "dark" : "light"); // <-- Keep theme in sync
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // Toggle between light and dark using slider
    const toggleTheme = () => {
        if (theme === "system") {
            const systemTheme = getSystemPreference();
            const newTheme = systemTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
        }
        else {
            setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
        }
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "min-sm:flex hidden items-center justify-center h-10 text-neutral-900 dark:text-white-bg-1 transition-colors duration-300 space-y-6", children: _jsx("div", { className: "relative w-16 h-8 rounded-full p-1 flex items-center bg-yellow-400 dark:bg-blue-900 cursor-pointer transition-colors duration-500", onClick: toggleTheme, children: _jsx("div", { className: `absolute w-6 h-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-500 ${isDarkMode
                            ? "translate-x-0 bg-dark-bg-3"
                            : "translate-x-8 bg-white-bg-1"}`, children: isDarkMode ? (_jsx(Moon, { className: "dark:text-white-bg-1", size: 16 })) : (_jsx(Sun, { className: "text-yellow-500", size: 16 })) }) }) }), _jsx("div", { className: "hidden max-sm:flex", onClick: toggleTheme, children: isDarkMode ? (_jsx(Moon, { className: "dark:text-white-bg-1", size: 16 })) : (_jsx(Sun, { className: "text-neutral-900", size: 16, strokeWidth: 2.5 })) })] }));
}
