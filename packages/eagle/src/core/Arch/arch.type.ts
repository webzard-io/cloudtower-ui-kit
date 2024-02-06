export enum Architecture {
  Aarch64 = "AARCH64",
  X86_64 = "X86_64",
}

export type ArchComponentType = React.FC<{ architecture?: Architecture }>;
