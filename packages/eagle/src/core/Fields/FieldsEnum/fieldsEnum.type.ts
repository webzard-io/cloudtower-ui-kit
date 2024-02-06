import { FieldRenderProps, InputSize } from "../fields.type";

export interface BaseEnumProps {
  enumValues: readonly (string | { value: string; text: string })[];
  placeholder?: string;
  emptyLabel?: string;
  size?: InputSize;
  defaultValue?: string;
  multiple?: boolean;
}

export type EnumProps<V = any, T extends HTMLElement = HTMLElement> = {
  input: Partial<FieldRenderProps<V, T>["input"]>;
  meta: FieldRenderProps<V, T>["meta"];
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
} & BaseEnumProps;
