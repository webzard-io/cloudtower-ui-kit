const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./__test__/computed-style",
  testMatch: "*.pw.cjs",
  snapshotPathTemplate: "{testDir}/snapshots/{arg}{ext}",
  workers: 1,
  updateSnapshots: "none",
  timeout: 90000,
  expect: { timeout: 30000 },
  use: {
    browserName: "chromium",
    viewport: { width: 1280, height: 1000 },
    locale: "zh-CN",
    timezoneId: "Asia/Shanghai",
    colorScheme: "light",
    reducedMotion: "reduce",
    baseURL: "http://127.0.0.1:6017",
  },
  webServer: {
    command: "yarn storybook --ci --host 127.0.0.1 -p 6017",
    url: "http://127.0.0.1:6017",
    timeout: 180000,
    reuseExistingServer: false,
  },
});
