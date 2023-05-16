import { cx } from "@linaria/core";
import React from "react";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatPercent } from "../../utils/tower";
import Empty from "../Empty";

const Percent: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
}) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatPercent(rawValue, decimals);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{unit}</span>
    </span>
  );
};

export default Percent;
