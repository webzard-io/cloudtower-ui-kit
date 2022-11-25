import { ImagesType } from "@cloudtower/eagle/generated/images-type";
import { css } from "@linaria/core";
import cs from "classnames";
import _ from "lodash";
import React from "react";

export interface IBaseIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  hoverType?: ImagesType;
  activeType?: ImagesType;
  className?: string;
  alt?: string;
  width?: number;
  height?: number | "auto";
  cursor?: "pointer" | string;
  isRotate?: boolean;
  prefixNode?: React.ReactNode;
  suffixType?: {
    type: ImagesType;
    hoverType?: ImagesType;
    activeType?: ImagesType;
  };
  suffixIconSrc?: string;
  src: string;
}

const IconWrapper = css`
  display: inline-flex;
  align-items: center;

  .icon-inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .icon-inner + span,
  span + .icon-inner.suffix {
    margin-left: 4px;
  }
  &.is-rotate {
    img {
      animation: rotate 680ms linear infinite;
    }
  }
`;

const BaseIcon = React.forwardRef<HTMLSpanElement, IBaseIconProps>(
  (props, ref) => {
    const {
      alt,
      hoverType,
      active,
      activeType,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      className,
      width,
      height,
      cursor,
      style,
      children,
      isRotate,
      prefixNode,
      suffixType,
      suffixIconSrc,
      src,
      ...HTMLSpanElementProps
    } = props;

    return (
      <span
        ref={ref}
        className={cs(
          IconWrapper,
          "icon-wrapper",
          className,
          isRotate && "is-rotate"
        )}
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
