import { Rss } from "lucide-react";
import FeedCard from "@/components/FeedCard";
import StatCard from "@/components/StatCard";
import { feeds } from "@/data/feeds";

export default function Home() {
  return (
    <>
      {/* Welcome Section */}
      <section className="mb-10">
        <h1 className="mb-4 flex items-center gap-3 text-5xl font-bold">
          <Rss className="h-10 w-10 text-blue-600" />
          Welcome
        </h1>

        <p className="text-xl text-gray-600">
          Welcome to the RSS Server Dashboard. This application
          demonstrates the frontend interface for managing RSS feeds
          that will integrate with the Learning Management System
          (LMS) in Assessment 2.
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
        <h2 className="mb-6 text-3xl font-bold">
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