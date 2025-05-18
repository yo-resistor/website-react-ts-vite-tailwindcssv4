import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Hero.css";
// import { motion } from "framer-motion";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import GoogleScholarIcon from "./icons/GoogleScholarIcon";
import InstagramIcon from "./icons/InstagramIcon";
const socialLinks = [
    { href: "https://github.com/yo-resistor", icon: _jsx(GitHubIcon, {}) },
    { href: "https://www.linkedin.com/in/yohm/", icon: _jsx(LinkedInIcon, {}) },
    {
        href: "https://scholar.google.com/citations?user=MdnAj8IAAAAJ&hl=en&oi=ao",
        icon: _jsx(GoogleScholarIcon, {}),
    },
    { href: "https://www.instagram.com/yunsik_ohm/", icon: _jsx(InstagramIcon, {}) },
];
const Hero = () => {
    return (_jsxs("div", { className: "max-[200px]:hidden w-full h-full min-h-screen flex flex-col justify-center bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40", children: [_jsx("h2", { className: "hero-hi mb-6 font-mono text-base text-left text-neutral-800 dark:text-neutral-300", children: "Hi, my name is" }), _jsx("h1", { className: "hero-name mb-6 font-sans text-5xl max-sm:text-4xl font-bold text-blue-600 dark:text-blue-500", children: "Yunsik Ohm" }), _jsxs("h2", { className: "hero-title mb-6 font-mono text-4xl max-sm:text-3xl font-bold text-neutral-900 dark:text-white-bg-1", children: [_jsx("div", { children: "Programmer" }), _jsx("div", { children: "Engineer" }), _jsx("div", { children: "Writer" })] }), _jsxs("div", { className: "hero-text mb-6 text-base text-neutral-800 dark:text-neutral-300", children: [_jsx("div", { className: "hidden max-sm:block max-sm:w-16/18", children: "I\u2019m passionate about applying machine learning to real-world problems. Currently, I\u2019m building a framework to optimize material compositions for wearable technologies\u2014blending code, research, and storytelling." }), _jsx("div", { className: "hidden sm:max-lg:block sm:max-md:w-15/18 md:max-lg:w-14/18", children: "I\u2019m passionate about applying machine learning to real-world challenges. With a background in materials science and a strong foundation in Python, I\u2019m developing a framework to optimize material compositions for wearable technologies. My work blends experimental insight with data-driven modeling to accelerate innovation in flexible electronics." }), _jsx("div", { className: "hidden lg:max-2k:block lg:max-2k:w-13/18", children: "I\u2019m passionate about applying machine learning to real-world challenges. With a background in materials science and a strong foundation in Python, I\u2019m developing a framework to optimize material compositions for wearable technologies. My work blends experimental insight with data-driven modeling to accelerate innovation in flexible electronics. Beyond the lab and the terminal, I enjoy writing about the journey\u2014translating technical ideas into accessible stories that connect people, technology, and possibility." }), _jsx("div", { className: "hidden 2k:block 2k:w-13/18", children: "I\u2019m passionate about applying machine learning to real-world challenges. With a background in materials science and a strong foundation in Python, I\u2019m developing a framework to optimize material compositions for wearable technologies. My work blends experimental insight with data-driven modeling to accelerate innovation in flexible electronics. Beyond the lab and the terminal, I enjoy writing about the journey\u2014translating technical ideas into accessible stories that connect people, technology, and possibility." })] }), _jsx("div", { className: "flex items-center gap-x-4 sm:gap-x-6", children: socialLinks.map(({ href, icon }, index) => (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "social-container w-[24px]", children: icon }, index))) })] }));
};
export default Hero;
