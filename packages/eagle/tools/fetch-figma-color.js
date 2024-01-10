/*
 * This script fetches all color styles from a Figma document.
 *
 * Dependencies:
 *
 *  - node-fetch
 *
 *
 * For now, you need to input the page ID, as well as the file keys.
 * The page ID is visible in the JSON
 * payload when you call /files 🤷‍♂️
 */
// Inspect the /files JSON response, or the URL of the Figma page:
// https://www.figma.com/file/<file key>/Some-Name?node-id=<encoded page ID, like '183%3A0 = 183:0'>

require("dotenv").config();

// Get this from the URL of a single file:
// https://www.figma.com/file/<file key>/Some-Name?node-id=182%3A0
const COLOR_FILE_KEY = "2Jv3JpCgxI4g0t08Tzyvcb";
const PAGE_ID = "1311:171"; // GUIDE LINE

const fetch = require("node-fetch");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const { get, set } = require("lodash");

const writeFile = promisify(fs.writeFile);

const personalToken = process.env.FIGMA_TOKEN;

if (!personalToken) {
  console.error("Please pass FIGMA_PERSONAL_TOKEN to this script and re-run");
  process.exit(1);
}

const figmaBase = "https://api.figma.com/";

const doFetch = (url) =>
  fetch(`${figmaBase}v1${url}`, {
    headers: {
      "X-Figma-Token": personalToken,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log(`${figmaBase}v1${url}`);
        throw new Error(`Status: ${res.status}`);
      }

      return res.json();
    })
    .then((json) => {
      if (json.error || (json.status && json.status !== 200)) {
        throw new Error(json.error || `Status ${json.status}: ${json.err}`);
      }

      return json;
    });

const fetchFile = async (key) => await doFetch(`/files/${key}`);

const fetchAllColorStyles = async () => {
  const file = await fetchFile(COLOR_FILE_KEY);

  const GuideLine = file.document.children.find((page) => page.id === PAGE_ID);

  const colorList = {};

  const runCanvas = (ca) => {
    ca.forEach((c) => {
      if (c.type === "INSTANCE") {
        const cardFrame = get(c, ["children", 0], {});
        const tokenFrame = get(c, ["children", 0, "children", 0], "");
        const colorFrame = get(c, ["children", 0, "children", 1], {});
        const hexValue = get(colorFrame, ["children", 0, "characters"]);
        const tokenValue = get(tokenFrame, [
          "children",
          0,
          "children",
          0,
          "characters",
        ]);
        if (
          cardFrame.type === "FRAME" &&
          cardFrame.name === "Card" &&
          colorFrame.name === "color-frame" &&
          colorFrame.type === "FRAME" &&
          tokenFrame.type === "FRAME" &&
          tokenFrame.name === "token-preview" &&
          hexValue
        ) {
          const name = tokenValue
            .toLowerCase()
            .replace(" (trans-2 hover)", "")
            .replace(" (trans-2 active)", "")
            .split("/");
          set(colorList, name, hexValue);
        }
      }
      if (c.children !== undefined && Array.isArray(c.children)) {
        runCanvas(c.children);
      }
    });
  };
  runCanvas(GuideLine.children);
  return colorList;
};

const buildCssModules = (allColorScale, isSass) => {
  function getAllKeys(obj, parentKey = "") {
    let keys = [];
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const newParentKey = parentKey ? `${parentKey}-${key}` : key;
        keys = keys.concat(getAllKeys(obj[key], newParentKey));
      } else {
        const newKey = parentKey
          ? `${isSass ? "$" : "--"}${parentKey}-${key}`
          : key;
        keys.push(`${newKey}: ${obj[key]}`);
      }
    }
    return keys;
  }
  const styles = getAllKeys(allColorScale);
  return isSass
    ? `${styles.join(";\n")};`
    : `:root { 
    ${styles.join(";\n\r")}
  }`;
};

/**
 * Calls Figma's API and saves to a `colors.js` file in the project root.
 */
const writeColorsFromFigma = async () => {
  const tsVars = await fetchAllColorStyles();
  const cssVars = buildCssModules(tsVars);
  const scssVars = buildCssModules(tsVars, true);

  await writeFile(
    path.resolve(__dirname, "../src/styles/token/color.ts"),
    `export const Color = ${JSON.stringify(tsVars, null, 2)} as const`,
  );
  await writeFile(
    path.resolve(__dirname, "../src/styles/token/color.css"),
    cssVars,
  );
  await writeFile(
    path.resolve(__dirname, "../src/styles/token/color.scss"),
    scssVars,
  );
};

writeColorsFromFigma().catch(console.error);
