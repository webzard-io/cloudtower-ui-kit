import { AlertProps } from "antd/lib/alert";

export type AlertComponentType = React.FunctionComponent<
  Omit<AlertProps, "type"> & {
    type?: AlertProps["type"] | "normal";
    action?: React.ReactNode;
  }
>;
