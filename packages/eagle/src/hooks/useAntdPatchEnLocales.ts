import type { Locale } from "antd/lib/locale-provider";
import { useMemo } from "react";
import merge from "lodash/merge";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
const PatchEnLocale: DeepPartial<Locale> = {
  Modal: {
    okText: "OK",
    justOkText: "OK",
  },
  Popconfirm: {
    okText: "OK", // ← 需要修改
  },
  DatePicker: {
    lang: {
      ok: "OK", // ← 需要修改
    },
  },
  Calendar: {
    lang: {
      ok: "OK",
    },
  } as unknown as Locale["Calendar"],
};

export const useAntdPatchEnLocales = (enLocale: Locale) => {
  return useMemo(() => merge(enLocale, PatchEnLocale), [enLocale]);
};
