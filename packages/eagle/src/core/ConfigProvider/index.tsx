import { ConfigProvider as Antd4ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import {
  ConfigProviderProps as Antd5ConfigProviderProps,
  ConfigProvider as Antd5ConfigProvider,
} from "antd5";
import React from "react";

export type ConfigProps = {
  antd4Configs?: ConfigProviderProps;
  antd5Configs?: Antd5ConfigProviderProps;
};

export const ConfigProvider: React.FC<ConfigProps> = ({
  antd5Configs,
  antd4Configs,
  children,
}) => {
  return (
    <Antd5ConfigProvider {...antd5Configs}>
      <Antd4ConfigProvider {...antd4Configs}>{children}</Antd4ConfigProvider>
    </Antd5ConfigProvider>
  );
};
