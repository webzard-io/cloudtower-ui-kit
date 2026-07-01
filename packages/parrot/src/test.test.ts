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
        ).filter((key) => !key.endsWith("_plural")),
      );
      expect(diff).toEqual([]);
    });
  });

  it("registers ja-JP namespaces", () => {
    expect(Object.keys(locales["ja-JP"])).toEqual(
      Object.keys(locales["zh-CN"]),
    );
  });
});
