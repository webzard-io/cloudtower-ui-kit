import { InputProps } from "antd/lib/input";

import { SrcType } from "../BaseIcon";

export type SearchInputProps = Omit<InputProps, "value" | "onChange"> & {
  /**
   * 配置 value 时，需把 debounceWait 设置为 0 ，否则输入时会有卡顿的问题
   */
  value?: InputProps["value"];
  /**
   * 防抖延迟的时间，单位为毫秒，默认为 300ms
   */
  debounceWait?: number;
  /**
   * 搜索结果的总数
   */
  total?: number;
  /**
   * 当前选中的结果索引，可用于外部控制当前位置
   * 如果不提供，组件将内部管理此状态
   */
  current?: number;
  /**
   * 搜索下一个结果时的回调函数
   */
  onSearchNext?: (value: string, current: number) => void;
  /**
   * 搜索上一个结果时的回调函数
   */
  onSearchPrev?: (value: string, current: number) => void;
  /**
   * 输入内容改变时的回调函数
   */
  onChange: (value: string) => void;
  /**
   * 搜索的图标
   */
  searchIcon?: SrcType;

  /**
   * 上一个图标
   */
  prefixIcon?: SrcType;
  /**
   * 上一个 hover 时的图标
   */
  prefixHoverIcon?: SrcType;

  /**
   * 下一个图标
   */
  nextIcon?: SrcType;
  /**
   * 下一个 hover 时的图标
   */
  nextHoverIcon?: SrcType;

  /**
   * 清空图标
   */
  clearIcon?: SrcType;
  /**
   * 清空 hover 时的图标
   */
  clearHoverIcon?: SrcType;

  /**
   * 搜索框高度，默认为 276
   */
  width?: number | string;

  /**
   * 是否开启最近搜索功能
   */
  enableRecentSearch?: boolean;
  /**
   * 最近搜索的本地存储键
   */
  recentSearchLocalStorageKey?: string;
  /**
   * 最多展示多少条最新的搜索记录，默认 5 条
   */
  maxRecentCount?: number;
};

export type SearchInputComponentType = React.FC<SearchInputProps>;
