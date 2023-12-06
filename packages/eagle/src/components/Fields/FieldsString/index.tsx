import {
  FocusIndicator16BlueIcon,
  XmarkClearFill24TertiaryIcon,
} from "@cloudtower/icons-react";
import cs from "classnames";
import React from "react";

import { FieldBaseProps, StringProps } from "../../../spec";
import Icon from "../../Icon";
import Input from "../../Input";
import InputTagItem from "../../InputTagItem";
import Overflow from "../../Overflow";
import { KitInputStyle } from "../../Styled";

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
  ...props
}: FieldBaseProps & StringProps) => {
  if (tags?.length) {
    return (
      <div
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
            <Icon
              src={XmarkClearFill24TertiaryIcon}
              iconWidth={24}
              iconHeight={24}
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
        {...input}
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
