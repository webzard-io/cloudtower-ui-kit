import { cx } from "@linaria/core";
import Empty from "@src/components/Empty";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { UnitFn } from "@src/spec";
import isEmpty from "@src/utils/isEmpty";
import { formatSeconds } from "@src/utils/tower";
import React from "react";

const Second: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
  abbreviate,
  emptyProps,
}) => {
  const { t } = useParrotTranslation();

  if (isEmpty(rawValue)) {
    return <Empty {...emptyProps} />;
  }
  const { value, unit } = formatSeconds(rawValue, decimals);
  return (
    <span>
      <span className={cx("value", valueClassName)}>{value} </span>
      <span className={cx("unit", unitClassName)}>
        {t(`common.${abbreviate ? `${unit}_abbreviation` : unit}`)}
      </span>
    </span>
  );
};

export default Second;
