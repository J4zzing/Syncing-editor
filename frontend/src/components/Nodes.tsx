import React from "react";
import { RenderBlockProps, RenderMarkProps } from "slate-react";

export const BoldMark = (props: RenderMarkProps) => {
  const { attributes, children } = props;
  return <strong {...attributes}>{children}</strong>;
};

export const ItalicMark = (props: RenderMarkProps) => {
  const { attributes, children } = props;
  return <em {...attributes}>{children}</em>;
};

export const UnderscoreMark = (props: RenderMarkProps) => {
  const { attributes, children } = props;
  return <u {...attributes}>{children}</u>;
};

export const CodeMark = (props: RenderMarkProps) => {
  const { attributes, children } = props;
  return <code {...attributes}>{children}</code>;
};

export const StrikethroughMark = (props: RenderMarkProps) => {
  const { attributes, children } = props;
  return <del {...attributes}>{children}</del>;
};

export const Paragraph = (props: RenderBlockProps) => {
  const { attributes, children } = props;
  return <p {...attributes}>{children}</p>;
};

export const CodeBlock = (props: RenderBlockProps) => {
  const { attributes, children } = props;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export const QuoteBlock = (props: RenderBlockProps) => {
  const { attributes, children } = props;
  return (
    <blockquote className="blockquote" {...attributes}>
      {children}
    </blockquote>
  );
};
