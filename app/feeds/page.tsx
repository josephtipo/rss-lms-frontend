"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

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

type CreateFeedResponse = {
  success: boolean;
  data?: ApiFeed;
  error?: {
    message: string;
  };
};

export default function FeedsPage() {
  const [feeds, setFeeds] = useState<ApiFeed[]>([]);
  const [requestCount, setRequestCount] = useState(0);
  const [serverStatus, setServerStatus] = useState("Checking");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  const loadFeeds = useCallback(async () => {
    try {
      setErrorMessage("");

      const feedsResponse = await fetch("/api/feeds", {
        cache: "no-store",
      });

      const feedsResult: FeedsResponse =
        await feedsResponse.json();

      if (
        !feedsResponse.ok ||
        !feedsResult.success ||
        !feedsResult.data
      ) {
        throw new Error(
          feedsResult.error?.message ??
            "Unable to retrieve RSS feeds"
        );
      }

      setFeeds(feedsResult.data);

      const healthResponse = await fetch("/api/health", {
        cache: "no-store",
      });

      setServerStatus(
        healthResponse.ok ? "Online" : "Offline"
      );

      const countResponse = await fetch("/api/count", {
        cache: "no-store",
      });

      if (countResponse.ok) {
        const countResult: CountResponse =
          await countResponse.json();

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
  }, []);

  useEffect(() => {
    loadFeeds();
  }, [loadFeeds]);

  async function handleCreateFeed(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setCreateError("");
    setCreateSuccess("");
    setIsCreating(true);

    try {
      const response = await fetch("/api/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          link,
          category: category || null,
          author: {
            name: authorName,
            email: authorEmail,
          },
        }),
      });

      const result: CreateFeedResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message ?? "Unable to create RSS feed"
        );
      }

      setCreateSuccess(
        `Feed "${title}" was created successfully.`
      );

      setTitle("");
      setDescription("");
      setLink("");
      setCategory("");
      setAuthorName("");
      setAuthorEmail("");

      await loadFeeds();
    } catch (error) {
      setCreateError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating the feed"
      );
    } finally {
      setIsCreating(false);
    }
  }

  const categoryCount = new Set(
    feeds
      .map((feed) => feed.category)
      .filter(
        (category): category is string =>
          Boolean(category)
      )
  ).size;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white">
          RSS Client
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300">
          Create and retrieve RSS feed content through the
          backend API and SQLite database.
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

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create RSS Feed
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Create a feed through the RSS Server API. The new
            feed will appear in the client immediately after it
            is stored in the database.
          </p>
        </div>

        <form
          onSubmit={handleCreateFeed}
          className="grid gap-5 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
            >
              Category
            </label>

            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
            >
              Description
            </label>

            <textarea
              id="description"
              required
              rows={3}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="link"
              className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
            >
              Feed Link
            </label>

            <input
              id="link"
              type="url"
              required
              placeholder="https://example.com/feed"
              value={link}
              onChange={(event) =>
                setLink(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="authorName"
              className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
            >
              Author Name
            </label>

            <input
              id="authorName"
              type="text"
              required
              value={authorName}
              onChange={(event) =>
                setAuthorName(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="authorEmail"
              className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
            >
              Author Email
            </label>

            <input
              id="authorEmail"
              type="email"
              required
              value={authorEmail}
              onChange={(event) =>
                setAuthorEmail(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {createError && (
            <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {createError}
            </div>
          )}

          {createSuccess && (
            <div className="md:col-span-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
              {createSuccess}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isCreating}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreating
                ? "Creating Feed..."
                : "Create Feed"}
            </button>
          </div>
        </form>
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

      {!isLoading &&
        !errorMessage &&
        feeds.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            No RSS feeds are currently available.
          </div>
        )}

      {!isLoading &&
        !errorMessage &&
        feeds.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Available Feeds
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            </div>
          </section>
        )}
    </div>
  );
}