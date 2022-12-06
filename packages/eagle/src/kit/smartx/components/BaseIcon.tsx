import _ from "lodash";
import React from "react";

export interface IBaseIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  alt?: string;
  width?: number;
  height?: number | "auto";
  cursor?: "pointer" | string;
  prefixNode?: React.ReactNode;
  suffixIconSrc?: string;
  src: string;
}

const BaseIcon = React.forwardRef<HTMLSpanElement, IBaseIconProps>(
  (props, ref) => {
    const {
      alt,
      className,
      width,
      height,
      cursor,
      style,
      children,
      prefixNode,
      suffixIconSrc,
      src,
      ...HTMLSpanElementProps
    } = props;

    return (
      <span
        ref={ref}
        className={className}
        style={_.pickBy({ cursor: cursor, ...style })}
        {...HTMLSpanElementProps}
      >
        {prefixNode}
        <span className="icon-inner">
          <img alt={alt} src={src} width={width} height={height} />
        </span>
        {children && <span className="icon-children">{children}</span>}
        {suffixIconSrc && (
          <span className="icon-inner suffix">
            <img alt={alt} src={suffixIconSrc} width={width} height={height} />
          </span>
        )}
      </span>
    );
  }
);

export default BaseIcon;
