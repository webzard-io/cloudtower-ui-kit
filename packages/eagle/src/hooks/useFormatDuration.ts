import { useMemo } from "react";

import { DurationUnitType, formatDuration } from "../utils/formatDuration";

/**
 * 格式化持续时间的结果项，可用于 ParrotTrans 组件
 */
export interface FormatDurationPart {
  value: number;
  unit: DurationUnitType;
  i18nKey: string;
}

/**
 * 格式化持续时间的 Hook
 * @param milliseconds 毫秒数
 * @param options 配置选项
 * @param options.maxDisplayUnits 最大展示单位数量，默认为 2
 * @param options.useAbbreviation 是否使用简写表述，默认为 false。注意：当仅展示一个单位时，会自动使用全称（忽略此参数）
 * @param options.minUnit 最小展示单位，默认为 "second"（秒），不满足进位逻辑的剩余时间会被忽略
 * @returns 格式化后的持续时间数组，每个元素包含可用于 ParrotTrans 的信息
 * @example
 * const { parts } = useFormatDuration(3661000);
 * // parts: [
 * //   { value: 1, unit: "hour", i18nKey: "unit.hour" },
 * //   { value: 1, unit: "minute", i18nKey: "unit.minute" }
 * // ]
 */
export function useFormatDuration(
  milliseconds: number,
  options: {
    maxDisplayUnits?: number;
    useAbbreviation?: boolean;
    minUnit?: DurationUnitType;
  } = {
    maxDisplayUnits: 2,
    useAbbreviation: false,
    minUnit: "second",
  },
) {
  const {
    maxDisplayUnits = 2,
    useAbbreviation = false,
    minUnit = "second",
  } = options;

  const result = useMemo(() => {
    const items = formatDuration(milliseconds, { maxDisplayUnits, minUnit });

    // 如果仅展示一个单位，则使用全称（不使用缩写）
    const shouldUseAbbreviation = items.length > 1 && useAbbreviation;

    // 格式化每个部分，返回可用于 ParrotTrans 的信息
    const parts: FormatDurationPart[] = items.map((item) => {
      // 构建翻译键，根据 shouldUseAbbreviation 决定使用完整形式还是缩写形式
      const suffix = shouldUseAbbreviation ? "_abbreviation" : "";
      const i18nKey = `unit.${item.unit}${suffix}`;

      return {
        value: item.value,
        unit: item.unit,
        i18nKey,
      };
    });

    return {
      parts,
    };
  }, [milliseconds, maxDisplayUnits, useAbbreviation, minUnit]);

  return result;
}
