// Remove decimal points from numbers
// Or Returns an empty string if there are letters in the alphabet
const formatterInteger = (value: any) => {
  const reg = /^\.|[^\d]/g;
  if (typeof value === "string") {
    return !isNaN(Number(value.replace(reg, ""))) ? value.replace(reg, "") : "";
  } else if (typeof value === "number") {
    return !isNaN(value) ? String(value).replace(reg, "") : "";
  } else {
    return "";
  }
};

export default formatterInteger;
