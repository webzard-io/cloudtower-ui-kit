const { test, expect } = require("@playwright/test");

const properties = [
  "color",
  "backgroundColor",
  "backgroundImage",
  "backgroundClip",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "borderTopStyle",
  "borderRightStyle",
  "borderBottomStyle",
  "borderLeftStyle",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRadius",
  "boxShadow",
  "textShadow",
  "opacity",
  "filter",
  "outlineColor",
  "outlineStyle",
  "outlineWidth",
  "outlineOffset",
  "fill",
  "fillOpacity",
  "stopColor",
  "stopOpacity",
  "stroke",
  "strokeOpacity",
  "strokeWidth",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "display",
  "visibility",
  "position",
  "padding",
  "margin",
  "boxSizing",
];

async function snapshot(page, name) {
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate((properties) => {
    const output = {};
    const ids = new Map(
      [...document.querySelectorAll("svg [id]")].map((element, index) => [
        element.id,
        "svg-definition-" + index,
      ])
    );
    function value(style, property) {
      return style[property].replace(
        /url\(["']?(?:[^#)]*)#([^"')]+)["']?\)/g,
        (original, id) => (ids.has(id) ? "url(#" + ids.get(id) + ")" : original)
      );
    }
    const roots = [
      ...document.querySelectorAll(
        document.querySelector("[data-style-root]")
          ? "[data-style-id]"
          : "#storybook-root"
      ),
      ...document.querySelectorAll(
        ".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
      ),
    ];
    for (const [index, root] of roots.entries()) {
      const rootName = root.getAttribute("data-style-id") || "portal-" + index;
      function visit(element, path) {
        const style = getComputedStyle(element);
        if (
          style.display === "none" ||
          ["script", "style"].includes(element.localName)
        )
          return;
        output[path] = Object.fromEntries(
          properties.map((property) => [property, value(style, property)])
        );
        for (const pseudo of ["::before", "::after"]) {
          const computed = getComputedStyle(element, pseudo);
          if (computed.content !== "none" && computed.content !== "normal") {
            output[path + pseudo] = Object.fromEntries(
              ["content", ...properties].map((property) => [
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
      visit(root, rootName);
    }
    return output;
  }, properties);
  expect(Object.keys(result).length).toBeGreaterThan(0);
  const styles = new Map();
  for (const [element, style] of Object.entries(result)) {
    const key = JSON.stringify(style);
    if (!styles.has(key)) styles.set(key, { elements: [], style });
    styles.get(key).elements.push(element);
  }
  expect(JSON.stringify([...styles.values()], null, 2)).toMatchSnapshot(
    name + ".json"
  );
}

test.beforeEach(async ({ page }) => {
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
});

test("default, disabled, error and selected styles", async ({ page }) => {
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

for (const story of stories) {
  test(story, async ({ page }) => {
    await page.goto(
      "/iframe.html?id=" +
        encodeURIComponent(story) +
        "&viewMode=story&globals=locale:zh-CN"
    );
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
    });
    await snapshot(page, story);
  });
}
