import { type PortableTextComponents } from "@portabletext/react";
import CopyButton from "@/components/CopyButton";
import Callout from "@/components/mdx/Callout";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { type SanityImageSource } from "@sanity/image-url";

export const portableTextComponents: PortableTextComponents = {

  types: {

    // Code block
    codeBlock: ({ value }) => (
      <div className="relative group my-6">
        {value.filename && (
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "oklch(0.56 0 0)",
            background: "oklch(0.96 0 0)",
            border: "1px solid oklch(0.9 0 0)",
            borderBottom: "none",
            padding: "0.4rem 1rem",
            borderRadius: "8px 8px 0 0",
          }}>
            {value.filename}
          </div>
        )}
        <pre style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: "1.7",
          borderRadius: value.filename ? "0 0 8px 8px" : "8px",
          border: "1px solid oklch(0.9 0 0)",
          background: "oklch(0.97 0 0)",
          padding: "1.25rem 1.5rem",
          overflowX: "auto",
          margin: 0,
        }}>
          <code>{value.code}</code>
        </pre>
        <CopyButton text={value.code ?? ""} />
      </div>
    ),

    // Callout
    callout: ({ value }) => (
      <Callout type={value.type}>{value.content}</Callout>
    ),

    // Image with caption
    image: ({ value }) => {
      const imageUrl = urlFor(value as SanityImageSource)?.width(800).url();
      if (!imageUrl) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-lg border border-border">
            <Image
              src={imageUrl}
              alt={value.alt ?? ""}
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center" style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "oklch(0.58 0 0)",
            }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    normal: ({ children }) => (
      <p className="mb-5" style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.9rem",
        lineHeight: "1.9",
        color: "oklch(0.42 0 0)",
      }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-bold tracking-tight mt-10 mb-3 scroll-mt-20" style={{
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
        letterSpacing: "-0.025em",
        color: "oklch(0.145 0 0)",
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold mt-8 mb-2 scroll-mt-20" style={{
        fontFamily: "var(--font-sans)",
        fontSize: "1.05rem",
        color: "oklch(0.2 0 0)",
      }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-semibold mt-6 mb-2" style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.95rem",
        color: "oklch(0.25 0 0)",
      }}>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 italic" style={{
        borderLeft: "2px solid oklch(0.85 0 0)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.9rem",
        color: "oklch(0.52 0 0)",
      }}>
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 pl-5 space-y-1" style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.9rem",
        lineHeight: "1.9",
        color: "oklch(0.42 0 0)",
        listStyleType: "disc",
      }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 pl-5 space-y-1" style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.9rem",
        lineHeight: "1.9",
        color: "oklch(0.42 0 0)",
        listStyleType: "decimal",
      }}>
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 600, color: "oklch(0.2 0 0)" }}>
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em style={{ fontStyle: "italic" }}>{children}</em>
    ),
    code: ({ children }) => (
      <code style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.82em",
        background: "oklch(0.96 0 0)",
        border: "1px solid oklch(0.9 0 0)",
        padding: "0.15em 0.4em",
        borderRadius: "4px",
        color: "oklch(0.25 0 0)",
      }}>
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel="noopener noreferrer"
        style={{
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          textDecorationColor: "oklch(0.75 0 0)",
          transition: "text-decoration-color 0.15s",
        }}
      >
        {children}
      </a>
    ),
  },
};