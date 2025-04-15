interface FormattedResult {
  value: number;
  unit: string;
}

export const B = 1;
export const KiB = 1024 * B;
export const MiB = 1024 * KiB;
export const GiB = 1024 * MiB;
export const TiB = 1024 * GiB;
export const PiB = 1024 * TiB;

export type SerializableBasic = null | undefined | string | number | boolean;
export type SerializableArray = Serializable[];
export type SerializableObject = { [key: string]: Serializable };
export type Serializable =
  | SerializableBasic
  | SerializableArray
  | SerializableObject;

export const MAGIC_METRIC_NULL = -2;

export const bit = 1;
export const Kb = 1000 * bit;
export const Mb = 1000 * Kb;
export const Gb = 1000 * Mb;
export const Tb = 1000 * Gb;
export const Pb = 1000 * Tb;

export function formatBits(bits: number, decimals = 2): FormattedResult {
  if (bits <= 0 || bits === MAGIC_METRIC_NULL) {
    return {
      value: 0,
      unit: "b",
    };
  }
  const k = 1000;
  const units = ["b", "Kb", "Mb", "Gb", "Tb", "Pb"];
  let i = Math.floor(Math.log(bits) / Math.log(k));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((bits / Math.pow(k, i)).toFixed(decimals)),
    unit: units[i],
  };
}

export const Hz = 1;
export const KHz = 1000 * Hz;
export const MHz = 1000 * KHz;
export const GHz = 1000 * MHz;
export const THz = 1000 * GHz;

export function formatFrequency(
  frequency: number,
  decimals = 2,
): FormattedResult {
  if (frequency <= 0 || frequency === MAGIC_METRIC_NULL) {
    return {
      value: 0,
      unit: "Hz",
    };
  }
  const k = 1000;
  const units = ["Hz", "KHz", "MHz", "GHz", "THz"];
  let i = Math.floor(Math.log(frequency) / Math.log(k));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((frequency / Math.pow(k, i)).toFixed(decimals)),
    unit: units[i],
  };
}

export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

export function formatSeconds(seconds: number, decimals = 0): FormattedResult {
  if (seconds <= MAGIC_METRIC_NULL) {
    seconds = 0;
  }
  const units = [
    {
      value: WEEK,
      unit: "week",
    },
    {
      value: DAY,
      unit: "day",
    },
    {
      value: HOUR,
      unit: "hour",
    },
    {
      value: MINUTE,
      unit: "minute",
    },
    {
      value: SECOND,
      unit: "second",
    },
  ];
  for (const unit of units) {
    if (seconds > unit.value) {
      return {
        value: parseFloat((seconds / unit.value).toFixed(decimals)),
        unit: unit.unit,
      };
    }
  }
  return {
    value: parseFloat((seconds / SECOND).toFixed(decimals)),
    unit: "second",
  };
}

export const bps = 1;
export const Kbps = 1000 * bps;
export const Mbps = 1000 * Kbps;
export const Gbps = 1000 * Mbps;
export const Tbps = 1000 * Gbps;

export function formatBitPerSecond(
  input: number,
  decimals = 1,
): FormattedResult {
  if (input <= 0 || input === MAGIC_METRIC_NULL) {
    return {
      value: 0,
      unit: "bps",
    };
  }
  const k = 1000;
  const units = ["bps", "Kbps", "Mbps", "Gbps", "Tbps"];
  let i = Math.floor(Math.log(input) / Math.log(k));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((input / Math.pow(k, i)).toFixed(decimals)),
    unit: units[i],
  };
}

export const Bps = 1;
export const KBps = 1000 * Bps;
export const MBps = 1000 * KBps;
export const GBps = 1000 * MBps;
export const TBps = 1000 * GBps;

export function formatBps(input: number, decimals = 1): FormattedResult {
  if (input <= 0 || input === MAGIC_METRIC_NULL) {
    return {
      value: 0,
      unit: "Bps",
    };
  }
  const k = 1000;
  const units = ["Bps", "KBps", "MBps", "GBps", "TBps"];
  let i = Math.floor(Math.log(input) / Math.log(k));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((input / Math.pow(k, i)).toFixed(decimals)),
    unit: units[i],
  };
}

export function formatBytes(bytes: number, decimals = 2): FormattedResult {
  if (bytes <= 0 || bytes === MAGIC_METRIC_NULL) {
    return {
      value: 0,
      unit: "B",
    };
  }
  const k = 1024;
  const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)),
    unit: units[i],
  };
}

