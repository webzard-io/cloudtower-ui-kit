import { css, LinariaClassName } from "@linaria/core";
import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import { TagComponentType } from "../../spec";
import { Typo } from "../Typo";

const Size: Record<"small" | "medium", LinariaClassName> = {
  small: css`
    padding: 0 8px;
  `,
  medium: css`
    padding: 2px 8px;
  `,
};

const TagStyle = css`
  margin: 0;
`;

const Tag: TagComponentType = ({
  size = "small",
  color,
  className,
  ...props
}) => (
  <AntdTag
    {...props}
    className={cs(
      className,
      Size[size],
      TagStyle,
      Typo.Label.l4_regular,
      `ant-tag-${color}`,
    )}
    color={color === "gray" ? undefined : color}
    closable={false}
  />
);

export default Tag;
