import * as SVG from "@cloudtower/icons-react";
import _ from "lodash";
import React from "react";
import { SVGUniqueID } from "react-svg-unique-id";

export type SrcType = string | typeof SVG[keyof typeof SVG];
export interface IBaseIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  alt?: string;
  width?: number;
  height?: number | "auto";
  cursor?: "pointer" | string;
  prefixNode?: React.ReactNode;
  suffixIconSrc?: SrcType;
  src: SrcType;
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
      suffixIconSrc: SuffixSrc,
      src: Src,
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
          {typeof Src === "string" ? (
            <img alt={alt} src={Src} width={width} height={height} />
          ) : (
            <SVGUniqueID>{Src({ width, height })}</SVGUniqueID>
          )}
        </span>
        {children && <span className="icon-children">{children}</span>}
        {SuffixSrc && (
          <span className="icon-inner suffix">
            {typeof SuffixSrc === "string" ? (
              <img alt={alt} src={SuffixSrc} width={width} height={height} />
            ) : (
              <SVGUniqueID>{SuffixSrc({ width, height })}</SVGUniqueID>
            )}
          </span>
        )}
      </span>
    );
  }
);

export default BaseIcon;
