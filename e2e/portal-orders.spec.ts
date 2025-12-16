import { test, expect } from "@playwright/test";

test.describe("Portal Orders", () => {
  test("should navigate to portal orders page", async ({ page }) => {
    await page.goto("/portal/orders");
    await expect(page).toHaveURL("/portal/orders");
    await expect(page.locator("text=新潟中央青果")).toBeVisible();
    await expect(page.getByRole("button", { name: "新規発注" })).toBeVisible();
  });

  test("should navigate to new order page from portal", async ({ page }) => {
    await page.goto("/portal/orders");
    await page.getByRole("button", { name: "新規発注" }).click();
    await expect(page).toHaveURL("/portal/orders/new");
    await expect(page.locator("text=配達希望日")).toBeVisible();
    await expect(page.locator("text=商品を選択")).toBeVisible();
  });

  test("should navigate to order history page from portal", async ({ page }) => {
    await page.goto("/portal/orders");
    await page.getByRole("link", { name: "発注履歴" }).click();
    await expect(page).toHaveURL("/portal/orders/history");
    await expect(page.getByRole("heading", { name: "発注履歴" })).toBeVisible();
  });

  test("should return to portal from new order page", async ({ page }) => {
    await page.goto("/portal/orders/new");
    await page.click("text=発注トップに戻る");
    await expect(page).toHaveURL("/portal/orders");
  });

  test("should return to portal from history page", async ({ page }) => {
    await page.goto("/portal/orders/history");
    await page.click("text=発注トップに戻る");
    await expect(page).toHaveURL("/portal/orders");
  });

  test("should add products to order", async ({ page }) => {
    await page.goto("/portal/orders/new");

    // Add 10 豆苗
    const plusButton = page.locator("button").filter({ has: page.locator("svg.lucide-plus") }).first();
    await plusButton.click();

    // Check quantity is updated
    await expect(page.locator("input[type='number']").first()).toHaveValue("10");

    // Check total is shown
    await expect(page.locator("text=合計")).toBeVisible();
  });
});

test.describe("Dashboard Pages", () => {
  test("should load dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "ダッシュボード" })).toBeVisible();
  });

  test("should load seeding page", async ({ page }) => {
    await page.goto("/seeding");
    await expect(page.getByRole("heading", { name: "朝の仕込み指示" })).toBeVisible();
  });

  test("should load inventory page", async ({ page }) => {
    await page.goto("/inventory");
    await expect(page.getByRole("heading", { name: "在庫管理" })).toBeVisible();
  });

  test("should load settings page", async ({ page }) => {
    await page.goto("/settings");
    await expect(page.getByRole("heading", { name: "設定", exact: true })).toBeVisible();
  });
});
