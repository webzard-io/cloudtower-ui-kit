import { AffixColumnHeaderCell } from "./AffixColumn";
import {
  CheckboxColumnBodyCell,
  CheckboxColumnHeaderCell,
} from "./CheckboxColumn";
import { InputColumnBodyCell, InputColumnHeaderCell } from "./InputColumn";
import { TextColumnBodyCell, TextColumnHeaderCell } from "./TextColumn";

export const ColumnHeaderImpls = {
  text: TextColumnHeaderCell,
  input: InputColumnHeaderCell,
  password: InputColumnHeaderCell,
  affix: AffixColumnHeaderCell,
  checkbox: CheckboxColumnHeaderCell,
};

export const ColumnBodyImpls = {
  text: TextColumnBodyCell,
  input: InputColumnBodyCell,
  password: InputColumnBodyCell,
  affix: InputColumnBodyCell,
  checkbox: CheckboxColumnBodyCell,
};
