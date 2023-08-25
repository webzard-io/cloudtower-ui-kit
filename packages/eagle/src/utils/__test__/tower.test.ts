import {
  B,
  bit,
  Bps,
  bps,
  DAY,
  formatBitPerSecond,
  formatBits,
  formatBps,
  formatBytes,
  formatFrequency,
  formatPercent,
  formatSeconds,
  formatSpeed,
  Gb,
  GbE,
  GBps,
  Gbps,
  GHz,
  GiB,
  HOUR,
  Hz,
  Kb,
  KbE,
  KBps,
  Kbps,
  KHz,
  KiB,
  MAGIC_METRIC_NULL,
  Mb,
  MbE,
  MBps,
  Mbps,
  MHz,
  MiB,
  MINUTE,
  Pb,
  PiB,
  SECOND,
  Tb,
  TbE,
  TBps,
  THz,
  TiB,
  WEEK,
} from "../tower";

describe("formatBytes", () => {
  it("should handle the case of zero byte", () => {
    expect(formatBytes(0)).toEqual({
      value: 0,
      unit: "B",
    });
  });

  it("should handle fallback null", () => {
    expect(formatBytes(MAGIC_METRIC_NULL)).toEqual({
      value: 0,
      unit: "B",
    });
  });

  it("should handle number between 0 and 1", () => {
    expect(formatBytes(0.11)).toEqual({
      value: 0.11,
      unit: "B",
    });
  });

  it("should format bytes to correct units", () => {
    expect(formatBytes(10 * B)).toEqual({
      value: 10,
      unit: "B",
    });
    expect(formatBytes(10 * KiB)).toEqual({
      value: 10,
      unit: "KiB",
    });
    expect(formatBytes(10 * MiB)).toEqual({
      value: 10,
      unit: "MiB",
    });
    expect(formatBytes(10 * GiB)).toEqual({
      value: 10,
      unit: "GiB",
    });
    expect(formatBytes(10 * TiB)).toEqual({
      value: 10,
      unit: "TiB",
    });
    expect(formatBytes(10 * PiB)).toEqual({
      value: 10,
      unit: "PiB",
    });
    expect(formatBytes(10000 * PiB)).toEqual({
      value: 10000,
      unit: "PiB",
    });
  });

  it("has a default decimals of 2", () => {
    expect(formatBytes(1.111 * KiB)).toEqual({
      value: 1.11,
      unit: "KiB",
    });
  });

  it("can config decimals", () => {
    expect(formatBytes(1.111 * KiB, 3)).toEqual({
      value: 1.111,
      unit: "KiB",
    });
  });
});

describe("formatSeconds", () => {
  it("should handle the case of zero second", () => {
    expect(formatSeconds(0)).toEqual({
      value: 0,
      unit: "second",
    });
  });

  it("should handle fallback null", () => {
    expect(formatSeconds(MAGIC_METRIC_NULL)).toEqual({
      value: 0,
      unit: "second",
    });
  });

  it("should format seconds to correct units", () => {
    expect(formatSeconds(10 * SECOND)).toEqual({
      value: 10,
      unit: "second",
    });
    expect(formatSeconds(10 * MINUTE)).toEqual({
      value: 10,
      unit: "minute",
    });
    expect(formatSeconds(10 * HOUR)).toEqual({
      value: 10,
      unit: "hour",
    });
    expect(formatSeconds(6 * DAY)).toEqual({
      value: 6,
      unit: "day",
    });
    expect(formatSeconds(10 * DAY)).toEqual({
      value: 1,
      unit: "week",
    });
    expect(formatSeconds(10 * WEEK)).toEqual({
      value: 10,
      unit: "week",
    });
  });

  it("can config decimals", () => {
    expect(formatSeconds(10 * DAY, 2)).toEqual({
      value: 1.43,
      unit: "week",
    });
  });
});

