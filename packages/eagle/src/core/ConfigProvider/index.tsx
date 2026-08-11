import "dayjs/locale/zh-cn";
import "dayjs/locale/ja";
import "moment/locale/ja";
import "moment/locale/zh-cn";

import { ParrotLngs } from "@cloudtower/parrot";
import { useAntdPatchEnLocales } from "@src/hooks/useAntdPatchEnLocales";
import { useAntdPatchJaLocales } from "@src/hooks/useAntdPatchJaLocales";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { ConfigProvider as Antd4ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import enUS from "antd/lib/locale/en_US";
import jaJP from "antd/lib/locale/ja_JP";
import zhCN from "antd/lib/locale/zh_CN";
import {
  ConfigProvider as Antd5ConfigProvider,
  ConfigProviderProps as Antd5ConfigProviderProps,
} from "antd5";
import antd5enUS from "antd5/lib/locale/en_US";
import antd5jaJP from "antd5/lib/locale/ja_JP";
import antd5zhCN from "antd5/lib/locale/zh_CN";
import dayjs from "dayjs";
import moment from "moment";
import React, { createContext, useContext, useEffect } from "react";

// 完整的配置类型
export type ConfigProps = {
  antd4Configs?: ConfigProviderProps;
  antd5Configs?: Antd5ConfigProviderProps;
  config?: {
    /** CTError i18n 命名空间 */
    CTErrorI18nNs?: string;
  };
};

// 创建 CTError 配置 Context
const ConfigProviderContext = createContext<ConfigProps["config"]>({});

// 导出获取 CTError 配置的 hook
export const useConfig = (): ConfigProps["config"] => {
  return useContext(ConfigProviderContext);
};

export const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProps>> = ({
  antd5Configs,
  antd4Configs,
  config = {},
  children,
}) => {
  const { i18n } = useParrotTranslation();
  useEffect(() => {
    const adjustDateLocale = (lng: ParrotLngs) => {
      const localeMap = {
        [ParrotLngs.zh]: "zh-cn",
        [ParrotLngs.en]: "en",
        [ParrotLngs.ja]: "ja",
      };
      moment.locale(localeMap[lng] ?? "en");
      dayjs.locale(localeMap[lng] ?? "en");
    };
    i18n.on("languageChanged", adjustDateLocale);
    // init
    adjustDateLocale(i18n.language as ParrotLngs);
  }, [i18n]);

  const patchEnLocale = useAntdPatchEnLocales(enUS);
  const patchAntd4JaLocale = useAntdPatchJaLocales(jaJP);
  const patchAntd5JaLocale = useAntdPatchJaLocales(antd5jaJP);
  const lng = i18n.language as ParrotLngs;
  const antd5Locales = {
    [ParrotLngs.zh]: antd5zhCN,
    [ParrotLngs.en]: antd5enUS,
    [ParrotLngs.ja]: patchAntd5JaLocale,
  };
  const antd4Locales = {
    [ParrotLngs.zh]: zhCN,
    [ParrotLngs.en]: patchEnLocale,
    [ParrotLngs.ja]: patchAntd4JaLocale,
  };
  return (
    <ConfigProviderContext.Provider value={config}>
      <Antd5ConfigProvider
        autoInsertSpaceInButton={false}
        locale={antd5Locales[lng] ?? antd5enUS}
        {...antd5Configs}
      >
        <Antd4ConfigProvider
          autoInsertSpaceInButton={false}
          locale={antd4Locales[lng] ?? patchEnLocale}
          {...antd4Configs}
        >
          {children}
        </Antd4ConfigProvider>
      </Antd5ConfigProvider>
    </ConfigProviderContext.Provider>
  );
};
