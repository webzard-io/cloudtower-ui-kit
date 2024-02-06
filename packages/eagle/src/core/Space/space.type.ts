export type SizeType = "small" | "middle" | "large";

export interface ISpaceProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | number;
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
}
