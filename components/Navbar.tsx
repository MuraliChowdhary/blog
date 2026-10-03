import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
// import { Search } from "lucide-react";
// import NavbarSearch from "./NavbarSearch";
import { SanityPost } from "@/lib/sanity/types";

// const links = [
//   { href: "/", label: "Home" },
//   { href: "/", label: "Blog" },
//   { href: "/about", label: "About" },
// ];

type Props = {
  posts: SanityPost[];
};

export default function Navbar({posts}:Props) {
  return (
    <header
  className="
    w-full
    border-b
    border-border
    bg-background
  "
>
  <nav
    className="
      mx-auto
      flex
      h-[72px]
      max-w-6xl
      items-center
      justify-between
      px-6
      sm:px-8
    "
  >
    {/* Logo */}
    <Link
      href="/"
      className="
        inline-flex
        items-center
        transition-opacity
        hover:opacity-75
      "
    >
      <div
        className="
          h-9
          w-9
          overflow-hidden
          rounded-full
          border
          border-border
          bg-muted
        "
      >
        <Image
          src="/icons/logo.png"
          alt="Sudireddy"
          width={36}
          height={36}
          priority
          className="h-full w-full object-cover"
        />
      </div>
    </Link>

    {/* Right controls */}
    <div className="flex items-center gap-3">
      {/* Search */}
      <Link
        href="/"
        className="
          hidden
          h-11
          w-[290px]
          items-center
          gap-3
          rounded-full
          border
          border-border
          px-4
          text-sm
          text-muted-foreground
          transition-colors
          hover:border-foreground/20
          hover:text-foreground
          sm:flex
        "
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>

        <span>Search posts...</span>
      </Link>

      <ThemeToggle />
    </div>
  </nav>
</header>
  );
}