import { SiderProps as AntdSiderProps } from "antd5/lib/layout/Sider";

import { SrcType } from "../../core/BaseIcon";

export type SiderMenuItem = {
  icon: {
    normal: SrcType;
    active: SrcType;
  };
  title: string;
  hidden?: boolean;
  onClick?: (key: string) => void;
  key: string;
  disabled?: boolean;
};

export type SiderMenuItemGroup = {
  key: string;
  title: string;
  hidden?: boolean;
  /**
   * 下面是否展示分割线
   */
  isShowDivider?: boolean;
  items: SiderMenuItem[];
};

export type SiderProps = {
  /**
   * 侧边栏的配置
   */
  config: Array<SiderMenuItemGroup | SiderMenuItem>;
  /**
   * 选中高亮的 item 的 Key
   */
  selectedKeys: string[];
  /**
   * 收缩模式
   */
  isShrink?: boolean;
  /**
   * 点击 item 的回调
   */
  onClick?: (key: string) => void;
  antdSiderProps: AntdSiderProps;
};
