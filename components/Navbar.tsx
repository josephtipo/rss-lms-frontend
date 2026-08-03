"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-slate-100 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-3">
        {/* Top navigation */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
          >
            ☰ Menu
          </button>

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

        {/* Dropdown menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            menuOpen ? "mt-3 max-h-64" : "max-h-0"
          }`}
        >
          <div className="rounded-md border border-slate-200 bg-white p-3 shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
              >
                Home
              </Link>

              <Link
                href="/feeds"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
              >
                Feeds
              </Link>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
              >
                About
              </Link>

              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}