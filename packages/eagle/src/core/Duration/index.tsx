import { cx } from "@linaria/core";
import Empty from "@src/core/Empty";
import { ParrotTrans } from "@src/core/ParrotTrans";
import { useFormatDuration } from "@src/hooks/useFormatDuration";
import { formatDuration } from "@src/utils/formatDuration";
import isEmpty from "@src/utils/isEmpty";
import React from "react";

import { UnitStyle } from "../Styled";
import { DurationProps } from "./duration.type";

const Duration: React.FC<DurationProps> = ({
  rawValue,
  valueClassName,
  unitClassName,
  abbreviate,
  emptyProps,
  maxDisplayUnits = 2,
  minUnit = "second",
  noUnitOnZero = false,
  contentRender,
  "data-testid": dataTestId,
}) => {
  const { parts } = useFormatDuration(rawValue ?? 0, {
    maxDisplayUnits,
    useAbbreviation: abbreviate,
    minUnit,
  });

  if (isEmpty(rawValue)) {
    return <Empty data-testid={dataTestId} {...emptyProps} />;
  }

  // 如果没有任何部分，返回空值
  if (parts.length === 0) {
    return <Empty data-testid={dataTestId} {...emptyProps} />;
  }

  // 如果提供了自定义渲染函数，使用它
  if (contentRender) {
    const formatItems = formatDuration(rawValue, {
      maxDisplayUnits,
      minUnit,
    });
    return <>{contentRender(formatItems)}</>;
  }

  // 检查是否所有值都是0，且需要隐藏单位
  const allZero = parts.every((part) => part.value === 0);

  // 如果所有值都是0且需要隐藏单位，只显示0
  if (noUnitOnZero && allZero) {
    return (
      <span data-testid={dataTestId} className={cx("value", valueClassName)}>
        0
      </span>
    );
  }

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={`${part.unit}-${index}`}>
          {index > 0 && <span> </span>}
          <ParrotTrans
            parent={"span"}
            i18nKey={part.i18nKey}
            count={part.value}
          >
            <span className={cx("value", valueClassName)}></span>
            <span className={cx("unit", UnitStyle, unitClassName)}></span>
          </ParrotTrans>
        </React.Fragment>
      ))}
    </>
  );
};

export default Duration;
