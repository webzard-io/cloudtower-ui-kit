import { FormatUnit } from "./types";
import { GiB, KiB } from "@tower/utils";

export const getFormatValue = (formatUnit: FormatUnit) => {
  if (formatUnit === "GiB") {
    return GiB;
  }
  if (formatUnit === "KiB") {
    return KiB;
  }
  return 1;
};
