import { parseNumberAndUnit } from "../unit";

describe("parseNumberAndUnit", () => {
  describe("边界情况", () => {
    it("应该正确处理带空格的字符串", () => {
      const result = parseNumberAndUnit("  123px  ");
      expect(result).toEqual({ number: 123, unit: "px" });
    });

    it("应该正确处理单位前有空格的情况", () => {
      const result = parseNumberAndUnit("123 px");
      expect(result).toEqual({ number: 123, unit: "px" });
    });

    it("应该正确处理单位后有空格的情况", () => {
      const result = parseNumberAndUnit("123px ");
      expect(result).toEqual({ number: 123, unit: "px" });
    });

    it("应该正确处理数字前后都有空格的情况", () => {
      const result = parseNumberAndUnit(" 123 ");
      expect(result).toEqual({ number: 123, unit: "" });
    });

    it("应该正确处理零值", () => {
      const result = parseNumberAndUnit("0px");
      expect(result).toEqual({ number: 0, unit: "px" });
    });
  });

  describe("异常情况", () => {
    it("应该返回 null 当输入不是字符串时", () => {
      expect(parseNumberAndUnit(null as any)).toBeNull();
      expect(parseNumberAndUnit(undefined as any)).toBeNull();
      expect(parseNumberAndUnit(123 as any)).toBeNull();
      expect(parseNumberAndUnit({} as any)).toBeNull();
      expect(parseNumberAndUnit([] as any)).toBeNull();
    });

    it("应该返回 null 当输入是空字符串时", () => {
      expect(parseNumberAndUnit("")).toBeNull();
    });

    it("应该返回 null 当输入只包含空格时", () => {
      expect(parseNumberAndUnit("   ")).toBeNull();
    });

    it("应该返回 null 当输入不包含数字时", () => {
      expect(parseNumberAndUnit("abc")).toBeNull();
      expect(parseNumberAndUnit("px")).toBeNull();
      expect(parseNumberAndUnit("abc123")).toBeNull();
    });
  });

  describe("复杂单位", () => {
    it("应该正确处理复合单位", () => {
      const result = parseNumberAndUnit("2.5rem");
      expect(result).toEqual({ number: 2.5, unit: "rem" });
    });

    it("应该正确处理带连字符的单位", () => {
      const result = parseNumberAndUnit("1.5em-extra");
      expect(result).toEqual({ number: 1.5, unit: "em-extra" });
    });

    it("应该正确处理带下划线的单位", () => {
      const result = parseNumberAndUnit("2.0px_special");
      expect(result).toEqual({ number: 2.0, unit: "px_special" });
    });

    it("应该正确处理带数字的单位", () => {
      const result = parseNumberAndUnit("1.2px2");
      expect(result).toEqual({ number: 1.2, unit: "px2" });
    });
  });

  describe("实际应用场景", () => {
    it("应该正确处理 CSS 样式值", () => {
      const testCases = [
        { input: "16px", expected: { number: 16, unit: "px" } },
        { input: "1.5em", expected: { number: 1.5, unit: "em" } },
        { input: "100%", expected: { number: 100, unit: "%" } },
        { input: "50vw", expected: { number: 50, unit: "vw" } },
        { input: "25vh", expected: { number: 25, unit: "vh" } },
        { input: "2rem", expected: { number: 2, unit: "rem" } },
        { input: "300ms", expected: { number: 300, unit: "ms" } },
        { input: "-0.3s", expected: { number: -0.3, unit: "s" } },
        { input: "45deg", expected: { number: 45, unit: "deg" } },
        { input: "1.57rad", expected: { number: 1.57, unit: "rad" } },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseNumberAndUnit(input);
        expect(result).toEqual(expected);
      });
    });
  });
});
