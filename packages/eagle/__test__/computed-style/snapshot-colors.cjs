const colorProperties = [
  "color",
  "backgroundColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "outlineColor",
  "opacity",
  "fill",
  "fillOpacity",
  "stopColor",
  "stopOpacity",
  "stroke",
  "strokeOpacity",
];

const colorSources = {
  backgroundImage: "gradientColors",
  boxShadow: "boxShadowColors",
  textShadow: "textShadowColors",
  filter: "filterColors",
};

const properties = [...colorProperties, ...Object.keys(colorSources)];

function snapshotColors(elements) {
  const groups = new Map();
  for (const element of Object.keys(elements).sort()) {
    const computed = elements[element];
    const style = Object.fromEntries(
      colorProperties.map((property) => [property, computed[property]])
    );
    for (const [source, property] of Object.entries(colorSources)) {
      const colors = computed[source].match(
        /\b(?:rgba?|hsla?|hwb|(?:ok)?lab|(?:ok)?lch|color)\([^()]*\)/g
      );
      if (colors) style[property] = colors;
    }
    const filterOpacity = computed.filter.match(/\bopacity\([^()]*\)/g);
    if (filterOpacity) style.filterOpacity = filterOpacity;

    const key = JSON.stringify(style);
    if (!groups.has(key)) groups.set(key, { elements: [], style });
    groups.get(key).elements.push(element);
  }
  return JSON.stringify([...groups.values()], null, 2);
}

module.exports = { properties, snapshotColors };
