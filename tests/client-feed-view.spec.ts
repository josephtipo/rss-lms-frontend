import { expect, test } from "@playwright/test";

test("RSS client retrieves and displays a feed from the backend", async ({
  page,
  request,
}) => {
  const uniqueId = Date.now();
  const feedTitle = `Playwright Client Feed ${uniqueId}`;
  const feedDescription =
    "This feed verifies that the RSS client retrieves and displays backend data.";
  const authorName = "Playwright Client Author";

  let feedId: number | null = null;

  page.on("request", (req) => {
    console.log(">>", req.method(), req.url());
  });

  page.on("response", (res) => {
    console.log("<<", res.status(), res.url());
  });

  page.on("requestfailed", (req) => {
    console.log(
      "XX REQUEST FAILED",
      req.method(),
      req.url(),
      req.failure()
    );
  });

  page.on("console", (message) => {
    console.log("BROWSER:", message.type(), message.text());
  });

  page.on("pageerror", (error) => {
    console.log("PAGE ERROR:", error.message);
  });

  try {
    const createResponse = await request.post("/api/feeds", {
      headers: {
        "X-Client-ID": "playwright-client-test",
      },
      data: {
        title: feedTitle,
        description: feedDescription,
        content:
          "Temporary content used for the Playwright client E2E test.",
        link: `https://example.com/client-feed-${uniqueId}`,
        category: "Client Testing",
        author: {
          name: authorName,
          email: `playwright-client-${uniqueId}@example.com`,
        },
      },
    });

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();

    expect(createBody.success).toBe(true);

    feedId = createBody.data.id;

    console.log("Created feed ID:", feedId);

    await page.goto("/feeds");

    await expect(
      page.getByText(feedTitle, { exact: true })
    ).toBeVisible({
      timeout: 15000,
    });
  } finally {
    // Do not allow cleanup failure to hide the real test error.
    if (feedId !== null) {
      try {
        await request.delete(`/api/feeds/${feedId}`, {
          headers: {
            "X-Client-ID": "playwright-client-test-cleanup",
          },
        });
      } catch {
        console.log(
          `Cleanup skipped for feed ${feedId} because test context closed`
        );
      }
    }
  }
});