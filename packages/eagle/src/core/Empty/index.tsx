import React, { CSSProperties } from "react";

export interface IEmptyProps {
  "data-testid"?: string;
  className?: string;
  style?: CSSProperties;
}

const Empty = ({
  className,
  style,
  "data-testid": dataTestId,
}: IEmptyProps) => {
  return (
    <span data-testid={dataTestId} className={className} style={style}>
      -
    </span>
  );
};

export default Empty;
