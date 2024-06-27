import { Antd5PrefixCls } from "@src/utils";
import { ConfigProvider as Antd4ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import { ConfigProvider as Antd5ConfigProvider } from "antd5";
import { ConfigProviderProps as Antd5ConfigProviderProps } from "antd5/lib/config-provider";
import React from "react";
import { merge } from "lodash";

export type ConfigProps = {
  antd4Configs?: ConfigProviderProps;
  antd5Configs?: Antd5ConfigProviderProps;
};

export const ConfigProvider: React.FC<ConfigProps> = ({
  antd5Configs,
  antd4Configs,
  children,
}) => {
  const defaultAntd5Configs: Antd5ConfigProviderProps = {
    theme: { hashed: false },
    prefixCls: Antd5PrefixCls,
  };
  return (
    <Antd5ConfigProvider {...merge(defaultAntd5Configs, antd5Configs)}>
      <Antd4ConfigProvider {...antd4Configs}>{children}</Antd4ConfigProvider>
    </Antd5ConfigProvider>
  );
};
