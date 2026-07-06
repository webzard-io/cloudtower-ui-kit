import { describe, it } from "vitest";

import {
  shouldShowTimeZoneSelectOption,
  TimeZoneSelectPlaceholderValue,
} from "../filter";

describe("shouldShowTimeZoneSelectOption", () => {
  const searchableOptionTexts = [
    "浏览器时区 (UTC+8:00)",
    "Asia/Shanghai (UTC+8:00)",
  ];

  it("matches browser time zone by label", ({ expect }) => {
    expect(
      shouldShowTimeZoneSelectOption(
        "浏览器时区",
        { value: "browser_time_zone", label: searchableOptionTexts[0] },
        searchableOptionTexts,
      ),
    ).toBe(true);
  });

  it("keeps option value searchable when label exists", ({ expect }) => {
    expect(
      shouldShowTimeZoneSelectOption(
        "browser_time_zone",
        { value: "browser_time_zone", label: searchableOptionTexts[0] },
        ["browser_time_zone"],
      ),
    ).toBe(true);
  });

  it("matches option label text", ({ expect }) => {
    expect(
      shouldShowTimeZoneSelectOption(
        "UTC+8",
        { value: "Asia/Shanghai", label: searchableOptionTexts[1] },
        searchableOptionTexts,
      ),
    ).toBe(true);
  });

  it("keeps placeholder only when a rendered option matches", ({ expect }) => {
    expect(
      shouldShowTimeZoneSelectOption(
        "Asia",
        { value: TimeZoneSelectPlaceholderValue },
        searchableOptionTexts,
      ),
    ).toBe(true);

    expect(
      shouldShowTimeZoneSelectOption(
        "UTC+11",
        { value: TimeZoneSelectPlaceholderValue },
        searchableOptionTexts,
      ),
    ).toBe(false);
  });
});
