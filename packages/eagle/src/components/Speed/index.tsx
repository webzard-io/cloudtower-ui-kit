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
  emptyProps,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty {...emptyProps} />;
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
