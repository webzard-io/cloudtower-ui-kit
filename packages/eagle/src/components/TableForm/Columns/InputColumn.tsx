import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { css, cx } from "@linaria/core";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import React, { useEffect, useMemo, useState } from "react";

import { Typo } from "../../Typo";
import { TitleStyle } from "../style";
import { ColumnBodyCellProps, ColumnHeaderCellProps } from "../types";
// import { validators } from "../../../traits/validation";
import { increaseLastNumber } from "../utils";
import { FormItem } from "./FormItem";

const inputStyle = css`
  border-radius: 6px !important;
  & {
    border-color: rgba(172, 186, 211, 0.6);
  }
`;

const InputPassword: React.FC<
  InputProps & {
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
  }
> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (props.visible !== undefined) {
      setShowPassword(props.visible);
    }
  }, [props.visible]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    props?.onVisibleChange?.(!showPassword);
  };

  const inputType = showPassword ? "text" : "password";

  return (
    <Input
      {...props}
      type={inputType}
      className={inputStyle}
      suffix={
        showPassword ? (
          <EyeOutlined
            className="ant-input-password-icon"
            onClick={toggleShowPassword}
          />
        ) : (
          <EyeInvisibleOutlined
            className="ant-input-password-icon"
            onClick={toggleShowPassword}
          />
        )
      }
    />
  );
};

const CustomInput: React.FC<
  InputProps & {
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
  }
> = (props) => {
  if (props.type === "password") {
    return <InputPassword {...props} />;
  }
  return <Input className={inputStyle} {...props} />;
};

export const InputColumnHeaderCell: React.FC<ColumnHeaderCellProps> = ({
  data,
  disabled,
  column,
  onChange,
  onBlur,
  errorInfo,
  onVisibleChange,
}) => {
  const [value, setValue] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isShowError = useMemo(() => {
    // do not display the batch input error message only if all body inputs are not empty and have no errors
    const currentColumnData = data.map((d) => d[column.key]).filter((v) => !!v);
    const currentColumnErrors = Object.entries(errorInfo)
      .filter(([key]) => key.includes(column.key))
      .some(([, value]) => value.isError);

    return !(currentColumnData.length === data.length && !currentColumnErrors);
  }, [column.key, data, errorInfo]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const shouldAutoIncrease =
      column.type !== "password" &&
      // isValidIpv4(newValue) ||
      column.autoIncrease;
    setValue(newValue);

    const error = column?.headerValidator?.(newValue) || "";
    setErrorMsg(error);
    if (onChange) {
      const newData = data.map((cell, rowIndex) => {
        return {
          ...cell,
          [column.key]: shouldAutoIncrease
            ? increaseLastNumber(newValue, rowIndex)
            : newValue,
        };
      });
      onChange(newData, column.key);
    }
  };

  const _onBlur = () => {
    // validate current header input value
    const error = column?.headerValidator?.(value) || "";

    setErrorMsg(error);
    if (!!value && onBlur) {
      onBlur(column.key, error);
    }
  };

  return (
    <FormItem
      validateStatus={isShowError && errorMsg ? "error" : ""}
      message={isShowError ? errorMsg : undefined}
    >
      <p className={cx(Typo.Label.l2_regular, TitleStyle)}>{column.title}</p>
      <CustomInput
        className={inputStyle}
        type={column.type}
        value={value}
        placeholder={column.placeholder}
        disabled={disabled}
        onChange={_onChange}
        onBlur={_onBlur}
        onVisibleChange={onVisibleChange}
      />
    </FormItem>
  );
};
export const InputColumnBodyCell: React.FC<ColumnBodyCellProps> = ({
  data,
  latestData,
  column,
  errorInfo,
  index,
  disabled,
  onChange,
  onBlur,
  visible,
}) => {
  const path = `${index}.${column.key}`;
  const error = errorInfo[path];
  const placeHolderValue =
    column.type === "password" ? "" : latestData[index][column.key];
  const [value, setValue] = useState<string>(
    data[index][column.key] || column.defaultValue
  );

  const v = data[index][column.key];
  useEffect(() => {
    setValue(v);
  }, [v]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newCell = { ...data[index], [column.key]: newValue };
    const newData = [...data];

    newData[index] = newCell;
    setValue(newValue);
    if (onChange) {
      onChange(newData, path);
    }
  };

  const _onBlur = () => {
    if (onBlur) {
      onBlur(data, path);
    }
  };

  return (
    <FormItem
      validateStatus={error?.isError ? "error" : ""}
      message={error?.errorMessage || ""}
    >
      <CustomInput
        className={inputStyle}
        type={column.type}
        value={value}
        disabled={disabled}
        placeholder={placeHolderValue || column.placeholder}
        onChange={_onChange}
        onBlur={_onBlur}
        visible={visible}
      />
    </FormItem>
  );
};
