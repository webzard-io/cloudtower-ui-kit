/**
 * 解析字符串中的数字和单位
 * @param str 要解析的字符串
 * @returns 包含数字和单位的对象，如果解析失败返回 null
 * @example
 * parseNumberAndUnit("123px") // { number: 123, unit: "px" }
 * parseNumberAndUnit("45.67%") // { number: 45.67, unit: "%" }
 * parseNumberAndUnit("100") // { number: 100, unit: "" }
 * parseNumberAndUnit("abc") // null
 */
export function parseNumberAndUnit(
  str: string,
): { number: number; unit: string } | null {
  if (typeof str !== "string") {
    return null;
  }

  // 匹配数字（包括小数）和后面的单位
  const match = str.trim().match(/^([+-]?\d*\.?\d+)(.*)$/);

  if (!match) {
    return null;
  }

  const number = parseFloat(match[1]);
  const unit = match[2].trim();

  // 检查数字是否有效
  if (isNaN(number)) {
    return null;
  }

  return { number, unit };
}
