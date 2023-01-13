/// <reference types="vitest" />
/// <reference types="vite/client" />

import linaria from "@linaria/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [linaria(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    setupFiles: [path.resolve(__dirname, "__test__/setup.ts")],
  },
  resolve: {
    alias: {},
  },
});
