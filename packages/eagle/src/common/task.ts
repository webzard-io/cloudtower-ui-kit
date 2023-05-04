import { UseTranslationResponse } from "react-i18next";
import { TOptions } from "i18next";

const UNSAFE_EXTRACT_DATA_REG = /message:\s*?({.+})/;
export const UNSAFE_EXTRACT_ERROR_REG = /"error":\s*?"([^"]+)"/;

function extractJsonError(
  msg: string,
  i18n: UseTranslationResponse<unknown>["i18n"]
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

const httpCodeMap: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Time-out",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Time-out",
  505: "HTTP Version not supported",
};

export function tryToExtractError(
  error_code: string | null | undefined,
  msg: string | null | undefined,
  i18n: UseTranslationResponse<unknown>["i18n"]
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
    if (msg.includes("TimeoutError") || msg.includes("socket hang up")) {
      return {
        msg: i18n.td("error.EC_TIME_OUT"),
      };
    }

    if (msg.includes("HTTPError")) {
      const errorResCode = msg.match(/HTTPError:(\w*\s*)*(\d*)\(/);
      if (errorResCode) {
        const httpCodeMap2ErrorMsg = httpCodeMap[+errorResCode[1]];
        if (i18n.exists(`httpCode.${httpCodeMap2ErrorMsg}`)) {
          switch (httpCodeMap2ErrorMsg) {
            case "UNAUTHORIZED":
              return { msg: i18n.td("error.LOAD_CLUSTER_UNAUTHORIZED") };
            default:
              return { msg: i18n.td(`httpCode.${httpCodeMap2ErrorMsg}`) };
          }
        }
      }
    }

    if (msg.includes("RequestError")) {
      const requestErrorCode = msg.match(/RequestError.*\s([A-Z]+)/);
      if (
        requestErrorCode &&
        i18n.exists(`requestCode.${requestErrorCode[1]}`)
      ) {
        switch (requestErrorCode[1]) {
          case "ETIMEDOUT":
            return { msg: i18n.td("error.EC_TIME_OUT") };
          case "EHOSTUNREACH":
          case "ENETUNREACH":
            return { msg: i18n.td("error.NETWORK_ERROR") };
          default:
            return { msg: i18n.td(`requestCode.${requestErrorCode[1]}`) };
        }
      }
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
        const key = i18n.exists(`error.${`EC_${error_code}`}`)
          ? `error.EC_${error_code}`
          : `error.${error_code}`;
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
