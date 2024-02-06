import { FieldBaseProps, InputSize } from "../fields.type";

export interface IntProps {
  placeholder?: string;
  suffix?: string;
  size?: InputSize;
  onBlur?: (
    input: FieldBaseProps<number, HTMLInputElement>["input"],
    event?: React.FocusEvent<HTMLInputElement>,
  ) => void;
}

export type IntFieldProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V = any,
  T extends HTMLElement = HTMLElement,
> = FieldBaseProps<V, T> &
  IntProps & {
    onChange?: FieldBaseProps<V, T>["input"]["onChange"];
    autoComplete?: "on" | "off";
    maximum?: number;
    minimum?: number;
    supportNegativeValue?: boolean;
  };
