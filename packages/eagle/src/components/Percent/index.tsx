import { cx } from "@linaria/core";
import React from "react";

import { PercentFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatPercent } from "../../utils/tower";
import Empty from "../Empty";

const Percent: PercentFn = ({
  rawValue,
  decimals,
  saturated,
  valueClassName,
  unitClassName,
  emptyProps,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty {...emptyProps} />;
  }
  const { value, unit } = formatPercent(rawValue, decimals, saturated);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{unit}</span>
    </span>
  );
};

export default Percent;
