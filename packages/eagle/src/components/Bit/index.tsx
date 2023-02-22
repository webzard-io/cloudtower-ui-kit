import React from "react";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatBits } from "../../utils/tower";
import Empty from "../Empty";

const Bit: UnitFn = ({ rawValue, decimals }) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatBits(rawValue, decimals);
  return (
    <span>
      <span className="value">{value}</span>
      <span className="unit">{` ${unit}`}</span>
    </span>
  );
};

export default Bit;
