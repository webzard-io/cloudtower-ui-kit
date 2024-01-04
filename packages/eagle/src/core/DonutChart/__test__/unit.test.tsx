import i18next from "i18next";
import { describe, it } from "vitest";

import { Color } from "../../../styles/token";
import { formatChartData, formatCollapse } from "../index";

describe("formatCollapse", () => {
  it("valid format", ({ expect }) => {
    const data = [
      {
        name: "1",
        value: 1,
      },
      {
        name: "2",
        value: 2,
      },
    ];
    const result = formatCollapse(data);
    expect(result).toStrictEqual({
      tooltip: data,
      value: 3,
    });
  });

  it("valid empty", ({ expect }) => {
    const result = formatCollapse([]);
    expect(result).toStrictEqual({
      tooltip: [],
      value: 0,
    });
  });
});

describe("formatChartData", () => {
  const { t } = i18next;
  it("valid format 4 length data, display origin data", ({ expect }) => {
    const data = [
      {
        name: "1",
        value: 1,
      },
      {
        name: "2",
        value: 2,
      },
      {
        name: "3",
        value: 3,
      },
      {
        name: "4",
        value: 4,
      },
    ];
    const result = formatChartData({ data, t, collapseText: "及以上" });
    expect(result).toStrictEqual(data);
  });

  it("valid format over 5 length data, overhead data will be merged into tooltip", ({
    expect,
  }) => {
    const data = [
      {
        name: "1",
        value: 1,
      },
      {
        name: "2",
        value: 2,
      },
      {
        name: "3",
        value: 3,
      },
      {
        name: "4",
        value: 4,
      },
      {
        name: "5",
        value: 5,
      },
      {
        name: "6",
        value: 6,
      },
    ];
    const result = formatChartData({ data, t, collapseText: "及以上" });
    expect(result).toStrictEqual([
      {
        name: "1",
        value: 1,
      },
      {
        name: "2",
        value: 2,
      },
      {
        name: "3",
        value: 3,
      },
      {
        name: "4",
        value: 4,
      },
      {
        name: "5及以上",
        color: null,
        tooltip: [
          {
            name: "5",
            value: 5,
          },
          {
            name: "6",
            value: 6,
          },
        ],
        value: 11,
      },
    ]);
  });

  it("valid format other data, merged into tooltip", ({ expect }) => {
    const data = [
      {
        name: "1",
        value: 1,
      },
      {
        name: "2",
        value: 2,
      },
    ];
    const otherData = [
      {
        name: "3",
        value: 3,
      },
      {
        name: "4",
        value: 4,
      },
    ];
    const result = formatChartData({ data, otherData, t });
    expect(result).toStrictEqual([
      ...data,
      {
        color: Color.gray["gray-40"],
        name: undefined,
        tooltip: [
          {
            name: "3",
            value: 3,
          },
          {
            name: "4",
            value: 4,
          },
        ],
        value: 7,
      },
    ]);
  });
});
