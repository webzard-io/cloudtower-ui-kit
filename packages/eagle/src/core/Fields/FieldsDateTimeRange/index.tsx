import { DatePicker } from "antd";
import { DatePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import React from "react";

import { FieldBaseProps } from "../fields.type";

const FieldsDateTimeRange: React.FC<FieldBaseProps & DatePickerProps> = ({
  input,
  "data-testid": dataTestId,
  ...props
}) => {
  const inputWithTestId = dataTestId
    ? { ...input, "data-testid": dataTestId }
    : input;
  return (
    <div className="datatime-range">
      <DatePicker.RangePicker
        showTime
        {...inputWithTestId}
        onFocus={() => input.onFocus?.()}
        onBlur={() => input.onBlur?.()}
        // https://github.com/ant-design/ant-design/issues/22185
        defaultValue={input.value?.map((v?: string) => v && moment(v))}
        onChange={input.onChange}
        value={input.value?.map((v?: string) => v && moment(v))}
        format={props.format}
      />
    </div>
  );
};

export default FieldsDateTimeRange;
