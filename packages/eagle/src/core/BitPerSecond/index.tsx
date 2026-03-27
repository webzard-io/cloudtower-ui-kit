import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import isEmpty from "@src/utils/isEmpty";
import { formatBitPerSecond } from "@src/utils/tower";
import React from "react";

import { UnitStyle } from "../Styled";
import { UnitFn } from "../Units/units.type";

const BitPerSecond: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
  emptyProps,
  "data-testid": dataTestId,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty data-testid={dataTestId} {...emptyProps} />;
  }
  const { value, unit } = formatBitPerSecond(rawValue, decimals);
  return (
    <span data-testid={dataTestId}>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", UnitStyle, unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default BitPerSecond;
