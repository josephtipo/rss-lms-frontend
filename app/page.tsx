"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Rss,
} from "lucide-react";

import StatCard from "@/components/StatCard";

type MetricsSummary = {
  totalRequests: number;
  totalFeeds: number;
  uniqueClients: number;
  successfulRequests: number;
  errorRequests: number;
  successRate: number;
};

type FeedMetric = {
  feedId: number | null;
  title: string;
  category: string | null;
  requests: number;
};

type ClientMetric = {
  clientId: string;
  requests: number;
};

type RecentRequest = {
  id: number;
  clientId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  feedId: number | null;
  createdAt: string;
  feed: {
    id: number;
    title: string;
  } | null;
};

type MetricsResponse = {
  success: boolean;
  data?: {
    summary: MetricsSummary;
    requestsPerFeed: FeedMetric[];
    requestsPerClient: ClientMetric[];
    recentRequests: RecentRequest[];
  };
  error?: {
    message: string;
  };
  timestamp?: string;
};

export default function Home() {
  const [metrics, setMetrics] =
    useState<MetricsResponse["data"]>(undefined);

  const [serverStatus, setServerStatus] = useState("Checking");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setErrorMessage("");

      const [metricsResponse, healthResponse] = await Promise.all([
        fetch("/api/metrics", {
          cache: "no-store",
        }),
        fetch("/api/health", {
          cache: "no-store",
        }),
      ]);

      const metricsResult: MetricsResponse =
        await metricsResponse.json();

      if (
        !metricsResponse.ok ||
        !metricsResult.success ||
        !metricsResult.data
      ) {
        throw new Error(
          metricsResult.error?.message ??
            "Unable to retrieve operational metrics"
        );
      }

      setMetrics(metricsResult.data);

      setServerStatus(
        healthResponse.ok ? "Online" : "Offline"
      );

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      setServerStatus("Offline");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected dashboard error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    const refreshInterval = window.setInterval(
      loadDashboard,
      10000
    );

    return () => {
      window.clearInterval(refreshInterval);
    };
  }, [loadDashboard]);

  const summary = metrics?.summary;

  const hasAlerts =
    !summary ||
    serverStatus === "Offline" ||
    summary.errorRequests > 0 ||
    summary.totalFeeds === 0 ||
    summary.successRate < 95;

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-4">
              <Rss className="h-12 w-12" />

              <div>
                <p className="text-sm uppercase tracking-widest text-blue-100">
                  Cloud-Based Web Application
                </p>

                <h1 className="text-4xl font-bold">
                  RSS Operations Dashboard
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-lg text-blue-100">
              Live operational monitoring for RSS feeds,
              client activity, request telemetry and server
              health.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-medium text-blue-700 shadow transition hover:bg-blue-50"
          >
            <RefreshCw className="h-5 w-5" />
            Refresh
          </button>
        </div>

        {lastUpdated && (
          <p className="mt-4 text-sm text-blue-100">
            Last updated: {lastUpdated}
          </p>
        )}
      </section>

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          Loading operational metrics...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          <AlertTriangle className="mt-1 h-5 w-5 shrink-0" />

          <div>
            <h2 className="font-semibold">
              Dashboard Error
            </h2>

            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {!isLoading && metrics && summary && (
        <>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Operational Summary
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Requests"
                value={summary.totalRequests.toString()}
              />

              <StatCard
                title="RSS Feeds"
                value={summary.totalFeeds.toString()}
              />

              <StatCard
                title="Unique Clients"
                value={summary.uniqueClients.toString()}
              />

              <StatCard
                title="Success Rate"
                value={`${summary.successRate}%`}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              System Health
            </h2>

            {!hasAlerts ? (
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-6 text-green-800 shadow-sm dark:border-green-900 dark:bg-green-950 dark:text-green-300">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0" />

                <div>
                  <h3 className="text-lg font-semibold">
                    All systems operational
                  </h3>

                  <p>
                    The RSS server is online and no request
                    errors are currently recorded.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {serverStatus === "Offline" && (
                  <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    RSS server health check is failing.
                  </div>
                )}

                {summary.totalFeeds === 0 && (
                  <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    No RSS feeds are currently stored.
                  </div>
                )}

                {summary.errorRequests > 0 && (
                  <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    {summary.errorRequests} failed request
                    {summary.errorRequests === 1 ? "" : "s"}{" "}
                    recorded.
                  </div>
                )}

                {summary.successRate < 95 && (
                  <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    Request success rate has fallen below the
                    95% operational threshold.
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Rss className="h-5 w-5" />
                Requests per Feed
              </h2>

              {metrics.requestsPerFeed.length === 0 ? (
                <p className="text-slate-600 dark:text-slate-300">
                  No feed-specific requests have been recorded.
                </p>
              ) : (
                <div className="space-y-4">
                  {metrics.requestsPerFeed.map((feed) => (
                    <div
                      key={`${feed.feedId}-${feed.title}`}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 dark:border-slate-700"
                    >
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {feed.title}
                        </p>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {feed.category ?? "Uncategorised"}
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {feed.requests}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Activity className="h-5 w-5" />
                Requests per Client
              </h2>

              {metrics.requestsPerClient.length === 0 ? (
                <p className="text-slate-600 dark:text-slate-300">
                  No client requests have been recorded.
                </p>
              ) : (
                <div className="space-y-4">
                  {metrics.requestsPerClient.map((client) => (
                    <div
                      key={client.clientId}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 dark:border-slate-700"
                    >
                      <span className="font-medium text-slate-900 dark:text-white">
                        {client.clientId}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                        {client.requests}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
              Recent Request Activity
            </h2>

            {metrics.recentRequests.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-300">
                No requests have been recorded.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-sm uppercase text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      <th className="px-3 py-3">
                        Client
                      </th>
                      <th className="px-3 py-3">
                        Method
                      </th>
                      <th className="px-3 py-3">
                        Endpoint
                      </th>
                      <th className="px-3 py-3">
                        Status
                      </th>
                      <th className="px-3 py-3">
                        Time
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {metrics.recentRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-slate-100 last:border-0 dark:border-slate-700"
                      >
                        <td className="px-3 py-3 text-slate-700 dark:text-slate-200">
                          {request.clientId}
                        </td>

                        <td className="px-3 py-3 font-medium text-slate-700 dark:text-slate-200">
                          {request.method}
                        </td>

                        <td className="px-3 py-3 text-slate-700 dark:text-slate-200">
                          {request.endpoint}
                        </td>

                        <td className="px-3 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold ${
                              request.statusCode >= 400
                                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                                : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            }`}
                          >
                            {request.statusCode}
                          </span>
                        </td>

                        <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
                          {new Date(
                            request.createdAt
                          ).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}