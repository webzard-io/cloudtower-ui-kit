import { ImagesType } from "@cloudtower/eagle/generated/images-type";
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
  fileFormat?: "jpg" | "png" | "svg";
  prefix?: React.ReactNode;
  suffixType?: {
    type: ImagesType;
    hoverType?: ImagesType;
    activeType?: ImagesType;
  };
};

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
    <BaseIcon
      src={src}
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
