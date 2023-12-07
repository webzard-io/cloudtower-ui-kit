import {
  ArrowChevronLeft16BoldBlueIcon,
  ArrowChevronLeft16BoldTertiaryIcon,
} from "@cloudtower/icons-react";
import { css, cx } from "@linaria/core";
import type { History } from "history";
import React from "react";

import Icon from "../../components/Icon";
import { Typo } from "../../components/Typo";

const GobackButtonStyle = css`
  cursor: pointer;

  .link-text {
    color: $text-light-tertiary;
  }

  &:hover .link-text {
    color: $text-light-general;
  }
`;

// refine props
type GobackButtonType = {
  title?: string;
  onClick?: () => void;
  path?: string;
  index?: number;
  history: History;
};
const GobackButton: React.FC<GobackButtonType> = (props) => {
  const { onClick, path, index, title, history } = props;

  const goto = () => {
    if (path) {
      history.push(path);
      return;
    }
    if (index) {
      history.go(index);
      return;
    }
    if (onClick) {
      onClick?.();
      return;
    }
    history.goBack();
  };

  return (
    <span className={cx(GobackButtonStyle)}>
      <Icon
        src={ArrowChevronLeft16BoldTertiaryIcon}
        hoverSrc={ArrowChevronLeft16BoldBlueIcon}
        onClick={goto}
      >
        <span className={cx(Typo.Label.l4_bold, "link-text")}>{title}</span>
      </Icon>
    </span>
  );
};

export default GobackButton;
