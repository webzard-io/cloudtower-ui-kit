import React from "react";
import { cx } from "@linaria/core";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatSpeed } from "../../utils/tower";
import Empty from "../Empty";

const Speed: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
}) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatSpeed(rawValue, decimals);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default Speed;
