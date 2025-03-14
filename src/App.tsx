import "./App.css";
import Hero from "./components/Hero";

function App() {
  return (
    <div>
      <Hero />
      <div className="hidden max-[200px]:block w-full h-full min-h-screen bg-neutral-100 dark:bg-neutral-850 text-white-bg-1 dark:bg-dark px-10 py-10">
        This screen is too small to show any items.
      </div>
    </div>
  );
}

export default App;
