import { ParrotLngs } from "@cloudtower/parrot";
import { describe, expect, it } from "vitest";

import { getCalendarTitle } from "../getCalendarTitle";

describe("getCalendarTitle", () => {
  it("formats Japanese month without translation resources", () => {
    const t = ((key: string) => (key === "common.month" ? "月" : key)) as never;

    expect(getCalendarTitle("1", t, { language: ParrotLngs.ja } as never)).toBe(
      "1月",
    );
  });
});
