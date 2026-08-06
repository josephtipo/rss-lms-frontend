type RequestCounterStore = {
  count: number;
};

const globalForRequestCounter = globalThis as unknown as {
  requestCounter: RequestCounterStore | undefined;
};

const requestCounter =
  globalForRequestCounter.requestCounter ?? {
    count: 0,
  };

if (process.env.NODE_ENV !== "production") {
  globalForRequestCounter.requestCounter = requestCounter;
}

export function incrementRequestCount() {
  requestCounter.count += 1;
  return requestCounter.count;
}

export function getRequestCount() {
  return requestCounter.count;
}