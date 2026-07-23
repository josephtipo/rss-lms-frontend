import FeedCard from "@/components/FeedCard";
import { feeds } from "@/data/feeds";

export default function FeedsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-4xl font-bold text-slate-800">
          RSS Feeds
        </h1>

        <p className="text-lg text-slate-600">
          Browse the RSS feeds currently configured in the dashboard.
          Backend integration will be implemented in Assessment 2.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Total Feeds
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {feeds.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Categories
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            3
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Status
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
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