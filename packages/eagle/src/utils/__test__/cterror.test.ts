import { CTErrorType as CloudTowerErrorResponse } from "@src/utils/type";
import { merge, omit } from "lodash";
import { parseCTError } from "../cterror";
import { AxiosError } from "axios";

const CTErrorBasicParams: Pick<CloudTowerErrorResponse, "code" | "message"> = {
  code: "UNKNOWN",
  message: "unknown error",
};
const AxiosCTErrorBasicParams: AxiosError<CloudTowerErrorResponse> = {
  isAxiosError: true,
  code: "NETWORK_ERROR",
  message: "Network Error",
  name: "AxiosError",
  config: {} as any,
  toJSON: () => ({}),
  response: {
    status: 200,
    statusText: "OK",
    headers: {},
    config: {} as any,
    data: {
      ...CTErrorBasicParams,
    },
  },
};
// 简化的测试数据类型，避免复杂的外部依赖类型问题
describe("cterror", () => {
  describe("parseCTError", () => {
    describe("CloudTowerErrorResponse 处理", () => {
      it("应该处理带有单个 detail 的错误", () => {
        const error: CloudTowerErrorResponse = {
          ...CTErrorBasicParams,
          details: [
            {
              reason: "INVALID_PARAMETER",
              params: { field: "username" },
            },
          ],
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            code: "INVALID_PARAMETER",
            params: { field: "username" },
          },
        ]);
      });

      it("应该处理带有多个 details 的错误", () => {
        const error: CloudTowerErrorResponse = {
          ...CTErrorBasicParams,
          details: [
            {
              reason: "INVALID_PARAMETER",
              params: { field: "username" },
            },
            {
              reason: "REQUIRED_FIELD",
              params: { field: "password" },
            },
          ],
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            code: "INVALID_PARAMETER",
            params: { field: "username" },
          },
          {
            code: "REQUIRED_FIELD",
            params: { field: "password" },
          },
        ]);
      });

      it("应该处理带有 code 但没有 details 的错误", () => {
        const error: CloudTowerErrorResponse = {
          message: "Permission denied",
          code: "PERMISSION_DENIED",
          params: { resource: "user" },
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            code: "PERMISSION_DENIED",
            params: { resource: "user" },
          },
        ]);
      });

      it("应该处理只有 message 的错误", () => {
        const error = {
          towerCodeVersion: "v1",
          message: "Something went wrong",
        };

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "Something went wrong",
          },
        ]);
      });

      it("应该处理 details 中没有 reason 的情况", () => {
        const error: CloudTowerErrorResponse = {
          ...CTErrorBasicParams,
          details: [
            {
              params: { field: "username" },
            },
          ],
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            params: { field: "username" },
          },
        ]);
      });

      it("应该处理空 details 数组, fallback 到 code 上", () => {
        const error: CloudTowerErrorResponse = {
          ...CTErrorBasicParams,
          details: [],
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            code: "UNKNOWN",
          },
        ]);
      });

      it("应该处理 details 中同时有 reason 和 message 的情况", () => {
        const error: CloudTowerErrorResponse = {
          ...CTErrorBasicParams,
          details: [
            {
              reason: "VALIDATION_ERROR",
              message: "Field validation failed",
              params: { field: "email" },
            },
          ],
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            code: "VALIDATION_ERROR",
            message: "Field validation failed",
            params: { field: "email" },
          },
        ]);
      });

      it("应该处理空字符串 code 的情况", () => {
        const error: CloudTowerErrorResponse = {
          ...CTErrorBasicParams,
          code: "",
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            message: "unknown error",
          },
        ]);
      });
    });

    describe("AxiosError 处理", () => {
      it("应该处理带有 CloudTowerErrorResponse 数据的 Axios 错误", () => {
        const axiosError: AxiosError<CloudTowerErrorResponse> = merge(
          {},
          AxiosCTErrorBasicParams,
          {
            response: {
              data: {
                details: [
                  {
                    reason: "SERVER_ERROR",
                    params: { server: "api-01" },
                  },
                ],
              },
            },
          },
        );

        const result = parseCTError(axiosError);

        expect(result).toEqual([
          {
            code: "SERVER_ERROR",
            params: { server: "api-01" },
          },
        ]);
      });

      it("应该处理没有 response.data 的 Axios 错误", () => {
        const axiosError: AxiosError<CloudTowerErrorResponse> = omit(
          AxiosCTErrorBasicParams,
          "response.data",
        );

        const result = parseCTError(axiosError);

        expect(result).toEqual([
          {
            code: "AXIOS_NETWORK_ERROR",
          },
        ]);
      });

      it("应该处理 response.data 为空的 Axios 错误", () => {
        const axiosError: AxiosError<CloudTowerErrorResponse> = merge(
          {},
          AxiosCTErrorBasicParams,
          {
            isAxiosError: true,
            code: "TIMEOUT",
            message: "Timeout Error",
            response: {
              data: null,
            },
          },
        );

        const result = parseCTError(axiosError);

        expect(result).toEqual([
          {
            code: "AXIOS_TIMEOUT",
          },
        ]);
      });

      it("应该处理 response.data 不是对象的 Axios 错误", () => {
        const axiosError: AxiosError<CloudTowerErrorResponse> = merge(
          {},
          AxiosCTErrorBasicParams,
          {
            isAxiosError: true,
            code: "ERR_BAD_REQUEST",
            message: "Bad Request",
            response: {
              data: "Plain text error",
            },
          },
        );

        const result = parseCTError(axiosError);

        expect(result).toEqual([
          {
            code: "AXIOS_ERR_BAD_REQUEST",
          },
        ]);
      });

      it("应该处理 response.data 返回空错误数组的情况", () => {
        const axiosError: AxiosError<CloudTowerErrorResponse> = merge(
          {},
          AxiosCTErrorBasicParams,
          {
            response: {
              data: {
                ...CTErrorBasicParams,
                details: [],
              },
            },
          },
        );

        const result = parseCTError(axiosError);

        expect(result).toEqual([
          {
            code: "UNKNOWN",
          },
        ]);
      });
    });

    describe("未知错误处理", () => {
      it("应该处理字符串错误", () => {
        const error = "Simple error message";

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "Simple error message",
          },
        ]);
      });

      it("应该处理数字错误", () => {
        const error = 404;

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "404",
          },
        ]);
      });

      it("应该处理 null 错误", () => {
        const error = null;

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "null",
          },
        ]);
      });

      it("应该处理 undefined 错误", () => {
        const error = undefined;

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "undefined",
          },
        ]);
      });

      it("应该处理不符合任何已知格式的对象错误", () => {
        const error = {
          unknownField: "unknown value",
          anotherField: 123,
        };

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: '{"unknownField":"unknown value","anotherField":123}',
          },
        ]);
      });

      it("应该处理 Error 实例", () => {
        const error = new Error("Standard error message");

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "Standard error message",
          },
        ]);
      });

      it("应该处理 boolean 错误", () => {
        const error = false;

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "false",
          },
        ]);
      });

      it("应该处理 Symbol 错误", () => {
        const error = Symbol("test");

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "Symbol(test)",
          },
        ]);
      });
    });

    describe("边界情况", () => {
      it("应该处理 isAxiosError 为 false 的对象", () => {
        const error = {
          isAxiosError: false,
          code: "NOT_AXIOS",
          message: "Not an axios error",
        };

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            code: "NOT_AXIOS",
          },
        ]);
      });

      it("应该处理没有 isAxiosError 属性但有 code 的对象", () => {
        const error = {
          code: "CUSTOM_ERROR",
          message: "Custom error message",
        };

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            code: "CUSTOM_ERROR",
          },
        ]);
      });

      it("应该处理空对象", () => {
        const error = {};

        const result = parseCTError(error as any);

        expect(result).toEqual([
          {
            message: "{}",
          },
        ]);
      });

      it("应该处理包含循环引用的对象", () => {
        const error: any = {
          code: "CIRCULAR_REF",
        };
        error.self = error; // 创建循环引用

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            code: "CIRCULAR_REF",
          },
        ]);
      });
    });

    describe("复杂场景", () => {
      it("应该优先处理 Axios 错误而不是普通响应错误", () => {
        // 创建一个既有 isAxiosError 又有 CloudTowerErrorResponse 结构的对象
        const error = {
          isAxiosError: true,
          code: "NETWORK_ERROR",
          message: "Network Error",
          response: {
            data: {
              code: "SERVER_ERROR",
              message: "Server error message",
            },
          },
          // 同时也有 CloudTowerErrorResponse 的字段
          details: [
            {
              reason: "DIRECT_ERROR",
            },
          ],
        };

        const result = parseCTError(error as any);

        // 应该按 Axios 错误处理，使用 response.data 中的信息
        expect(result).toEqual([
          {
            code: "SERVER_ERROR",
          },
        ]);
      });

      it("应该处理嵌套的错误结构", () => {
        const axiosError = {
          isAxiosError: true,
          code: "ERR_NETWORK",
          message: "Network Error",
          response: {
            data: {
              details: [
                {
                  reason: "DATABASE_CONNECTION_FAILED",
                  params: {
                    database: "users",
                    host: "db-server-01",
                  },
                },
                {
                  reason: "RETRY_LIMIT_EXCEEDED",
                  params: {
                    maxRetries: 3,
                    actualRetries: 3,
                  },
                },
              ],
            },
          },
        };

        const result = parseCTError(axiosError as any);

        expect(result).toEqual([
          {
            code: "DATABASE_CONNECTION_FAILED",
            params: {
              database: "users",
              host: "db-server-01",
            },
          },
          {
            code: "RETRY_LIMIT_EXCEEDED",
            params: {
              maxRetries: 3,
              actualRetries: 3,
            },
          },
        ]);
      });

      // 新增：测试多层嵌套的复杂场景
      it("应该正确处理混合类型的 details", () => {
        const error: CloudTowerErrorResponse = {
          ...CTErrorBasicParams,
          details: [
            {
              reason: "VALIDATION_ERROR",
              message: "Validation failed",
              params: { field: "email" },
            },
            {
              reason: "PERMISSION_DENIED",
              params: { resource: "user", action: "create" },
            },
            {
              // 没有 reason 的情况
              message: "Unknown detail error",
              params: { context: "additional" },
            },
          ],
        };

        const result = parseCTError(error);

        expect(result).toEqual([
          {
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            params: { field: "email" },
          },
          {
            code: "PERMISSION_DENIED",
            params: { resource: "user", action: "create" },
          },
          {
            message: "Unknown detail error",
            params: { context: "additional" },
          },
        ]);
      });
    });
  });
});
