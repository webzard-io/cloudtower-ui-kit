import { AffixColumnHeaderCell } from "./AffixColumn";
import { CheckboxColumnBodyCell } from "./CheckboxColumn";
import { InputColumnBodyCell, InputColumnHeaderCell } from "./InputColumn";
import { TextColumnBodyCell, TextColumnHeaderCell } from "./TextColumn";

export const ColumnHeaderImpls = {
  text: TextColumnHeaderCell,
  input: InputColumnHeaderCell,
  password: InputColumnHeaderCell,
  affix: AffixColumnHeaderCell,
  checkbox: TextColumnHeaderCell,
};

export const ColumnBodyImpls = {
  text: TextColumnBodyCell,
  input: InputColumnBodyCell,
  password: InputColumnBodyCell,
  affix: InputColumnBodyCell,
  checkbox: CheckboxColumnBodyCell,
};
