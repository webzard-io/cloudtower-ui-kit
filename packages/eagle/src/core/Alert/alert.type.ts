import { AlertProps as AntdAlertProps } from "antd/lib/alert";

export interface ExpandableConfig {
  /** 默认展开状态（非受控模式） */
  defaultExpanded?: boolean;
  /** 展开状态（受控模式） */
  expanded?: boolean;
  /** 展开/收起状态变化回调 */
  onExpandChange?: (expanded: boolean) => void;
}

export type AlertProps = Omit<AntdAlertProps, "type"> & {
  type?: AntdAlertProps["type"] | "normal";
  action?: React.ReactNode;
  "data-testid"?: string;
  /** 启用展开/收起功能，启用后 description 内容会被折叠 */
  expandConfig?: ExpandableConfig;
};
export type AlertComponentType = React.FunctionComponent<AlertProps>;
