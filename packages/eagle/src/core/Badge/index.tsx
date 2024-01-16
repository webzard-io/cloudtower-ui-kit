import { cx } from "@linaria/core";
import { BadgeComponentType } from "@src/spec";
import { Badge as AntdBadge } from "antd";
import React from "react";
const Badge: BadgeComponentType = ({ type = "error", className, ...props }) => (
  <AntdBadge
    className={cx(`badge-${type}`, className)}
    {...props}
    showZero={false}
  />
);

export default Badge;
