import { cx } from "@linaria/core";
import { Badge as AntdBadge } from "antd";
import React from "react";

import { BadgeComponentType } from "./badge.type";

const Badge: BadgeComponentType = ({ type = "error", className, ...props }) => (
  <AntdBadge
    className={cx(`badge-${type}`, className)}
    {...props}
    showZero={false}
  />
);

export default Badge;

export * from "./badge.type";
