export type ShowProps = React.PropsWithChildren<{
  /**
   *
   * 检查的条件。可以是布尔值或返回布尔值的函数。
   */
  condition: boolean | (() => boolean);
  /**
   *
   * 当条件为假时显示的备用内容。
   */
  fallback?: React.ReactElement;
}>;
