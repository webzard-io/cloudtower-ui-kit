import { css } from "@linaria/core";
import cs from "classnames";
import _ from "lodash";
import React, { useMemo, useState } from "react";

import BaseIcon, { SrcType } from "../BaseIcon";

export type IconProps = React.HTMLAttributes<HTMLSpanElement> & {
  src: SrcType;
  active?: boolean;
  hoverSrc?: SrcType;
  activeSrc?: SrcType;
  className?: string;
  alt?: string;
  iconWidth?: number;
  iconHeight?: number | "auto";
  cursor?: "pointer" | string;
  isRotate?: boolean;
  prefix?: React.ReactNode;
  suffix?: {
    src: SrcType;
    hoverSrc?: SrcType;
    activeSrc?: SrcType;
  };
};

const IconWrapper = css`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

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
    img,
    svg {
      animation: rotate 680ms linear infinite;
    }
  }
`;

const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    src,
    hoverSrc,
    active,
    activeSrc,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    className,
    iconWidth = 16,
    iconHeight = 16,
    cursor,
    style,
    isRotate,
    prefix,
    suffix,
    ...restProps
  } = props;

  const [hover, setHover] = useState(false);

  const _src = useMemo(() => {
    if (active && activeSrc) {
      return activeSrc;
    }
    if (hover && hoverSrc) {
      return hoverSrc;
    }
    return src;
  }, [active, activeSrc, hover, hoverSrc, src]);

  const suffixIconSrc = useMemo(() => {
    if (!suffix) {
      return undefined;
    }
    const { activeSrc, hoverSrc, src } = suffix;
    if (active && activeSrc) {
      return activeSrc;
    }
    if (hover && hoverSrc) {
      return hoverSrc;
    }
    return src;
  }, [active, hover, suffix]);

  return (
    <BaseIcon
      src={_src}
      className={cs(
        IconWrapper,
        "icon-wrapper",
        className,
        isRotate && "is-rotate",
      )}
      suffixIconSrc={suffixIconSrc}
      height={iconHeight}
      width={iconWidth}
      prefixNode={prefix}
      style={_.pickBy({ cursor: cursor, ...style })}
      {...restProps}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (hover) {
          setHover(true);
        }
      }}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        if (hoverSrc) {
          setHover(true);
        }
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        if (hoverSrc) {
          setHover(false);
        }
      }}
    />
  );
});

export default Icon;
