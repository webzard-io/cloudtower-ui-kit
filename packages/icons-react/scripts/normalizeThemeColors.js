const { createRequire } = require("module");

const requireFromIcons = createRequire(require.resolve("../../icons/package.json"));
const svg2js = requireFromIcons("svgo/lib/svgo/svg2js");
const js2svg = requireFromIcons("svgo/lib/svgo/js2svg");

const brand = /^(os-|kafka-|elasticsearch-|sso-|smartx-logo$)/i;
const protectedElements = new Set(["defs", "mask", "clipPath", "filter"]);
const containers = new Set(["#document", "svg", "g", "a"]);
const shapes = new Set([
  "path", "circle", "ellipse", "line", "polyline", "polygon", "rect", "text", "tspan",
]);
const legacyGray = new Set(["Setting", "close", "cluster-gray", "down"]);

const rules = {
  "#00122e/1": { level: "primary", fallback: "#00122E" },
  "#06101f/1": {
    level: "primary",
    fallback: "#06101F",
    alias: "--icon-neutral-legacy-primary",
  },
  "#1d326c/1": { level: "super", fallback: "#1D326C" },
  "#2c3852/0.75": { level: "secondary", fallback: "rgba(44, 56, 82, 0.75)" },
  "#2c3852/0.6": { level: "tertiary", fallback: "rgba(44, 56, 82, 0.6)" },
  "#3e4652/0.6": {
    level: "tertiary",
    fallback: "rgba(62, 70, 82, 0.6)",
    alias: "--icon-neutral-legacy-tertiary",
  },
  "#001540/0.3": { level: "quaternary", fallback: "rgba(0, 21, 64, 0.3)" },
  // Phase 2 待设计确认浅色是否允许从 18% 加深至 30%。
  "#031e4f/0.18": {
    level: "quaternary",
    fallback: "rgba(3, 30, 79, 0.18)",
    enabled: false,
  },
};
const hexAlphaRules = {
  "#2c3852bf": "#2c3852/0.75",
  "#2c385299": "#2c3852/0.6",
  "#0015404d": "#001540/0.3",
  "#031e4f2e": "#031e4f/0.18",
};

function paintRule(name, color, opacity) {
  const hexAlphaRule = opacity === 1 && hexAlphaRules[color];
  const rule = rules[hexAlphaRule || `${color}/${opacity}`];
  if (!rule || rule.enabled === false || (color === "#3e4652" && !legacyGray.has(name))) {
    return;
  }
  const { level, fallback, alias } = rule;
  const token = `--text-neutral-${level}`;
  return {
    token,
    group: alias || token,
    value: `var(${alias || token}, ${hexAlphaRule ? color.toUpperCase() : fallback})`,
  };
}

function isDarkNeutral(color) {
  if (color === "black") return true;
  if (!/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(color)) return false;
  const hex = color.length === 4
    ? color.slice(1).replace(/./g, (digit) => digit.repeat(2))
    : color.slice(1, 7);
  const channels = hex.match(/../g).map((channel) => parseInt(channel, 16) / 255);
  const min = Math.min(...channels);
  const max = Math.max(...channels);
  const lightness = (min + max) / 2;
  const saturation = lightness === 0 ? 0 : (max - min) / (2 * lightness);
  return lightness < 0.35 && saturation < 0.65;
}

function normalizeThemeColors(svg, file) {
  const name = file.replace(/\.svg$/, "");
  if (brand.test(name)) return { svg };

  let root;
  svg2js(svg, (result) => {
    root = result;
  });
  if (root.error) throw new Error(`${file}: ${root.error}`);

  const paints = [];
  const protectedAncestors = new Set();
  let unsupported = false;

  function visit(node, inherited = {}, ancestors = [], groupOpacity = false) {
    const { elem, attrs = {}, content = [] } = node;
    if (!elem) return;
    if (protectedElements.has(elem)) {
      // 功能性子树也会继承祖先的绘制属性。
      ancestors.forEach((ancestor) => protectedAncestors.add(ancestor));
      return;
    }
    if (elem === "title" || elem === "desc" || elem === "metadata") return;
    if (attrs.style || attrs.class || (!containers.has(elem) && !shapes.has(elem))) {
      unsupported = true;
    }

    const paint = { ...inherited };
    const hasGroupOpacity = groupOpacity || (attrs.opacity && Number(attrs.opacity.value) !== 1);
    for (const attribute of ["fill", "stroke"]) {
      const opacityAttribute = `${attribute}-opacity`;
      if (attrs[attribute]) paint[attribute] = node;
      if (attrs[opacityAttribute]) paint[opacityAttribute] = node;

      if ((!shapes.has(elem) && elem !== "use") || (elem === "line" && attribute === "fill")) {
        continue;
      }
      const owner = paint[attribute];
      const opacityOwner = paint[opacityAttribute];
      const color = owner?.attrs[attribute].value.trim().toLowerCase() ||
        (attribute === "fill" ? "black" : "none");
      if (color === "none") continue;
      const opacity = Number(opacityOwner?.attrs[opacityAttribute].value ?? 1);
      paints.push({
        owner,
        opacityOwner,
        attribute,
        opacityAttribute,
        color,
        opacity,
        layered: hasGroupOpacity && (opacity !== 1 || color.length === 9),
        rule: paintRule(name, color, opacity),
      });
    }

    for (const child of content) {
      visit(child, paint, [...ancestors, node], hasGroupOpacity);
    }
  }

  visit(root);
  const first = paints[0];
  const safe = first?.rule && !unsupported && paints.every((paint) =>
    paint.rule?.group === first.rule.group &&
    !paint.layered &&
    (!paint.opacityOwner || paint.owner === paint.opacityOwner) &&
    !protectedAncestors.has(paint.owner),
  );

  if (!safe) {
    const reason = paints.some((paint) => paint.layered) ? "stacked-opacity"
      : unsupported ? "unsupported-paint"
      : paints.length && paints.some((paint) =>
        paint.color !== first.color || paint.opacity !== first.opacity)
        ? "mixed-paint"
        : "unmapped-paint";
    const warnings = new Map();
    for (const { attribute, color, opacity, rule } of paints) {
      const key = `${color}/${opacity}`;
      if (opacity > 0 && (rule || isDarkNeutral(color) || rules[key] || hexAlphaRules[color])) {
        warnings.set(`${attribute}/${key}`, { file, reason, attribute, color, opacity });
      }
    }
    return { svg, warnings: [...warnings.values()] };
  }

  for (const { owner, attribute, opacityAttribute, rule } of paints) {
    owner.attrs[attribute].value = rule.value;
    delete owner.attrs[opacityAttribute];
  }
  return { svg: js2svg(root).data, token: first.rule.token };
}

module.exports = { normalizeThemeColors };
