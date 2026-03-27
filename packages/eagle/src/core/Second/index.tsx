import { parrotI18n } from "@cloudtower/parrot";
import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import { ParrotTrans } from "@src/core/ParrotTrans";
import isEmpty from "@src/utils/isEmpty";
import { formatSeconds } from "@src/utils/tower";
import React from "react";

import { UnitStyle } from "../Styled";
import { UnitFn } from "../Units/units.type";

const Second: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
  abbreviate,
  emptyProps,
  "data-testid": dataTestId,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty data-testid={dataTestId} {...emptyProps} />;
  }
  const { value, unit } = formatSeconds(rawValue, decimals);
  return (
    <ParrotTrans
      parent={"span"}
      data-testid={dataTestId}
      i18nKey={`unit.${abbreviate ? `${unit}_abbreviation` : unit}`}
      count={value}
    >
      <span className={cx("value", valueClassName)}></span>
      <span className={cx("unit", UnitStyle, unitClassName)}></span>
    </ParrotTrans>
  );
};

export default Second;
