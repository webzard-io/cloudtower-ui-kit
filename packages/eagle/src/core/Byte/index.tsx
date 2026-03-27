import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import isEmpty from "@src/utils/isEmpty";
import { formatBytes } from "@src/utils/tower";
import React from "react";

import { UnitStyle } from "../Styled";
import { UnitFn } from "../Units/units.type";

const Byte: UnitFn = ({
  rawValue,
  noUnitOnZero,
  decimals,
  valueClassName,
  unitClassName,
  emptyProps,
  "data-testid": dataTestId,
}) => {
  const { t } = useParrotTranslation();
  if (isEmpty(rawValue)) {
    return <Empty data-testid={dataTestId} {...emptyProps} />;
  }
  if (rawValue === -1) {
    return <span data-testid={dataTestId}>{t("common.calculation")}</span>;
  }
  const { value, unit } = formatBytes(rawValue, decimals);
  if (noUnitOnZero && value === 0) {
    return (
      <span data-testid={dataTestId} className="value">
        {value}
      </span>
    );
  }
  return (
    <span data-testid={dataTestId}>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", UnitStyle, unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default Byte;
