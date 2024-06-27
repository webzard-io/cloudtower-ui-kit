import { Antd5ComponentPrefixCls } from "@src/utils";
import { Menu } from "antd5";
import React from "react";

import { SidebarMenuProps } from "./SidebarMenu.type";

export const SidebarMenu: React.FC<SidebarMenuProps> = (props) => {
  return (
    <Menu
      {...props}
      prefixCls={Antd5ComponentPrefixCls["Menu"]}
      mode="inline"
    />
  );
};
