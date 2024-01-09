import {
  ArrowChevronDown16SecondaryIcon,
  ArrowChevronUp16SecondaryIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
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

const Style = css`
  height: 24px;
  width: 24px;
  border-radius: 6px;
  padding: 4px;
  &:hover {
    background-color: $fill-outstanding-light;
    svg {
      path {
        fill: blue;
      }
    }
  }
`;

const ExpandIcon = (props: IProps) => {
  const { isActive } = props;
  return (
    <div className={Style}>
      {isActive ? (
        <ArrowChevronUp16SecondaryIcon />
      ) : (
        <ArrowChevronDown16SecondaryIcon />
      )}
    </div>
  );
};

export default ExpandIcon;
