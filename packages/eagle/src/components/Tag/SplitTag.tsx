import { css } from "@linaria/core";
import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import { SplitTagComponentType } from "../../spec";
import { Typo } from "../Typo";
import { PresetColors } from "./const";
import { Size, TagStyle } from "./style";

const WrapperStyle = css`
  & {
    display: inline-flex;
    border-radius: 8px;
    .primary-tag {
      border-radius: 4px 0 0 4px;
      &.ant-tag-red {
        color: $fills-light-serious-serious;
        background-color: $fills-interaction-light-serious-hover;
      }
      &.ant-tag-yellow {
        color: $fills-light-notice-notice-dark;
        background-color: $fills-light-notice-notice-light-hover;
      }
      &.ant-tag-green {
        color: $fills-light-positive-positive-dark;
        background-color: $fills-light-positive-positive-light-hover;
      }
      &.ant-tag-blue {
        color: $fills-light-general-general;
        background-color: $fills-element-light-container-outstanding-hover;
      }
      &.ant-tag-purple {
        color: $text-light-storage;
        background-color: $fills-light-interaction-purple-hover;
      }
      &.ant-tag-gray {
        color: $text-light-super;
        background-color: $fills-interaction-light-general-hover;
      }
    }
    .secondary-tag {
      border-radius: 0 4px 4px 0;
      padding-left: 4px;
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
  <div {...props} className={cs(className, WrapperStyle)}>
    <AntdTag
      className={cs(
        Size[size],
        TagStyle,
        Typo.Label.l4_regular,
        {
          [`ant-tag-${color}`]: PresetColors.includes(color),
        },
        "primary-tag",
      )}
      icon={icon}
    >
      {primaryContent}
    </AntdTag>
    <AntdTag
      className={cs(
        Size[size],
        TagStyle,
        Typo.Label.l4_regular,
        {
          [`ant-tag-${color}`]: PresetColors.includes(color),
        },
        "secondary-tag",
      )}
    >
      {secondaryContent}
    </AntdTag>
  </div>
);

export default SplitTag;
