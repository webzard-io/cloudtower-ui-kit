import { ImagesType } from "@cloudtower/eagle/generated/images-type";
import { css } from "@linaria/core";
import cs from "classnames";
import _ from "lodash";
import React, { useMemo, useState } from "react";

import BaseIcon from "./BaseIcon";

export type IconProps = React.HTMLAttributes<HTMLSpanElement> & {
  type: ImagesType;
  active?: boolean;
  hoverType?: ImagesType;
  activeType?: ImagesType;
  className?: string;
  alt?: string;
  iconWidth?: number;
  iconHeight?: number | "auto";
  cursor?: "pointer" | string;
  isRotate?: boolean;
  prefix?: React.ReactNode;
  suffixType?: {
    type: ImagesType;
    hoverType?: ImagesType;
    activeType?: ImagesType;
  };
};

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

const parseType = (type: string) => {
  return type
    .substring(type.indexOf("/") + 1)
    .split("-")
    .reduce((p, v, i) => {
      if (i === 0) {
        const parsed = parseFloat(v);
        if (isNaN(parsed)) {
          return v;
        }
        return "number" + v.charAt(0).toUpperCase() + v.slice(1);
      } else {
        return p + v.charAt(0).toUpperCase() + v.slice(1);
      }
    }, "");
};

const errorImage = "1-status-unknown-questionmark-16-red";

const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    type = "",
    hoverType,
    active,
    activeType,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    className,
    iconWidth,
    iconHeight,
    cursor,
    style,
    children,
    isRotate,
    prefix,
    suffixType,
    ...restProps
  } = props;

  const [hover, setHover] = useState(false);
  const defaultWidth = 16;
  const _iconWidth = iconWidth || (type.includes("24") ? 24 : defaultWidth);
  const _iconHeight = iconHeight || _iconWidth;

  const errorType = useMemo(() => {
    return parseType(errorImage);
  }, []);

  const src = useMemo(() => {
    try {
      if (active && activeType) {
        const parsedActiveType = parseType(activeType);
        return require("@cloudtower/eagle/kit/images")[parsedActiveType];
      }
      if (hover && hoverType) {
        const parsedHoverType = parseType(hoverType);
        return require("@cloudtower/eagle/kit/images")[parsedHoverType];
      }
      const parsedType = parseType(type);
      return require("@cloudtower/eagle/kit/images")[parsedType];
    } catch (error) {
      console.error(error);
      return require("@cloudtower/eagle/kit/images")[errorType];
    }
  }, [active, activeType, hover, hoverType, type, errorType]);

  const suffixIconSrc = useMemo(() => {
    try {
      if (!suffixType) {
        return null;
      }

      const { activeType, hoverType, type } = suffixType;
      if (active && activeType) {
        const parsedActiveType = parseType(activeType);
        return require("@cloudtower/eagle/kit/images")[parsedActiveType];
      }
      if (hover && hoverType) {
        const parsedHoverType = parseType(hoverType);
        return require("@cloudtower/eagle/kit/images")[parsedHoverType];
      }
      const parsedType = parseType(type);
      return require("@cloudtower/eagle/kit/images")[parsedType];
    } catch (error) {
      console.error(error);
      return require("@cloudtower/eagle/kit/images")[errorType];
    }
  }, [active, errorType, hover, suffixType]);

  return (
    <BaseIcon
      src={src}
      className={cs(
        IconWrapper,
        "icon-wrapper",
        className,
        isRotate && "is-rotate"
      )}
      suffixIconSrc={suffixIconSrc}
      height={_iconHeight}
      width={_iconWidth}
      prefixNode={prefix}
      style={_.pickBy({ cursor: cursor, ...style })}
      {...restProps}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (hoverType) {
          setHover(true);
        }
      }}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        if (hoverType) {
          setHover(true);
        }
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        if (hoverType) {
          setHover(false);
        }
      }}
    />
  );
});

export default Icon;
