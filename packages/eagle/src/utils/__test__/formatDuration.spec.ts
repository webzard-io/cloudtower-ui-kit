import { formatDuration } from "../formatDuration";

describe("formatDuration", () => {
  describe("基本功能", () => {
    it("应该正确格式化秒级时间", () => {
      expect(formatDuration(3000)).toEqual([{ value: 3, unit: "second" }]);
      expect(formatDuration(5000)).toEqual([{ value: 5, unit: "second" }]);
    });

    it("应该正确格式化分钟级时间", () => {
      expect(formatDuration(60000)).toEqual([{ value: 1, unit: "minute" }]);
      expect(formatDuration(120000)).toEqual([{ value: 2, unit: "minute" }]);
    });

    it("应该正确格式化小时级时间", () => {
      expect(formatDuration(3600000)).toEqual([{ value: 1, unit: "hour" }]);
      expect(formatDuration(7200000)).toEqual([{ value: 2, unit: "hour" }]);
    });

    it("应该正确格式化天级时间", () => {
      expect(formatDuration(86400000)).toEqual([{ value: 1, unit: "day" }]);
      expect(formatDuration(172800000)).toEqual([{ value: 2, unit: "day" }]);
    });

    it("应该正确格式化周级时间", () => {
      expect(formatDuration(7 * 24 * 60 * 60 * 1000)).toEqual([
        { value: 1, unit: "week" },
      ]);
      expect(formatDuration(14 * 24 * 60 * 60 * 1000)).toEqual([
        { value: 2, unit: "week" },
      ]);
    });

    it("应该正确格式化月级时间", () => {
      expect(formatDuration(30 * 24 * 60 * 60 * 1000)).toEqual([
        { value: 1, unit: "month" },
      ]);
      expect(formatDuration(60 * 24 * 60 * 60 * 1000)).toEqual([
        { value: 2, unit: "month" },
      ]);
    });

    it("应该正确格式化年级时间", () => {
      expect(formatDuration(365 * 24 * 60 * 60 * 1000)).toEqual([
        { value: 1, unit: "year" },
      ]);
      expect(formatDuration(730 * 24 * 60 * 60 * 1000)).toEqual([
        { value: 2, unit: "year" },
      ]);
    });

    it("应该正确格式化毫秒级时间", () => {
      // 需要显式指定 minUnit 为 Millisecond 才能展示毫秒
      expect(formatDuration(1, { minUnit: "millisecond" })).toEqual([
        { value: 1, unit: "millisecond" },
      ]);
      expect(formatDuration(500, { minUnit: "millisecond" })).toEqual([
        { value: 500, unit: "millisecond" },
      ]);
      expect(formatDuration(999, { minUnit: "millisecond" })).toEqual([
        { value: 999, unit: "millisecond" },
      ]);
    });
  });

  describe("复合时间单位（默认 maxDisplayUnits = 2）", () => {
    it("应该展示两个最大的时间单位 - 大于1周", () => {
      // 2 周 3 天
      expect(formatDuration(2 * 7 * 86400000 + 3 * 86400000)).toEqual([
        { value: 2, unit: "week" },
        { value: 3, unit: "day" },
      ]);
    });

    it("应该展示两个最大的时间单位 - 大于1天", () => {
      // 2 天 1 小时 5 分钟
      expect(formatDuration(2 * 86400000 + 3600000 + 5 * 60000)).toEqual([
        { value: 2, unit: "day" },
        { value: 1, unit: "hour" },
      ]);
    });

    it("应该展示两个最大的时间单位 - 1天到1小时之间", () => {
      // 3 小时 29 分钟
      expect(formatDuration(3 * 3600000 + 29 * 60000)).toEqual([
        { value: 3, unit: "hour" },
        { value: 29, unit: "minute" },
      ]);
    });

    it("应该展示两个最大的时间单位 - 1小时到1分钟之间", () => {
      // 15 分钟 24 秒
      expect(formatDuration(15 * 60000 + 24 * 1000)).toEqual([
        { value: 15, unit: "minute" },
        { value: 24, unit: "second" },
      ]);
    });

    it("应该展示两个最大的时间单位 - 1分钟到1秒之间", () => {
      // 3 秒 500 毫秒，需要显式指定 minUnit 为 Millisecond 才能展示毫秒
      expect(
        formatDuration(3 * 1000 + 500, { minUnit: "millisecond" }),
      ).toEqual([
        { value: 3, unit: "second" },
        { value: 500, unit: "millisecond" },
      ]);
    });
  });

  describe("只展示最大时间单位（maxDisplayUnits = 1）", () => {
    it("应该只展示天", () => {
      expect(
        formatDuration(2 * 86400000 + 3600000 + 5 * 60000, {
          maxDisplayUnits: 1,
        }),
      ).toEqual([{ value: 2, unit: "day" }]);
    });

    it("应该只展示小时", () => {
      expect(
        formatDuration(3 * 3600000 + 29 * 60000, { maxDisplayUnits: 1 }),
      ).toEqual([{ value: 3, unit: "hour" }]);
    });

    it("应该只展示分钟", () => {
      expect(
        formatDuration(15 * 60000 + 24 * 1000, { maxDisplayUnits: 1 }),
      ).toEqual([{ value: 15, unit: "minute" }]);
    });

    it("应该只展示秒", () => {
      expect(formatDuration(3 * 1000 + 500, { maxDisplayUnits: 1 })).toEqual([
        { value: 3, unit: "second" },
      ]);
    });
  });

  describe("展示三个时间单位（maxDisplayUnits = 3）", () => {
    it("应该展示三个时间单位 - 天/小时/分钟", () => {
      // 2 天 3 小时 15 分钟 30 秒
      expect(
        formatDuration(2 * 86400000 + 3 * 3600000 + 15 * 60000 + 30 * 1000, {
          maxDisplayUnits: 3,
        }),
      ).toEqual([
        { value: 2, unit: "day" },
        { value: 3, unit: "hour" },
        { value: 15, unit: "minute" },
      ]);
    });

    it("应该展示三个时间单位 - 小时/分钟/秒", () => {
      // 5 小时 20 分钟 45 秒 100 毫秒
      expect(
        formatDuration(5 * 3600000 + 20 * 60000 + 45 * 1000 + 100, {
          maxDisplayUnits: 3,
        }),
      ).toEqual([
        { value: 5, unit: "hour" },
        { value: 20, unit: "minute" },
        { value: 45, unit: "second" },
      ]);
    });

    it("应该展示三个时间单位 - 分钟/秒/毫秒", () => {
      // 10 分钟 30 秒 500 毫秒，需要显式指定 minUnit 为 Millisecond 才能展示毫秒
      expect(
        formatDuration(10 * 60000 + 30 * 1000 + 500, {
          maxDisplayUnits: 3,
          minUnit: "millisecond",
        }),
      ).toEqual([
        { value: 10, unit: "minute" },
        { value: 30, unit: "second" },
        { value: 500, unit: "millisecond" },
      ]);
    });
  });

  describe("展示更多时间单位（maxDisplayUnits >= 4）", () => {
    it("应该展示四个时间单位", () => {
      // 1 天 2 小时 3 分钟 4 秒 5 毫秒
      expect(
        formatDuration(86400000 + 2 * 3600000 + 3 * 60000 + 4 * 1000 + 5, {
          maxDisplayUnits: 4,
        }),
      ).toEqual([
        { value: 1, unit: "day" },
        { value: 2, unit: "hour" },
        { value: 3, unit: "minute" },
        { value: 4, unit: "second" },
      ]);
    });

    it("应该展示五个时间单位", () => {
      // 1 月 2 周 3 天 4 小时 5 分钟 6 秒 7 毫秒
      expect(
        formatDuration(
          30 * 86400000 +
            2 * 7 * 86400000 +
            3 * 86400000 +
            4 * 3600000 +
            5 * 60000 +
            6 * 1000 +
            7,
          { maxDisplayUnits: 5 },
        ),
      ).toEqual([
        { value: 1, unit: "month" },
        { value: 2, unit: "week" },
        { value: 3, unit: "day" },
        { value: 4, unit: "hour" },
        { value: 5, unit: "minute" },
      ]);
    });

    it("应该展示六个时间单位", () => {
      // 1 年 1 月 1 周 1 天 1 小时 1 分钟 1 秒 1 毫秒
      expect(
        formatDuration(
          365 * 86400000 +
            30 * 86400000 +
            7 * 86400000 +
            86400000 +
            3600000 +
            60000 +
            1000 +
            1,
          { maxDisplayUnits: 6 },
        ),
      ).toEqual([
        { value: 1, unit: "year" },
        { value: 1, unit: "month" },
        { value: 1, unit: "week" },
        { value: 1, unit: "day" },
        { value: 1, unit: "hour" },
        { value: 1, unit: "minute" },
      ]);
    });

    it("应该展示所有八个时间单位", () => {
      // 1 年 1 月 1 周 1 天 1 小时 1 分钟 1 秒 1 毫秒，需要显式指定 minUnit 为 Millisecond 才能展示毫秒
      expect(
        formatDuration(
          365 * 86400000 +
            30 * 86400000 +
            7 * 86400000 +
            86400000 +
            3600000 +
            60000 +
            1000 +
            1,
          { maxDisplayUnits: 8, minUnit: "millisecond" },
        ),
      ).toEqual([
        { value: 1, unit: "year" },
        { value: 1, unit: "month" },
        { value: 1, unit: "week" },
        { value: 1, unit: "day" },
        { value: 1, unit: "hour" },
        { value: 1, unit: "minute" },
        { value: 1, unit: "second" },
        { value: 1, unit: "millisecond" },
      ]);
    });
  });

  describe("边界情况", () => {
    it("应该正确处理零值", () => {
      expect(formatDuration(0)).toEqual([{ value: 0, unit: "second" }]);
    });

    it("应该正确处理负数", () => {
      expect(formatDuration(-1000)).toEqual([{ value: 0, unit: "second" }]);
      expect(formatDuration(-86400000)).toEqual([{ value: 0, unit: "second" }]);
    });

    it("应该正确处理非常小的值", () => {
      // 默认 minUnit 为秒，小于 1 秒的值应该返回 0 秒
      expect(formatDuration(1)).toEqual([{ value: 0, unit: "second" }]);
      expect(formatDuration(10)).toEqual([{ value: 0, unit: "second" }]);
      // 如果需要展示毫秒，需要显式指定 minUnit
      expect(formatDuration(1, { minUnit: "millisecond" })).toEqual([
        { value: 1, unit: "millisecond" },
      ]);
      expect(formatDuration(10, { minUnit: "millisecond" })).toEqual([
        { value: 10, unit: "millisecond" },
      ]);
    });

    it("应该正确处理非常大的值", () => {
      // 10 年
      expect(formatDuration(10 * 365 * 86400000)).toEqual([
        { value: 10, unit: "year" },
      ]);
      // 10 年 5 月
      expect(formatDuration(10 * 365 * 86400000 + 5 * 30 * 86400000)).toEqual([
        { value: 10, unit: "year" },
        { value: 5, unit: "month" },
      ]);
    });

    it("应该正确处理只有一个单位的情况", () => {
      expect(formatDuration(1000)).toEqual([{ value: 1, unit: "second" }]);
      expect(formatDuration(60000)).toEqual([{ value: 1, unit: "minute" }]);
      expect(formatDuration(3600000)).toEqual([{ value: 1, unit: "hour" }]);
    });

    it("应该正确处理 maxDisplayUnits 为 0 或负数的情况", () => {
      // maxDisplayUnits 为 0 或负数时，应该至少展示 1 个单位
      expect(formatDuration(3661000, { maxDisplayUnits: 0 })).toEqual([
        { value: 1, unit: "hour" },
      ]);
      expect(formatDuration(3661000, { maxDisplayUnits: -1 })).toEqual([
        { value: 1, unit: "hour" },
      ]);
    });
  });

  describe("规范要求的示例", () => {
    it("大于 1 天 - 展示两个单位", () => {
      // 2 天
      expect(formatDuration(2 * 86400000)).toEqual([{ value: 2, unit: "day" }]);
      // 2 天 1 小时 5 分钟
      expect(formatDuration(2 * 86400000 + 3600000 + 5 * 60000)).toEqual([
        { value: 2, unit: "day" },
        { value: 1, unit: "hour" },
      ]);
    });

    it("1 天 > n ≥ 1 小时 - 展示两个单位", () => {
      // 3 小时
      expect(formatDuration(3 * 3600000)).toEqual([{ value: 3, unit: "hour" }]);
      // 3 小时 29 分钟
      expect(formatDuration(3 * 3600000 + 29 * 60000)).toEqual([
        { value: 3, unit: "hour" },
        { value: 29, unit: "minute" },
      ]);
    });

    it("1 小时 > n ≥ 1 分钟 - 展示两个单位", () => {
      // 15 分钟
      expect(formatDuration(15 * 60000)).toEqual([
        { value: 15, unit: "minute" },
      ]);
      // 15 分钟 24 秒
      expect(formatDuration(15 * 60000 + 24 * 1000)).toEqual([
        { value: 15, unit: "minute" },
        { value: 24, unit: "second" },
      ]);
    });

    it("1 分钟 > n ≥ 1 秒 - 展示两个单位", () => {
      // 3 秒
      expect(formatDuration(3 * 1000)).toEqual([{ value: 3, unit: "second" }]);
      // 3 秒 500 毫秒，需要显式指定 minUnit 为 Millisecond 才能展示毫秒
      expect(
        formatDuration(3 * 1000 + 500, { minUnit: "millisecond" }),
      ).toEqual([
        { value: 3, unit: "second" },
        { value: 500, unit: "millisecond" },
      ]);
    });

    it("小于 1 秒 - 展示毫秒", () => {
      // 需要显式指定 minUnit 为 Millisecond 才能展示毫秒
      expect(formatDuration(500, { minUnit: "millisecond" })).toEqual([
        { value: 500, unit: "millisecond" },
      ]);
      expect(formatDuration(1, { minUnit: "millisecond" })).toEqual([
        { value: 1, unit: "millisecond" },
      ]);
    });
  });

  describe("minUnit 参数", () => {
    it("应该只处理到指定的最小单位 - 默认秒", () => {
      // 1500ms = 1秒 + 500ms，默认 minUnit 为秒，500ms 应该被忽略
      expect(formatDuration(1500)).toEqual([{ value: 1, unit: "second" }]);

      // 500ms，小于 1 秒，应该返回 0 秒
      expect(formatDuration(500)).toEqual([{ value: 0, unit: "second" }]);
    });

    it("应该只处理到指定的最小单位 - 分钟", () => {
      // 90500ms = 1分钟 + 30秒 + 500ms，minUnit 为分钟，30秒和500ms应该被忽略
      expect(formatDuration(90500, { minUnit: "minute" })).toEqual([
        { value: 1, unit: "minute" },
      ]);

      // 30000ms = 30秒，小于 1 分钟，应该返回 0 分钟
      expect(formatDuration(30000, { minUnit: "minute" })).toEqual([
        { value: 0, unit: "minute" },
      ]);
    });

    it("应该只处理到指定的最小单位 - 小时", () => {
      // 3665000ms = 1小时 + 1分钟 + 5秒 + 500ms，minUnit 为小时，分钟、秒和毫秒应该被忽略
      expect(formatDuration(3665000, { minUnit: "hour" })).toEqual([
        { value: 1, unit: "hour" },
      ]);

      // 1800000ms = 30分钟，小于 1 小时，应该返回 0 小时
      expect(formatDuration(1800000, { minUnit: "hour" })).toEqual([
        { value: 0, unit: "hour" },
      ]);
    });

    it("应该只处理到指定的最小单位 - 毫秒", () => {
      // minUnit 为毫秒时，应该展示所有单位包括毫秒
      expect(formatDuration(1500, { minUnit: "millisecond" })).toEqual([
        { value: 1, unit: "second" },
        { value: 500, unit: "millisecond" },
      ]);
    });

    it("minUnit 和 maxDisplayUnits 组合使用", () => {
      // 3665000ms = 1小时 + 1分钟 + 5秒 + 500ms
      // minUnit 为秒，maxDisplayUnits 为 2，应该展示 1小时 1分钟（5秒和500ms被忽略）
      expect(
        formatDuration(3665000, {
          minUnit: "second",
          maxDisplayUnits: 2,
        }),
      ).toEqual([
        { value: 1, unit: "hour" },
        { value: 1, unit: "minute" },
      ]);
    });
  });
});
