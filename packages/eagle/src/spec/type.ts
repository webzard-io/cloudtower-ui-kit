import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export enum Architecture {
  Aarch64 = "AARCH64",
  X86_64 = "X86_64",
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

export interface ITimeProps {
  className?: string;
  date?: string | number | Date | null;
  dateTemplate?: string | null;
  timeTemplate?: string | null;
  plainText?: boolean;
}

export type DropdownTransitionProps = {
  visible: boolean;
} & CSSTransitionProps;

export interface IAccordionCardProps {
  header: React.ReactNode | ((active: boolean) => React.ReactNode);
  expand: React.ReactNode;
  className?: string;
  defaultExpand?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

export interface IDetailCardProps {
  title?: React.ReactNode;
}

export interface ICountingProps {
  stop?: boolean;
  interval?: number;
  render: () => React.ReactNode;
}
