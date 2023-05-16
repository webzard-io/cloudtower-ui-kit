import { cx } from "@linaria/core";
import React from "react";

import { Typo } from "../../Typo";
// import { Icon } from "../../../../components/Icon";
import {
  // BodyCellIconStyle,
  BodyCellTextStyle,
  SubtitleStyle,
  TitleStyle,
} from "../style";
import { ColumnBodyCellProps, ColumnHeaderCellProps } from "../types";
import { FormItem } from "./FormItem";

const COLOR_MAP = {
  primary: "#0080FF",
  info: "#0080FF",
  success: "#00BA5D",
  warning: "#FFA500",
  danger: "#F0483E",
  error: "#F0483E",
  normal: "rgba(44, 56, 82, 0.6)",
};

export const TextColumnHeaderCell: React.FC<ColumnHeaderCellProps> = ({
  column,
}) => {
  return (
    <>
      <p className={cx(Typo.Label.l2_regular, TitleStyle)}>{column.title}</p>
      <p
        style={{
          color: ({ ...COLOR_MAP, "": "" } as any)[column.subTitleColor || ""],
        }}
        className={cx(Typo.Label.l4_regular, SubtitleStyle)}
      >
        {column.subTitle}
      </p>
    </>
  );
};

export const TextColumnBodyCell: React.FC<ColumnBodyCellProps> = ({
  data,
  errorInfo,
  column,
  index,
}) => {
  const error = errorInfo[`${index}.${column.key}`];
  const icon = error?.isError ? column.bodyErrorIcon : column.bodyIcon;
  const text = column.displayText || data[index][column.key];

  return (
    <FormItem
      validateStatus={error?.isError ? "error" : ""}
      message={error?.errorMessage || ""}
    >
      {icon ? (
        // <Icon className={BodyCellIconStyle} icon={icon} />
        <div>icon</div>
      ) : null}
      <span
        style={{ color: error?.isError ? COLOR_MAP.danger : "" }}
        className={cx(Typo.Label.l4_medium, BodyCellTextStyle)}
      >
        {text}
      </span>
    </FormItem>
  );
};
