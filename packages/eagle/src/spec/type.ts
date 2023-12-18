import type { History, Location as HistoryLocation } from "history";
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

export interface BreadcrumbLink {
  name: string;
  // TODO Attributes that need to be removed
  id?: string;
  resource: string;
  tab?: string;

  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

export interface IBreadcrumbProps {
  items: BreadcrumbLink[];
}

export interface ICircleProgressProps {
  percent: number;
  color?: string;
  className?: string;
}
export type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : TComponent extends React.Component<infer Props>
  ? Props
  : never;

export type HistoryType = Omit<
  History,
  "push" | "replace" | "location" | "length"
> & {
  push: {
    (path: string, state?: HistoryLocation["state"]): void;
    (location: any): void;
  };
  replace: {
    (path: string, state?: HistoryLocation["state"]): void;
    (location: any): void;
  };
};
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
