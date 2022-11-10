import {
  PreviewTasksQuery,
  TaskStatus,
  TaskTableQuery,
} from "@cloudtower/eagle/generated/react-hooks";
import { useKitSelector } from "@cloudtower/eagle/kit/smartx";
import { RootState } from "@cloudtower/eagle/kit/smartx";
import { Node } from "@cloudtower/eagle/kit/smartx";
import { IPV4_REGEXP, IPV6_REGEXP, URL_REGEXP } from "@tower/utils";
import { TOptions } from "i18next";
import { UseTranslationResponse } from "react-i18next";

// TODO handle this by better error code from connector
const UNSAFE_EXTRACT_DATA_REG = /message:\s*?({.+})/;
export const UNSAFE_EXTRACT_ERROR_REG = /"error":\s*?"([^"]+)"/;

export function trimRegExpStr(regExpStr: string) {
  return regExpStr.replace(/[\^$]/g, "");
}

export function extractHostnameBySvtServiceErrorMsg(code: string, msg: string) {
  const ipv4RegExpStr = trimRegExpStr(IPV4_REGEXP().source);
  const ipv6RegExpStr = trimRegExpStr(IPV6_REGEXP().source);
  const urlRegExpStr = trimRegExpStr(URL_REGEXP().source);
  const ipv4RegExp = new RegExp(
    `(?<=^${code}:\\s*)${ipv4RegExpStr}(?=(\\s|'))`,
    "g"
  );
  const ipv6RegExp = new RegExp(
    `(?<=^${code}:\\s*)${ipv6RegExpStr}(?=(\\s|'))`,
    "g"
  );
  const urlRegExp = new RegExp(
    `(?<=^${code}:\\s*)${urlRegExpStr}(?=(\\s|'))`,
    "g"
  );

  if (ipv4RegExp.test(msg)) {
    ipv4RegExp.lastIndex = 0;
    return msg.match(ipv4RegExp)?.[0];
  }

  if (ipv6RegExp.test(msg)) {
    ipv6RegExp.lastIndex = 0;
    return msg.match(ipv6RegExp)?.[0];
  }

  if (urlRegExp.test(msg)) {
    urlRegExp.lastIndex = 0;
    return msg.match(urlRegExp)?.[0];
  }
}

