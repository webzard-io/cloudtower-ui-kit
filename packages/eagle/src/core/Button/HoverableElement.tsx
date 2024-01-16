import React from "react";

export interface IHoverableElementProps {
  className?: string;
  hover: boolean;
  icon: JSX.Element | null | undefined;
  hoverEle: JSX.Element | null | undefined;
}

const HoverableElement = (props: IHoverableElementProps) => {
  const { className, hover = false, icon, hoverEle } = props;

  if (hover) {
    return hoverEle != null
      ? React.cloneElement(hoverEle, { className })
      : null;
  }

  return icon != null ? React.cloneElement(icon, { className }) : null;
};

export default HoverableElement;
