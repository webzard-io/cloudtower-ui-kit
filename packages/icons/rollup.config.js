import image from "@rollup/plugin-image";
import { defineConfig } from "rollup";

const config = defineConfig([
  {
    input: ["src/index.ts"],
    plugins: [
      image({
        base64: true,
      }),
    ],
    output: [
      {
        dir: "dist/umd",
        name: "index",
        format: "umd",
      },
      {
        dir: "dist/esm",
        name: "index",
        format: "esm",
      },
    ],
  },
]);

export default config;
