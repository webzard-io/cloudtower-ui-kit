import React from "react";

interface IProps {
  className?: string;
  hover: boolean;
  icon: JSX.Element | null | undefined;
  hoverEle: JSX.Element | null | undefined;
}

const HoverableElement = (props: IProps) => {
  const { className, hover = false, icon, hoverEle } = props;

  if (hover) {
    return hoverEle != null
      ? React.cloneElement(hoverEle, { className })
      : null;
  }

  return icon != null ? React.cloneElement(icon, { className }) : null;
};

export default HoverableElement;
