import FeedCard from "@/components/FeedCard";
import { feeds } from "@/data/feeds";

export default function FeedsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white">
          RSS Feeds
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300">
          Browse the RSS feeds currently configured in the dashboard.
          Backend integration will be implemented in Assessment 2.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Total Feeds
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            {feeds.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Categories
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            3
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Status
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600 dark:text-green-400">
            Online
          </h2>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {feeds.map((feed) => (
          <FeedCard
            key={feed.id}
            title={feed.title}
            category={feed.category}
            summary={feed.summary}
          />
        ))}
      </section>
    </div>
  );
}