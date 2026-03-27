import { AlertProps as AntdAlertProps } from "antd/lib/alert";

export type AlertProps = Omit<AntdAlertProps, "type"> & {
  type?: AntdAlertProps["type"] | "normal";
  action?: React.ReactNode;
  "data-testid"?: string;
};
export type AlertComponentType = React.FunctionComponent<AlertProps>;
