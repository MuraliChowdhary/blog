import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 mt-16">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sudireddy
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://x.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            X
          </Link>
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="/feed.xml"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}