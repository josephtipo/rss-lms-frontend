import { expect, test } from "@playwright/test";

test("RSS server supports complete feed CRUD lifecycle", async ({
  request,
}) => {
  const uniqueId = Date.now();
  const originalTitle = `Playwright Test Feed ${uniqueId}`;
  const updatedTitle = `Updated Playwright Feed ${uniqueId}`;

  let feedId: number | null = null;

  try {
    // CREATE
    const createResponse = await request.post("/api/feeds", {
      headers: {
        "X-Client-ID": "playwright-server-test",
      },
      data: {
        title: originalTitle,
        description: "Feed created by the Playwright server CRUD test",
        content:
          "This temporary RSS feed verifies the server-side CRUD workflow.",
        link: `https://example.com/playwright-feed-${uniqueId}`,
        category: "Testing",
        author: {
          name: "Playwright Test Author",
          email: `playwright-${uniqueId}@example.com`,
        },
      },
    });

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();

    expect(createBody.success).toBe(true);
    expect(createBody.data.title).toBe(originalTitle);

    feedId = createBody.data.id;

    expect(feedId).toBeGreaterThan(0);

    // READ
    const getResponse = await request.get(`/api/feeds/${feedId}`, {
      headers: {
        "X-Client-ID": "playwright-server-test",
      },
    });

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    expect(getBody.success).toBe(true);
    expect(getBody.data.id).toBe(feedId);
    expect(getBody.data.title).toBe(originalTitle);
    expect(getBody.data.category).toBe("Testing");

    // UPDATE
    const updateResponse = await request.put(`/api/feeds/${feedId}`, {
      headers: {
        "X-Client-ID": "playwright-server-test",
      },
      data: {
        title: updatedTitle,
        description:
          "Feed updated by the Playwright server CRUD test",
        content:
          "This content confirms that the PUT endpoint updated the feed.",
        link: `https://example.com/playwright-feed-${uniqueId}-updated`,
        category: "Automated Testing",
      },
    });

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody.success).toBe(true);
    expect(updateBody.data.title).toBe(updatedTitle);
    expect(updateBody.data.category).toBe("Automated Testing");

    // VERIFY UPDATE
    const verifyResponse = await request.get(`/api/feeds/${feedId}`, {
      headers: {
        "X-Client-ID": "playwright-server-test",
      },
    });

    expect(verifyResponse.status()).toBe(200);

    const verifyBody = await verifyResponse.json();

    expect(verifyBody.data.title).toBe(updatedTitle);
    expect(verifyBody.data.description).toBe(
      "Feed updated by the Playwright server CRUD test"
    );

    // DELETE
    const deleteResponse = await request.delete(
      `/api/feeds/${feedId}`,
      {
        headers: {
          "X-Client-ID": "playwright-server-test",
        },
      }
    );

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();

    expect(deleteBody.success).toBe(true);

    // VERIFY DELETE
    const deletedFeedResponse = await request.get(
      `/api/feeds/${feedId}`,
      {
        headers: {
          "X-Client-ID": "playwright-server-test",
        },
      }
    );

    expect(deletedFeedResponse.status()).toBe(404);

    feedId = null;
  } finally {
    // Cleanup if the test fails before reaching DELETE.
    if (feedId !== null) {
      await request.delete(`/api/feeds/${feedId}`, {
        headers: {
          "X-Client-ID": "playwright-server-test-cleanup",
        },
      });
    }
  }
});