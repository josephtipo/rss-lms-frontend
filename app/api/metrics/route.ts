import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalRequests,
      totalFeeds,
      errorRequests,
      requestsByClient,
      requestsByFeed,
      feeds,
      recentRequests,
    ] = await Promise.all([
      prisma.requestLog.count(),

      prisma.feed.count(),

      prisma.requestLog.count({
        where: {
          statusCode: {
            gte: 400,
          },
        },
      }),

      prisma.requestLog.groupBy({
        by: ["clientId"],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: "desc",
          },
        },
      }),

      prisma.requestLog.groupBy({
        by: ["feedId"],
        where: {
          feedId: {
            not: null,
          },
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: "desc",
          },
        },
      }),

      prisma.feed.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          status: true,
        },
      }),

      prisma.requestLog.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          feed: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      }),
    ]);

    const feedLookup = new Map(
      feeds.map((feed) => [feed.id, feed])
    );

    const requestsPerFeed = requestsByFeed.map((item) => {
      const feed =
        item.feedId === null
          ? undefined
          : feedLookup.get(item.feedId);

      return {
        feedId: item.feedId,
        title: feed?.title ?? "Unknown or deleted feed",
        category: feed?.category ?? null,
        status: feed?.status ?? null,
        requests: item._count.id,
      };
    });

    const requestsPerClient = requestsByClient.map((item) => ({
      clientId: item.clientId,
      requests: item._count.id,
    }));

    const feedStatusSummary = {
      active: feeds.filter(
        (feed) => feed.status === "ACTIVE"
      ).length,
      warning: feeds.filter(
        (feed) => feed.status === "WARNING"
      ).length,
      error: feeds.filter(
        (feed) => feed.status === "ERROR"
      ).length,
      unknown: feeds.filter(
        (feed) =>
          !["ACTIVE", "WARNING", "ERROR"].includes(feed.status)
      ).length,
    };

    const uniqueClients = requestsByClient.length;
    const successfulRequests = totalRequests - errorRequests;

    const successRate =
      totalRequests === 0
        ? 100
        : Number(
            (
              (successfulRequests / totalRequests) *
              100
            ).toFixed(1)
          );

    return NextResponse.json(
      {
        success: true,
        data: {
          summary: {
            totalRequests,
            totalFeeds,
            uniqueClients,
            successfulRequests,
            errorRequests,
            successRate,
          },
          feedStatusSummary,
          requestsPerFeed,
          requestsPerClient,
          recentRequests,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Failed to retrieve operational metrics:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to retrieve operational metrics",
        },
      },
      { status: 500 }
    );
  }
}