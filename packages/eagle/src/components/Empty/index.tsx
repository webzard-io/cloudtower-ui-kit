import React, { CSSProperties } from "react";

export interface IEmptyProps {
  className?: string;
  style?: CSSProperties;
}

const Empty = (props: IEmptyProps) => {
  const { className, style } = props;
  return (
    <span className={className} style={style}>
      -
    </span>
  );
};

export default Empty;
