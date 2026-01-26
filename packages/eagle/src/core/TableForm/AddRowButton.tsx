import { PlusAddCreateNew16SecondaryIcon } from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button, { ButtonProps } from "@src/core/Button";
import { AddRowButtonWrapper } from "@src/core/TableForm/style";
import { AddRowButtonProps, DataType } from "@src/core/TableForm/types";
import { genEmptyRow } from "@src/core/TableForm/utils";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, { useMemo } from "react";

const AddRowButton: React.FC<AddRowButtonProps> = (props) => {
  const {
    config: {
      maximum,
      className,
      CustomizedButton,
      buttonProps,
      text,
      extraAction,
    },
    style,
    columns,
    addData,
    data,
  } = props;
  const { t } = useParrotTranslation();

  const {
    disabled: disabledFromProp,
    onClick,
    ...restButtonProps
  } = buttonProps || ({} as ButtonProps);

  const onAdd = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    data: DataType[],
  ) => {
    const newData = [...data];
    const newRow = genEmptyRow(columns);
    newData.push(newRow);
    addData(newData);
    onClick?.(e);
  };

  const disabled = useMemo(
    () =>
      disabledFromProp ||
      (typeof maximum === "number" && maximum <= data.length),
    [maximum, data.length, disabledFromProp],
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
    <AddRowButtonWrapper className={className} style={style}>
      <Button
        {...restButtonProps}
        type={restButtonProps.type || "ordinary"}
        size={restButtonProps.size || "small"}
        prefixIcon={
          restButtonProps.prefixIcon || <PlusAddCreateNew16SecondaryIcon />
        }
        className={cx(Typo.Label.l3_regular, restButtonProps.className)}
        onClick={(e) => {
          onAdd(e, data);
        }}
        disabled={disabled}
      >
        {CustomizedButtonText || t("components.add")}
      </Button>
      {extraAction}
      {typeof maximum === "number" ? (
        <span
          className={cx(
            Typo.Label.l4_regular,
            "maximum-desc",
            disabled && "disabled",
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
