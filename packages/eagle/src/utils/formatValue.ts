import { GiB, KiB } from "./format";

export type FormatUnit = "GiB" | "KiB";

export const getFormatValue = (formatUnit: FormatUnit) => {
  if (formatUnit === "GiB") {
    return GiB;
  }
  if (formatUnit === "KiB") {
    return KiB;
  }
  return 1;
};
