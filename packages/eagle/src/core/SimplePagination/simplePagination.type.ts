export interface ISimplePaginationProps {
  className?: string;
  current: number;
  count: number;
  size: number;
  onPageChange?: (page: number) => void;
}
