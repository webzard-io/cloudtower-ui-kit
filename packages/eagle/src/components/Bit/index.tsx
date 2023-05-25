import React from "react";
import { cx } from "@linaria/core";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatBits } from "../../utils/tower";
import Empty from "../Empty";

const Bit: UnitFn = ({ rawValue, decimals, unitClassName, valueClassName }) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatBits(rawValue, decimals);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default Bit;
