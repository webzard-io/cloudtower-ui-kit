import { AlertProps as AntdAlertProps } from "antd/lib/alert";

export interface ExpandableConfig {
  /** 默认展开状态（非受控模式） */
  defaultExpanded?: boolean;
  /** 展开状态（受控模式），传入后组件变为受控 */
  expanded?: boolean;
  /** 展开/收起状态变化回调 */
  onExpandChange?: (expanded: boolean) => void;
}

/**
 * 提示框组件 Props，基于 antd Alert 封装。
 *
 * @description
 * 用于页面内的警告或提示信息展示，支持 info / error / warning / success / normal 五种类型。
 * 扩展了 action 操作区、展开/收起等功能。
 *
 * @example
 * ```tsx
 * import React from "react";
 * import Alert from "@cloudtower/eagle/Alert";
 *
 * // 基本用法
 * <Alert type="info" message="集群升级已完成。" />
 * ```
 *
 * @example
 * ```tsx
 * import React from "react";
 * import Alert from "@cloudtower/eagle/Alert";
 *
 * // 带展开/收起
 * <Alert
 *   type="info"
 *   message="以下服务版本不兼容："
 *   description={<ul><li>服务 A 需升级至 1.4.5</li></ul>}
 *   expandConfig={{}}
 * />
 * ```
 *
 * @see Banner 全局横幅通知，固定在页面顶部
 * @see message 全局提示，自动消失
 */
export type AlertProps = Omit<AntdAlertProps, "type"> & {
  /** 提示类型，"normal" 为无色信息提示 */
  type?: AntdAlertProps["type"] | "normal";
  /** 右侧操作区域，渲染在 message 右侧 */
  action?: React.ReactNode;
  /** 测试标识，透传到根元素 */
  "data-testid"?: string;
  /**
   * 启用展开/收起功能。启用后 description 内容在收起状态下隐藏，
   * 展开后在 message 下方内联展示，不会触发 antd 的 with-description 布局。
   */
  expandConfig?: ExpandableConfig;
};
export type AlertComponentType = React.FunctionComponent<AlertProps>;
