import { InputProps } from "antd/lib/input";
import { SrcType } from "../BaseIcon";

export type SearchInputProps = Omit<InputProps, "onChange"> & {
  /**
   * 防抖延迟的时间，单位为毫秒
   */
  debounceWait?: number;
  /**
   * 搜索结果的总数
   */
  total?: number;
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
};

export type SearchInputComponentType = React.FC<SearchInputProps>;
