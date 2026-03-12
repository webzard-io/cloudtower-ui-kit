/**
 * ESLint Rule Analysis Script
 *
 * Usage: node scripts/analyze-eslint-rules.cjs
 *
 * This script was used to extract the full calculated ESLint configuration
 * via eslint.calculateConfigForFile() before migrating to Biome.
 * It categorizes all rules by severity level (error/warn/off) and checks
 * for overrides in stories and test files.
 *
 * NOTE: This script requires the old ESLint dependencies (eslint, eslint-config-react-app,
 * eslint-plugin-simple-import-sort) to be installed. It is kept for reference only.
 */

const { ESLint } = require("eslint");

async function main() {
  const eslint = new ESLint();
  const targetFile = "packages/eagle/src/core/Alert/index.tsx";

  console.log(`\n=== Calculating ESLint config for: ${targetFile} ===\n`);
  const config = await eslint.calculateConfigForFile(targetFile);

  const rules = config.rules || {};
  const errorRules = {};
  const warnRules = {};
  const offRules = {};

  for (const [name, setting] of Object.entries(rules)) {
    const level = Array.isArray(setting) ? setting[0] : setting;
    const normalizedLevel =
      typeof level === "number"
        ? level
        : level === "error"
          ? 2
          : level === "warn"
            ? 1
            : 0;
    const options = Array.isArray(setting) ? setting.slice(1) : [];

    if (normalizedLevel === 2) {
      errorRules[name] = { level: "error", options };
    } else if (normalizedLevel === 1) {
      warnRules[name] = { level: "warn", options };
    } else {
      offRules[name] = { level: "off" };
    }
  }

  console.log("=== ERROR level rules ===");
  console.log(JSON.stringify(errorRules, null, 2));

  console.log("\n=== WARN level rules ===");
  console.log(JSON.stringify(warnRules, null, 2));

  console.log("\n=== OFF rules (count) ===");
  console.log(`${Object.keys(offRules).length} rules are turned off`);

  console.log("\n=== Parser & Settings ===");
  console.log("parser:", config.parser);
  console.log("parserOptions:", JSON.stringify(config.parserOptions, null, 2));
  console.log("env:", JSON.stringify(config.env, null, 2));

  // Check stories override
  const storiesFile =
    "packages/eagle/src/UIKitProvider/UIKitProvider.stories.tsx";
  console.log(`\n=== Overrides for stories: ${storiesFile} ===`);
  const storiesConfig = await eslint.calculateConfigForFile(storiesFile);
  const storiesRules = storiesConfig.rules || {};
  for (const [name, setting] of Object.entries(storiesRules)) {
    if (JSON.stringify(setting) !== JSON.stringify(rules[name])) {
      console.log(`  ${name}: ${JSON.stringify(setting)}`);
    }
  }

  // Check test file override
  const testFile = "packages/eagle/src/core/Card/__test__/Card.test.tsx";
  console.log(`\n=== Test-specific rules: ${testFile} ===`);
  const testConfig = await eslint.calculateConfigForFile(testFile);
  const testRules = testConfig.rules || {};
  for (const [name, setting] of Object.entries(testRules)) {
    if (JSON.stringify(setting) !== JSON.stringify(rules[name])) {
      console.log(`  ${name}: ${JSON.stringify(setting)}`);
    }
  }
}

main().catch(console.error);
