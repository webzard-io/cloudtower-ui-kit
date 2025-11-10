import React from "react";

/**
 * Tab 项的数据结构
 */
export type TabItem = {
  /** Tab 的唯一标识符 */
  key: string;
  /** Tab 的标题，可以是字符串、ReactNode 或函数 */
  title:
    | string
    | React.ReactNode
    | ((props: { isActive: boolean }) => React.ReactNode);
  /** Tab 的内容 */
  children: React.ReactNode;
};

/**
 * Tab 组件的属性
 */
export type TabProps = {
  /** 外层容器的类名 */
  className?: string;
  /** 内容区域的类名 */
  contentClassName?: string;
  /** 当前选中的 Tab 的 key */
  selectedKey: string;
  /** Tab 列表 */
  tabs: TabItem[];
  /** Tab 切换时的回调 */
  onChange?: (key: string) => void;
  /** 额外的插槽内容，显示在 tab bar 的右侧 */
  extraSlot?: React.ReactNode;
  /** Tab 的大小 */
  size?: "small" | "medium";
};

/**
 * 激活 Tab 的类型枚举
 */
export enum ActiveTabType {
  /** 普通类型的 Tab */
  Common,
  /** 在更多菜单中的 Tab */
  More,
}
