import { TextAreaProps } from "antd/lib/input";
import React from "react";

import { FieldBaseProps } from "../../spec";
import TextArea from "../TextArea";

const KitTextArea = ({
  input,
  meta,
  onFocusChangeHeight,
  ...props
}: FieldBaseProps & TextAreaProps) => {
  return (
    <>
      <TextArea
        {...input}
        {...props}
        error={
          meta.touched &&
          (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
        }
        onFocus={(e) => {
          input.onFocus(e);
          onFocusChangeHeight &&
            (e.currentTarget.style.minHeight = `${onFocusChangeHeight.onFocus}px`);
        }}
        onBlur={(e) => {
          input.onBlur(e);
          onFocusChangeHeight &&
            (e.currentTarget.style.minHeight = `${onFocusChangeHeight.onBlur}px`);
        }}
      />
    </>
  );
};

export default KitTextArea;
