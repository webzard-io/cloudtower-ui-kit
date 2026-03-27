import { InputProps } from "antd/lib/input";

import { SrcType } from "../BaseIcon";

/**
 * @description 搜索输入框组件，基于 Input 封装，提供防抖搜索、结果导航（上一个/下一个）和最近搜索历史功能。
 * 支持受控和非受控两种模式，适用于表格内搜索、页面全局搜索等场景。
 *
 * @example
 * 基础搜索（带防抖）：
 * ```tsx
 * import React, { useState } from "react";
 * import { SearchInput } from "@cloudtower/eagle";
 *
 * const App = () => {
 *   const [keyword, setKeyword] = useState("");
 *   return (
 *     <SearchInput
 *       debounceWait={300}
 *       onChange={(value) => setKeyword(value)}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * 带结果导航（显示匹配数和上下翻页）：
 * ```tsx
 * import React from "react";
 * import { SearchInput } from "@cloudtower/eagle";
 *
 * const App = () => (
 *   <SearchInput
 *     total={10}
 *     onChange={(value) => console.log("搜索:", value)}
 *     onSearchNext={(value, current) => console.log("下一个:", current)}
 *     onSearchPrev={(value, current) => console.log("上一个:", current)}
 *   />
 * );
 * ```
 *
 * @example
 * 启用最近搜索历史：
 * ```tsx
 * import React from "react";
 * import { SearchInput } from "@cloudtower/eagle";
 *
 * const App = () => (
 *   <SearchInput
 *     enableRecentSearch
 *     recentSearchLocalStorageKey="vm-search"
 *     maxRecentCount={5}
 *     onChange={(value) => console.log(value)}
 *   />
 * );
 * ```
 *
 * @see Input 基础输入框
 * @see Cascader 级联选择器（内置了 SearchInput 作为搜索区域）
 */
export type SearchInputProps = Omit<InputProps, "value" | "onChange"> & {
  /**
   * 数据测试 id
   */
  "data-testid"?: string;
  /**
   * 输入框的值，用于受控模式。
   * 配置 value 时，需把 debounceWait 设置为 0，否则输入时会有卡顿的问题
   */
  value?: InputProps["value"];
  /**
   * 防抖延迟时间，单位为毫秒。输入停止后延迟指定时间再触发 onChange
   * @default 300
   */
  debounceWait?: number;
  /**
   * 搜索结果的总数。设置后，当同时提供 onSearchNext 和 onSearchPrev 时，
   * 输入框后缀区域将显示 "current/total" 计数器和上下翻页按钮
   */
  total?: number;
  /**
   * 当前选中的结果索引（从 1 开始），可用于外部控制当前位置。
   * 如果不提供，组件将内部管理此状态
   */
  current?: number;
  /**
   * 点击"下一个"按钮或按下 Enter 键时的回调。
   * 需同时提供 onSearchPrev 才会显示导航按钮
   * @param value - 当前搜索关键词
   * @param current - 导航后的结果索引
   */
  onSearchNext?: (value: string, current: number) => void;
  /**
   * 点击"上一个"按钮时的回调。
   * 需同时提供 onSearchNext 才会显示导航按钮
   * @param value - 当前搜索关键词
   * @param current - 导航后的结果索引
   */
  onSearchPrev?: (value: string, current: number) => void;
  /**
   * 输入内容改变时的回调函数（经过防抖处理后触发）
   * @param value - 当前输入的搜索关键词
   */
  onChange: (value: string) => void;
  /**
   * 自定义搜索图标（输入框前缀），替换默认的放大镜图标
   */
  searchIcon?: SrcType;
  /**
   * 自定义"上一个"按钮的默认态图标
   */
  prefixIcon?: SrcType;
  /**
   * 自定义"上一个"按钮的 hover 态图标
   */
  prefixHoverIcon?: SrcType;
  /**
   * 自定义"下一个"按钮的默认态图标
   */
  nextIcon?: SrcType;
  /**
   * 自定义"下一个"按钮的 hover 态图标
   */
  nextHoverIcon?: SrcType;
  /**
   * 自定义清空按钮的默认态图标
   */
  clearIcon?: SrcType;
  /**
   * 自定义清空按钮的 hover 态图标
   */
  clearHoverIcon?: SrcType;
  /**
   * 搜索框宽度
   * @default 276
   */
  width?: number | string;
  /**
   * 是否开启最近搜索功能。开启后，聚焦空输入框时会显示最近搜索记录的下拉菜单。
   * 搜索记录通过 localStorage 持久化存储
   * @default false
   */
  enableRecentSearch?: boolean;
  /**
   * 最近搜索记录在 localStorage 中的存储键名。
   * 开启 enableRecentSearch 时必须提供，不同业务场景应使用不同的 key 以隔离数据
   */
  recentSearchLocalStorageKey?: string;
  /**
   * 最近搜索记录的最大展示条数
   * @default 5
   */
  maxRecentCount?: number;
};

export type SearchInputComponentType = React.FC<SearchInputProps>;
