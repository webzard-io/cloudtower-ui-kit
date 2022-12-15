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
