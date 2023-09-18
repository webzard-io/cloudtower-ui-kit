import { css } from "@linaria/core";
import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import { SplitTagComponentType } from "../../spec";
import { Typo } from "../Typo";
import { PresetColors } from "./const";
import { IconStyle, Size, TagStyle } from "./style";

const WrapperStyle = css`
  &.outside-tag {
    padding-left: 0;
    .inside-tag {
      border-radius: 4px 0 0 4px;
      padding-right: 4px;
      margin-right: 4px;
    }
  }
`;

const SplitTag: SplitTagComponentType = ({
  size = "small",
  color = "gray",
  className,
  primaryContent,
  secondaryContent,
  icon,
  ...props
}) => (
  <AntdTag
    {...props}
    className={cs(
      className,
      TagStyle,
      Size[size],
      WrapperStyle,
      Typo.Label.l4_regular,
      {
        [`ant-tag-${color}`]: PresetColors.includes(color),
      },
      "outside-tag",
    )}
  >
    <AntdTag
      className={cs(
        Size[size],
        TagStyle,
        Typo.Label.l4_regular,
        {
          [`ant-tag-${color}`]: PresetColors.includes(color),
        },
        "inside-tag",
      )}
    >
      {icon && <span className={cs("ui-kit-tag-icon", IconStyle)}>{icon}</span>}
      {primaryContent}
    </AntdTag>
    {secondaryContent}
  </AntdTag>
);

export default SplitTag;
