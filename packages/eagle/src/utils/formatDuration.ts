/**
 * 持续时间单位联合类型
 */
export type DurationUnitType =
  | "year"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";

/**
 * 格式化持续时间的结果项
 */
export interface FormatDurationItem {
  value: number;
  unit: DurationUnitType;
}

/**
 * 格式化持续时间
 * @param milliseconds 毫秒数
 * @param options 配置选项
 * @param options.maxDisplayUnits 最大展示单位数量，默认为 2
 * @param options.minUnit 最小展示单位，默认为 "second"（秒），不满足进位逻辑的剩余时间会被忽略
 * @returns 格式化后的持续时间数组，每个元素包含数值和单位
 * @example
 * formatDuration(3661000) // [{ value: 1, unit: "hour" }, { value: 1, unit: "minute" }]
 * formatDuration(90061000, { maxDisplayUnits: 3 }) // [{ value: 1, unit: "day" }, { value: 1, unit: "hour" }, { value: 1, unit: "minute" }]
 * formatDuration(5000) // [{ value: 5, unit: "second" }]
 * formatDuration(1500, { minUnit: "second" }) // [{ value: 1, unit: "second" }] (500ms 被忽略)
 */
export function formatDuration(
  milliseconds: number,
  options: {
    maxDisplayUnits?: number;
    minUnit?: DurationUnitType;
  } = {},
): FormatDurationItem[] {
  const { maxDisplayUnits = 2, minUnit = "second" } = options;

  // 确保 maxDisplayUnits 至少为 1
  const effectiveMaxDisplayUnits = Math.max(1, maxDisplayUnits);

  // 处理负数和零
  if (milliseconds < 0 || milliseconds === 0) {
    const minUnitValue = minUnit || "second";
    return [{ value: 0, unit: minUnitValue }];
  }

  // 时间单位定义（毫秒）
  const units: Array<{ value: number; unit: DurationUnitType }> = [
    { value: 365 * 24 * 60 * 60 * 1000, unit: "year" },
    { value: 30 * 24 * 60 * 60 * 1000, unit: "month" },
    { value: 7 * 24 * 60 * 60 * 1000, unit: "week" },
    { value: 24 * 60 * 60 * 1000, unit: "day" },
    { value: 60 * 60 * 1000, unit: "hour" },
    { value: 60 * 1000, unit: "minute" },
    { value: 1000, unit: "second" },
    { value: 1, unit: "millisecond" },
  ];

  // 找到最小单位的索引
  const minUnitValue = minUnit || "second";
  const minUnitIndex = units.findIndex((u) => u.unit === minUnitValue);
  if (minUnitIndex === -1) {
    // 如果找不到指定的最小单位，使用默认的秒
    const defaultMinUnitIndex = units.findIndex((u) => u.unit === "second");
    const filteredUnits = units.slice(0, defaultMinUnitIndex + 1);

    const parts: FormatDurationItem[] = [];
    let remaining = milliseconds;

    for (const unitDef of filteredUnits) {
      if (remaining >= unitDef.value) {
        const count = Math.floor(remaining / unitDef.value);
        remaining = remaining % unitDef.value;

        parts.push({
          value: count,
          unit: unitDef.unit,
        });

        if (parts.length >= effectiveMaxDisplayUnits) {
          break;
        }
      }
    }

    if (parts.length === 0) {
      return [{ value: 0, unit: "second" }];
    }

    return parts;
  }

  // 只处理到最小单位为止
  const filteredUnits = units.slice(0, minUnitIndex + 1);

  const parts: FormatDurationItem[] = [];
  let remaining = milliseconds;

  for (const unitDef of filteredUnits) {
    if (remaining >= unitDef.value) {
      const count = Math.floor(remaining / unitDef.value);
      remaining = remaining % unitDef.value;

      parts.push({
        value: count,
        unit: unitDef.unit,
      });

      // 达到最大展示单位数量后停止
      if (parts.length >= effectiveMaxDisplayUnits) {
        break;
      }
    }
  }

  // 如果没有任何单位被添加
  if (parts.length === 0) {
    return [{ value: 0, unit: minUnitValue || "second" }];
  }

  return parts;
}
