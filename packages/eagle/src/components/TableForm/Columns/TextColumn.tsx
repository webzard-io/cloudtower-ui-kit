import { cx } from "@linaria/core";
import React, { useMemo } from "react";

import { Typo } from "../../Typo";
import {
  BodyCellTextStyle,
  BodyCellTextWrapper,
  SubtitleStyle,
} from "../style";
import { ColumnBodyCellProps, ColumnHeaderCellProps } from "../types";

export const TextColumnHeaderCell: React.FC<ColumnHeaderCellProps> = ({
  column,
}) => {
  return (
    <p
      className={cx(Typo.Label.l4_regular, SubtitleStyle, column.subTitleColor)}
    >
      {column.subTitle}
    </p>
  );
};

export const TextColumnBodyCell: React.FC<ColumnBodyCellProps> = ({
  data,
  column,
  index,
}) => {
  const text = column.displayText || data[index][column.key];

  const CellDescription = useMemo(() => {
    const Result =
      column.renderDescription?.({
        rowIndex: index,
        rowData: data[index],
      }) ?? null;
    return typeof Result === "string" ? (
      <p className={cx(Typo.Label.l4_regular, "cell-description")}>{Result}</p>
    ) : (
      Result
    );
  }, [index, data, column]);

  const Text = useMemo(
    () => (
      <p className={cx(Typo.Label.l3_regular, BodyCellTextStyle)}>{text}</p>
    ),
    [text]
  );

  return (
    <BodyCellTextWrapper
      className={!!CellDescription ? "with-description" : undefined}
    >
      {Text}
      {CellDescription}
    </BodyCellTextWrapper>
  );
};
