const assert = require("node:assert/strict");
const { execFileSync, spawnSync } = require("node:child_process");
const { mkdirSync, mkdtempSync, rmSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");

const cwd = mkdtempSync(path.join(tmpdir(), "eagle-color-lint-"));
const gate = path.resolve(
  __dirname,
  "../../tools/color-lint/check-changed-colors.cjs",
);
const git = (...args) =>
  execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
const write = (file, source) =>
  writeFileSync(path.join(cwd, file), source + "\n");
const commit = (message) => {
  git("add", ".");
  git("commit", "-m", message);
  return git("rev-parse", "HEAD");
};
const check = (base) =>
  spawnSync(process.execPath, [gate, base], { cwd, encoding: "utf8" });

try {
  git("init", "-q");
  git("config", "user.name", "Eagle Color lint");
  git("config", "user.email", "color-lint@example.invalid");
  mkdirSync(path.join(cwd, "src"));
  const styles = [
    ".historical { color: #00122e; }",
    ".design-pending { border-color: #123456; }",
    ".multiline {",
    "  color:",
    "    #0080ff;",
    "}",
  ];
  write("src/styles.scss", styles.join("\n"));
  write("src/old.scss", ".old { color: #00122e; }");
  const base = commit("Historical colors");

  git("mv", "src/old.scss", "src/旧 样式.scss");
  write(
    "src/styles.scss",
    [
      ...styles,
      ".runtime { color: var(--text-neutral-primary); }",
      ".different-alpha { color: rgba(0, 21, 64, .3); }",
      ".different-rgb { color: rgb(0 127.9 255); }",
      ".still-pending { color: #123456; }",
      ".identifiers { animation-name: white; background: url(#0080ff); }",
      "$text-light-primary: var(--text-neutral-primary);",
      ".runtime-alias { color: $text-light-primary; }",
    ].join("\n"),
  );
  write(
    "src/runtime.tsx",
    "export const Runtime = <div style={{ color: Color.text.neutral.primary }} />;",
  );
  commit("Unrelated edits and runtime references");
  const allowed = check(base);
  assert.equal(allowed.status, 0, allowed.stderr);

  styles[3] = "  background-color:";
  write(
    "src/styles.scss",
    [
      ...styles,
      ".copy { color: #00122e; }",
      ".alias { --label-color: #{$text_light_primary}; }",
      ".alpha { color: rgba($text-neutral-quaternary, .3019607843137255); }",
      ".named { color: white; }",
      ".interpolation { --button-color: #{rgb(0 128 255)}; }",
      ".mixin { @include Autofill($white); }",
      ".srgb { color: color(srgb 1 1 1 / 100%); }",
    ].join("\n"),
  );
  write("src/script.ts", "export const colors = { color: 'rgb(0 128 255)' };");
  write(
    "src/[preview].scss",
    "/* stylelint-disable */\n.preview { color: #00122e; }",
  );
  write(
    "src/view.tsx",
    [
      "import { css } from '@linaria/core';",
      "export const Style = css`",
      "  background: linear-gradient(#0080ff, var(--fill-neutral-white));",
      "`;",
      "export const View = <svg><path fill='#00122e' /></svg>;",
    ].join("\n"),
  );
  commit("New fixed colors with equivalents");
  const blocked = check(base);
  assert.equal(blocked.status, 1, blocked.stderr);
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:4: #0080ff .*--fill-outstanding-base/,
  );
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:7: #00122e .*--text-neutral-primary/,
  );
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:8: \$text_light_primary .*--text-neutral-primary/,
  );
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:9: rgba\(.*--text-neutral-quaternary/,
  );
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:10: white .*--fill-neutral-white/,
  );
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:11: rgb\(0 128 255\) .*--fill-outstanding-base/,
  );
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:12: \$white .*--fill-neutral-white/,
  );
  assert.match(
    blocked.stderr,
    /src\/styles\.scss:13: color\(srgb 1 1 1 \/ 100%\) .*--fill-neutral-white/,
  );
  assert.match(
    blocked.stderr,
    /src\/script\.ts:1: rgb\(0 128 255\) .*--fill-outstanding-base/,
  );
  assert.match(
    blocked.stderr,
    /src\/\[preview\]\.scss:2: #00122e .*--text-neutral-primary/,
  );
  assert.match(
    blocked.stderr,
    /src\/view\.tsx:3: #0080ff .*--fill-outstanding-base/,
  );
  assert.match(
    blocked.stderr,
    /src\/view\.tsx:5: #00122e .*--text-neutral-primary/,
  );
  assert.doesNotMatch(blocked.stderr, /styles\.scss:[12]:|旧 样式\.scss/);
  console.log("Changed color lint checks passed.");
} finally {
  rmSync(cwd, { recursive: true, force: true });
}
