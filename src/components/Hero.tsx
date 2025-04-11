import "./Hero.css";
// import { motion } from "framer-motion";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import GoogleScholarIcon from "./icons/GoogleScholarIcon";
import InstagramIcon from "./icons/InstagramIcon";

const socialLinks = [
  { href: "https://github.com/yo-resistor", icon: <GitHubIcon /> },
  { href: "https://www.linkedin.com/in/yohm/", icon: <LinkedInIcon /> },
  {
    href: "https://scholar.google.com/citations?user=MdnAj8IAAAAJ&hl=en&oi=ao",
    icon: <GoogleScholarIcon />,
  },
  { href: "https://www.instagram.com/yunsik_ohm/", icon: <InstagramIcon /> },
];

const Hero = () => {
  return (
    <div className="max-[200px]:hidden w-full h-full min-h-screen flex flex-col justify-center bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40">
      <h2 className="hero-hi mb-6 font-mono text-base text-left text-neutral-800 dark:text-neutral-300">
        Hi, my name is
      </h2>
      <h1 className="hero-name mb-6 font-sans text-5xl max-sm:text-4xl font-bold text-blue-600 dark:text-blue-500">
        Yunsik Ohm
      </h1>
      <h2 className="hero-title mb-6 font-mono text-4xl max-sm:text-3xl font-bold text-neutral-900 dark:text-white-bg-1">
        <div>Programmer</div>
        <div>Engineer</div>
        <div>Writer</div>
      </h2>
      <div className="hero-text mb-6 text-base text-neutral-800 dark:text-neutral-300">
        <div className="hidden max-sm:block max-sm:w-16/18">
          I’m passionate about applying machine learning to real-world problems.
          Currently, I’m building a framework to optimize material compositions
          for wearable technologies—blending code, research, and storytelling.
        </div>
        <div className="hidden sm:max-lg:block sm:max-md:w-15/18 md:max-lg:w-14/18">
          I’m passionate about applying machine learning to real-world
          challenges. With a background in materials science and a strong
          foundation in Python, I’m developing a framework to optimize material
          compositions for wearable technologies. My work blends experimental
          insight with data-driven modeling to accelerate innovation in flexible
          electronics.
        </div>
        <div className="hidden lg:max-2k:block lg:max-2k:w-13/18">
          I’m passionate about applying machine learning to real-world
          challenges. With a background in materials science and a strong
          foundation in Python, I’m developing a framework to optimize material
          compositions for wearable technologies. My work blends experimental
          insight with data-driven modeling to accelerate innovation in flexible
          electronics. Beyond the lab and the terminal, I enjoy writing about
          the journey—translating technical ideas into accessible stories that
          connect people, technology, and possibility.
        </div>
        <div className="hidden 2k:block 2k:w-13/18">
          I’m passionate about applying machine learning to real-world
          challenges. With a background in materials science and a strong
          foundation in Python, I’m developing a framework to optimize material
          compositions for wearable technologies. My work blends experimental
          insight with data-driven modeling to accelerate innovation in flexible
          electronics. Beyond the lab and the terminal, I enjoy writing about
          the journey—translating technical ideas into accessible stories that
          connect people, technology, and possibility.
        </div>
        {/* DONE: Need to work on the texts for different display size. */}
        {/* DONE: Need to work on layout of the texts. */}
        {/* DONE: Need to work on social icons. */}
      </div>
      <div className="flex items-center gap-x-4 sm:hidden">
        {socialLinks.map(({ href, icon }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-container w-[24px]"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;

// DONE: set different main texts for different screen width.
