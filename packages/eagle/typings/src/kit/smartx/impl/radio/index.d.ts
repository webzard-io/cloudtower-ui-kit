import { RadioButtonProps, RadioProps } from "@cloudtower/eagle/kit/specify";
import { RadioGroupProps as AntdRadioGroupProps } from "antd/lib/radio";
import React from "react";
declare const Radio: React.FC<RadioProps>;
declare const RadioGroup: React.FC<AntdRadioGroupProps>;
declare const RadioButton: React.FC<RadioButtonProps>;
export { RadioButton, RadioGroup };
export default Radio;
