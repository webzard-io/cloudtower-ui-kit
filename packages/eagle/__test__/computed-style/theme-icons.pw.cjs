const { expect, test } = require("@playwright/test");

const light = "rgba(44, 56, 82, 0.6)";
const dark = "rgb(168, 184, 205)";
const story = "/iframe.html?id=core-themeicons-主题图标--";

const channels = (cssColor) => cssColor.match(/[\d.]+/g).map(Number);

function contrastRatio(fill, background) {
  const [r, g, b, alpha = 1] = channels(fill);
  const backdrop = channels(background);
  const composite = [r, g, b].map((value, i) => value * alpha + backdrop[i] * (1 - alpha));
  const luminance = (rgb) => rgb.reduce((sum, channel, index) => {
    const value = channel / 255;
    const linear = value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    return sum + linear * [0.2126, 0.7152, 0.0722][index];
  }, 0);
  const levels = [luminance(composite), luminance(backdrop)];
  return (Math.max(...levels) + 0.05) / (Math.min(...levels) + 0.05);
}

test("inherited icon paints match their original fallback in light mode", async ({ page }) => {
  await page.goto(story + "palette&viewMode=story");
  const row = page.getByText("caret-triangle-down-16", { exact: true });
  await expect(row).toBeVisible();
  const carets = page.getByTestId("CaretTriangleDown16Icon").locator("path");
  await expect(carets.nth(0)).toHaveCSS("fill", light);
  await expect(carets.nth(1)).toHaveCSS("fill", light);
  await expect(carets.nth(2)).toHaveCSS("fill", dark);

  const mismatches = await page.locator("#storybook-root code").evaluateAll((labels) =>
    labels.flatMap((label) => {
      const fallback = label.nextElementSibling;
      const light = fallback.nextElementSibling;
      const dark = light.nextElementSibling;
      const paints = (column) => Array.from(
        column.querySelectorAll('[fill^="var("], [stroke^="var("]'),
        (node) => {
          const style = getComputedStyle(node);
          return [style.fill, style.fillOpacity, style.stroke, style.strokeOpacity];
        },
      );
      const original = paints(fallback);
      const originalPaints = JSON.stringify(original);
      return original.length &&
        originalPaints === JSON.stringify(paints(light)) &&
        originalPaints !== JSON.stringify(paints(dark))
        ? []
        : [label.textContent];
    }),
  );
  expect(mismatches).toEqual([]);
});

test("local theme and root theme updates reach component icons and body portals", async ({ page }) => {
  await page.goto(story + "components&viewMode=story");
  const sample = page.getByTestId("theme-icon-components");
  const caret = page.getByTestId("theme-icon-local").locator("path");
  const root = page.locator("html");
  const localTheme = page.getByRole("button", { name: "切换图标主题" });
  const pageTheme = page.getByRole("button", { name: "切换页面主题" });
  const close = page.getByTestId("theme-icon-alert").locator(".ant-alert-close-icon");
  const paginationArrow = page.getByTestId("theme-icon-pagination-dropdown").locator("path");
  const breadcrumb = page.getByTestId("theme-icon-breadcrumb").locator("path");

  await expect(caret).toHaveCSS("fill", light);
  await localTheme.click();
  await expect(root).toHaveAttribute("data-theme", "light");
  await expect(caret).toHaveCSS("fill", dark);
  await localTheme.click();
  await expect(caret).toHaveCSS("fill", light);

  await expect(close.locator("path")).toHaveCSS("fill", light);
  await expect(paginationArrow).toHaveCSS("fill", light);
  await pageTheme.click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect(caret).toHaveCSS("fill", dark);
  await expect(close.locator("path")).toHaveCSS("fill", dark);
  await expect(paginationArrow).toHaveCSS("fill", dark);
  const surface = await sample.evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(contrastRatio(dark, surface)).toBeGreaterThanOrEqual(3);
  await close.hover();
  await expect(close.locator("path")).toHaveCSS("fill", "rgb(211, 222, 235)");
  expect(contrastRatio("rgb(211, 222, 235)", surface)).toBeGreaterThanOrEqual(3);
  await expect(breadcrumb).toHaveCount(2);
  for (const separator of await breadcrumb.all()) {
    await expect(separator).toHaveCSS("fill", "rgb(3, 30, 79)");
    await expect(separator).toHaveCSS("fill-opacity", "0.18");
  }

  await page.getByRole("button", { name: "查看提示" }).hover();
  const tooltip = page.getByTestId("theme-icon-tooltip");
  await expect(tooltip).toBeVisible();
  await expect(tooltip.locator("path")).toHaveCSS("fill", dark);
  expect(await sample.getByTestId("theme-icon-tooltip").count()).toBe(0);
  expect(contrastRatio(dark, await tooltip.evaluate((node) => getComputedStyle(node).backgroundColor)))
    .toBeGreaterThanOrEqual(3);

  await page.getByRole("button", { name: "打开弹窗" }).click();
  const modal = page.getByTestId("theme-icon-modal");
  await expect(modal).toBeVisible();
  await expect(modal.locator("path")).toHaveCSS("fill", dark);
  expect(await sample.getByTestId("theme-icon-modal").count()).toBe(0);
  expect(contrastRatio(dark, await modal.evaluate((node) => getComputedStyle(node).backgroundColor)))
    .toBeGreaterThanOrEqual(3);

  await pageTheme.evaluate((button) => button.click());
  await expect(root).toHaveAttribute("data-theme", "light");
  await expect(modal.locator("path")).toHaveCSS("fill", light);
  await expect(caret).toHaveCSS("fill", light);
});

test("ExpandableList preserves arrow opacity under its hover fill override", async ({ page }) => {
  await page.goto("/iframe.html?id=core-expandable-list-可展开收起列表--template&viewMode=story");
  const arrow = page.getByTestId("ArrowChevronDown16SecondaryIcon").first();
  const path = arrow.locator("path");
  await expect(path).toHaveCSS("fill", light);
  await arrow.hover();
  await expect(path).toHaveCSS("fill", "rgb(0, 0, 255)");
  await expect(path).toHaveCSS("fill-opacity", "0.6");
});
