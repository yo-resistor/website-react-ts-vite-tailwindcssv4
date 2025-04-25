// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

// interface CodeBlockProps {
//   children: string;
//   language?: string;
// }

// const CodeBlock = ({ children, language = "bash" }: CodeBlockProps) => {
//   return (
//     <SyntaxHighlighter language={language} style={dracula}>
//       {children.trim()}
//     </SyntaxHighlighter>
//   );
// };

// export default CodeBlock;

//////////Not working
// import React, { useEffect } from "react";
// import Prism from "prismjs";
// import "prismjs/components/prism-python"; // import the language you need
// import "prismjs/themes/prism-tomorrow.css"; // import the theme
// import "prismjs/components/prism-python";
// import "prismjs/components/prism-bash";

// interface CodeBlockProps {
//   code: string;
//   language: string;
// }

// const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
//   useEffect(() => {
//     Prism.highlightAll();
//   }, []);

//   return (
//     <pre
//       className={`language-${language} rounded-lg p-4 overflow-auto text-sm`}
//     >
//       <code className={`language-${language}`}>{code}</code>
//     </pre>
//   );
// };

// src/components/CodeBlock.tsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Closer to VSCode theme

type CodeBlockProps = {
  children: string;
  language?: string;
};

const CodeBlock = ({ children, language = "bash" }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus} // ✅ VSCode Prettier vibe
      showLineNumbers // ✅ Show line numbers like real code editors
      customStyle={{
        padding: "1.5rem",
        borderRadius: "10px",
        fontSize: "0.9rem",
        backgroundColor: "#1e1e1e", // VSCode dark background
        lineHeight: "1.6",
      }}
      lineNumberStyle={{
        color: "#6d6d6d",
        fontSize: "0.75rem",
        marginRight: "10px",
      }}
      wrapLongLines // ✅ Prevent horizontal scrolling on mobile
    >
      {String(children).trim()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

//TODO: Select one-dark and one-light in https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html for theme.
