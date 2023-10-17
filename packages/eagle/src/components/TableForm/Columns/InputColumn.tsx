import {
  EntityFilterIgnoreGradient16GrayIcon,
  ViewEye16GrayIcon,
} from "@cloudtower/icons-react";
import React, { useEffect, useState } from "react";

import Icon from "../../Icon";
import Input from "../../Input";
import { ColumnBodyCellProps, ColumnHeaderCellProps } from "../types";

type InputProps = Parameters<typeof Input>[0];

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
      suffix={
        showPassword ? (
          <Icon
            src={ViewEye16GrayIcon}
            onClick={toggleShowPassword}
            className="ant-input-password-icon"
          />
        ) : (
          <Icon
            src={EntityFilterIgnoreGradient16GrayIcon}
            onClick={toggleShowPassword}
            className="ant-input-password-icon"
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
  return <Input {...props} />;
};

export const InputColumnHeaderCell: React.FC<
  Omit<ColumnHeaderCellProps, "onChange" | "onBlur"> & {
    onChange: (value: any) => void;
    onBlur: () => void;
  }
> = ({ disabled, column, onChange, onBlur, onVisibleChange }) => {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <CustomInput
      type={column.type}
      placeholder={column.placeholder}
      disabled={disabled}
      size="small"
      onChange={_onChange}
      onBlur={onBlur}
      onVisibleChange={onVisibleChange}
    />
  );
};
export const InputColumnBodyCell: React.FC<
  Pick<
    ColumnBodyCellProps,
    "data" | "latestData" | "column" | "index" | "disabled" | "visible"
  > & {
    onChange: (value: any) => void;
    onBlur: () => void;
    error: boolean;
  }
> = ({
  data,
  latestData,
  column,
  index,
  disabled,
  onChange,
  onBlur,
  visible,
  error,
}) => {
  const placeHolderValue =
    column.type === "password" ? "" : latestData[index][column.key];

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    onChange(newValue);
  };

  return (
    <CustomInput
      size="small"
      value={data[index][column.key]}
      type={column.type}
      defaultValue={column.defaultValue as string}
      disabled={disabled}
      placeholder={placeHolderValue || column.placeholder}
      onChange={_onChange}
      onBlur={onBlur}
      visible={visible}
      error={error}
    />
  );
};
