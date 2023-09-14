import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import { SplitTagComponentType, TagComponentType } from "../../spec";
import { Typo } from "../Typo";
import { PresetColors as BasePresetColors } from "./const";
import SplitTag from "./SplitTag";
import { Size, TagStyle } from "./style";

export const PresetColors = [...BasePresetColors, "red-ontint", "green-ontint"];

const Tag: TagComponentType & {
  SplitTag: SplitTagComponentType;
} = ({
  size = "small",
  color = "gray",
  className,
  hoverable = false,
  ...props
}) => (
  <AntdTag
    {...props}
    className={cs(className, Size[size], TagStyle, Typo.Label.l4_regular, {
      [`ant-tag-${color}`]: PresetColors.includes(color),
      "tag-hover": hoverable,
    })}
    closable={false}
    color={color === "gray" ? undefined : color}
  />
);

Tag.SplitTag = SplitTag;

export default Tag;
