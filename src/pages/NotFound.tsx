const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a href="/" className="text-blue-500 hover:underline text-lg">
        Go back home
      </a>
    </div>
  );
};

export default NotFound;
