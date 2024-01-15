import { PresetColors as BasePresetColors } from "@src/core/Tag/const";
import SplitTag from "@src/core/Tag/SplitTag";
import { IconStyle, NameTagStyle, Size, TagStyle } from "@src/core/Tag/style";
import { Typo } from "@src/core/Typo";
import { NameTagType, TagColor, TagComponentType } from "@src/spec";
import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";
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

const NameTag: React.FC<NameTagType> = ({ className, ...props }) => {
  return <Tag className={cs(NameTagStyle, className)} {...props} />;
};

Tag.SplitTag = SplitTag;
Tag.NameTag = NameTag;

export default Tag;
