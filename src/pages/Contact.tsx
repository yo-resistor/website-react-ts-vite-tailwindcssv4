import emailjs from "emailjs-com";
import { useState } from "react";

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <main className="max-[200px]:hidden max-w-3xl lg:max-w-5xl w-full h-full min-h-screen flex flex-col bg-white-bg-1 dark:bg-dark-bg-3 max-sm:px-10 sm:max-lg:px-20 lg:max-2k:px-30 2k:px-40">
      <h2 className="max-sm:mt-20 mt-30 mb-6 font-mono text-base text-left text-neutral-800 dark:text-neutral-300">
        Let's
      </h2>
      <h1 className="mb-6 font-sans text-5xl max-sm:text-4xl font-bold text-blue-600 dark:text-blue-500">
        Connect
      </h1>
      <div className="mb-6 text-base text-neutral-800 dark:text-neutral-300">
        <div className="hidden max-sm:flex">
          Building something cool? Interested in my journey? Just want to chat?
          Please reach out through the form or email, I’d love to connect.
        </div>
        <div className="hidden sm:flex w-full">
          Whether you are building something exciting, exploring machine
          learning applications, or just want to chat about code, research,
          writing, or anything, I’d be glad to connect. Drop me a message
          through the form below or reach out via email.
        </div>
      </div>
      <div className="w-full">
        <form className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Name"
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-dark-bg-2 text-neutral-800 dark:text-white w-full"
            />
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
          <div className="flex flex-col w-full">
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
            className="w-fit px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md font-semibold transition-colors duration-300"
            onClick={async (e) => {
              e.preventDefault();

              const name = (document.getElementById("name") as HTMLInputElement)
                ?.value;
              const email = (
                document.getElementById("email") as HTMLInputElement
              )?.value;
              const message = (
                document.getElementById("message") as HTMLTextAreaElement
              )?.value;

              if (!name || !message) {
                setShowError(true);
                setTimeout(() => setShowError(false), 4000);
                return;
              }

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                setShowError(true);
                setTimeout(() => setShowError(false), 4000);
                return;
              }

              const templateParams = {
                from_name: name,
                reply_to: email,
                message,
              };

              try {
                await emailjs.send(
                  "service_sclh05b", // replace with your actual EmailJS service ID
                  "template_jd920tl", // replace with your actual EmailJS template ID
                  templateParams,
                  "tDDbhTWBlTERhiZcQ" // replace with your actual EmailJS user/public key
                );
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 4000);
              } catch (error) {
                console.error(error);
                alert("Failed to send message. Please try again later.");
              }
            }}
          >
            Send via Email
          </button>
        </form>
        {showSuccess && (
          <div className="mt-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded-md transition-opacity duration-500 animate-fade-in">
            ✅ Your message has been sent successfully!
          </div>
        )}
        {showError && (
          <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md transition-opacity duration-500 animate-fade-in">
            ❌ Please complete all fields and provide a valid email address.
          </div>
        )}
        <div className="mt-6 mb-10 text-sm text-neutral-600 dark:text-neutral-400">
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
    </main>
  );
};

export default Contact;
