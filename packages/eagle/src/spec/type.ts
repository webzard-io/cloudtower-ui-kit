export type Maybe<T> = T | null | undefined;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  [key: string]: string | number | boolean | undefined;
};

export enum Architecture {
  Aarch64 = "AARCH64",
  X86_64 = "X86_64",
}

export enum UserSource {
  Ldap = "LDAP",
  Local = "LOCAL",
}

export enum EntityAsyncStatus {
  Creating = "CREATING",
  Deleting = "DELETING",
  Updating = "UPDATING",
}

export enum TaskStatus {
  Executing = "EXECUTING",
  Failed = "FAILED",
  Paused = "PAUSED",
  Pending = "PENDING",
  Successed = "SUCCESSED",
}

export interface AdditionOptions {
  error?: boolean;
  controls?: boolean;
  suffix?: string;
}

export type SizeType = "small" | "middle" | "large";

export interface ISpaceProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | number;
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
}

export interface ITimeZoneSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  defaultUseBrowserTime?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  // This it not defaultValue, it just adds a default option.
  defaultOptionValue?: string;
}
