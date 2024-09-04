import { InputProps } from "antd/lib/input";

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
};

export type SearchInputComponentType = React.FC<SearchInputProps>;
