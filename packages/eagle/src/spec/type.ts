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

export interface IDropDownMenuItem {
  type?: "single" | "group" | "divider";
  key: string;
  disabled?: boolean;
  text?: string;
  icon?: React.ReactElement;
  hidden?: boolean;
  onClick?: () => void;
  danger?: boolean;
  tooltip?: string;
}

export type Placement =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

export interface IDropdownMenuProps {
  items: Array<
    IDropDownMenuItem & {
      title?: string;
      children?: Array<IDropDownMenuItem>;
    }
  >;
  disabled?: boolean;
  placement?: Placement;
  trigger?: ("click" | "hover" | "contextMenu")[];
  customStyle?: {
    content: string;
  };
  slotsElements: {
    trigger?: (args: object) => string | React.ReactNode;
  };
}
