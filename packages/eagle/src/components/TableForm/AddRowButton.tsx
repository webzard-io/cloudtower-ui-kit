import {
  PlusAddCreateNew16BlueIcon,
  PlusAddCreateNew16GrayIcon,
} from "@cloudtower/icons-react";
import { parrotI18n } from "@cloudtower/parrot";
import { cx } from "@linaria/core";
import React, { useCallback, useState } from "react";

import Button from "../Button";
import Icon from "../Icon";
import { Typo } from "../Typo";
import { AddRowButtonWrapper } from "./style";
import { AddRowButtonProps } from "./types";
import { genEmptyRow } from "./utils";

const AddRowButton: React.FC<AddRowButtonProps> = (props) => {
  const {
    config: { maximum, className, CustomizedButton },
    columns,
    updateData,
    data,
  } = props;
  const [disabled, setDisabled] = useState(false);

  const onAdd = useCallback(() => {
    const newData = [...data];
    const newRow = genEmptyRow(columns);
    newData.push(newRow);
    if (newData.length === maximum) {
      setDisabled(true);
    }
    updateData(newData);
  }, [columns, updateData, data, maximum]);

  if (!columns.length) {
    return null;
  }

  return CustomizedButton ? (
    <CustomizedButton {...props} />
  ) : (
    <AddRowButtonWrapper className={className}>
      <Button
        className={Typo.Label.l3_regular}
        onClick={onAdd}
        disabled={disabled}
        prefixIcon={
          <Icon
            src={PlusAddCreateNew16GrayIcon}
            hoverSrc={PlusAddCreateNew16BlueIcon}
          />
        }
      >
        Add Item
      </Button>
      {typeof maximum === "number" ? (
        <span
          className={cx(
            Typo.Label.l4_regular,
            "maximum-desc",
            disabled && "disabled"
          )}
        >
          {parrotI18n.t("components.maximum_row_count_desc", {
            count: maximum,
          })}
        </span>
      ) : null}
    </AddRowButtonWrapper>
  );
};

export default AddRowButton;
