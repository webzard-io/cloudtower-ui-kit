import { cx } from "@linaria/core";
import { ColumnHeaderImpls } from "@src/core/TableForm/Columns";
import { FormItem } from "@src/core/TableForm/Columns/FormItem";
import { TitleStyle } from "@src/core/TableForm/style";
import { ColumnHeaderCellProps } from "@src/core/TableForm/types";
import { increaseLastNumber } from "@src/core/TableForm/utils";
import { Typo } from "@src/core/Typo";
import { OverflowTooltip } from "@src/coreX";
import React, { useCallback, useState } from "react";
export const BatchInputListHeaderCell: React.FC<ColumnHeaderCellProps> = (
  props,
) => {
  const { column, disabled, data, disableBatchFilling, onBlur, onChange } =
    props;

  const [errMsg, setErrMsg] = useState<string>();

  const width = Number.isNaN(Number(column.width))
    ? column.width
    : column.width + "px";

  const headerOnChange = useCallback(
    (value: any, shouldUpdateData: boolean = false) => {
      const err = column.validator?.({ value, isHeader: true });
      setErrMsg(err || undefined);
      const shouldAutoIncrease =
        column.type !== "password" && column.autoIncrease;
      const newData = data.map((cell, rowIndex) => {
        return {
          ...cell,
          [column.key]:
            shouldAutoIncrease && typeof value === "string"
              ? increaseLastNumber(value, rowIndex)
              : value,
        };
      });
      onChange?.(newData, column.key, shouldUpdateData);
    },
    [onChange, data, column],
  );

  const headerOnBlur = useCallback(() => {
    onBlur?.(column.key, errMsg);
  }, [column.key, onBlur, errMsg]);

  const renderDefaultComponent = () => {
    if (!column.type) return null;
    const CellComponent = ColumnHeaderImpls[column.type];
    return (
      <CellComponent
        {...props}
        column={column}
        onChange={headerOnChange}
        onBlur={headerOnBlur}
      />
    );
  };

  const renderTitle = () => {
    const titleContent =
      typeof column.title === "string" ? (
        <OverflowTooltip tooltip={column.title} content={column.title} />
      ) : (
        column.title
      );

    return (
      <p className={cx(Typo.Label.l3_bold_title, TitleStyle)}>{titleContent}</p>
    );
  };

  const renderSubTitle = () => {
    // subTitleRender has the highest priority,
    // even if the batch filling is disabled
    if (column.subTitleRender) {
      return column.subTitleRender({
        isHeader: true,
        disabled,
        onChange: headerOnChange,
        onBlur: headerOnBlur,
      });
    }

    // do not render subTitle if the subTitleRender is not provided
    // and the batch filling is disabled
    if (disableBatchFilling) {
      return null;
    }

    // render subTitle if the batch filling is enabled
    return (
      <FormItem
        validateStatus={typeof errMsg === "string" && errMsg ? "error" : ""}
        message={errMsg || undefined}
      >
        {
          // if the render prop is provided, use it to render the subTitle
          // otherwise, render the default component
          column.render
            ? column.render({
                isHeader: true,
                disabled,
                onChange: headerOnChange,
                onBlur: headerOnBlur,
              })
            : renderDefaultComponent()
        }
      </FormItem>
    );
  };

  return (
    <div
      className={cx("eagle-table-form-cell", `align-${column.align || "left"}`)}
      style={{
        maxWidth: column.width ? width : "",
        minWidth: column.width ? width : "",
        visibility: column.hidden ? "hidden" : "visible",
      }}
    >
      {renderTitle()}
      {renderSubTitle()}
    </div>
  );
};
