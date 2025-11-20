import { useEffect } from "react";

const useLegacyComponentWarning = (msg?: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        msg ??
          "Warning: LegacyComponent is deprecated and will be removed in future versions.",
      );
    }
  }, [msg]);
};

export default useLegacyComponentWarning;
