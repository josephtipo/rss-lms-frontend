import { NextResponse } from "next/server";

let requestCount = 0;

export async function GET() {
  requestCount += 1;

  return NextResponse.json(
    {
      count: requestCount,
      message: "Request count retrieved successfully",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}