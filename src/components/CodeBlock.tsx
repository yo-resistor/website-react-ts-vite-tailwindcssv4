// src/components/CodeBlock.tsx
import React, { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  className?: string; // className might be passed by MDX for language (e.g., "language-javascript")
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  // Attempt to extract language from className e.g. "language-javascript" -> "javascript"
  const language = className?.replace(/language-/, "");

  // Base classes for the container
  const containerClasses = [
    "my-8", // Increased vertical margin
    "rounded-lg", // Slightly larger rounding
    "overflow-hidden",
    "relative",
    "group",
    "border", // Add a border
    "shadow-md", // Add a subtle shadow
    // Light mode styles
    "bg-slate-50", // Light background
    "text-slate-800", // Light mode text
    "border-slate-200", // Light mode border
    // Dark mode styles
    "dark:bg-slate-800", // Darker, slightly blue-ish background
    "dark:text-slate-200", // Dark mode text
    "dark:border-slate-700", // Dark mode border
  ].join(" ");

  const preClasses = [
    "p-6", // Increased padding
    "text-sm",
    "overflow-x-auto",
    "font-mono", // Ensure monospaced font
  ].join(" ");

  const languageIndicatorClasses = [
    "absolute",
    "top-3", // Adjusted position
    "right-3", // Adjusted position
    "text-xs",
    "font-semibold",
    "px-2.5", // Slightly more padding
    "py-1",
    "rounded-md", // Rounded corners for the indicator
    "opacity-0",
    "group-hover:opacity-100",
    "transition-all",
    "duration-200",
    // Light mode indicator
    "bg-slate-200",
    "text-slate-600",
    // Dark mode indicator
    "dark:bg-slate-700",
    "dark:text-slate-300",
  ].join(" ");

  return (
    <div className={containerClasses}>
      {language && (
        <div className={languageIndicatorClasses}>{language.toUpperCase()}</div>
      )}
      <pre className={preClasses}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
