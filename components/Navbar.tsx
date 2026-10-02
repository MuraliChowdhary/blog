import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { Search } from "lucide-react";
import NavbarSearch from "./NavbarSearch";
import { SanityPost } from "@/lib/sanity/types";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

type Props = {
  posts: SanityPost[];
};

export default function Navbar({posts}:Props) {
  return (
    <header className="w-full border-b border-border">
      <nav
        className="
          mx-auto
          flex
          max-w-5xl
          items-center
          justify-between
          px-6
          py-4
        "
      >
        {/* Left — Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Sudireddy home"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border bg-muted">
            <Image
              src="/icons/logo.png"
              alt="Sudireddy"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
        </Link>

        {/* Center — Navigation */}
        {/* <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                rounded-md
                px-3
                py-2
                text-sm
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              {link.label}
            </Link>
          ))}
        </div> */}

        {/* Right — Search + Theme */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <NavbarSearch posts={posts} />
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}