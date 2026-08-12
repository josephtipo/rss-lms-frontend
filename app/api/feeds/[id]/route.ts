import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { incrementRequestCount } from "@/lib/request-counter";
import { recordRequest } from "@/lib/request-logger";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  incrementRequestCount();

  try {
    const { id } = await context.params;
    const feedId = Number(id);

    if (!Number.isInteger(feedId) || feedId <= 0) {
      await recordRequest({
        request,
        statusCode: 400,
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid feed ID",
          },
        },
        { status: 400 }
      );
    }

    const feed = await prisma.feed.findUnique({
      where: {
        id: feedId,
      },
      include: {
        author: true,
      },
    });

    if (!feed) {
      await recordRequest({
        request,
        statusCode: 404,
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Feed not found",
          },
        },
        { status: 404 }
      );
    }

    await recordRequest({
      request,
      statusCode: 200,
      feedId,
    });

    return NextResponse.json(
      {
        success: true,
        data: feed,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to retrieve feed:", error);

    await recordRequest({
      request,
      statusCode: 500,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to retrieve feed",
        },
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  incrementRequestCount();

  try {
    const { id } = await context.params;
    const feedId = Number(id);

    if (!Number.isInteger(feedId) || feedId <= 0) {
      await recordRequest({
        request,
        statusCode: 400,
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid feed ID",
          },
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.title || !body.description || !body.link) {
      await recordRequest({
        request,
        statusCode: 400,
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "title, description and link are required",
          },
        },
        { status: 400 }
      );
    }

    const existingFeed = await prisma.feed.findUnique({
      where: {
        id: feedId,
      },
    });

    if (!existingFeed) {
      await recordRequest({
        request,
        statusCode: 404,
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Feed not found",
          },
        },
        { status: 404 }
      );
    }

    const updatedFeed = await prisma.feed.update({
      where: {
        id: feedId,
      },
      data: {
        title: body.title,
        description: body.description,
        content: body.content ?? null,
        link: body.link,
        imageUrl: body.imageUrl ?? null,
        category: body.category ?? null,
        publishedAt: body.publishedAt
          ? new Date(body.publishedAt)
          : existingFeed.publishedAt,
      },
      include: {
        author: true,
      },
    });

    await recordRequest({
      request,
      statusCode: 200,
      feedId,
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedFeed,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update feed:", error);

    await recordRequest({
      request,
      statusCode: 500,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to update feed",
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  incrementRequestCount();

  try {
    const { id } = await context.params;
    const feedId = Number(id);

    if (!Number.isInteger(feedId) || feedId <= 0) {
      await recordRequest({
        request,
        statusCode: 400,
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid feed ID",
          },
        },
        { status: 400 }
      );
    }

    const existingFeed = await prisma.feed.findUnique({
      where: {
        id: feedId,
      },
    });

    if (!existingFeed) {
      await recordRequest({
        request,
        statusCode: 404,
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Feed not found",
          },
        },
        { status: 404 }
      );
    }

    await prisma.feed.delete({
      where: {
        id: feedId,
      },
    });

    // Do not store feedId here because the feed has already been deleted.
    await recordRequest({
      request,
      statusCode: 200,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feed deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete feed:", error);

    await recordRequest({
      request,
      statusCode: 500,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to delete feed",
        },
      },
      { status: 500 }
    );
  }
}