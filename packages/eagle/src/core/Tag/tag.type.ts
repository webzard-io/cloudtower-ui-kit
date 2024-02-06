import { TagProps as AntdTagProps } from "antd/lib/tag";

export type TagColor =
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "gray"
  | "red-ontint"
  | "green-ontint"
  | "error"
  | "warning"
  | "processing"
  | "default"
  | "success";

export type TagProps = Omit<
  AntdTagProps,
  "closable" | "closeIcon" | "onClose"
> & {
  color?: TagColor;
  size?: "small" | "medium";
  hoverable?: boolean;
};

export type SplitTagComponentType = React.FC<
  Omit<AntdTagProps, "closable" | "closeIcon" | "onClose" | "visible"> & {
    color?: "red" | "yellow" | "green" | "blue" | "purple" | "gray";
    size?: "small" | "medium";
    primaryContent: React.ReactNode;
    secondaryContent: React.ReactNode;
  }
>;

export interface NameTagType
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  className?: string;
  style?: React.CSSProperties;
}

export type TagComponentType = React.FC<TagProps> & {
  SplitTag: SplitTagComponentType;
  NameTag: React.FC<NameTagType>;
};
