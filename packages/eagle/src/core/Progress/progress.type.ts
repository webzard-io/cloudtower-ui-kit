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
  status: "success" | "failed" | "paused" | "active";
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  percent: number;
  info?: React.ReactNode;
  description?: string[];
  statusText?: React.ReactNode;
  operation?: React.ReactNode;
  size?: "small" | "large";
  style?: React.CSSProperties;
};
