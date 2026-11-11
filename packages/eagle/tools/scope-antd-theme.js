const postcss = require("postcss");

// :where keeps the original Ant specificity so Eagle component overrides still win.
function scopeTheme(css, name, names = ["light"]) {
  if (name === "light" && names.every((value) => value === "light")) return css;
  const root = postcss.parse(css);
  const scope =
    name === "light"
      ? `:where(:root${names
          .filter((value) => value !== "light")
          .map((value) => `:not([data-theme="${value}"])`)
          .join("")})`
      : `:where(:root[data-theme="${name}"])`;
  root.walkRules((rule) => {
    if (rule.parent.type === "atrule" && /keyframes$/.test(rule.parent.name))
      return;
    rule.selectors = rule.selectors.map((selector) => {
      if (/^(html|:root)(?=[\s.:#[]|$)/.test(selector))
        return selector.replace(/^(html|:root)/, scope);
      return `${scope} ${selector}`;
    });
  });
  return root.toString();
}
module.exports = { scopeTheme };
