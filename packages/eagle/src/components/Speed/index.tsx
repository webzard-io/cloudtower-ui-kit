import React from "react";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatSpeed } from "../../utils/tower";
import Empty from "../Empty";

const Speed: UnitFn = ({ rawValue, decimals }) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatSpeed(rawValue, decimals);
  return (
    <span>
      <span className="value">{value}</span>
      <span className="unit">{` ${unit}`}</span>
    </span>
  );
};

export default Speed;
