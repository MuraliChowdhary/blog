import CopyButton from "@/components/CopyButton";
import Callout from "@/components/mdx/Callout";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(): MDXComponents {
  return {
    // Code blocks with copy button
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
      const codeEl = (children as React.ReactElement<{ children?: string }>);
      const rawCode = codeEl?.props?.children ?? "";
      return (
        <div className="relative group my-6">
          <pre
            {...props}
            className="overflow-x-auto rounded-lg border border-border bg-muted/30 px-5 py-4 text-sm font-mono leading-relaxed"
          >
            {children}
          </pre>
          <CopyButton text={String(rawCode)} />
        </div>
      );
    },

    // Inline code
    code: ({ children, ...props }) => (
      <code
        {...props}
        className="rounded px-1.5 py-0.5 text-sm font-mono bg-muted border border-border/60"
      >
        {children}
      </code>
    ),

    // Headings with anchor links
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="mt-10 mb-3 text-lg font-semibold tracking-tight scroll-mt-20"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        className="mt-8 mb-2 text-base font-semibold scroll-mt-20"
      >
        {children}
      </h3>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-border pl-5 italic text-muted-foreground text-sm leading-relaxed">
        {children}
      </blockquote>
    ),

    // Custom components available in MDX
    Callout,
  };
}