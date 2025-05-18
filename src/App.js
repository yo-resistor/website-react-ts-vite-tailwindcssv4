import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import Hero from "./components/Hero";
function App() {
    return (_jsxs("div", { children: [_jsx(Hero, {}), _jsx("div", { className: "hidden max-[200px]:flex flex-col justify-center w-full h-full min-h-screen bg-neutral-100 dark:bg-neutral-850 text-white-bg-1 dark:bg-dark px-10 py-10", children: "This screen is too small to show any items." })] }));
}
export default App;
