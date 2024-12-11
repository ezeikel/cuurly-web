import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.screenshot({
    path: "tests/screenshots/screenshot.png",
    fullPage: true,
  });

  const title = await page.title();
  expect(title).toBe(
    "Cuurly - A community for all things black and mixed textured hair.",
  );
});
