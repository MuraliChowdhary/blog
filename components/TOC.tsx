"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

function extractHeadings(): Heading[] {
  const elements = document.querySelectorAll("article h2, article h3");

  return Array.from(elements).map((el) => ({
    id: el.id,
    text: el.textContent ?? "",
    level: parseInt(el.tagName[1]),
  }));
}

export default function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");


   useEffect(() => {
    const timer = window.setTimeout(() => {
      setHeadings(extractHeadings());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="my-8 rounded-lg border border-border bg-muted/20">
      {/* Header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          {/* List icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>

          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Table of Contents
          </span>
        </div>

        {/* Chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* TOC items */}
      {open && (
        <div className="border-t border-border px-5 py-3">
          <ul className="space-y-0">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`
                    block py-2 text-sm font-mono transition-colors
                    ${heading.level === 3 ? "pl-4" : ""}
                    ${
                      active === heading.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}