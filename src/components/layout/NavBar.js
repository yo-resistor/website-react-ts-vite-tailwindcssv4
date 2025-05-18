import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Navigation bar
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import logoDarkBG from "../../assets/logo_dark_bg.svg";
import logoWhiteBG from "../../assets/logo_white_bg.svg";
const NavBar = () => {
    const location = useLocation(); // Get the current route
    const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
    const menuRef = useRef(null); // Ref for detecting clicks outside
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: "fixed top-0 left-0 w-full bg-white-bg-1 dark:bg-dark-bg-3 backdrop-blur-md shadow-md z-50 font-mono border-t border-neutral-300 dark:border-neutral-700", children: _jsxs("div", { className: "mx-auto flex items-center justify-between py-2 px-4 md:px-14 sm:px-8", children: [_jsxs(Link, { to: "/", children: [_jsx("img", { src: logoWhiteBG, alt: "Logo White Background", className: "block dark:hidden h-10 transition-opacity duration-300" }), _jsx("img", { src: logoDarkBG, alt: "Logo Dark Background", className: "dark:block hidden h-10 transition-opacity duration-300" })] }), _jsxs("div", { className: "hidden sm:flex items-center justify-between space-x-6", children: [_jsx(NavLink, { to: "/about", path: location.pathname, label: "About" }), _jsx(NavLink, { to: "/projects", path: location.pathname, label: "Projects" }), _jsx(NavLink, { to: "/blog", path: location.pathname, label: "Blog" }), _jsx(NavLink, { to: "/contact", path: location.pathname, label: "Contact" }), _jsx(ThemeToggle, {})] }), _jsxs("div", { className: "flex flex-row items-center sm:hidden gap-x-4", children: [_jsx(ThemeToggle, {}), " ", _jsx("button", { className: "text-2xl pb-1.5 font-extralight text-neutral-900 dark:text-white-bg-1", onClick: () => setIsOpen(true), children: _jsx(Menu, { className: "text-neutral-900 dark:text-white-bg-1 pt-1.5", size: 26 }) })] })] }) }), isOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300", onClick: () => setIsOpen(false) })), isOpen && (_jsxs("div", { ref: menuRef, className: "fixed top-0 right-0 w-1/2 h-screen bg-white dark:bg-dark-bg-3 sm:hidden shadow-lg transition-transform transform duration-300 ease-in-out z-50 p-6", children: [_jsx("button", { className: "text-3xl self-end mb-4 text-gray-900 dark:text-white", onClick: () => setIsOpen(false), children: _jsx(X, { size: 20 }) }), _jsxs("div", { className: "flex flex-col space-y-6", children: [_jsx(NavLink, { to: "/about", path: location.pathname, label: "About", onClick: () => setIsOpen(false) }), _jsx(NavLink, { to: "/projects", path: location.pathname, label: "Projects", onClick: () => setIsOpen(false) }), _jsx(NavLink, { to: "/blog", path: location.pathname, label: "Blog", onClick: () => setIsOpen(false) }), _jsx(NavLink, { to: "/contact", path: location.pathname, label: "Contact", onClick: () => setIsOpen(false) })] })] }))] }));
};
/* Component for Navigation Links with Active State */
const NavLink = ({ to, path, label, onClick, }) => (_jsx(Link, { to: to, onClick: onClick, className: `text-sm font-medium ${path === to
        ? "text-blue-500 dark:text-blue-300 underline"
        : "text-gray-900 dark:text-white hover:text-blue-500"}`, children: label }));
export default NavBar;
