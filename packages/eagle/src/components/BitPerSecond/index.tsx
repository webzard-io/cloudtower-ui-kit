import { formatBitPerSecond } from "@tower/utils";
import React from "react";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import Empty from "../Empty";

const BitPerSeconds: UnitFn = ({ rawValue, decimals }) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatBitPerSecond(rawValue, decimals);
  return (
    <span>
      <span className="value">{value}</span>
      <span className="unit">{` ${unit}`}</span>
    </span>
  );
};

export default BitPerSeconds;