function extractJsonError(
  msg: string,
  i18n: UseTranslationResponse["i18n"]
): string | false {
  try {
    const data = JSON.parse(msg);
    const ec = data["ec"];
    if (ec === "EOK") {
      return false;
    }
    if (data[i18n.language]) {
      return data[i18n.language];
    } else if (ec) {
      return i18n.exists(`error.${`EC_${ec}`}`)
        ? i18n.td(`error.${`EC_${ec}`}`)
        : i18n.exists(`error.${ec}`)
        ? i18n.td(`error.${ec}`)
        : ec;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export function tryToExtractError(
  error_code: string | null | undefined,
  msg: string | null | undefined,
  i18n: UseTranslationResponse["i18n"]
): { msg: string; key?: string; options?: TOptions } {
  if (!msg) {
    return { msg: "" };
  }

  if (msg.startsWith("EC_")) {
    return { msg: i18n.td(`error.${msg}`) };
  }

  const errorInJson = extractJsonError(msg, i18n);
  if (typeof errorInJson === "string") {
    return { msg: errorInJson };
  }

  const matched = msg.match(UNSAFE_EXTRACT_DATA_REG);
  if (!matched) {
    const matched2 = msg.match(UNSAFE_EXTRACT_ERROR_REG);
    if (matched2?.[1]) {
      if (
        matched2[1].includes("SVT_SET_USER_PASSWD_FAILED") &&
        matched2[1].includes("guest-set-user-password")
      ) {
        const reg = /'guest-set-user-password':\s+(.+)/;
        const [, info = ""] = matched2[1].match(reg) || [];
        if (info) {
          return {
            msg: i18n.td("error.EC_GUEST_SET_USER_PASSWORD_FAILED", {
              info: info.trim(),
            }),
          };
        }
      }

      if (matched2[1].startsWith("SVT_")) {
        const reg = /^([A-Z_]+)/;
        const [error_code] = matched2[1].match(reg) || [];
        if (i18n.exists(`error.${error_code}`)) {
          return {
            key: error_code,
            msg: i18n.td(`error.${error_code}`),
          };
        }
      }

      return {
        msg: matched2[1],
      };
    }
    if (
      msg.includes("connect ETIMEDOUT") ||
      msg.includes("TimeoutError") ||
      msg.includes("connect EHOSTUNREACH")
    ) {
      return {
        msg: i18n.td("error.EC_TIME_OUT"),
      };
    }
    if (i18n.exists(`error.${error_code}`)) {
      return {
        msg: i18n.td(`error.${error_code}`),
      };
    }
    return {
      msg,
    };
  }

  try {
    let elfJobData;
    try {
      elfJobData = JSON.parse(matched[1]);
    } catch {
      // ignore
    }
    if (elfJobData?.job?.error_code) {
      const key = `error.${elfJobData.job.error_code}`;
      const options = {
        error_msg: elfJobData.job.error_msg,
        interpolation: {
          escapeValue: false,
        },
      };
      return { msg: i18n.td(key, options), key, options };
    }
    if (elfJobData?.job?.task_list) {
      const errorTask = elfJobData.job.task_list
        .filter((t: { error_code?: string }) => t.error_code)
        .sort((t: { error_code?: string }) => {
          return t.error_code === "JOB_FOLLOWER_FAILED_DUE_TO_DEPENDENCY"
            ? 1
            : -1;
        })[0];
      if (errorTask) {
        const { error_code, error_msg } = errorTask;
        const key = `error.${error_code}`;
        const options = {
          error_msg,
          interpolation: {
            escapeValue: false,
          },
        };
        return { msg: i18n.td(key, options), key, options };
      }
    }
    if (elfJobData?.ec) {
      const key = `error.EC_${elfJobData.ec}`;
      const options = {
        error_msg: elfJobData.error?.msg || "",
        interpolation: {
          escapeValue: false,
        },
      };
      return { msg: i18n.td(key, options), key, options };
    }
    if (i18n.exists(`error.${error_code}`)) {
      return { msg: i18n.td(`error.${error_code}`) };
    }
    return { msg: "parsed" };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("extract elf error failed", error);
    }
    return { msg };
  }
}

// TODO: wait for the server to repair, remove it, TOWER-387
const taskTimeMap: Record<
  string,
  {
    started_at: string;
    finished_at: string;
    cluster: TaskTableQuery["tasks"][0]["cluster"];
  }
> = {};
export const getTaskStartedAndFinished = (
  node: Pick<
    TaskTableQuery["tasks"][0],
    "id" | "started_at" | "status" | "cluster"
  >
) => {
  const { id, started_at, status, cluster } = node;

  if (!started_at) {
    return node;
  }

  const map = taskTimeMap;
  if (map[id] && [TaskStatus.Executing, TaskStatus.Pending].includes(status)) {
    return map[id];
  }

  if ([TaskStatus.Successed, TaskStatus.Failed].includes(status)) {
    if (map[id]) {
      const started_at = map[id].started_at;
      delete map[id];
      return {
        started_at,
        finished_at: new Date().toISOString(),
        cluster,
      };
    }
    return node;
  }

  const timeNow = Date.now();
  if (new Date(started_at).getTime() > timeNow) {
    const isoTime = new Date().toISOString();
    map[id] = { started_at: isoTime, finished_at: "", cluster };
    return map[id];
  }

  return node;
};

export const isMigrationCompleted = (
  task: Pick<PreviewTasksQuery["tasks"][0], "steps" | "args">
) => {
  for (const step of task.steps) {
    if (step.key === "MIGRATE") {
      if (step.finished) {
        return true;
      }
      if (task.args?.transmit_data_progress === 1) {
        return true;
      }
    }
  }
  return false;
};

export function useFilterExecutingTask(
  filter?: (task: Node, index: number, array: Node[]) => unknown
): Node[] {
  const allExecutingTasks = useKitSelector<RootState["task"]["executing"]>(
    (state) => state.task.executing
  ).filter((task) => !task.internal && task.status !== TaskStatus.Paused);

  if (!filter) {
    return allExecutingTasks;
  }

  return allExecutingTasks.filter(filter);
}

export const parseErrorString = (
  errorString: string | undefined,
  i18n: UseTranslationResponse["i18n"]
) => {
  let errorResult = "";
  if (errorString) {
    try {
      const errorRecord = JSON.parse(errorString);
      const { msg } = tryToExtractError(
        errorRecord?.code,
        errorRecord?.message,
        i18n
      );
      errorResult = msg;
    } catch {
      errorResult = errorString || "";
    }
  }
  return errorResult;
};
