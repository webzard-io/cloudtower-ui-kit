import merge from "lodash/merge";
import { useMemo } from "react";

const PatchJaDatePickerLocale = {
  DatePicker: {
    lang: {
      rangePlaceholder: ["開始時刻", "終了時刻"],
      ok: "OK",
    },
  },
  Calendar: {
    lang: {
      rangePlaceholder: ["開始時刻", "終了時刻"],
      ok: "OK",
    },
  },
};

export const patchJaDatePickerLocale = <T,>(jaLocale: T): T =>
  merge({}, jaLocale, PatchJaDatePickerLocale);

export const useAntdPatchJaLocales = <T,>(jaLocale: T) => {
  return useMemo(() => patchJaDatePickerLocale(jaLocale), [jaLocale]);
};
