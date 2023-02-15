import { Badge as AntdBadge } from "antd";
import { cx } from "linaria";
import React from "react";

import { BadgeComponentType } from "../../spec";

const Badge: BadgeComponentType = ({ type = "error", className, ...props }) => (
  <AntdBadge
    className={cx(`badge-${type}`, className)}
    {...props}
    showZero={false}
  />
);

export default Badge;
