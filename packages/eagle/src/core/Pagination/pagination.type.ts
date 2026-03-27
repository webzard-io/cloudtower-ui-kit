export interface PaginationProps {
  "data-testid"?: string;
  current: number;
  count: number;
  size: number;
  onChange: (page: number) => void;
  onSizeChange?: (size: number) => void;
  simple?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  selectorVisible?: boolean;
  className?: string;
}
