import { CTErrorType as CloudTowerErrorResponse } from "@src/utils/type";
import { AxiosError } from "axios";
import { isNil } from "lodash";

// 修复类型定义，支持混合的 code 和 message
type ParsedCTErrorItem =
  | {
      code?: string | number;
      params?: CloudTowerErrorResponse["params"];
      message?: string;
    }
  | { message: string };

type ParsedCTError = ParsedCTErrorItem[];

export type CTError =
  | AxiosError<CloudTowerErrorResponse>
  | CloudTowerErrorResponse;

// 响应错误检查函数
export const isResponseCTError = (
  error: unknown,
): error is CloudTowerErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    ("code" in error || "message" in error || "details" in error)
  );
};

/**
 * 处理响应错误
 */
export const handleResponseCTError = (
  error: CloudTowerErrorResponse,
): ParsedCTError => {
  // 仅展示带有可用 reason 的 details；如果全部缺失 reason，则使用外层 code 兜底。
  if ("details" in error && error.details?.length) {
    const validDetails = error.details.filter(
      (detail) => !isNil(detail.reason) && detail.reason !== "",
    );

    if (validDetails.length) {
      return validDetails.map((detail) => ({
        code: detail.reason,
        ...(!isNil(detail.message) ? { message: detail.message } : {}),
        ...(!isNil(detail.params) ? { params: detail.params } : {}),
      }));
    }

    return [
      {
        ...(!isNil(error.code) ? { code: error.code } : {}),
      },
    ];
  } else if ("code" in error) {
    // 否则，使用 code
    const code = error.code;
    if (!isNil(code)) {
      return [{ code, params: error.params }];
    }
  }

  if ("message" in error && typeof error.message === "string") {
    return [{ message: error.message }];
  }

  return [{ message: String(error) }];
};

type AxiosCTError = AxiosError<CloudTowerErrorResponse>;

// 检查是否是 Axios 错误
// https://github.com/axios/axios/blob/a406a93e2d99c3317596f02f3537f5457a2a80fd/lib/helpers/isAxiosError.js
export const isAxiosCTError = (error: unknown): error is AxiosCTError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as any).isAxiosError === true
  );
};

/**
 * 处理 Axios 错误
 */
export const handleAxiosCTError = (error: AxiosCTError): ParsedCTError => {
  if (error.response?.data) {
    const responseData = error.response.data;
    // 如果 response.data 包含 details
    if (responseData && typeof responseData === "object") {
      const respError = handleResponseCTError(responseData);
      if (respError.length) {
        return respError;
      }
    }
  }

  return [{ code: `AXIOS_${error.code}` }];
};

/**
 * 统一错误处理函数
 * @param error - 各种类型的错误对象
 * @returns 解析后的错误信息，包含 code 或 message
 */
export const parseCTError = (error: CTError): ParsedCTError => {
  if (typeof error === "object" && error !== null) {
    // 处理 Axios 错误
    if (isAxiosCTError(error)) {
      return handleAxiosCTError(error);
    }

    // 处理响应错误
    if (isResponseCTError(error)) {
      return handleResponseCTError(error);
    }

    // 后续新增其他错误类型解析，可以在这里处理， 例如 graphql 错误等

    try {
      return [{ message: JSON.stringify(error) }];
    } catch {
      return [{ message: String(error) }];
    }
  }
  // 兜底处理未知错误
  return [{ message: String(error) }];
};
