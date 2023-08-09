import React from "react";
import { cx } from "@linaria/core";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatBps } from "../../utils/tower";
import Empty from "../Empty";

const Bps: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
  emptyProps,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty {...emptyProps} />;
  }
  const { value, unit } = formatBps(rawValue, decimals);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default Bps;
