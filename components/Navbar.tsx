import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="w-full py-6 px-6">
      <nav className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Left — name/logo */}
        <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
            <div className="mb-4">
                      <div className="w-8 h-8 rounded-full bg-muted border border-border overflow-hidden">
                        {/* Replace src with your actual photo */}
                        <Image
                          src="/icons/logo.png"
                          alt="Sudireddy"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          priority
                        />
                      </div>
                    </div>

            </Link>

        {/* Center — nav links pill */}
        {/* <div className="flex items-center gap-1 border border-border rounded-full px-3 py-1.5 bg-card">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground rounded-full transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div> */}

        {/* Right — theme toggle */}
        <ThemeToggle />
      </nav>
    </header>
  );
}