describe("formatBps", () => {
  it("should format data to correct Bps", () => {
    expect(formatBps(0)).toEqual({
      value: 0,
      unit: "Bps",
    });
    expect(formatBps(1 * Bps)).toEqual({
      value: 1,
      unit: "Bps",
    });
    expect(formatBps(10 * KBps)).toEqual({
      value: 10,
      unit: "KBps",
    });
    expect(formatBps(10 * MBps)).toEqual({
      value: 10,
      unit: "MBps",
    });
    expect(formatBps(10 * GBps)).toEqual({
      value: 10,
      unit: "GBps",
    });
    expect(formatBps(10 * TBps)).toEqual({
      value: 10,
      unit: "TBps",
    });
    expect(formatBps(10000 * TBps)).toEqual({
      value: 10000,
      unit: "TBps",
    });
  });

  it("has a default decimals of 1", () => {
    expect(formatBps(1.222 * KBps)).toEqual({
      value: 1.2,
      unit: "KBps",
    });
  });

  it("should handle fallback null", () => {
    expect(formatBps(MAGIC_METRIC_NULL)).toEqual({
      value: 0,
      unit: "Bps",
    });
  });

  it("should handle number between 0 and 1", () => {
    expect(formatBps(0.1)).toEqual({
      value: 0.1,
      unit: "Bps",
    });
  });
});

describe("formatBitPerSecond", () => {
  it("should format data to correct bps", () => {
    expect(formatBitPerSecond(0)).toEqual({
      value: 0,
      unit: "bps",
    });
    expect(formatBitPerSecond(1 * bps)).toEqual({
      value: 1,
      unit: "bps",
    });
    expect(formatBitPerSecond(10 * Kbps)).toEqual({
      value: 10,
      unit: "Kbps",
    });
    expect(formatBitPerSecond(10 * Mbps)).toEqual({
      value: 10,
      unit: "Mbps",
    });
    expect(formatBitPerSecond(10 * Gbps)).toEqual({
      value: 10,
      unit: "Gbps",
    });
    expect(formatBitPerSecond(10000 * Gbps)).toEqual({
      value: 10,
      unit: "Tbps",
    });
  });

  it("has a default decimals of 1", () => {
    expect(formatBitPerSecond(1.222 * Kbps)).toEqual({
      value: 1.2,
      unit: "Kbps",
    });
  });

  it("should handle fallback null", () => {
    expect(formatBitPerSecond(MAGIC_METRIC_NULL)).toEqual({
      value: 0,
      unit: "bps",
    });
  });
});

describe("format frequency", () => {
  it("should format data to correct Hz", () => {
    expect(formatFrequency(0)).toEqual({
      value: 0,
      unit: "Hz",
    });
    expect(formatFrequency(1 * Hz)).toEqual({
      value: 1,
      unit: "Hz",
    });
    expect(formatFrequency(10 * KHz)).toEqual({
      value: 10,
      unit: "KHz",
    });
    expect(formatFrequency(10 * MHz)).toEqual({
      value: 10,
      unit: "MHz",
    });
    expect(formatFrequency(10 * GHz)).toEqual({
      value: 10,
      unit: "GHz",
    });
    expect(formatFrequency(10 * THz)).toEqual({
      value: 10,
      unit: "THz",
    });
    expect(formatFrequency(10000 * THz)).toEqual({
      value: 10000,
      unit: "THz",
    });
  });

  it("has a default decimals of 0", () => {
    expect(formatFrequency(1.222 * KHz)).toEqual({
      value: 1.22,
      unit: "KHz",
    });
  });

  it("should handle fallback null", () => {
    expect(formatFrequency(MAGIC_METRIC_NULL)).toEqual({
      value: 0,
      unit: "Hz",
    });
  });

  it("should handle number between 0 and 1", () => {
    expect(formatFrequency(0.1)).toEqual({
      value: 0.1,
      unit: "Hz",
    });
  });
});

