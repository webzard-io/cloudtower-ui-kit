import React from "react";

interface IProps {
  className?: string;
  hover: boolean;
  icon: JSX.Element | null | undefined;
  hoverIcon: JSX.Element | null | undefined;
}

const HoverableIcon = (props: IProps) => {
  const { className, hover = false, icon, hoverIcon } = props;

  if (hover) {
    return hoverIcon != null
      ? React.cloneElement(hoverIcon, { className })
      : null;
  }

  return icon != null ? React.cloneElement(icon, { className }) : null;
};

export default HoverableIcon;
