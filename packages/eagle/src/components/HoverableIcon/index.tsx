import React from "react";

import Icon from "../Icon";
import { ImagesType } from "../images/images-type";

interface IProps {
  className?: string;
  hover: boolean;
  icon: ImagesType | JSX.Element | null | undefined;
  hoverIcon: ImagesType | JSX.Element | null | undefined;
}

const HoverableIcon = (props: IProps) => {
  const { className, hover = false, icon, hoverIcon } = props;

  if (hover) {
    return typeof hoverIcon === "string" ? (
      <Icon type={hoverIcon as ImagesType} className={className} />
    ) : hoverIcon != null ? (
      React.cloneElement(hoverIcon, { className })
    ) : null;
  }

  return typeof icon === "string" ? (
    <Icon type={icon as ImagesType} className={className} />
  ) : icon != null ? (
    React.cloneElement(icon, { className })
  ) : null;
};

export default HoverableIcon;
