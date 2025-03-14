import "./Hero.css";
// import { motion } from "framer-motion";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import GoogleScholarIcon from "./icons/GoogleScholarIcon";
import InstagramIcon from "./icons/InstagramIcon";

const Hero = () => {
  return (
    <div className="max-[200px]:hidden w-full h-full min-h-screen flex flex-col justify-center bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40">
      <h2 className="hero-hi mb-6 font-mono text-base text-left text-neutral-800 dark:text-neutral-300">
        Hi, my name is
      </h2>
      <h1 className="hero-name mb-4 font-sans text-5xl font-bold text-blue-600 dark:text-blue-500 ">
        Yunsik Ohm
      </h1>
      <h2 className="hero-title mb-6 font-mono text-4xl font-bold text-neutral-900 dark:text-white-bg-1">
        <div>Programmer</div>
        <div>Engineer</div>
        <div>Writer</div>
      </h2>
      <p className="hero-text mb-6 text-base text-neutral-800 dark:text-neutral-300 w-8/9 sm:w-7/9 md:w-6/9 lg:w-5/9">
        <div className="hidden max-sm:block">
          I’m passionate about applying machine learning to real-world problems.
          Currently, I’m developing a framework to optimize material composition
          for wearable technologies.
        </div>
        <div className="hidden sm:max-lg:block">
          Placeholder for tablet text display.
        </div>
        <div className="hidden lg:max-2k:block">
          Placeholder for common desktop text display.
        </div>
        <div className="hidden 2k:block">
          Placeholder for larger desktop text display.
        </div>
        {/* TODO: Need to work on the texts for different display size. */}
        {/* TODO: Need to work on layout of the texts. */}
        {/* TODO: Need to work on social icons. */}
      </p>
      <div className="flex items-center gap-x-4 sm:hidden">
        <a
          href="https://github.com/yo-resistor"
          target="_blank"
          rel="noopener noreferrer"
          className="social-container w-[24px]"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/yohm/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-container w-[24px]"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://scholar.google.com/citations?user=MdnAj8IAAAAJ&hl=en&oi=ao"
          target="_blank"
          rel="noopener noreferrer"
          className="social-container w-[24px]"
        >
          <GoogleScholarIcon />
        </a>
        <a
          href="https://www.instagram.com/yunsik_ohm/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-container w-[24px]"
        >
          <InstagramIcon />
        </a>
      </div>
    </div>
  );
};

export default Hero;

// TODO: set different main texts for different screen width.
