import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import { UnitFn } from "@src/spec";
import isEmpty from "@src/utils/isEmpty";
import { formatSpeed } from "@src/utils/format";
import React from "react";

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
