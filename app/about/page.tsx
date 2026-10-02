import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer at Accenture. Building systems, thinking deeply.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      <div className="mb-10">
        <h1 className="text-xl font-serif font-normal tracking-tight mb-1">
          About
        </h1>
      </div>

      <div className="space-y-5 text-sm font-mono leading-relaxed text-foreground">
        <p>
          I am a software engineer at{" "}
          <span className="text-foreground font-semibold">Accenture</span>,
          working on backend systems, distributed infrastructure, and
          AI-integrated platforms. My current stack is Java, AWS, and Postgresql—
          with deep sidequests into RAG pipelines, FastAPI, and LLM tooling.
        </p>

        <p>
          I build things that are meant to scale. I care about systems thinking,
          first principles, and understanding why something works — not just
          that it works.
        </p>

        {/* <p>
          Outside engineering, I read the Bhagavad Gita, think about financial
          independence, and occasionally write about the intersection of
          discipline and craft.
        </p> */}

        <p>
          This blog is where I think out loud. Every post is something I
          genuinely worked through — a system I debugged, an architecture I
          questioned, a concept I finally understood after breaking it several
          times.
        </p>
      </div>

      {/* Currently section */}
      <div className="mt-12">
        <h2 className="text-xs font-mono font-semibold tracking-widest uppercase text-muted-foreground mb-4">
          Currently
        </h2>
        <ul className="space-y-2 text-sm font-mono text-muted-foreground">
          <li>→ Software Engineer at Accenture</li>
          <li>→ Building on Java, AWS, distributed systems</li>
          <li>→ Deep in AI / RAG / LLM engineering</li>
          <li>→ Writing publicly about what I learn</li>
        </ul>
      </div>

      {/* Links section */}
      <div className="mt-12">
        <h2 className="text-xs font-mono font-semibold tracking-widest uppercase text-muted-foreground mb-4">
          Find me
        </h2>
        <ul className="space-y-2 text-sm font-mono">
          <li>
            <Link
              href="https://x.com/MSudireddy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              X / Twitter →
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/MuraliChowdhary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub →
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/sudireddy-murali-05a10b277/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn →
            </Link>
          </li>
          <li>
            <Link
              href="mailto:muralisudireddy0@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Email →
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}