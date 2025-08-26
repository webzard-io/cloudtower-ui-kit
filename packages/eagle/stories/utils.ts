import React from "react";

// 自定义 hook 模拟 React Query 的行为
export const useMockQuery = (options?: {
  enabled?: boolean;
  shouldFail?: boolean; // 是否模拟失败
  failFirstTime?: boolean; // 是否第一次失败
}) => {
  const [state, setState] = React.useState<{
    isLoading: boolean;
    data: any;
    error: string | null;
  }>({
    isLoading: true,
    data: null,
    error: null,
  });

  const attemptCountRef = React.useRef(0);

  const fetchData = React.useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (options?.shouldFail) {
        throw new Error("模拟网络错误");
      }

      if (options?.failFirstTime && attemptCountRef.current === 0) {
        throw new Error("第一次加载失败，请重试");
      }

      setState((prev) => ({ ...prev, isLoading: false, data: "模拟数据" }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "数据获取错误",
      }));
    }

    // 在 try-catch 之后增加尝试次数
    attemptCountRef.current += 1;
  }, [options?.shouldFail, options?.failFirstTime]);

  const retry = React.useCallback(() => {
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    if (options?.enabled !== false) {
      fetchData();
    }
  }, [fetchData, options?.enabled]);

  return {
    ...state,
    refetch: fetchData,
    retry,
    attemptCount: attemptCountRef.current,
  };
};
