import React from "react";
import { cx } from "@linaria/core";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatBitPerSecond } from "../../utils/tower";
import Empty from "../Empty";

const BitPerSeconds: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
}) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatBitPerSecond(rawValue, decimals);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default BitPerSeconds;
