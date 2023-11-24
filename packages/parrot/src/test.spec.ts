import locales from "./locales";
import xor from "lodash.xor";

describe("check missing locales", () => {
  it("check missing locales file", () => {
    const diff = xor(
      Object.keys(locales["zh-CN"]),
      Object.keys(locales["en-US"])
    );
    expect(diff.length).toBe(0);
  });
  it("check missing locales detail", () => {
    Object.entries(locales["zh-CN"]).forEach((entry) => {
      let [key, value] = entry as ["common" | "components" | "metric", object];
      const diff = xor(Object.keys(value), Object.keys(locales["en-US"][key]));
      expect(diff.length).toBe(0);
    });
  });
});
