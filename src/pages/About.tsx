const About = () => {
  return (
    <main
      id="main-content"
      className="max-[200px]:hidden w-full h-full min-h-screen flex flex-col justify-center bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40"
    >
      <p className="mb-4 font-mono text-base text-left text-neutral-800 dark:text-neutral-300">
        This page is
      </p>
      <h1 className="mb-6 font-sans text-5xl max-sm:text-4xl font-bold text-blue-600 dark:text-blue-500">
        About
      </h1>
      <div className="mb-6 text-base text-neutral-800 dark:text-neutral-300">
        <div className="flex w-13/18">
          Here, I will introduce myself more. You can find my interests,
          experience, and resume in this page.
        </div>
      </div>
    </main>
  );
};

export default About;
