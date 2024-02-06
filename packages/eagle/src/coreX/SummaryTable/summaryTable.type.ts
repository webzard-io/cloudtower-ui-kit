import { ReactNode } from "react";

type SummaryTableCommonProps = {
  showHeader?: boolean;
  border?: boolean;
  className?: string;
  title?: string;
  rightAlign?: boolean;
  showEdit?: boolean;
  onEdit?: () => void;
  layout?: "horizontal" | "inline";
};

export interface SummaryTableItem<T> {
  key: string;
  title: string | ReactNode;
  dataIndex: string | string[];
  render?: (cell: any, record: T) => React.ReactNode;
  hiddenTitle?: boolean;
  hiddenBorder?: boolean;
}

type SummaryTableCustomRenderProps = {
  children: React.ReactChild;
} & SummaryTableCommonProps;

type SummaryTableContentProps<T> = {
  items: SummaryTableItem<T>[];
  labelWidth?: string;
  dataSource: T;
};

type SummaryTableProps<T> = SummaryTableContentProps<T> &
  SummaryTableCommonProps;

export type SummaryTableContentComponentType = <T>(
  props: SummaryTableContentProps<T>,
) => JSX.Element;

export type SummaryTableComponentType = <T = unknown>(
  props: SummaryTableProps<T> | SummaryTableCustomRenderProps,
) => JSX.Element;
