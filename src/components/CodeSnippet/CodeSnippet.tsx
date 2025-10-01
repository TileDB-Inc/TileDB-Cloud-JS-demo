import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeSnippet.css";
import type React from "react";

const CodeSnippet: React.FC<{children: string | string[]}> = ({ children }) => {
  return (
    <SyntaxHighlighter
      className="codesnippet-js"
      language="javascript"
      style={materialOceanic}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
