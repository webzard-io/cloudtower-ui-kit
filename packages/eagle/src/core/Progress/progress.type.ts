import type { SrcType } from "@src/core/BaseIcon";
import type { LinkProps, TagProps } from "@src/spec";

export type ComponentType =
  | "tag"
  | "title"
  | "description"
  | "link"
  | "iconField";

export type TitleProps = {
  content?: string;
};

export type DescriptionProps = {
  content?: string;
};

export type IconFieldProps = {
  status?: "success" | "failed" | "paused" | "active";
  src: SrcType;
  content: string;
};

export type Items = ({
  type: ComponentType;
} & ComponentPropsMap[ComponentType])[];

export type ComponentPropsMap = {
  tag: TagProps;
  title: TitleProps;
  description: DescriptionProps;
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
  title?: React.ReactNode;
  stepName?: string;
  description?: string[];
  statusText?: React.ReactNode;
  operation?: React.ReactNode;
  size?: "small" | "large";
  style?: React.CSSProperties;
};
