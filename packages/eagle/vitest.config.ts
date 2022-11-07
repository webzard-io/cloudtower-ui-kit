/// <reference types="vitest" />
/// <reference types="vite/client" />

import linaria from "@linaria/rollup";
import react from "@vitejs/plugin-react";
import { Plugin } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [linaria() as Plugin, react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {},
  },
});
