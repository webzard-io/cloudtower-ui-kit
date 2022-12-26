import { TiB } from "@tower/utils";

export const EMPTY_FUNCTION = () => {};
export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};
export const EMPTY_COMPONENT = () => null;

export const END_POINT = "/api";
export const WS_URI = `${
  window.location.protocol === "https:" ? "wss:" : "ws:"
}//${window.location.host}/api`;

export const CUSTOMIZE = "__customize__";

export const MAX_VOL_SIZE = 64 * TiB;

export const AUTO_SCHEDULE = "AUTO_SCHEDULE";

export const DAYJS_I18N_MAP: Record<string, string> = {
  "zh-CN": "zh-cn",
  "en-US": "en",
};
export const NO_FOLDER = "NO_FOLDER";
export const NO_DATACENTER = "NO_DATACENTER";

// default storage policy local_id
export const DEFAULT_STORAGE_POLICY_UUID =
  "dce52578-3824-4b34-97a2-af09950bb0ac";

export const WINDOWS = "WINDOWS";
export const LINUX = "LINUX";
