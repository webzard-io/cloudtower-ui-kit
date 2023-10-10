import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import { TagColor, TagComponentType } from "../../spec";
import { Typo } from "../Typo";
import { PresetColors as BasePresetColors } from "./const";
import SplitTag from "./SplitTag";
import { IconStyle, Size, TagStyle } from "./style";

export const PresetColors: TagColor[] = [
  ...BasePresetColors,
  "red-ontint",
  "green-ontint",
];

const AntdColorMap: Record<string, TagColor> = {
  processing: "blue",
  success: "green",
  error: "red",
  warn: "yellow",
  default: "gray",
};

const Tag: TagComponentType = ({
  size = "small",
  color = "gray",
  className,
  hoverable = false,
  icon,
  children,
  ...props
}) => {
  const computedColor = AntdColorMap[color] || color;
  return (
    <AntdTag
      {...props}
      className={cs(className, Size[size], TagStyle, Typo.Label.l4_regular, {
        [`ant-tag-${computedColor}`]: PresetColors.includes(computedColor),
        "tag-hover": hoverable,
      })}
      closable={false}
      color={computedColor === "gray" ? undefined : computedColor}
    >
      {icon && <span className={IconStyle}>{icon}</span>}
      {children}
    </AntdTag>
  );
};

Tag.SplitTag = SplitTag;

export default Tag;
