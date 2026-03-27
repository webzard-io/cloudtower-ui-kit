import type { SrcType } from "@src/core/BaseIcon";

import { LinkProps } from "../Link/link.type";
import { TagProps } from "../Tag/tag.type";

export type ComponentType =
  | "tag"
  | "title"
  | "description"
  | "link"
  | "iconField";

export type TitleAreaProps = {
  title: string;
  tag?: TagProps;
  subtitle?: string;
};

export type AreaProps = {
  /**
   * 组件间的间距
   */
  gap?: number;
  /**
   * 组件分割符
   */
  split?: React.ReactNode;
  className?: string;
  /**
   * 需要连接在一起的组件，支持配置 ComponentType 类型的组件
   */
  items: Items;
};

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
  link: Omit<LinkProps, "type"> & {
    linkType: LinkProps["type"];
  };
};

export type ProgressProps = {
  /**
   * progress 的类型，分为基础进度条、简单进度条和富格式进度条
   */
  type?: "base" | "simple" | "rich";
  /**
   * 进度条的状态
   */
  status?: "success" | "failed" | "paused" | "active";
  /**
   * indeterminate 指定为 true 时，进度条仅表示加载状态，无具体进度。用于不确定任务花费多长时间，一般配合加载完成时，进度条消失的场景使用
   */
  indeterminate?: boolean;
  className?: string;
  /**
   * 进度
   */
  percent?: number;
  /**
   * 进度条左上方区域
   */
  leftTop?: React.ReactNode;
  /**
   * 进度条左下方区域
   */
  leftBottom?: React.ReactNode;
  /**
   * 进度条右上方区域
   */
  rightTop?: React.ReactNode;
  /**
   * 进度条右下方区域
   */
  rightBottom?: React.ReactNode;
  size?: "small" | "large";
  style?: React.CSSProperties;
  /**
   * 用于测试的标识符，会传递到进度条根容器元素。
   */
  "data-testid"?: string;
};
