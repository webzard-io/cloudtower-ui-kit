import { SelectProps as AntdSelectProps } from "antd/lib/select";

import { FieldRenderProps } from "../Fields/fields.type";

export type KitLegacySelectProps = {
  defaultValue?: string;
  error?: unknown | React.ReactNode;
  danger?: boolean;
  multiple?: boolean;
  scrollBottomBuffer?: number;
  onScrollBottom?: () => void;
  selectLimit?: number;
} & AntdSelectProps<string>;

export interface LooseFieldRenderProps<V, T extends HTMLElement> {
  input: {
    name?: FieldRenderProps<V, T>["input"]["name"];
    value?: FieldRenderProps<V, T>["input"]["value"];
    onBlur?: FieldRenderProps<V, T>["input"]["onBlur"];
    onChange?: (
      value: string | string[],
      option: { object: V } | Array<{ object: V }>,
    ) => void;
    onFocus?: FieldRenderProps<V, T>["input"]["onFocus"];
    type?: FieldRenderProps<V, T>["input"]["type"];
    checked?: FieldRenderProps<V, T>["input"]["checked"];
    multiple?: FieldRenderProps<V, T>["input"]["multiple"];
  };
  meta?: FieldRenderProps<V, T>["meta"];
  focusIndicator?: boolean;
}

export type LegacySelectComponentType<
  V = any,
  T extends HTMLElement = HTMLElement,
> = React.FunctionComponent<LooseFieldRenderProps<V, T> & KitLegacySelectProps>;
