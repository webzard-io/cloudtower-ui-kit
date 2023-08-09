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
  emptyProps,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty {...emptyProps} />;
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
