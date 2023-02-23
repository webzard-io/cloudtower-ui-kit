import { MAGIC_METRIC_NULL } from "./tower";

function isEmpty(rawValue?: number | null): rawValue is null | undefined {
  if (
    rawValue === null ||
    rawValue === undefined ||
    rawValue === MAGIC_METRIC_NULL ||
    Number.isNaN(rawValue)
  ) {
    return true;
  }
  return false;
}

export default isEmpty;
