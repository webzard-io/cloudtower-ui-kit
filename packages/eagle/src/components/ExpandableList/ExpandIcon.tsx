import {
  ArrowChevronDown16SecondaryIcon,
  ArrowChevronUp16SecondaryIcon,
} from "@cloudtower/icons-react";
import React from "react";

interface IProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
}

const ExpandIcon = (props: IProps) => {
  const { isActive } = props;
  return isActive ? (
    <ArrowChevronUp16SecondaryIcon />
  ) : (
    <ArrowChevronDown16SecondaryIcon />
  );
};

export default ExpandIcon;
