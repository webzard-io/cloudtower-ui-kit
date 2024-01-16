import FieldsBoolean from "@src/core/Fields/FieldsBoolean";
import FieldsDateTime from "@src/core/Fields/FieldsDateTime";
import FieldsDateTimeRange from "@src/core/Fields/FieldsDateTimeRange";
import FieldsEnum from "@src/core/Fields/FieldsEnum";
import FieldsFloat from "@src/core/Fields/FieldsFloat";
import FieldsInt from "@src/core/Fields/FieldsInt";
import FieldsInteger from "@src/core/Fields/FieldsInteger";
import FieldsString from "@src/core/Fields/FieldsString";
import FieldsTextArea from "@src/core/Fields/FieldsTextArea";
import FieldsTimePicker from "@src/core/Fields/FieldsTimePicker";
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
