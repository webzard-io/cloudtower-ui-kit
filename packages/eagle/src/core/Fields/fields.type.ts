export type InputSize = "large" | "middle" | "small";

interface AnyObject {
  [key: string]: any;
}

export interface FieldState<FieldValue> {
  active?: boolean;
  blur: () => void;
  change: (value: any) => void;
  data?: AnyObject;
  dirty?: boolean;
  dirtySinceLastSubmit?: boolean;
  error?: any;
  focus: () => void;
  initial?: FieldValue;
  invalid?: boolean;
  length?: number;
  modified?: boolean;
  name: string;
  pristine?: boolean;
  submitError?: any;
  submitFailed?: boolean;
  submitSucceeded?: boolean;
  submitting?: boolean;
  touched?: boolean;
  valid?: boolean;
  validating?: boolean;
  value?: FieldValue;
  visited?: boolean;
}

export type FieldMetaState<FieldValue> = Pick<
  FieldState<FieldValue>,
  Exclude<
    keyof FieldState<FieldValue>,
    "blur" | "change" | "focus" | "name" | "value"
  >
>;

interface FieldInputProps<FieldValue, T extends HTMLElement = HTMLElement>
  extends AnyObject {
  name: string;
  onBlur: (event?: React.FocusEvent<T>) => void;
  onChange: (event: React.ChangeEvent<T> | any) => void;
  onFocus: (event?: React.FocusEvent<T>) => void;
  type?: string;
  value: FieldValue;
  checked?: boolean;
  multiple?: boolean;
}

export interface FieldRenderProps<
  FieldValue,
  T extends HTMLElement = HTMLElement,
> {
  input: FieldInputProps<FieldValue, T>;
  meta: FieldMetaState<FieldValue>;
  [otherProp: string]: any;
}

export type FieldBaseProps<
  V = any,
  T extends HTMLElement = HTMLElement,
> = FieldRenderProps<V, T> & {
  disabled?: boolean;
  className?: string;
};
