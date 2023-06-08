import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import React, { useEffect, useState } from "react";

import { ColumnBodyCellProps, ColumnHeaderCellProps } from "../types";

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
  return <Input {...props} />;
};

export const InputColumnHeaderCell: React.FC<
  Omit<ColumnHeaderCellProps, "onChange" | "onBlur"> & {
    onChange: (value: unknown) => void;
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
    onChange: (value: unknown) => void;
    onBlur: () => void;
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
    />
  );
};
