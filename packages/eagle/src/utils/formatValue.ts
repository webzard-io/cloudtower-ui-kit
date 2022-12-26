import { GiB, KiB } from "@tower/utils";

import { FormatUnit } from "./types";

export const getFormatValue = (formatUnit: FormatUnit) => {
  if (formatUnit === "GiB") {
    return GiB;
  }
  if (formatUnit === "KiB") {
    return KiB;
  }
  return 1;
};
