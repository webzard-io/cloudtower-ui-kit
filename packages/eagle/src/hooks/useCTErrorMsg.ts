import useParrotTranslation from "./useParrotTranslation";
import { CTError, parseCTError } from "@src/utils/cterror";
import { useMemo } from "react";
import { TOptions } from "i18next";
import { merge } from "lodash";
import { useConfig } from "@src/core/ConfigProvider";

export type UseCTErrorMsgOptions = {
  CTErrorI18nNs?: string;
  tOptions?: TOptions;
};

export const useCTErrorMsg = (
  error: CTError,
  options?: UseCTErrorMsgOptions,
) => {
  const { t } = useParrotTranslation();
  const globalConfig = useConfig();
  const err = parseCTError(error);

  // 优先级处理：options > 全局配置 > 默认值
  const ns = options?.CTErrorI18nNs || globalConfig?.ctErrorI18nNs || "CTError";

  const errMsg = useMemo(() => {
    return err.map((e) => {
      if ("code" in e) {
        return t(`${ns}.${e.code}`, merge(options?.tOptions, e.params));
      }
      return e.message;
    });
  }, [err, t, ns, options?.tOptions]);

  return errMsg;
};
