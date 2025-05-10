// src/components/CodeBlock.tsx
import React, { useState, useEffect } from "react";
import { Copy, CopyCheck } from "lucide-react"; // Import icons
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  code: string;
  language?: string;
};

// Helper function to dedent code strings
const dedent = (str: string): string => {
  const lines = str.split("\n");
  let commonIndent = Infinity;

  // Find the minimum indentation for non-empty lines
  for (const line of lines) {
    if (line.trim() === "") continue; // Skip empty lines
    const leadingSpace = line.match(/^(\s*)/)?.[0].length ?? 0;
    if (leadingSpace < commonIndent) {
      commonIndent = leadingSpace;
    }
  }

  // If all lines are empty or no common indent, return as is (or trimmed)
  if (commonIndent === Infinity) {
    return lines.join("\n").trim();
  }

  // Remove common indentation
  return lines
    .map((line) => line.substring(commonIndent))
    .join("\n")
    .trim();
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);
  const [isCurrentlyDark, setIsCurrentlyDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const processedCode = dedent(code);

  useEffect(() => {
    setIsCurrentlyDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setIsCurrentlyDark(
            document.documentElement.classList.contains("dark")
          );
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  // Map common language identifiers to display names
  const languageDisplayMap: { [key: string]: string } = {
    javascript: "JavaScript",
    js: "JavaScript",
    jsx: "JavaScript",
    typescript: "TypeScript",
    tsx: "TypeScript",
    ts: "TypeScript",
    python: "Python",
    py: "Python",
    html: "HTML",
    css: "CSS",
    bash: "Bash",
    shell: "Shell",
    json: "JSON",
    yaml: "YAML",
    markdown: "Markdown",
    sql: "SQL",
    java: "Java",
    csharp: "C#",
    cpp: "C++",
    php: "PHP",
    ruby: "Ruby",
    go: "Go",
    rust: "Rust",
  };

  // Function to get the display name
  const getLanguageDisplayName = (lang: string): string => {
    const lowerLang = lang.toLowerCase();
    return (
      languageDisplayMap[lowerLang] ||
      lang.charAt(0).toUpperCase() + lang.slice(1)
    );
  };

  return (
    <div
      className="group relative my-8 rounded-lg overflow-hidden shadow-lg focus:outline-none"
      tabIndex={0}
    >
      {/* Top-right corner container for buttons */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
        {/* Language Indicator */}
        {language && (
          <div
            className={`px-2 py-0.5 text-xs font-semibold rounded-md mb-1.5 ${
              // Added mb-1.5
              isCurrentlyDark
                ? "bg-black/30 text-slate-200"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {getLanguageDisplayName(language)}
          </div>
        )}
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-x-1 px-2 py-0.5 text-xs rounded ${
            // Added flex, items-center, gap-x-1
            isCurrentlyDark
              ? "bg-black/30 hover:bg-black/40 text-slate-200"
              : "bg-slate-200 hover:bg-slate-300 text-slate-700"
          }`}
        >
          {copied ? (
            <CopyCheck size={14} strokeWidth={1.5} />
          ) : (
            <Copy size={14} strokeWidth={1.5} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* The highlighted code */}
      <SyntaxHighlighter
        language={language}
        style={isCurrentlyDark ? vscDarkPlus : vs}
        showLineNumbers={false}
        wrapLongLines={true} // Restore line wrapping
        customStyle={{
          margin: 0,
          padding: "1.5rem 1.25rem 1.5rem 1.25rem", // Restore correct padding
          backgroundColor: "transparent",
          fontSize: "0.9rem",
          lineHeight: 1.5,
          // overflowX removed
          borderRadius: "0.5rem", // Match parent's rounded-lg
        }}
        lineNumberStyle={{
          color: "#6c6c6c",
          fontSize: "0.75rem",
        }}
      >
        {processedCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
