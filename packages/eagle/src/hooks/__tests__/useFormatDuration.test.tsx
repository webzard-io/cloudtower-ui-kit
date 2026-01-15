import { renderHook } from "@testing-library/react-hooks";

import { useFormatDuration } from "../useFormatDuration";

describe("useFormatDuration", () => {
  describe("基本功能", () => {
    it("应该正确格式化秒级时间", () => {
      const { result } = renderHook(() => useFormatDuration(3000));

      expect(result.current.parts).toEqual([
        { value: 3, unit: "second", i18nKey: "unit.second" },
      ]);
    });

    it("应该正确格式化分钟级时间", () => {
      const { result } = renderHook(() => useFormatDuration(60000));

      expect(result.current.parts).toEqual([
        { value: 1, unit: "minute", i18nKey: "unit.minute" },
      ]);
    });

    it("应该正确格式化小时级时间", () => {
      const { result } = renderHook(() => useFormatDuration(3600000));

      expect(result.current.parts).toEqual([
        { value: 1, unit: "hour", i18nKey: "unit.hour" },
      ]);
    });

    it("应该正确格式化复合时间单位（默认 maxDisplayUnits = 2）", () => {
      const { result } = renderHook(() => useFormatDuration(3661000));

      expect(result.current.parts).toEqual([
        { value: 1, unit: "hour", i18nKey: "unit.hour" },
        { value: 1, unit: "minute", i18nKey: "unit.minute" },
      ]);
    });
  });

  describe("useAbbreviation 参数", () => {
    it("应该在使用缩写时使用 _abbreviation 后缀", () => {
      const { result } = renderHook(() =>
        useFormatDuration(3661000, { useAbbreviation: true }),
      );

      expect(result.current.parts).toEqual([
        {
          value: 1,
          unit: "hour",
          i18nKey: "unit.hour_abbreviation",
        },
        {
          value: 1,
          unit: "minute",
          i18nKey: "unit.minute_abbreviation",
        },
      ]);
    });

    it("应该在不使用缩写时使用完整形式", () => {
      const { result } = renderHook(() =>
        useFormatDuration(3661000, { useAbbreviation: false }),
      );

      expect(result.current.parts).toEqual([
        { value: 1, unit: "hour", i18nKey: "unit.hour" },
        { value: 1, unit: "minute", i18nKey: "unit.minute" },
      ]);
    });
  });

  describe("仅展示一个单位时使用全称", () => {
    it("当仅展示一个单位时，即使 useAbbreviation 为 true，也应该使用全称", () => {
      const { result } = renderHook(() =>
        useFormatDuration(3600000, { useAbbreviation: true }),
      );

      // 应该使用全称，而不是缩写
      expect(result.current.parts).toEqual([
        { value: 1, unit: "hour", i18nKey: "unit.hour" },
      ]);
      expect(result.current.parts[0].i18nKey).toBe("unit.hour");
      expect(result.current.parts[0].i18nKey).not.toBe(
        "unit.hour_abbreviation",
      );
    });

    it("当展示多个单位时，根据 useAbbreviation 参数决定", () => {
      const { result } = renderHook(() =>
        useFormatDuration(3661000, { useAbbreviation: true }),
      );

      // 多个单位时，应该使用缩写
      expect(result.current.parts[0].i18nKey).toBe("unit.hour_abbreviation");
      expect(result.current.parts[1].i18nKey).toBe("unit.minute_abbreviation");
    });
  });

  describe("maxDisplayUnits 参数", () => {
    it("应该限制展示的单位数量", () => {
      const { result } = renderHook(() =>
        useFormatDuration(90061000, { maxDisplayUnits: 1 }),
      );

      expect(result.current.parts).toHaveLength(1);
      expect(result.current.parts[0].unit).toBe("day");
    });

    it("应该支持展示多个单位", () => {
      const { result } = renderHook(() =>
        useFormatDuration(90061000, { maxDisplayUnits: 3 }),
      );

      expect(result.current.parts).toHaveLength(3);
      expect(result.current.parts[0].unit).toBe("day");
      expect(result.current.parts[1].unit).toBe("hour");
      expect(result.current.parts[2].unit).toBe("minute");
    });
  });

  describe("minUnit 参数", () => {
    it("应该只处理到指定的最小单位", () => {
      const { result } = renderHook(() =>
        useFormatDuration(90500, { minUnit: "minute" }),
      );

      expect(result.current.parts).toEqual([
        { value: 1, unit: "minute", i18nKey: "unit.minute" },
      ]);
      // 30秒和500ms应该被忽略
    });

    it("默认 minUnit 为秒时，应该忽略毫秒", () => {
      const { result } = renderHook(() => useFormatDuration(1500));

      expect(result.current.parts).toEqual([
        { value: 1, unit: "second", i18nKey: "unit.second" },
      ]);
      // 500ms应该被忽略
    });
  });

  describe("响应式更新", () => {
    it("当 milliseconds 变化时应该重新计算", () => {
      const { result, rerender } = renderHook(
        ({ ms }: { ms: number }) => useFormatDuration(ms),
        { initialProps: { ms: 3000 } },
      );

      expect(result.current.parts[0].value).toBe(3);

      rerender({ ms: 60000 });

      expect(result.current.parts[0].value).toBe(1);
      expect(result.current.parts[0].unit).toBe("minute");
    });

    it("当 maxDisplayUnits 变化时应该重新计算", () => {
      const { result, rerender } = renderHook(
        ({ maxDisplayUnits }: { maxDisplayUnits?: number }) =>
          useFormatDuration(3661000, { maxDisplayUnits }),
        { initialProps: { maxDisplayUnits: 2 } },
      );

      expect(result.current.parts).toHaveLength(2);

      rerender({ maxDisplayUnits: 1 });

      expect(result.current.parts).toHaveLength(1);
    });

    it("当 useAbbreviation 变化时应该重新计算", () => {
      const { result, rerender } = renderHook(
        ({ useAbbreviation }: { useAbbreviation?: boolean }) =>
          useFormatDuration(3661000, { useAbbreviation }),
        { initialProps: { useAbbreviation: false } },
      );

      expect(result.current.parts[0].i18nKey).toBe("unit.hour");

      rerender({ useAbbreviation: true });

      expect(result.current.parts[0].i18nKey).toBe("unit.hour_abbreviation");
    });

    it("当 minUnit 变化时应该重新计算", () => {
      const { result, rerender } = renderHook(
        ({ minUnit }: { minUnit?: string }) =>
          useFormatDuration(90500, { minUnit: minUnit as any }),
        { initialProps: { minUnit: "second" } },
      );

      expect(result.current.parts[0].unit).toBe("minute");
      expect(result.current.parts[1].unit).toBe("second");

      rerender({ minUnit: "minute" });

      expect(result.current.parts).toHaveLength(1);
      expect(result.current.parts[0].unit).toBe("minute");
    });
  });

  describe("边界情况", () => {
    it("应该正确处理零值", () => {
      const { result } = renderHook(() => useFormatDuration(0));

      expect(result.current.parts).toEqual([
        { value: 0, unit: "second", i18nKey: "unit.second" },
      ]);
    });

    it("应该正确处理负数", () => {
      const { result } = renderHook(() => useFormatDuration(-1000));

      expect(result.current.parts).toEqual([
        { value: 0, unit: "second", i18nKey: "unit.second" },
      ]);
    });

    it("应该正确处理非常小的值", () => {
      // 默认 minUnit 为秒，小于 1 秒的值应该返回 0 秒
      const { result: result1 } = renderHook(() => useFormatDuration(1));

      expect(result1.current.parts).toEqual([
        { value: 0, unit: "second", i18nKey: "unit.second" },
      ]);

      const { result: result2 } = renderHook(() => useFormatDuration(10));

      expect(result2.current.parts).toEqual([
        { value: 0, unit: "second", i18nKey: "unit.second" },
      ]);

      // 如果需要展示毫秒，需要显式指定 minUnit
      const { result: result3 } = renderHook(() =>
        useFormatDuration(1, { minUnit: "millisecond" }),
      );

      expect(result3.current.parts).toEqual([
        {
          value: 1,
          unit: "millisecond",
          i18nKey: "unit.millisecond",
        },
      ]);

      const { result: result4 } = renderHook(() =>
        useFormatDuration(10, { minUnit: "millisecond" }),
      );

      expect(result4.current.parts).toEqual([
        {
          value: 10,
          unit: "millisecond",
          i18nKey: "unit.millisecond",
        },
      ]);
    });
  });

  describe("组合参数测试", () => {
    it("应该正确处理所有参数的组合", () => {
      const { result } = renderHook(() =>
        useFormatDuration(90061000, {
          maxDisplayUnits: 2,
          useAbbreviation: false,
          minUnit: "second",
        }),
      );

      expect(result.current.parts).toHaveLength(2);
      expect(result.current.parts[0].unit).toBe("day");
      expect(result.current.parts[0].i18nKey).toBe("unit.day");
      expect(result.current.parts[1].unit).toBe("hour");
      expect(result.current.parts[1].i18nKey).toBe("unit.hour");
    });

    it("应该正确处理 useAbbreviation 和 maxDisplayUnits 的组合", () => {
      const { result } = renderHook(() =>
        useFormatDuration(90061000, {
          maxDisplayUnits: 2,
          useAbbreviation: true,
        }),
      );

      expect(result.current.parts).toHaveLength(2);
      expect(result.current.parts[0].i18nKey).toBe("unit.day_abbreviation");
      expect(result.current.parts[1].i18nKey).toBe("unit.hour_abbreviation");
    });
  });

  describe("不同时间单位的测试", () => {
    it("应该正确处理天级时间", () => {
      const { result } = renderHook(() => useFormatDuration(86400000));

      expect(result.current.parts).toEqual([
        { value: 1, unit: "day", i18nKey: "unit.day" },
      ]);
    });

    it("应该正确处理周级时间", () => {
      const { result } = renderHook(() =>
        useFormatDuration(7 * 24 * 60 * 60 * 1000),
      );

      expect(result.current.parts).toEqual([
        { value: 1, unit: "week", i18nKey: "unit.week" },
      ]);
    });

    it("应该正确处理月级时间", () => {
      const { result } = renderHook(() =>
        useFormatDuration(30 * 24 * 60 * 60 * 1000),
      );

      expect(result.current.parts).toEqual([
        { value: 1, unit: "month", i18nKey: "unit.month" },
      ]);
    });

    it("应该正确处理年级时间", () => {
      const { result } = renderHook(() =>
        useFormatDuration(365 * 24 * 60 * 60 * 1000),
      );

      expect(result.current.parts).toEqual([
        { value: 1, unit: "year", i18nKey: "unit.year" },
      ]);
    });

    it("应该正确处理毫秒级时间（当 minUnit 为 Millisecond 时）", () => {
      const { result } = renderHook(() =>
        useFormatDuration(500, { minUnit: "millisecond" }),
      );

      expect(result.current.parts).toEqual([
        {
          value: 500,
          unit: "millisecond",
          i18nKey: "unit.millisecond",
        },
      ]);
    });
  });
});
