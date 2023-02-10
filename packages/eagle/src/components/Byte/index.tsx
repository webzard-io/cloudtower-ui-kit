import { parrotI18n } from "@cloudtower/parrot";
import { formatBytes } from "@tower/utils";
import React from "react";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import Empty from "../Empty";

const Byte: UnitFn = ({ rawValue, noUnitOnZero, decimals }) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  if (rawValue === -1) {
    return <span>{parrotI18n.t("common.calculation")}</span>;
  }
  const { value, unit } = formatBytes(rawValue, decimals);
  if (noUnitOnZero && value === 0) {
    return <span className="value">{value}</span>;
  }
  return (
    <span>
      <span className="value">{value}</span>
      <span className="unit">{` ${unit}`}</span>
    </span>
  );
};

export default Byte;
