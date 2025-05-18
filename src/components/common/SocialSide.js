import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GitHubIcon from "../icons/GitHubIcon";
import GoogleScholarIcon from "../icons/GoogleScholarIcon";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
const SocialSide = () => {
    return (
    // Left side bar: Email
    _jsxs("div", { className: "fixed bottom-0 left-3 origin-bottom-left flex flex-col items-center gap-5 max-sm:hidden", children: [_jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("a", { href: "https://github.com/yo-resistor", target: "_blank", rel: "noopener noreferrer", className: "fill-gray-600 w-[20px]", children: _jsx(GitHubIcon, {}) }), _jsx("a", { href: "https://www.linkedin.com/in/yohm/", target: "_blank", rel: "noopener noreferrer", className: "fill-gray-600 w-[20px]", children: _jsx(LinkedInIcon, {}) }), _jsx("a", { href: "https://scholar.google.com/citations?user=MdnAj8IAAAAJ&hl=en&oi=ao", target: "_blank", rel: "noopener noreferrer", className: "fill-gray-600 w-[20px]", children: _jsx(GoogleScholarIcon, {}) }), _jsx("a", { href: "https://www.instagram.com/yunsik_ohm/", target: "_blank", rel: "noopener noreferrer", className: "fill-gray-600 w-[20px]", children: _jsx(InstagramIcon, {}) })] }), _jsx("div", { className: "w-0.5 h-24 bg-gray-600 dark:bg-gray-300 text-sm font-medium tracking-widest hover:text-blue-500 transition rounded-md" })] }));
};
export default SocialSide;
