import { PlusOutlined } from "@ant-design/icons";
import { cx } from "@linaria/core";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "src/spec";

import Button from "../Button";
import { Typo } from "../Typo";
import { AddRowButtonWrapper } from "./style";
import { AddRowButtonProps, DataType } from "./types";
import { genEmptyRow } from "./utils";

const AddRowButton: React.FC<AddRowButtonProps> = (props) => {
  const {
    config: { maximum, className, CustomizedButton, buttonProps, text },
    columns,
    updateData,
    data,
  } = props;
  const { t } = useTranslation();

  const {
    disabled: disabledFromProp,
    onClick,
    ...restButtonProps
  } = buttonProps || ({} as ButtonProps);

  const onAdd = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    data: DataType[]
  ) => {
    const newData = [...data];
    const newRow = genEmptyRow(columns);
    newData.push(newRow);
    updateData(newData);
    onClick?.(e);
  };

  const disabled = useMemo(
    () =>
      disabledFromProp ||
      (typeof maximum === "number" && maximum <= data.length),
    [maximum, data.length, disabledFromProp]
  );

  const CustomizedButtonText = useMemo(() => {
    if (!text) return null;
    if (typeof text === "string") return text;
    return text();
  }, [text]);

  if (!columns.length) {
    return null;
  }

  return CustomizedButton ? (
    <CustomizedButton {...props} />
  ) : (
    <AddRowButtonWrapper className={className}>
      <Button
        {...restButtonProps}
        type={restButtonProps.type || "ordinary"}
        size={restButtonProps.size || "small"}
        icon={restButtonProps.icon || <PlusOutlined />}
        className={cx(Typo.Label.l3_regular, restButtonProps.className)}
        onClick={(e) => {
          onAdd(e, data);
        }}
        disabled={disabled}
      >
        {CustomizedButtonText || t("components.add")}
      </Button>
      {typeof maximum === "number" ? (
        <span
          className={cx(
            Typo.Label.l4_regular,
            "maximum-desc",
            disabled && "disabled"
          )}
        >
          {t("components.maximum_row_count_desc", {
            count: maximum,
          })}
        </span>
      ) : null}
    </AddRowButtonWrapper>
  );
};

export default AddRowButton;
