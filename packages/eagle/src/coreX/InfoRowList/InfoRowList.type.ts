/**
 * InfoRowList 组件的属性定义
 */
export type InfoListProps = {
  /**
   * 容器的自定义类名
   */
  className?: string;
  /**
   * 每一行的自定义类名
   */
  rowClassName?: string;
  /**
   * 是否处于加载状态
   * @default false
   */
  loading: boolean;
  /**
   * 信息列表数据
   * @example
   * ```tsx
   * const data = [
   *   {
   *     key: 'name',
   *     name: '名称',
   *     value: '示例名称',
   *     action: <Button>编辑</Button>,
   *     hidden: false
   *   }
   * ]
   * ```
   */
  data: {
    /**
     * 行的唯一标识
     */
    key: string;
    /**
     * 行标签名称
     */
    name: React.ReactNode;
    /**
     * 行内容值
     */
    value: React.ReactNode;
    /**
     * 可选的操作按钮
     */
    action?: React.ReactNode;
    /**
     * 是否隐藏该行
     * @default false
     */
    hidden?: boolean;
  }[];
  /**
   * 是否使用紧凑模式
   * 紧凑模式一般用于详情页面，普通模式用于设置页面
   * @default false
   */
  compact?: boolean;
};
