"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-4xl font-bold">
          Settings
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300">
          Configure application preferences and view the current dashboard
          configuration. Interactive settings such as theme selection are
          available below.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-semibold">
          Dashboard Configuration
        </h2>

        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <span className="font-medium">Theme</span>

            <button
              onClick={toggleTheme}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {theme === "light"
                ? "🌞 Light Mode"
                : "🌙 Dark Mode"}
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <span className="font-medium">Notifications</span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <span className="font-medium">RSS Refresh Interval</span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              Every 15 minutes
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <span className="font-medium">Application Version</span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              v1.0.0
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Backend Status</span>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
              Assessment 2
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-2xl font-semibold">
          Planned Enhancements
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          <li>Live RSS feed management</li>
          <li>User authentication</li>
          <li>Cloud database integration</li>
          <li>Dashboard layout customisation</li>
          <li>Additional accessibility options</li>
        </ul>
      </section>
    </div>
  );
}