import { ImagesType } from "@cloudtower/eagle/generated/images-type";
import { css } from "@linaria/core";
import cs from "classnames";
import _ from "lodash";
import React, { useMemo, useState } from "react";

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
  fileFormat?: "jpg" | "png" | "svg";
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
    fileFormat = "svg",
    ...restProps
  } = props;
  const [hover, setHover] = useState(false);
  const defaultWidth = 16;
  const _iconWidth = iconWidth || (type.includes("24") ? 24 : defaultWidth);
  const _iconHeight = iconHeight || _iconWidth;

  const src = useMemo(() => {
    try {
      if (active && activeType) {
        return require(`../../images/${activeType}.${fileFormat}`);
      }
      if (hover && hoverType) {
        return require(`../../images/${hoverType}.${fileFormat}`);
      }

      return require(`../../images/${type}.${fileFormat}`);
    } catch (error) {
      console.error(error);
      return require("../../images/1-status-unknown-questionmark-16-red.svg")
        .default;
    }
  }, [active, activeType, hoverType, type, hover, fileFormat]);

  const suffixIconSrc = useMemo(() => {
    try {
      if (!suffixType) {
        return null;
      }

      const { activeType, hoverType, type } = suffixType;
      if (active && activeType) {
        return require(`../../images/${activeType}.${fileFormat}`);
      }
      if (hover && hoverType) {
        return require(`../../images/${hoverType}.${fileFormat}`);
      }
      return require(`../../images/${type}.${fileFormat}`);
    } catch (error) {
      console.error(error);
      return require("../../images/1-status-unknown-questionmark-16-red.svg")
        .default;
    }
  }, [active, fileFormat, hover, suffixType]);

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
    >
      {prefix}
      <span className="icon-inner">
        <img
          alt={type}
          src={src}
          width={`${_iconWidth}px`}
          height={
            typeof _iconHeight === "string" ? _iconHeight : `${_iconWidth}px`
          }
        />
      </span>
      {children && <span className="icon-children">{children}</span>}
      {suffixIconSrc && (
        <span className="icon-inner suffix">
          <img
            alt={type}
            src={suffixIconSrc}
            width={`${_iconWidth}px`}
            height={
              typeof _iconHeight === "string" ? _iconHeight : `${_iconWidth}px`
            }
          />
        </span>
      )}
    </span>
  );
});

export default Icon;
