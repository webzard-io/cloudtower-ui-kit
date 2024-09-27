import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import isEmpty from "@src/utils/isEmpty";
import { formatBytePerSecond } from "@src/utils/tower";
import React from "react";

import { UnitStyle } from "../Styled";
import { UnitFn } from "../Units/units.type";

const BytePerSecond: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
  emptyProps,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty {...emptyProps} />;
  }
  const { value, unit } = formatBytePerSecond(rawValue, decimals);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", UnitStyle, unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default BytePerSecond;
