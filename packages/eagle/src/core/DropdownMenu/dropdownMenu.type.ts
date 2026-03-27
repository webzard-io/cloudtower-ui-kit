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
  "data-testid"?: string;
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
  "data-testid"?: string;
}
