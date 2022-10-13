/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import VitePluginLinaria from "vite-plugin-linaria";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [VitePluginLinaria(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
