import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const feeds = await prisma.feed.findMany({
      include: {
        author: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: feeds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to retrieve feeds:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to retrieve feeds",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.link ||
      !body.author?.name ||
      !body.author?.email
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "title, description, link and author details are required",
          },
        },
        { status: 400 }
      );
    }

    const feed = await prisma.feed.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content ?? null,
        link: body.link,
        imageUrl: body.imageUrl ?? null,
        category: body.category ?? null,
        publishedAt: body.publishedAt
          ? new Date(body.publishedAt)
          : new Date(),
        author: {
          connectOrCreate: {
            where: {
              email: body.author.email,
            },
            create: {
              name: body.author.name,
              email: body.author.email,
            },
          },
        },
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: feed,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create feed:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to create feed",
        },
      },
      { status: 500 }
    );
  }
}