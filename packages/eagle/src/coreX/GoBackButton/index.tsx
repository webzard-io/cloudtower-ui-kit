import {
  ArrowChevronLeft16BoldBlueIcon,
  ArrowChevronLeft16BoldTertiaryIcon,
} from "@cloudtower/icons-react";
import { css, cx } from "@linaria/core";
import Icon from "@src/core/Icon";
import { Typo } from "@src/core/Typo";
import React from "react";

import { GoBackButtonType } from "../../spec";

const GobackButtonStyle = css`
  cursor: pointer;

  .link-text {
    color: $text-light-tertiary;
  }

  &:hover .link-text {
    color: $text-light-general;
  }
`;

const GobackButton: React.FC<GoBackButtonType> = (props) => {
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
