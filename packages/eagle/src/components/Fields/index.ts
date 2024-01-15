import FieldsBoolean from "@src/components/Fields/FieldsBoolean";
import FieldsDateTime from "@src/components/Fields/FieldsDateTime";
import FieldsDateTimeRange from "@src/components/Fields/FieldsDateTimeRange";
import FieldsEnum from "@src/components/Fields/FieldsEnum";
import FieldsFloat from "@src/components/Fields/FieldsFloat";
import FieldsInt from "@src/components/Fields/FieldsInt";
import FieldsInteger from "@src/components/Fields/FieldsInteger";
import FieldsString from "@src/components/Fields/FieldsString";
import FieldsTextArea from "@src/components/Fields/FieldsTextArea";
import FieldsTimePicker from "@src/components/Fields/FieldsTimePicker";
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
