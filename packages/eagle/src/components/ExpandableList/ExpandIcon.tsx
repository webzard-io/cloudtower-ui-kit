import {
  ChevronDownOn16TertiaryRegularIcon,
  ChevronUpOn16TertiaryRegularIcon,
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
    <ChevronUpOn16TertiaryRegularIcon />
  ) : (
    <ChevronDownOn16TertiaryRegularIcon />
  );
};

export default ExpandIcon;
