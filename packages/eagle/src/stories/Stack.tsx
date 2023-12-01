import { CSSProperties } from "@linaria/core";
import React from "react";

type StackProps = {
  align?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | "auto";
  direction?: "vertical" | "horizontal";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  spacing?: number;
  wrap?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const Stack: React.FC<StackProps> = ({
  align = "auto",
  direction = "horizontal",
  spacing = 12,
  children,
  wrap,
  justify = "flex-start",
  className,
}) => {
  const style: CSSProperties = {
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction === "vertical" ? "column" : "row",
    display: "inline-flex",
    columnGap: spacing,
    rowGap: spacing,
    flexWrap: wrap ? "wrap" : "nowrap",
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};
