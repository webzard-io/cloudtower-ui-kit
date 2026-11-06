const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const path = require("node:path");

async function run() {
  const stylelint = (await import("stylelint")).default;
  // --ignore-scripts leaves an npm shim which exits successfully without scanning.
  const version = execFileSync("ast-grep", ["--version"], { encoding: "utf8" });
  assert.match(version, /^ast-grep \d+\.\d+\.\d+\s*$/);
  const configFile = path.resolve(__dirname, "../../stylelint.config.cjs");
  const lint = (code, extension) =>
    stylelint.lint({
      code,
      codeFilename: `src/color-fixture.${extension}`,
      configFile,
    });
  for (const value of [
    "#fff",
    "red",
    "rgba(1,2,3,.8)",
    "hsl(0 100% 50%)",
    "oklch(50% .2 20)",
    "color(display-p3 1 0 0)",
  ]) {
    const result = await lint(`.fixture { color: ${value}; }`, "scss");
    assert.ok(
      result.results[0].warnings.length > 0,
      `Missing warning: ${value}`,
    );
    assert.ok(
      result.results[0].warnings.every((item) => item.severity === "warning"),
    );
  }
  const valid = await lint(
    ".fixture { color: $text-light-primary; background: var(--fill); border-color: currentColor; }",
    "scss",
  );
  assert.equal(valid.results[0].warnings.length, 0);
  const linaria = await lint(
    "const S = css`\n// Sass\n$prefix: button;\n&.#{$prefix} { color: #123456; background: ${Color.fill}; }\n`;",
    "tsx",
  );
  assert.ok(
    linaria.results[0].warnings.some((item) => item.rule === "color-no-hex"),
  );
  const broken = await lint('const S = css`color: "unterminated`;', "tsx");
  assert.ok(broken.errored, "Syntax errors must remain errors");
  console.log(`Color lint checks passed (${version.trim()})`);
}
run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
