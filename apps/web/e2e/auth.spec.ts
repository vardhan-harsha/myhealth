import { test, expect } from "@playwright/test";

test.describe("Authentication pages", () => {
  test("login page loads and shows sign-in content", async ({ page }) => {
    await page.goto("/login");

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("signup page loads", async ({ page }) => {
    await page.goto("/signup");

    await expect(page).toHaveURL(/\/signup/);
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Public routes", () => {
  test("forgot-password page is accessible", async ({ page }) => {
    await page.goto("/forgot-password");

    await expect(page).toHaveURL(/\/forgot-password/);
    await expect(page.locator("body")).toBeVisible();
  });
});
