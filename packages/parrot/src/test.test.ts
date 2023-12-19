import xor from "lodash.xor";

import locales from "./locales";

describe("check missing locales", () => {
  it("check missing locales", () => {
    Object.entries(locales["zh-CN"]).forEach((entry) => {
      let [key, value] = entry;
      const diff = xor(
        Object.keys(value),
        Object.keys(
          locales["en-US"][key as keyof (typeof locales)["en-US"]] || {},
        ),
      );
      expect(diff).toEqual([]);
    });
  });
});
