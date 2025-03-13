import "./Hero.css";
// import { motion } from "framer-motion";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import GoogleScholarIcon from "./icons/GoogleScholarIcon";
import InstagramIcon from "./icons/InstagramIcon";

const Hero = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-white-bg-1 dark:bg-dark-bg-3 p-4 border-4">
      <h2 className="mb-6 font-mono text-lg text-neutral-800 dark:text-neutral-300">
        Hi, my name is
      </h2>
      <h1 className="mb-4 font-sans text-5xl font-bold text-blue-600 dark:text-blue-500 ">
        Yunsik Ohm
      </h1>
      <h2 className="mb-6 font-mono text-4xl font-bold text-neutral-900 dark:text-white-bg-1">
        <div>Programmer</div>
        <div>Engineer</div>
        <div>Writer</div>
      </h2>
      <p className="max-[300px]:hidden mb-6 text-base text-neutral-800 dark:text-neutral-300 w-8/9 sm:w-7/9 md:w-6/9 lg:w-5/9">
        <div className="small:">
          I’m passionate about applying machine learning to real-world problems.
          Currently, I’m developing a framework to optimize material composition
          for wearable technologies.
        </div>
      </p>
      <button className="social-container bg-blue-500">Save Changes</button>
      <a
        href="https://github.com/yo-resistor"
        target="_blank"
        rel="noopener noreferrer"
        className="social-container"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/yohm/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-container"
      >
        <LinkedInIcon />
      </a>
      <a
        href="https://scholar.google.com/citations?user=MdnAj8IAAAAJ&hl=en&oi=ao"
        target="_blank"
        rel="noopener noreferrer"
        className="social-container"
      >
        <GoogleScholarIcon />
      </a>
      <a
        href="https://www.instagram.com/yunsik_ohm/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-container"
      >
        <InstagramIcon />
      </a>
    </div>
    //   <section className="w-full  flex flex-col justify-center min-h-screen px-10 md:px-40 sm:px-20 bg-white dark:bg-dark-bg-3">
    //     <motion.h2
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6 }}
    //       className="mb-6 font-mono text-lg text-gray-700 dark:text-gray-300"
    //     >
    //       Hi, my name is
    //     </motion.h2>
    //     {/* <motion.h1
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6, delay: 0.1 }}
    //       className="mb-4 text-5xl font-bold text-gray-900 dark:text-white"
    //     >
    //       <span className="text-blue-500">Yunsik Ohm</span>
    //     </motion.h1>
    //     <motion.h1
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.7, delay: 0.2 }}
    //       className="font-mono mb-6 text-4xl font-bold text-gray-900 dark:text-white"
    //     >
    //       <div>Programmer</div>
    //       <div>Engineer</div>
    //       <div>Writer</div>
    //     </motion.h1>
    //     <motion.p
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.8, delay: 0.3 }}
    //       className="max-[300px]:hidden mb-6 text-lg text-gray-700 dark:text-gray-300 w-8/9 sm:w-7/9 md:w-6/9 lg:w-5/9"
    //     >
    //       I’m passionate about applying machine learning to real-world problems.
    //       Currently, I’m developing a framework to optimize material composition
    //       for wearable technologies.
    //     </motion.p>
    //     <div className="flex items-center gap-x-6 max-[500px]:gap-x-4 sm:hidden">
    //       {/* GitHub icon dark and light mode */}
    //       <motion.a
    //         href="https://github.com/yo-resistor"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="fill-gray-700"
    //         initial={{ opacity: 0, y: 10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.8, delay: 0.2 }}
    //         whileHover={{ scale: 1.05 }}
    //       >
    //         <GitHubIcon />
    //       </motion.a>
    //       {/* LinkedIn icon dark and light mode */}
    //       <motion.a
    //         href="https://www.linkedin.com/in/yohm/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="fill-gray-700"
    //         initial={{ opacity: 0, y: 10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.8, delay: 0.2 }}
    //         whileHover={{ scale: 1.05 }}
    //       >
    //         <LinkedInIcon />
    //       </motion.a>
    //       {/* Google scholar icon dark and light mode */}
    //       <motion.a
    //         href="https://scholar.google.com/citations?user=MdnAj8IAAAAJ&hl=en&oi=ao"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="fill-gray-700"
    //         initial={{ opacity: 0, y: 10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.8, delay: 0.2 }}
    //         whileHover={{ scale: 1.05 }}
    //       >
    //         <GoogleScholarIcon />
    //       </motion.a>
    //       {/* Instagram icon dark and light mode */}
    //       <motion.a
    //         href="https://www.instagram.com/yunsik_ohm/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="fill-gray-700"
    //         initial={{ opacity: 0, y: 10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.8, delay: 0.2 }}
    //         whileHover={{ scale: 1.05 }}
    //       >
    //         <InstagramIcon />
    //       </motion.a>
    //     </div> */}
    //   </section>
  );
};

export default Hero;

// TODO: set different main texts for different screen width.
