const { test, expect } = require("@playwright/test");

const { properties, snapshotColors } = require("./snapshot-colors.cjs");

async function snapshot(page, name, fullStory = false, targets = {}) {
  const nodes = await Promise.all(
    Object.entries(targets).map(async ([component, selector]) => {
      const target = page
        .locator(selector)
        .and(page.locator(":visible"))
        .first();
      await expect(
        target,
        component + " should render " + selector
      ).toBeVisible({ timeout: 5000 });
      return [component, await target.elementHandle()];
    })
  );
  await page.evaluate(() => document.fonts.ready);
  const { result, missed } = await page.evaluate(
    ({ properties, fullStory, nodes }) => {
      const output = {};
      const collected = new Set();
      const ids = new Map(
        [...document.querySelectorAll("svg [id]")].map((element, index) => [
          element.id,
          "svg-definition-" + index,
        ])
      );
      function value(style, property) {
        return style[property].replace(
          /url\(["']?(?:[^#)]*)#([^"')]+)["']?\)/g,
          (original, id) =>
            ids.has(id) ? "url(#" + ids.get(id) + ")" : original
        );
      }
      const roots = [
        ...document.querySelectorAll(
          document.querySelector("[data-style-root]")
            ? "[data-style-id]"
            : "#storybook-root"
        ),
        ...(fullStory
          ? [...document.body.children].filter(
              (element) =>
                element.tagName === "DIV" &&
                !element.id.startsWith("storybook-") &&
                element.firstElementChild &&
                !element.className.startsWith("sb-")
            )
          : document.querySelectorAll(
              ".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
            )),
      ];
      for (const [index, root] of roots.entries()) {
        const rootName =
          root.getAttribute("data-style-id") || "portal-" + index;
        function visit(element, path) {
          const style = getComputedStyle(element);
          if (
            style.display === "none" ||
            ["script", "style"].includes(element.localName)
          )
            return;
          collected.add(element);
          output[path] = Object.fromEntries(
            properties.map((property) => [property, value(style, property)])
          );
          for (const pseudo of ["::before", "::after"]) {
            const computed = getComputedStyle(element, pseudo);
            if (computed.content !== "none" && computed.content !== "normal") {
              output[path + pseudo] = Object.fromEntries(
                properties.map((property) => [
                  property,
                  value(computed, property),
                ])
              );
            }
          }
          [...element.children].forEach((child, childIndex) =>
            visit(child, path + "/" + child.localName + "[" + childIndex + "]")
          );
        }
        if (!fullStory || root.children.length) visit(root, rootName);
      }
      return {
        result: output,
        missed: nodes
          .filter(([, element]) => !collected.has(element))
          .map(([component]) => component),
      };
    },
    { properties, fullStory, nodes }
  );
  expect(missed, "Component nodes must be included in the snapshot").toEqual(
    []
  );
  expect(Object.keys(result).length).toBeGreaterThan(0);
  expect(snapshotColors(result)).toMatchSnapshot(name + ".json");
}

async function openBaseline(page) {
  await page.clock.setFixedTime(new Date("2026-01-15T04:00:00Z"));
  await page.goto(
    "/iframe.html?id=regression-computedstyle--baseline&viewMode=story&globals=locale:zh-CN"
  );
  await expect(page.locator("[data-style-root]")).toBeVisible();
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  );
  // Ant Form animates validation feedback after its first render.
  await expect(page.locator(".ant-form-item-explain")).toHaveCSS(
    "opacity",
    "1"
  );
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
  });
}

test("default, disabled, error and selected styles", async ({ page }) => {
  await openBaseline(page);
  await snapshot(page, "default");
});

for (const variant of [
  "primary",
  "secondary",
  "tertiary",
  "ordinary",
  "quiet",
]) {
  for (const state of ["hover", "focus", "active"]) {
    test(variant + " " + state + " button", async ({ page }) => {
      await openBaseline(page);
      const button = page
        .locator('[data-style-id="' + variant + '"] button')
        .first();
      if (state === "focus") await button.focus();
      else await button.hover();
      if (state === "active") await page.mouse.down();
      await snapshot(page, variant + "-" + state);
      if (state === "active") await page.mouse.up();
    });
  }
}

test("body popup", async ({ page }) => {
  await openBaseline(page);
  // rc-motion needs its animationend event to clear the entering opacity.
  await page.evaluate(() => {
    for (const style of document.querySelectorAll("style")) {
      if (style.textContent.includes("caret-color:transparent!important"))
        style.remove();
    }
  });
  await page.locator('[data-style-id="select"] .ant-select-selector').click();
  await expect(page.locator(".ant-select-dropdown")).toBeVisible();
  expect(
    await page
      .locator(".ant-select-dropdown")
      .evaluate((element) => element.closest("[data-style-root]"))
  ).toBeNull();
  await expect(page.locator(".ant-select-dropdown")).toHaveCSS("opacity", "1");
  await snapshot(page, "popup");
});

const stories = [
  "core-accordioncard--function-header",
  "core-card--hoverable",
  "core-inputinteger-整数输入--middle-size",
  "core-radiobutton--basic",
  "core-steps--horizontal",
  "core-tab-标签页--basic",
  "core-statuscapsule-状态胶囊--basic",
  "core-select-选择器--multiple",
  "core-localupload-本地文件上传--field-error-upload",
  "core-localupload-本地文件上传--single-file-validating",
  "core-table-表格组件--basic",
  "core-table-表格组件--loading",
  "corex-inforowlist-信息列表--basic",
  "corex-gobackbutton--basic",
  "corex-barchart--demo",
  "corex-daterangepicker--with-range",
];

const scenarios = require("./component-scenarios.cjs");
const originalStories = new Set(stories);

for (const story of new Set([...stories, ...Object.keys(scenarios)])) {
  const {
    name,
    prepare,
    targets,
    viewport,
    empty = {},
  } = scenarios[story] ?? {};
  const original = originalStories.has(story);
  test(original ? story : "component: " + name, async ({ page }) => {
    if (viewport) await page.setViewportSize(viewport);
    await page.clock.setFixedTime(new Date("2026-01-15T04:00:00Z"));
    await page.goto(
      "/iframe.html?id=" +
        encodeURIComponent(story) +
        "&viewMode=story&globals=locale:zh-CN"
    );
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    await prepare?.(page);
    for (const [component, selector] of Object.entries(empty)) {
      const target = page.locator(selector);
      await expect(target, component + " should render no DOM").toBeEmpty();
    }
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
    });
    await snapshot(
      page,
      original ? story : "component-" + name,
      !original,
      targets
    );
  });
}

test("every public component has a baseline scenario", () => {
  const publicComponents = require("./public-components.cjs");
  const covered = Object.values(scenarios).flatMap(({ targets, empty }) => [
    ...Object.keys(targets),
    ...Object.keys(empty ?? {}),
  ]);
  expect(covered.sort()).toEqual(publicComponents());
});
