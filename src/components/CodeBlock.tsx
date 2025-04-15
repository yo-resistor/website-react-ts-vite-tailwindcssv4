import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock = ({ children, language = "bash" }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {children.trim()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
