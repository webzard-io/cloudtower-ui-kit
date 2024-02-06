import { TagProps as AntdTagProps } from "antd/lib/tag";

export type StatusCapsuleColor =
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "gray"
  | "success"
  | "danger"
  | "warning";

export type StatusCapsuleComponentType = React.FC<
  Omit<AntdTagProps, "closable" | "closeIcon" | "onClose" | "icon" | "size"> & {
    color?: StatusCapsuleColor;
    loading?: boolean;
    hoverable?: boolean;
    offWhiteMode?: boolean;
    number?: number;
  }
>;
