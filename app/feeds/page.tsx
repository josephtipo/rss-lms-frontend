"use client";

import { useEffect, useState } from "react";

import FeedCard from "@/components/FeedCard";

type ApiFeed = {
  id: number;
  title: string;
  description: string;
  link: string;
  category: string | null;
  publishedAt: string;
  author: {
    name: string;
  };
};

type FeedsResponse = {
  success: boolean;
  data?: ApiFeed[];
  error?: {
    message: string;
  };
};

type CountResponse = {
  count: number;
  message: string;
  timestamp: string;
};

export default function FeedsPage() {
  const [feeds, setFeeds] = useState<ApiFeed[]>([]);
  const [requestCount, setRequestCount] = useState(0);
  const [serverStatus, setServerStatus] = useState("Checking");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadFeeds() {
      try {
        const feedsResponse = await fetch("/api/feeds", {
          cache: "no-store",
        });

        const feedsResult: FeedsResponse = await feedsResponse.json();

        if (!feedsResponse.ok || !feedsResult.success || !feedsResult.data) {
          throw new Error(
            feedsResult.error?.message ?? "Unable to retrieve RSS feeds"
          );
        }

        setFeeds(feedsResult.data);

        const healthResponse = await fetch("/api/health", {
          cache: "no-store",
        });

        if (healthResponse.ok) {
          setServerStatus("Online");
        } else {
          setServerStatus("Offline");
        }

        const countResponse = await fetch("/api/count", {
          cache: "no-store",
        });

        if (countResponse.ok) {
          const countResult: CountResponse = await countResponse.json();
          setRequestCount(countResult.count);
        }
      } catch (error) {
        setServerStatus("Offline");

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadFeeds();
  }, []);

  const categoryCount = new Set(
    feeds
      .map((feed) => feed.category)
      .filter((category): category is string => Boolean(category))
  ).size;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white">
          RSS Client
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300">
          Live RSS feed content retrieved from the backend API and SQLite
          database.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            {categoryCount}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
            API Requests
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            {requestCount}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Server Status
          </p>

          <h2
            className={`mt-2 text-4xl font-bold ${
              serverStatus === "Online"
                ? "text-green-600 dark:text-green-400"
                : serverStatus === "Offline"
                  ? "text-red-600 dark:text-red-400"
                  : "text-amber-600 dark:text-amber-400"
            }`}
          >
            {serverStatus}
          </h2>
        </div>
      </section>

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Loading RSS feeds...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && feeds.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          No RSS feeds are currently available.
        </div>
      )}

      {!isLoading && !errorMessage && feeds.length > 0 && (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feeds.map((feed) => (
            <FeedCard
              key={feed.id}
              title={feed.title}
              category={feed.category}
              summary={feed.description}
              author={feed.author.name}
              publishedAt={feed.publishedAt}
              link={feed.link}
            />
          ))}
        </section>
      )}
    </div>
  );
}