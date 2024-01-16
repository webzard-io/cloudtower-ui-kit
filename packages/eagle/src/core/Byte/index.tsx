import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { UnitFn } from "@src/spec";
import isEmpty from "@src/utils/isEmpty";
import { formatBytes } from "@src/utils/tower";
import React from "react";
const Byte: UnitFn = ({
  rawValue,
  noUnitOnZero,
  decimals,
  valueClassName,
  unitClassName,
  emptyProps,
}) => {
  const { t } = useParrotTranslation();
  if (isEmpty(rawValue)) {
    return <Empty {...emptyProps} />;
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
