import { useEffect, useState } from "react";

import type { SmallDialogProps } from "./SmallDialog.type";

/** 记录一次挂载周期内的首次初始化成功，成功前仍允许失败重试。 */
export const useDialogInitialization = ({
  initializeOnce = true,
  initializing,
  initializingError,
}: Pick<
  SmallDialogProps,
  "initializeOnce" | "initializing" | "initializingError"
>) => {
  const [initialized, setInitialized] = useState(
    () => !initializing && !initializingError,
  );

  useEffect(() => {
    if (!initialized && !initializing && !initializingError) {
      setInitialized(true);
    }
  }, [initialized, initializing, initializingError]);

  const ignoreInitialization = initializeOnce && initialized;

  return {
    initializing: ignoreInitialization ? false : initializing,
    initializingError: ignoreInitialization ? undefined : initializingError,
  };
};
