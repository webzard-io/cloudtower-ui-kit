import FieldsBoolean from "./FieldsBoolean";
import FieldsDateTime from "./FieldsDateTime";
import FieldsDateTimeRange from "./FieldsDateTimeRange";
import FieldsEnum from "./FieldsEnum";
import FieldsFloat from "./FieldsFloat";
import FieldsInt from "./FieldsInt";
import FieldsInteger from "./FieldsInteger";
import FieldsString from "./FieldsString";
import FieldsTextArea from "./FieldsTextArea";
import FieldsTimePicker from "./FieldsTimePicker";

const fields = {
  Int: FieldsInt,
  Integer: FieldsInteger,
  Float: FieldsFloat,
  DateTime: FieldsDateTime,
  TimePicker: FieldsTimePicker,
  Enum: FieldsEnum,
  String: FieldsString,
  Boolean: FieldsBoolean,
  TextArea: FieldsTextArea,
  DateTimeRange: FieldsDateTimeRange,
};

export default fields;

export * from "./fields.type";
export * from "./FieldsBoolean";
export * from "./FieldsDateTime";
export * from "./FieldsDateTimeRange";
export * from "./FieldsEnum";
export * from "./FieldsFloat";
export * from "./FieldsInt";
export * from "./FieldsInteger";
export * from "./FieldsString";
export * from "./FieldsTextArea";
export * from "./FieldsTimePicker";
