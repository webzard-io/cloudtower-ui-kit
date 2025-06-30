import { renderHook } from "@testing-library/react-hooks";
import { useCTErrorMsg, UseCTErrorMsgOptions } from "../useCTErrorMsg";
import { CTError } from "@src/utils/cterror";
import { CTErrorType as CloudTowerErrorResponse } from "@src/utils/type";
import { AxiosError } from "axios";
import { parrotI18n } from "@cloudtower/parrot";
import { vitest } from "vitest";
import { omit } from "lodash";
import React from "react";
import { ConfigProvider } from "@src/core/ConfigProvider";

const tSpy = vitest.spyOn(parrotI18n, "t");

// 创建模拟的错误对象辅助函数
const createMockCloudTowerError = (
  partial: Partial<CloudTowerErrorResponse>,
): CloudTowerErrorResponse => {
  return {
    towerCodeVersion: "v1",
    code: "MOCK_ERROR",
    message: "Mock error message",
    ...partial,
  } as CloudTowerErrorResponse;
};

const createMockAxiosError = (
  partial: Partial<AxiosError<CloudTowerErrorResponse>>,
): AxiosError<CloudTowerErrorResponse> => {
  return {
    isAxiosError: true,
    config: { headers: {} } as any,
    code: "MOCK_CODE",
    message: "Mock error",
    name: "AxiosError",
    toJSON: () => ({}),
    ...partial,
  } as AxiosError<CloudTowerErrorResponse>;
};

const defaultTOptions = {
  ns: "common",
  keyPrefix: undefined,
  lng: undefined,
  lngs: null,
};

