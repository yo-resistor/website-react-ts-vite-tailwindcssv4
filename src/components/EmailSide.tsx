const EmailSide = () => {
  return (
    // Right side bar: Email
    <div className="fixed bottom-0 right-8.5 rotate-90 origin-bottom-right flex flex-row items-center gap-5 max-sm:hidden">
      <a
        href="mailto:yunsikohm@gmail.com"
        className="mb-1 text-gray-600 dark:text-gray-300 text-sm font-medium tracking-widest hover:text-blue-500 transition rounded-md"
      >
        yunsikohm@gmail.com
      </a>
      {/* Horizontal line */}
      <div className="w-24 h-0.5 bg-gray-600 dark:bg-gray-300 text-sm font-medium tracking-widest hover:text-blue-500 transition rounded-md"></div>
    </div>
  );
};

export default EmailSide;

// TODO: work on side panels: emails on the right and social media on the left
