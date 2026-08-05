import { NextResponse } from "next/server";

import { getRequestCount } from "@/lib/request-counter";

export async function GET() {
  return NextResponse.json(
    {
      count: getRequestCount(),
      message: "Request count retrieved successfully",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}