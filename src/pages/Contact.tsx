const Contact = () => {
  return (
    <div className="max-[200px]:hidden w-full h-full min-h-screen flex flex-col justify-center bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40">
      <h2 className="mt-20 mb-4 font-mono text-base text-left text-neutral-800 dark:text-neutral-300">
        Let's
      </h2>
      <h1 className="mb-6 font-sans text-5xl max-sm:text-4xl font-bold text-blue-600 dark:text-blue-500">
        Get In Touch
      </h1>
      <div className="mb-6 text-base text-neutral-800 dark:text-neutral-300">
        <div className="hidden max-sm:flex w-16/18">
          Building something cool? Exploring ML? Just want to chat? Please reach
          out through the form or email, I’d love to connect.
        </div>
        <div className="hidden sm:flex w-full max-w-2xl">
          Whether you’re building something exciting, exploring machine learning
          applications, or just want to chat about code, research, writing, or
          anything, I’d be glad to connect. Drop me a message through the form
          below or reach out via email.
        </div>
      </div>
      <div className="w-full max-w-2xl">
        <form className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="First Name"
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-dark-bg-2 text-neutral-800 dark:text-white w-full"
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder="Last Name"
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-dark-bg-2 text-neutral-800 dark:text-white w-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-dark-bg-2 text-neutral-800 dark:text-white"
            />
          </div>
          <div className="flex flex-col">
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Message"
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-dark-bg-2 text-neutral-800 dark:text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-fit px-6 py-2 mt-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md font-semibold transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "mailto:your.email@example.com";
            }}
          >
            Send via Email
          </button>
        </form>
        <div className="mt-6 mb-20 text-sm text-neutral-600 dark:text-neutral-400">
          Prefer to copy the email instead?{" "}
          <span
            className="font-mono underline cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText("yunsikohm@gmail.com");
            }}
          >
            Click to copy
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
