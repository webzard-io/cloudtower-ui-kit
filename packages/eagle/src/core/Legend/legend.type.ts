import { CSSProperties } from "react";

export type LegendColor =
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "gray"
  | "purple"
  | "success"
  | "danger"
  | "warning";

export type LegendShapes = "circle" | "square" | "loading";

export type LegendComponentType = React.FC<{
  /** Text label to be displayed next to the legend item, or you can use children */
  label?: string;
  /** Additional CSS class name(s) to be applied to the legend item */
  className?: string;
  /** Custom inline styles to be applied to the legend item */
  style?: CSSProperties;
  /** Color of the legend item. Can be one of: 'red', 'yellow', 'green', 'blue', 'gray', 'purple', 'success', 'danger', 'warning' */
  color?: LegendColor;
  /** Shape of the legend item. Can be: 'circle', 'square', or 'loading' */
  shape?: LegendShapes;
  /** Whether the legend item should show hover effects */
  hoverable?: boolean;
  /** Enables tint mode styling for the legend item */
  onTintMode?: boolean;
  /** Numeric value to be displayed alongside the legend item */
  number?: number;
  /** Unique identifier for the legend item */
  key?: string | number;
  /** Callback function triggered when the legend item is clicked */
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    key?: string | number,
  ) => void;
  /** Test ID for automated testing */
  "data-testid"?: string;
}>;
