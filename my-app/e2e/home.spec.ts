import { expect, test } from "@playwright/test"

test.describe("Home Page", () => {
  test("should display the home page in English by default", async ({
    page
  }) => {
    await page.goto("/")
    await expect(page).toHaveURL(/\/en$/)
    await expect(
      page.getByRole("heading", {
        name: "To get started, edit the page.tsx file."
      })
    ).toBeVisible()
  })

  test("should display the Next.js logo", async ({ page }) => {
    await page.goto("/en")
    await expect(page.getByAltText("Next.js logo")).toBeVisible()
  })

  test("should have Deploy Now and Documentation links", async ({ page }) => {
    await page.goto("/en")
    await expect(page.getByRole("link", { name: /deploy now/i })).toBeVisible()
    await expect(
      page.getByRole("link", { name: /documentation/i })
    ).toBeVisible()
  })
})

test.describe("Language Switching", () => {
  test("should switch to Japanese", async ({ page }) => {
    await page.goto("/en")

    const languageSelect = page.locator("select")
    await languageSelect.selectOption("ja")

    await expect(page).toHaveURL(/\/ja$/)
    await expect(
      page.getByRole("heading", {
        name: "page.tsxファイルを編集して始めましょう。"
      })
    ).toBeVisible()
  })

  test("should switch to Arabic with RTL direction", async ({ page }) => {
    await page.goto("/en")

    const languageSelect = page.locator("select")
    await languageSelect.selectOption("ar")

    await expect(page).toHaveURL(/\/ar$/)
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  })

  test("should preserve language when navigating directly", async ({
    page
  }) => {
    await page.goto("/ja")
    await expect(page.locator("html")).toHaveAttribute("lang", "ja")
  })
})

test.describe("Accessibility", () => {
  test("should have proper HTML lang attribute", async ({ page }) => {
    await page.goto("/en")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")

    await page.goto("/ja")
    await expect(page.locator("html")).toHaveAttribute("lang", "ja")

    await page.goto("/ar")
    await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  })

  test("should have accessible language selector", async ({ page }) => {
    await page.goto("/en")
    const select = page.locator("select")
    await expect(select).toBeVisible()
    await expect(select).toBeEnabled()
  })
})

test.describe("Responsive Design", () => {
  test("should display correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/en")
    await expect(page.getByAltText("Next.js logo")).toBeVisible()
  })

  test("should display correctly on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto("/en")
    await expect(page.getByAltText("Next.js logo")).toBeVisible()
  })
})
