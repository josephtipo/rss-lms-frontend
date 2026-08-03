import { Rss } from "lucide-react";

import FeedCard from "@/components/FeedCard";
import StatCard from "@/components/StatCard";
import { feeds } from "@/data/feeds";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Rss className="h-12 w-12" />

          <div>
            <p className="text-sm uppercase tracking-widest text-blue-100">
              Cloud-Based Web Application
            </p>

            <h1 className="text-4xl font-bold">
              RSS Server Dashboard
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-lg text-blue-100">
          Monitor and manage RSS feeds for the Learning Management
          System. This frontend demonstrates a responsive dashboard
          that will connect to backend APIs in Assessment 2.
        </p>
      </section>

      {/* Dashboard Statistics */}
      <section className="mb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="RSS Feeds"
            value={feeds.length.toString()}
          />

          <StatCard
            title="Categories"
            value="3"
          />

          <StatCard
            title="Status"
            value="Online"
          />
        </div>
      </section>

      {/* Latest RSS Feeds */}
      <section>
        <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
          Latest RSS Feeds
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feeds.map((feed) => (
            <FeedCard
              key={feed.id}
              title={feed.title}
              category={feed.category}
              summary={feed.summary}
            />
          ))}
        </div>
      </section>
    </>
  );
}