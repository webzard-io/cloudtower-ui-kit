import { InputProps } from "antd/lib/input";

export type SearchInputProps = Omit<InputProps, "onChange"> & {
  onChange: (value: string) => void;
  debounceWait?: number;
};

export type SearchInputComponentType = React.FC<SearchInputProps>;
