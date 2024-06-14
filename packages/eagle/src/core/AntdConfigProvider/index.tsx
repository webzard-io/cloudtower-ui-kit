import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import React from "react";

export const AntdConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  return <ConfigProvider autoInsertSpaceInButton={false} {...props} />;
};
