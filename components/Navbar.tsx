import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
// import { Search } from "lucide-react";
import NavbarSearch from './NavbarSearch';
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