export function formatBytePerSecond(
  bytes: number,
  decimals = 2,
): FormattedResult {
  if (bytes <= 0 || bytes === MAGIC_METRIC_NULL) {
    return {
      value: 0,
      unit: "B/s",
    };
  }
  const k = 1024;
  const units = ["B/s", "KiB/s", "MiB/s", "GiB/s", "TiB/s", "PiB/s"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)),
    unit: units[i],
  };
}

export function formatPercent(
  input: number,
  decimals = 2,
  saturated = true,
): {
  value: string;
  numberValue: number;
  unit: string;
} {
  if (input === MAGIC_METRIC_NULL) {
    input = 0;
  }

  if (saturated) {
    if (input <= 0) {
      input = 0;
    }

    if (input > 100) {
      input = 100;
    }
  }

  const value = input.toFixed(decimals);
  if (parseFloat(value) === 0 && input > 0) {
    if (decimals >= 1) {
      return {
        value: `0.${"0".repeat(decimals - 1)}1`,
        numberValue: parseFloat(`0.${"0".repeat(decimals - 1)}1`),
        unit: "%",
      };
    }
    return {
      value: "1",
      numberValue: 1,
      unit: "%",
    };
  }
  return {
    value: value,
    numberValue: parseFloat(input.toFixed(decimals)),
    unit: "%",
  };
}

export const KbE = 1000;
export const MbE = 1000 * KbE;
export const GbE = 1000 * MbE;
export const TbE = 1000 * GbE;

export function formatSpeed(input: number, decimals = 0) {
  input /= 1000;
  if (input < 1) return { value: "-", unit: "" };

  const units = ["KbE", "MbE", "GbE", "TbE"];
  const k = 1000;
  let i = Math.floor(Math.log(input) / Math.log(k));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((input / Math.pow(k, i)).toFixed(decimals)),
    unit: units[i],
  };
}

export const K = 1000;
export const M = 1000 * K;
export const G = 1000 * M;
export const T = 1000 * G;
export const P = 1000 * T;
export function formatCount(input: number): FormattedResult {
  if (input === MAGIC_METRIC_NULL) {
    input = 0;
  }
  const units = ["", "K", "M", "G", "T", "P"];
  let i = Math.floor(Math.log(input || 1) / Math.log(K));
  i = i < 0 ? 0 : i > units.length - 1 ? units.length - 1 : i;
  return {
    value: parseFloat((input / Math.pow(K, i)).toFixed(2)),
    unit: units[i],
  };
}

export function formatNanoSecond(input: number): FormattedResult {
  if (input <= 0 || input === MAGIC_METRIC_NULL) {
    return {
      value: 0,
      unit: "",
    };
  }
  const units = ["ns", "μs", "ms", "s", "min", "h", "day"];
  const divider = [1000, 1000, 1000, 60, 60, 24];
  let multiplier = 1;
  for (let i = 0; i < divider.length; i++) {
    if (input < multiplier * divider[i]) {
      return {
        value: parseFloat((input / multiplier).toFixed(2)),
        unit: units[i],
      };
    }
    multiplier *= divider[i];
  }
  return {
    value: parseFloat((input / multiplier).toFixed(2)),
    unit: "day",
  };
}

export function formatTemperature(
  input: number,
  decimals = 2,
): FormattedResult {
  if (input === MAGIC_METRIC_NULL) {
    input = 0;
  }
  return {
    value: parseFloat(input.toFixed(decimals)),
    unit: "℃",
  };
}

export const unitRules = [
  {
    divider: [1000, 1000, 1000, 1000, 1000, 1000],
    unit: ["", "K", "M", "G", "T", "P"],
  },
  {
    divider: [1000, 1000, 1000, 1000, 1000, 1000],
    unit: ["bps", "Kbps", "Mbps", "Gbps", "Tbps", "Pbps"],
  },
  {
    divider: [1000, 1000, 1000, 1000, 1000, 1000],
    unit: ["Bps", "KBps", "MBps", "GBps", "TBps", "PBps"],
  },
  {
    divider: [1024, 1024, 1024, 1024, 1024, 1024],
    unit: ["B", "KiB", "MiB", "GiB", "TiB", "PiB"],
  },
  {
    divider: [1024, 1024, 1024, 1024, 1024, 1024],
    unit: ["B/s", "KiB/s", "MiB/s", "GiB/s", "TiB/s", "PiB/s"],
  },
  {
    divider: [1000, 1000, 1000, 60, 60, 24],
    unit: ["ns", "μs", "ms", "s", "min", "h"],
  },
  {
    divider: [1000, 1000, 1000, 1000, 1000],
    unit: ["Hz", "KHz", "MHz", "GHz", "THz"],
  },
];
