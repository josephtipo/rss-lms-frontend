import { prisma } from "@/lib/prisma";

type RecordRequestOptions = {
  request: Request;
  statusCode: number;
  feedId?: number | null;
};

function getClientId(request: Request): string {
  const explicitClientId = request.headers.get("x-client-id");

  if (explicitClientId) {
    return explicitClientId;
  }

  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp;
  }

  return "anonymous-client";
}

export async function recordRequest({
  request,
  statusCode,
  feedId = null,
}: RecordRequestOptions): Promise<void> {
  try {
    const url = new URL(request.url);

    await prisma.requestLog.create({
      data: {
        clientId: getClientId(request),
        endpoint: url.pathname,
        method: request.method,
        statusCode,
        feedId,
      },
    });
  } catch (error) {
    console.error("Failed to record request telemetry:", error);
  }
}
