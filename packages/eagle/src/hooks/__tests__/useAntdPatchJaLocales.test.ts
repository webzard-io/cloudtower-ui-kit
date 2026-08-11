import antd4JaJP from "antd/lib/locale/ja_JP";
import antd5JaJP from "antd5/lib/locale/ja_JP";
import { describe, expect, it } from "vitest";

import { patchJaDatePickerLocale } from "../useAntdPatchJaLocales";

type PatchedLocale = {
  DatePicker?: { lang: { rangePlaceholder?: string[]; ok?: string } };
  Calendar?: { lang: { ok?: string } };
};

describe("patchJaDatePickerLocale", () => {
  it("updates Japanese date range picker copy for antd4", () => {
    const locale = patchJaDatePickerLocale(antd4JaJP) as PatchedLocale;

    expect(locale.DatePicker?.lang.rangePlaceholder).toEqual([
      "開始時刻",
      "終了時刻",
    ]);
    expect(locale.DatePicker?.lang.ok).toBe("OK");
    expect(locale.Calendar?.lang.ok).toBe("OK");
  });

  it("updates Japanese date range picker copy for antd5", () => {
    const locale = patchJaDatePickerLocale(antd5JaJP) as PatchedLocale;

    expect(locale.DatePicker?.lang.rangePlaceholder).toEqual([
      "開始時刻",
      "終了時刻",
    ]);
    expect(locale.DatePicker?.lang.ok).toBe("OK");
    expect(locale.Calendar?.lang.ok).toBe("OK");
  });
});
