/// <reference types="vitest" />
/// <reference types="vite/client" />

import linaria from "@linaria/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import readline from "readline";
import { defineConfig } from "vitest/config";
import prettier from "prettier";

const styleMapFileName = path.join(__dirname, "linaria-temp-map.json");

export default defineConfig({
  plugins: [
    linaria({
      preprocessor: async (selector, cssText) => {
        let value = "{}";
        const text = await prettier.format(cssText, {
          parser: "markdown",
          tabWidth: 2,
          endOfLine: "lf",
          useTabs: false,
          semi: true,
        });
        try {
          value = fs.readFileSync(styleMapFileName).toString();
        } catch (error) {}
        try {
          readline.cursorTo(process.stdout, 0);
          fs.writeFileSync(
            styleMapFileName,
            JSON.stringify({
              ...JSON.parse(value),
              [selector]: text,
            }),
          );
        } catch (error) {
          console.error(error);
        }
        return text;
      },
      babelOptions: {
        presets: ["react-app"],
      },
    }),
    react(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    include: ["**/**.test.ts?(x)"],
    setupFiles: [path.resolve(__dirname, "__test__/setup.ts")],
  },
  resolve: {
    alias: {
      "@cloudtower/parrot": path.resolve(__dirname, "../parrot/src/index.ts"),
      "@src": path.resolve(__dirname, "./src"),
    },
  },
});
