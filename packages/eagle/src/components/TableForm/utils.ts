import { TableFormColumn } from "./types";

export function increaseLastNumber(str: string, num: number): string {
  const lastNumberMatch = str.match(/(\d+)$/);

  if (!lastNumberMatch) {
    return str;
  }

  const prefix = str.slice(0, lastNumberMatch.index);
  const lastNumber = lastNumberMatch[1];

  let newLastNumber;
  if (Number.isSafeInteger(Number(str) + num)) {
    newLastNumber = Number(str) + num;
  }
  newLastNumber = (BigInt(lastNumber) + BigInt(num)).toString();

  return `${prefix}${newLastNumber}`;
}

export const genEmptyRow = (columns: TableFormColumn[]) => {
  const row: Record<string, any> = {};
  columns.forEach((col) => {
    row[col.key] = col.defaultValue;
  });
  return row;
};

export const moveItemInArray: <T>(
  array: T[],
  fromIndex: number,
  toIndex: number
) => T[] = (array, fromIndex, toIndex) => {
  const arrLength = array.length;
  const sortArr = [...array];
  if (fromIndex > -1 && fromIndex < arrLength) {
    const moveItem = sortArr.splice(fromIndex, 1)[0];
    sortArr.splice(toIndex, 0, moveItem);
  }
  return sortArr;
};
