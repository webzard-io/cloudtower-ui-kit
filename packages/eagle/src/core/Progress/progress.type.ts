import type { SrcType } from "@src/core/BaseIcon";
import type { LinkProps, TagProps } from "@src/spec";

export type ComponentType =
  | "tag"
  | "title"
  | "description"
  | "link"
  | "iconField";

export type InfoProps = {
  children?: React.ReactNode;
  type: "title" | "description";
  multiLines: number;
};

export type IconFieldProps = {
  className?: string;
  status?: "success" | "failed" | "paused" | "active";
  src: SrcType;
  children: React.ReactNode;
};

export type Items = ({
  type: ComponentType;
} & ComponentPropsMap[ComponentType])[];

export type ComponentPropsMap = {
  tag: TagProps;
  title: InfoProps;
  description: InfoProps;
  iconField: IconFieldProps;
  link: LinkProps;
};

export type ProgressProps = {
  type?: "base" | "simple" | "rich";
  status?: "success" | "failed" | "paused" | "active";
  indeterminate?: boolean;
  prefixCls?: string;
  className?: string;
  percent?: number;
  leftTop?: React.ReactNode;
  leftBottom?: React.ReactNode;
  rightTop?: React.ReactNode;
  rightBottom?: React.ReactNode;
  size?: "small" | "large";
  style?: React.CSSProperties;
};
