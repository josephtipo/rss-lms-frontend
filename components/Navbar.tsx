import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-slate-100 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-3">
        <Link
          href="/"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
        >
          Home
        </Link>

        <Link
          href="/feeds"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
        >
          Feeds
        </Link>

        <Link
          href="/about"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
        >
          About
        </Link>

        <Link
          href="/settings"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
        >
          Settings
        </Link>
      </div>
    </nav>
  );
}