describe("format percent", () => {
  it("should format data to correct percent", () => {
    expect(formatPercent(0.8540000000000001)).toEqual({
      value: "0.85",
      unit: "%",
    });
  });

  it("has a default decimal of 2", () => {
    expect(formatPercent(100)).toEqual({
      value: "100.00",
      unit: "%",
    });
  });

  it("should handle fallback null", () => {
    expect(formatPercent(MAGIC_METRIC_NULL)).toEqual({
      value: "0.00",
      unit: "%",
    });
  });

  it("should handle fallback more than 100", () => {
    expect(formatPercent(203)).toEqual({
      value: "100.00",
      unit: "%",
    });
  });

  it("should handle fallback less then 1", () => {
    expect(formatPercent(0.00003)).toEqual({
      value: "0.01",
      unit: "%",
    });
  });

  it("should handle fallback less then 1 & decimal of 4", () => {
    expect(formatPercent(0.000009, 4)).toEqual({
      value: "0.0001",
      unit: "%",
    });
  });

  it("should handle fallback less then 1 & decimal of 1", () => {
    expect(formatPercent(0.000009, 1)).toEqual({
      value: "0.1",
      unit: "%",
    });
  });

  it("should handle fallback less then 1 & decimal of 0", () => {
    expect(formatPercent(0.000009, 0)).toEqual({
      value: "1",
      unit: "%",
    });
  });

  it("should not be saturated and get original value 131.4", () => {
    expect(formatPercent(131.4, 1, false)).toEqual({
      value: "131.4",
      unit: "%",
    });
  });

  it("should not be saturated and get original value -10.7", () => {
    expect(formatPercent(-10.7, 1, false)).toEqual({
      value: "-10.7",
      unit: "%",
    });
  });
});

describe("format speed", () => {
  it("should format speed to correct units", () => {
    expect(formatSpeed(KbE)).toEqual({
      value: 1,
      unit: "KbE",
    });
    expect(formatSpeed(10 * MbE)).toEqual({
      value: 10,
      unit: "MbE",
    });
    expect(formatSpeed(10 * GbE)).toEqual({
      value: 10,
      unit: "GbE",
    });
    expect(formatSpeed(10 * TbE)).toEqual({
      value: 10,
      unit: "TbE",
    });
    expect(formatSpeed(10000 * TbE)).toEqual({
      value: 10000,
      unit: "TbE",
    });
  });

  it("can config decimals", () => {
    expect(formatSpeed(1.00081 * KbE, 2)).toEqual({
      value: 1,
      unit: "KbE",
    });
    expect(formatSpeed(1.611 * KbE, 2)).toEqual({
      value: 1.61,
      unit: "KbE",
    });
    expect(formatSpeed(1.619 * KbE, 2)).toEqual({
      value: 1.62,
      unit: "KbE",
    });
  });

  it("speed is less than 1000", () => {
    expect(formatSpeed(999)).toEqual({
      value: "-",
      unit: "",
    });
  });

  it("should handle fallback null", () => {
    expect(formatSpeed(MAGIC_METRIC_NULL)).toEqual({
      value: "-",
      unit: "",
    });
  });
});

describe("formatBits", () => {
  it("should format data to correct bits", () => {
    expect(formatBits(0)).toEqual({
      value: 0,
      unit: "b",
    });
    expect(formatBits(1 * bit)).toEqual({
      value: 1,
      unit: "b",
    });
    expect(formatBits(10 * Kb)).toEqual({
      value: 10,
      unit: "Kb",
    });
    expect(formatBits(10 * Mb)).toEqual({
      value: 10,
      unit: "Mb",
    });
    expect(formatBits(10 * Gb)).toEqual({
      value: 10,
      unit: "Gb",
    });
    expect(formatBits(10 * Tb)).toEqual({
      value: 10,
      unit: "Tb",
    });
    expect(formatBits(10 * Pb)).toEqual({
      value: 10,
      unit: "Pb",
    });
    expect(formatBits(10000 * Pb)).toEqual({
      value: 10000,
      unit: "Pb",
    });
  });

  it("has a default decimals of 1", () => {
    expect(formatBits(1.222 * Kb)).toEqual({
      value: 1.22,
      unit: "Kb",
    });
  });

  it("should handle fallback null", () => {
    expect(formatBits(MAGIC_METRIC_NULL)).toEqual({
      value: 0,
      unit: "b",
    });
  });
});
