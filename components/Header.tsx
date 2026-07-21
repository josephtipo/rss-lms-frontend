import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-3">
        <Link href="/" className="hover:text-blue-400">
          Home
        </Link>

        <Link href="/feeds" className="hover:text-blue-400">
          Feeds
        </Link>

        <Link href="/about" className="hover:text-blue-400">
          About
        </Link>

        <Link href="/settings" className="hover:text-blue-400">
          Settings
        </Link>
      </div>
    </nav>
  );
}