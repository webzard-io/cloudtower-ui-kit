// Linaria's stock syntax parses templates as CSS; Eagle templates also contain Sass.
const babel = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const postcss = require("postcss");
const scss = require("postcss-scss");
const { createPlaceholder } = require("@linaria/postcss-linaria/lib/util");

exports.parse = (input, options) => {
  const source = String(input);
  const ast = babel.parse(source, {
    sourceType: "unambiguous",
    plugins: ["typescript", "jsx"],
    ranges: true,
  });
  const document = new postcss.Document();
  traverse(ast, {
    TaggedTemplateExpression({ node }) {
      const tag = node.tag;
      if (
        !(tag.type === "Identifier" && tag.name === "css") &&
        !(tag.type === "MemberExpression" && tag.object.name === "styled") &&
        !(tag.type === "CallExpression" && tag.callee.name === "styled")
      )
        return;
      let text = "";
      node.quasi.quasis.forEach((part, i) => {
        text += part.value.raw;
        const next = node.quasi.quasis[i + 1];
        if (next) {
          const expression = source.slice(part.range[1], next.range[0]);
          text += createPlaceholder(i, source, next.range[0]);
          text += "\n".repeat((expression.match(/\n/g) || []).length);
        }
      });
      const root = scss.parse(text, options);
      const lineOffset = node.quasi.loc.start.line - 1;
      root.walk((child) => {
        for (const location of [child.source?.start, child.source?.end]) {
          if (location) location.line += lineOffset;
        }
      });
      document.append(root);
    },
  });
  document.source = {
    input: new postcss.Input(source, options),
    start: { line: 1, column: 1, offset: 0 },
  };
  return document;
};
// Color lint only reports; preserve the original TypeScript verbatim.
exports.stringify = (node, builder) => builder(node.source.input.css);
