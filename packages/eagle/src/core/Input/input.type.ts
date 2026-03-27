import { InputProps as AntdInputProps } from "antd/lib/input";

export interface AdditionOptions {
  /**
   * 使用变量控制是否显示 error 效果
   */
  error?: boolean;
  /**
   * 是否显示箭头按钮，用于加减数值
   */
  controls?: boolean;
  /**
   * 开启 control 后，不会显示 suffix
   */
  suffix?: string;

  /**
   * 数据测试 id
   */
  "data-testid"?: string;
}

export type InputProps = AntdInputProps & {
  error?: boolean;
  "data-testid"?: string;
};
