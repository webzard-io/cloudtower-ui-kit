import { ElementOf } from "antd/es/_util/type";
import { MenuProps } from "antd5";

export type SidebarMenuProps = Omit<MenuProps, "mode">;
export type SidebarMenuItemProps = ElementOf<MenuProps["items"]>;
