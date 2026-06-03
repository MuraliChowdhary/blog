import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-xs font-mono text-muted-foreground mb-4 tracking-widest uppercase">
        404
      </p>
      <h1 className="text-xl font-serif font-normal tracking-tight mb-3">
        Page not found
      </h1>
      <p className="text-sm font-mono text-muted-foreground mb-8">
        This page does not exist or was moved.
      </p>
      <Link
        href="/"
        className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Go home
      </Link>
    </div>
  );
}