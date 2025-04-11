const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold font-mono mb-6 text-neutral-800 dark:text-neutral-300">
        Error 404
      </h1>
      <p className="text-lg mb-6 text-neutral-800 dark:text-neutral-300">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover-text-blue-600 underline text-lg"
      >
        Go back home
      </a>
    </div>
  );
};

export default NotFound;