describe("useCTErrorMsg", () => {
  beforeEach(() => {
    tSpy.mockReset();
  });
  describe("CloudTowerErrorResponse 处理", () => {
    it("应该正确翻译带有单个错误码的错误", () => {
      const error = createMockCloudTowerError({
        code: "PERMISSION_DENIED",
        params: { resource: "user-A" },
      });

      const { result } = renderHook(() =>
        useCTErrorMsg(error, {
          tOptions: {
            defaultValue:
              "User { resource } is not allowed to access this resource",
          },
        }),
      );

      expect(tSpy).toHaveBeenCalledWith("CTError.PERMISSION_DENIED", {
        ...defaultTOptions,
        defaultValue:
          "User { resource } is not allowed to access this resource",
        resource: "user-A",
      });
      expect(result.current).toEqual([
        "User user-A is not allowed to access this resource",
      ]);
    });

    it("应该处理带有多个 details 的错误", () => {
      const error = createMockCloudTowerError({
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
      });

      const { result } = renderHook(() => useCTErrorMsg(error));

      expect(tSpy).toHaveBeenCalledWith("CTError.INVALID_PARAMETER", {
        ...defaultTOptions,
        field: "username",
      });
      expect(tSpy).toHaveBeenCalledWith("CTError.REQUIRED_FIELD", {
        ...defaultTOptions,
        field: "password",
      });
      expect(result.current).toEqual([
        "CTError.INVALID_PARAMETER",
        "CTError.REQUIRED_FIELD",
      ]);
    });

    it("应该处理只有 message 的错误", () => {
      const error = createMockCloudTowerError({
        message: "Something went wrong",
      });

      const { result } = renderHook(() =>
        useCTErrorMsg(omit(error, "code") as any),
      );

      // message 类型的错误不应该调用翻译
      expect(tSpy).not.toHaveBeenCalled();
      expect(result.current).toEqual(["Something went wrong"]);
    });

    it("应该处理混合的 code 和 message 错误", () => {
      const error = createMockCloudTowerError({
        details: [
          {
            reason: "VALIDATION_ERROR",
            message: "Direct error message",
            params: { field: "email" },
          },
          {
            reason: "PERMISSION_DENIED",
            params: { resource: "user" },
          },
        ],
      });

      const { result } = renderHook(() => useCTErrorMsg(error));

      expect(tSpy).toHaveBeenCalledWith("CTError.VALIDATION_ERROR", {
        ...defaultTOptions,
        field: "email",
      });
      expect(tSpy).toHaveBeenCalledWith("CTError.PERMISSION_DENIED", {
        ...defaultTOptions,
        resource: "user",
      });
      expect(result.current).toEqual([
        "CTError.VALIDATION_ERROR",
        "CTError.PERMISSION_DENIED",
      ]);
    });
  });

  describe("AxiosError 处理", () => {
    it("应该处理 Axios 错误中的 CloudTowerErrorResponse", () => {
      const axiosError = createMockAxiosError({
        code: "NETWORK_ERROR",
        response: {
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: {} as any,
          data: createMockCloudTowerError({
            details: [
              {
                reason: "SERVER_ERROR",
                params: { server: "api-01" },
              },
            ],
          }),
        },
      });

      const { result } = renderHook(() => useCTErrorMsg(axiosError));

      expect(tSpy).toHaveBeenCalledWith("CTError.SERVER_ERROR", {
        ...defaultTOptions,
        server: "api-01",
      });
      expect(result.current).toEqual(["CTError.SERVER_ERROR"]);
    });

    it("应该处理没有 response.data 的 Axios 错误", () => {
      const axiosError = createMockAxiosError({
        code: "NETWORK_ERROR",
      });

      const { result } = renderHook(() => useCTErrorMsg(axiosError));

      expect(tSpy).toHaveBeenCalledWith("CTError.AXIOS_NETWORK_ERROR", {
        ...defaultTOptions,
      });
      expect(result.current).toEqual(["CTError.AXIOS_NETWORK_ERROR"]);
    });
  });

  describe("未知错误处理", () => {
    it("应该处理字符串错误", () => {
      const error = "Simple error message";

      const { result } = renderHook(() => useCTErrorMsg(error as any));

      expect(tSpy).not.toHaveBeenCalled();
      expect(result.current).toEqual(["Simple error message"]);
    });

    it("应该处理对象错误", () => {
      const error = { unknownField: "value" };

      const { result } = renderHook(() => useCTErrorMsg(error as any));

      expect(tSpy).not.toHaveBeenCalled();
      expect(result.current).toEqual(['{"unknownField":"value"}']);
    });

    it("应该处理 null 和 undefined", () => {
      const { result: nullResult } = renderHook(() =>
        useCTErrorMsg(null as any),
      );
      const { result: undefinedResult } = renderHook(() =>
        useCTErrorMsg(undefined as any),
      );

      expect(nullResult.current).toEqual(["null"]);
      expect(undefinedResult.current).toEqual(["undefined"]);
    });
  });

  describe("选项配置", () => {
    it("应该使用自定义的命名空间", () => {
      const error = createMockCloudTowerError({
        code: "CUSTOM_ERROR",
      });

      const { result } = renderHook(() =>
        useCTErrorMsg(error, { CTErrorI18nNs: "CustomErrors" }),
      );

      expect(tSpy).toHaveBeenCalledWith("CustomErrors.CUSTOM_ERROR", {
        ...defaultTOptions,
      });
      expect(result.current).toEqual(["CustomErrors.CUSTOM_ERROR"]);
    });

    it("应该合并自定义的翻译选项", () => {
      const error = createMockCloudTowerError({
        code: "VALIDATION_ERROR",
        params: { field: "username" },
      });

      const customTOptions = {
        defaultValue: "Default error message",
        count: 1,
      };

      const { result } = renderHook(() =>
        useCTErrorMsg(error, { tOptions: customTOptions }),
      );

      expect(tSpy).toHaveBeenCalledWith("CTError.VALIDATION_ERROR", {
        ...defaultTOptions,
        defaultValue: "Default error message",
        count: 1,
        field: "username",
      });

      expect(result.current).toEqual(["Default error message"]);
    });

    it("应该同时使用自定义命名空间和翻译选项", () => {
      const error = createMockCloudTowerError({
        code: "PERMISSION_ERROR",
        params: { resource: "document" },
      });

      const options: UseCTErrorMsgOptions = {
        CTErrorI18nNs: "Permissions",
        tOptions: { interpolation: { escapeValue: false } },
      };

      const { result } = renderHook(() => useCTErrorMsg(error, options));

      expect(tSpy).toHaveBeenCalledWith("Permissions.PERMISSION_ERROR", {
        ...defaultTOptions,
        interpolation: { escapeValue: false },
        resource: "document",
      });

      expect(result.current).toEqual(["Permissions.PERMISSION_ERROR"]);
    });
  });

  describe("全局配置", () => {
    it("应该使用全局配置的命名空间", () => {
      const error = createMockCloudTowerError({
        code: "GLOBAL_ERROR",
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider config={{ ctErrorI18nNs: "GlobalErrors" }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(() => useCTErrorMsg(error), { wrapper });

      expect(tSpy).toHaveBeenCalledWith("GlobalErrors.GLOBAL_ERROR", {
        ...defaultTOptions,
      });
      expect(result.current).toEqual(["GlobalErrors.GLOBAL_ERROR"]);
    });

    it("应该优先使用 options 中的命名空间而非全局配置", () => {
      const error = createMockCloudTowerError({
        code: "PRIORITY_ERROR",
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider config={{ ctErrorI18nNs: "GlobalErrors" }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(
        () => useCTErrorMsg(error, { CTErrorI18nNs: "LocalErrors" }),
        { wrapper },
      );

      expect(tSpy).toHaveBeenCalledWith("LocalErrors.PRIORITY_ERROR", {
        ...defaultTOptions,
      });
      expect(result.current).toEqual(["LocalErrors.PRIORITY_ERROR"]);
    });

    it("应该在没有全局配置时使用默认命名空间", () => {
      const error = createMockCloudTowerError({
        code: "DEFAULT_ERROR",
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ConfigProvider>{children}</ConfigProvider>
      );

      const { result } = renderHook(() => useCTErrorMsg(error), { wrapper });

      expect(tSpy).toHaveBeenCalledWith("CTError.DEFAULT_ERROR", {
        ...defaultTOptions,
      });
      expect(result.current).toEqual(["CTError.DEFAULT_ERROR"]);
    });

    it("应该在没有 ConfigProvider 时使用默认命名空间", () => {
      const error = createMockCloudTowerError({
        code: "NO_PROVIDER_ERROR",
      });

      const { result } = renderHook(() => useCTErrorMsg(error));

      expect(tSpy).toHaveBeenCalledWith("CTError.NO_PROVIDER_ERROR", {
        ...defaultTOptions,
      });
      expect(result.current).toEqual(["CTError.NO_PROVIDER_ERROR"]);
    });
  });

  describe("响应式更新", () => {
    it("当错误对象变化时应该重新计算", () => {
      const error1 = createMockCloudTowerError({
        code: "ERROR_1",
      });

      const error2 = createMockCloudTowerError({
        code: "ERROR_2",
      });

      const { result, rerender } = renderHook(
        ({ error }: { error: CTError }) => useCTErrorMsg(error),
        { initialProps: { error: error1 } },
      );

      expect(result.current).toEqual(["CTError.ERROR_1"]);

      rerender({ error: error2 });

      expect(result.current).toEqual(["CTError.ERROR_2"]);
      expect(tSpy).toHaveBeenCalledWith("CTError.ERROR_1", {
        ...defaultTOptions,
      });
      expect(tSpy).toHaveBeenCalledWith("CTError.ERROR_2", {
        ...defaultTOptions,
      });
    });

    it("当选项变化时应该重新计算", () => {
      const error = createMockCloudTowerError({
        code: "SAME_ERROR",
      });

      const { result, rerender } = renderHook(
        ({ options }: { options?: UseCTErrorMsgOptions }) =>
          useCTErrorMsg(error, options),
        { initialProps: { options: { CTErrorI18nNs: "Namespace1" } } },
      );

      expect(result.current).toEqual(["Namespace1.SAME_ERROR"]);

      rerender({ options: { CTErrorI18nNs: "Namespace2" } });

      expect(result.current).toEqual(["Namespace2.SAME_ERROR"]);
    });
  });

  describe("错误边界情况", () => {
    it("应该处理 params 为空或 undefined 的情况", () => {
      const error = createMockCloudTowerError({
        details: [
          {
            reason: "ERROR_WITHOUT_PARAMS",
            // params 为 undefined
          },
          {
            reason: "ERROR_WITH_NULL_PARAMS",
            params: null as any,
          },
        ],
      });

      const { result } = renderHook(() => useCTErrorMsg(error));

      expect(tSpy).toHaveBeenCalledWith("CTError.ERROR_WITHOUT_PARAMS", {
        ...defaultTOptions,
      });
      expect(tSpy).toHaveBeenCalledWith("CTError.ERROR_WITH_NULL_PARAMS", {
        ...defaultTOptions,
      });
      expect(result.current).toEqual([
        "CTError.ERROR_WITHOUT_PARAMS",
        "CTError.ERROR_WITH_NULL_PARAMS",
      ]);
    });

    it("应该处理空的错误数组", () => {
      // 创建一个会导致空 parseCTError 结果的错误
      const error = createMockCloudTowerError({
        details: [],
        code: "", // 空字符串，会 fallback 到 message
        message: "", // 也是空字符串
      });

      const { result } = renderHook(() => useCTErrorMsg(error));

      // 根据 parseCTError 的实现，这种情况会返回空 message
      expect(result.current).toEqual([""]);
    });
  });
});
