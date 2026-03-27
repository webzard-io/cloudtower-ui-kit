import { CloseCircleFilled } from "@ant-design/icons";
import { FocusIndicator16BlueIcon } from "@cloudtower/icons-react";
import cs from "classnames";
import React from "react";

import Icon from "../../Icon";
import Input from "../../Input";
import InputTagItem from "../../InputTagItem";
import Overflow from "../../Overflow";
import { KitInputStyle } from "../../Styled";
import { FieldBaseProps } from "../fields.type";
import { StringProps } from "./fieldsString.type";

// FIXME
// No Needed Property onBlur onFocus in input field
// Same Problem as FieldsBoolean Component

const FieldsString = ({
  input,
  meta,
  autoComplete = "off",
  size,
  tags,
  className,
  allowClear,
  tagsOverflow,
  onTagsAllowClearClick,
  onClick,
  maxLength,
  focusIndicator,
  "data-testid": dataTestId,
  ...props
}: FieldBaseProps & StringProps) => {
  const inputWithTestId = dataTestId
    ? { ...input, "data-testid": dataTestId }
    : input;
  if (tags?.length) {
    return (
      <div
        data-testid={dataTestId}
        className={cs(
          className,
          KitInputStyle,
          "input-tags",
          allowClear && "kit-input-suffix-wrapper",
        )}
        onClick={onClick}
      >
        <div className="input-tags-inner">
          <Overflow overflow={tagsOverflow}>
            <span className="tags-overflow-auto">
              {tags.map((tag) => (
                <InputTagItem key={tag}>{tag}</InputTagItem>
              ))}
            </span>
          </Overflow>
        </div>
        <span className="input-tag-suffix">
          {allowClear && (
            <CloseCircleFilled
              data-testid={dataTestId ? `${dataTestId}-clear` : undefined}
              onClick={onTagsAllowClearClick}
            />
          )}
        </span>
      </div>
    );
  }
  return (
    <>
      <Input
        className={cs(
          className,
          KitInputStyle,
          focusIndicator && "has-focus-indicator",
        )}
        {...inputWithTestId}
        autoComplete={props.type === "password" ? "new-password" : autoComplete}
        size={size}
        allowClear={allowClear}
        onClick={onClick}
        prefix={
          focusIndicator ? (
            <Icon alt={"focusIndicator16Blue"} src={FocusIndicator16BlueIcon} />
          ) : undefined
        }
        error={
          meta.touched &&
          (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
        }
        {...props}
        onChange={(e) => {
          if (maxLength) {
            e.target.value = e.target.value.substr(0, maxLength);
          }
          input.onChange?.(e);
        }}
      />
    </>
  );
};

export default FieldsString;

export * from "./fieldsString.type";
