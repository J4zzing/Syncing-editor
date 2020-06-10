import React from "react";
import { RenderBlockProps, RenderMarkProps } from "slate-react";

export const BoldMark = (props: RenderMarkProps) => {
  return <strong>{props.children}</strong>;
};

export const ItalicMark = (props: RenderMarkProps) => {
  return <em>{props.children}</em>;
};

export const UnderscoreMark = (props: RenderMarkProps) => {
  return <u>{props.children}</u>;
};

export const CodeMark = (props: RenderMarkProps) => {
  return <code>{props.children}</code>;
};

export const StrikethroughMark = (props: RenderMarkProps) => {
  return <del>{props.children}</del>;
};

export const CodeBlock = (props: RenderBlockProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const QuoteBlock = (props: RenderBlockProps) => {
  return (
    <blockquote className="blockquote" {...props.attributes}>
      {props.children}
    </blockquote>
  );
};
