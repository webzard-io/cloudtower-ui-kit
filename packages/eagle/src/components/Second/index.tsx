import { parrotI18n } from "@cloudtower/parrot";
import { formatSeconds } from "@tower/utils";
import React from "react";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import Empty from "../Empty";

const Second: UnitFn = ({ rawValue, decimals, abbreviate }) => {
  if (isEmpty(rawValue)) {
    return Empty;
  }
  const { value, unit } = formatSeconds(rawValue, decimals);
  return (
    <span>
      <span className="value">{value} </span>
      <span className="unit">
        {parrotI18n.t(`common.${abbreviate ? `${unit}_abbreviation` : unit}`)}
      </span>
    </span>
  );
};

export default Second;
