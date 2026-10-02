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
          <div
            className="
              font-mono
              text-xs
              text-muted-foreground
              bg-muted
              border
              border-border
              border-b-0
              px-4
              py-1.5
              rounded-t-lg
            "
          >
            {value.filename}
          </div>
        )}

        <pre
          className={`
            font-mono
            text-[0.85rem]
            leading-[1.7]
            border
            border-border
            bg-muted
            px-5
            py-5
            overflow-x-auto
            m-0
            ${value.filename ? "rounded-b-lg" : "rounded-lg"}
          `}
        >
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
    // Image with caption
image: ({ value }) => {
  const imageUrl = urlFor(value as SanityImageSource)
    ?.width(1200)
    .fit("max")
    .auto("format")
    .quality(75)
    .url();

  if (!imageUrl) return null;

  return (
    <figure className="my-10 flex flex-col items-center">
      <div className="justify-center">
        <Image
          src={imageUrl}
          alt={value.alt ?? ""}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 768px"
          className="
            h-auto
            max-h-[650px]
            w-auto
            max-w-full
            object-contain
          "
        />
      </div>

      {value.caption && (
        <figcaption
          className="
            mt-3
            max-w-2xl
            text-center
            font-mono
            text-[0.78rem]
            leading-relaxed
            text-muted-foreground
          "
        >
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
},
  },

  // Portable Text blocks
  block: {
    normal: ({ children }) => (
      <p
        className="
          mb-5
          font-mono
          text-[0.9rem]
          leading-[1.9]
          text-muted-foreground
        "
      >
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2
        className="
          mt-10
          mb-3
          scroll-mt-20
          font-sans
          text-foreground
          text-[clamp(1.4rem,3vw,1.75rem)]
          font-bold
          tracking-tight
          leading-tight
        "
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3
        className="
          mt-8
          mb-2
          scroll-mt-20
          font-sans
          text-foreground
          text-[1.05rem]
          font-semibold
          leading-tight
        "
      >
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4
        className="
          mt-6
          mb-2
          font-sans
          text-foreground
          text-[0.95rem]
          font-semibold
        "
      >
        {children}
      </h4>
    ),

    blockquote: ({ children }) => (
      <blockquote
        className="
          my-6
          pl-5
          border-l-2
          border-border
          font-mono
          text-[0.9rem]
          text-muted-foreground
          italic
        "
      >
        {children}
      </blockquote>
    ),
  },

  // Lists
  list: {
    bullet: ({ children }) => (
      <ul
        className="
          mb-5
          pl-5
          space-y-1
          font-mono
          text-[0.9rem]
          leading-[1.9]
          text-muted-foreground
          list-disc
        "
      >
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol
        className="
          mb-5
          pl-5
          space-y-1
          font-mono
          text-[0.9rem]
          leading-[1.9]
          text-muted-foreground
          list-decimal
        "
      >
        {children}
      </ol>
    ),
  },

  // Inline marks
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic">
        {children}
      </em>
    ),

    code: ({ children }) => (
      <code
        className="
          font-mono
          text-[0.82em]
          bg-muted
          border
          border-border
          px-[0.4em]
          py-[0.15em]
          rounded
          text-foreground
        "
      >
        {children}
      </code>
    ),

    link: ({ value, children }) => (
  <a
    href={value?.href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      text-foreground
      underline
      underline-offset-[3px]
      decoration-muted-foreground
      transition-colors
      hover:decoration-foreground
    "
  >
    {children}
  </a>
),
  },
};