const { execFileSync } = require("node:child_process");

const git = (...args) =>
  execFileSync("git", ["--literal-pathspecs", ...args], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });

function changedRanges(base) {
  const files = new Map();
  const output = git(
    "diff",
    "--relative",
    "--name-status",
    "-z",
    "-M",
    "--diff-filter=ACMR",
    base,
    "HEAD",
    "--",
    "src",
  );
  const fields = output.split("\0");
  for (let i = 0; i < fields.length - 1; ) {
    const status = fields[i++];
    const original = fields[i++];
    const file = status.startsWith("R") ? fields[i++] : original;
    if (!/\.(?:css|scss|ts|tsx)$/.test(file)) continue;
    const patch = git(
      "diff",
      "--no-ext-diff",
      "--no-textconv",
      "--no-color",
      "--unified=0",
      "-M",
      base,
      "HEAD",
      "--",
      ...new Set([original, file]),
    );
    const ranges = [
      ...patch.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm),
    ]
      .map(([, start, count = "1"]) => [
        Number(start),
        Number(start) + Number(count) - 1,
      ])
      .filter(([start, end]) => end >= start);
    if (ranges.length > 0) files.set(file, ranges);
  }
  return files;
}

async function check(baseRef) {
  const commit = git(
    "rev-parse",
    "--verify",
    "--end-of-options",
    baseRef + "^{commit}",
  ).trim();
  const files = changedRanges(git("merge-base", commit, "HEAD").trim());
  const violations = new Set();
  if (files.size > 0) {
    const { scanEquivalentColors } = await import("./equivalent-colors.mjs");
    for (const { file, start, end, message } of await scanEquivalentColors([
      ...files.keys(),
    ])) {
      // shortcut: use changed lines; compare columns if same-line edits cause noise.
      if (
        files.get(file)?.some(([first, last]) => start <= last && end >= first)
      ) {
        violations.add(file + ":" + start + ": " + message);
      }
    }
  }

  if (violations.size > 0) {
    console.error([...violations].join("\n"));
    process.exitCode = 1;
  } else {
    console.log("No new fixed colors with equivalent Eagle tokens.");
  }
}

if (!process.argv[2]) {
  console.error("Usage: yarn lint:colors:changed <base-ref>");
  process.exitCode = 2;
} else {
  check(process.argv[2]).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
