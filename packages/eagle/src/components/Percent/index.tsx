import { cx } from "@linaria/core";
import Empty from "@src/components/Empty";
import { PercentFn } from "@src/spec";
import isEmpty from "@src/utils/isEmpty";
import { formatPercent } from "@src/utils/tower";
import React from "react";

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
