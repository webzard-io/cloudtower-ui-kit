import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import isEmpty from "@src/utils/isEmpty";
import { formatPercent } from "@src/utils/tower";
import React from "react";

import { PercentFn } from "../Units/units.type";

const Percent: PercentFn = ({
  rawValue,
  decimals,
  saturated,
  valueClassName,
  unitClassName,
  emptyProps,
  "data-testid": dataTestId,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty data-testid={dataTestId} {...emptyProps} />;
  }
  const { value, unit } = formatPercent(rawValue, decimals, saturated);
  return (
    <span data-testid={dataTestId}>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{unit}</span>
    </span>
  );
};

export default Percent;
