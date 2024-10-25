import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { ConfigProvider as Antd4ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import {
  ConfigProviderProps as Antd5ConfigProviderProps,
  ConfigProvider as Antd5ConfigProvider,
} from "antd5";
import React, { useEffect } from "react";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import antd5enUS from "antd5/lib/locale/en_US";
import antd5zhCN from "antd5/lib/locale/zh_CN";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "moment/locale/zh-cn";
import { ParrotLngs } from "@cloudtower/parrot";

export type ConfigProps = {
  antd4Configs?: ConfigProviderProps;
  antd5Configs?: Antd5ConfigProviderProps;
};

export const ConfigProvider: React.FC<ConfigProps> = ({
  antd5Configs,
  antd4Configs,
  children,
}) => {
  const { i18n } = useParrotTranslation();
  useEffect(() => {
    const adjustDateLocale = (lng: ParrotLngs) => {
      moment.locale(lng === "zh-CN" ? "zh-cn" : "en");
      dayjs.locale(lng === "zh-CN" ? "zh-cn" : "en");
    };
    i18n.on("languageChanged", adjustDateLocale);
    // init
    adjustDateLocale(i18n.language as ParrotLngs);
  }, []);
  return (
    <Antd5ConfigProvider
      autoInsertSpaceInButton={false}
      locale={i18n.language === "zh-CN" ? antd5zhCN : antd5enUS}
      {...antd5Configs}
    >
      <Antd4ConfigProvider
        autoInsertSpaceInButton={false}
        locale={i18n.language === "zh-CN" ? zhCN : enUS}
        {...antd4Configs}
      >
        {children}
      </Antd4ConfigProvider>
    </Antd5ConfigProvider>
  );
};
