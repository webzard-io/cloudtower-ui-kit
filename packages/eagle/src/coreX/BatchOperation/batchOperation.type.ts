export type NormalAction = {
  key: string;
  icon?: React.ReactElement;
  title: string;
  onClick: () => void;
  danger?: boolean;
  count?: number;
  disabled?: boolean;
  tooltip?: string;
};

type SubAction = {
  key: string;
  icon?: React.ReactElement;
  title: string;
  children: Array<Action>;
  danger?: boolean;
  canMove?: {
    id: string;
  }[];
  canDelete?: {
    id: string;
  }[];
};

export type Action = NormalAction | SubAction | "divider";

export interface IBatchOperation {
  count: number;
  onClearSelection: () => void;
  actions: Action[];
}
