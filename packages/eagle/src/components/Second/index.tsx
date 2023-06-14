import { cx } from "@linaria/core";
import React from "react";
import { useTranslation } from "react-i18next";

import { UnitFn } from "../../spec";
import isEmpty from "../../utils/isEmpty";
import { formatSeconds } from "../../utils/tower";
import Empty from "../Empty";

const Second: UnitFn = ({
  rawValue,
  decimals,
  valueClassName,
  unitClassName,
  abbreviate,
}) => {
  const { t } = useTranslation();

  if (isEmpty(rawValue)) {
    return Empty;
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
