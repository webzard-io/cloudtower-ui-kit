import { cx } from "@linaria/core";
import React from "react";

import useParrotTranslation from "../../hooks/useParrotTranslation";
import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatBytes } from "../../utils/tower";
import Empty from "../Empty";

const Byte: UnitFn = ({
  rawValue,
  noUnitOnZero,
  decimals,
  valueClassName,
  unitClassName,
}) => {
  const { t } = useParrotTranslation();
  if (isEmpty(rawValue)) {
    return Empty;
  }
  if (rawValue === -1) {
    return <span>{t("common.calculation")}</span>;
  }
  const { value, unit } = formatBytes(rawValue, decimals);
  if (noUnitOnZero && value === 0) {
    return <span className="value">{value}</span>;
  }
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value}</span>
      <span className={cx("unit", unitClassName)}>{` ${unit}`}</span>
    </span>
  );
};

export default Byte;
