import { css } from "@linaria/core";
import cs from "classnames";
import React from "react";

import { Typo } from "../Typo";
import { NavProps } from "./nav.type";
import { Header, NavCenterStyle } from "./style";

const MinWidth = css`
  min-width: 1280px;
`;

const Nav: React.FC<NavProps> = ({
  left,
  right,
  center,
  isScrolled,
  navRef,
  className,
  "data-testid": dataTestId,
}) => {
  return (
    <Header
      data-testid={dataTestId}
      ref={navRef}
      className={cs(MinWidth, className)}
      id="global-header"
    >
      <div className="left">{left}</div>
      <div
        className={cs(
          "center",
          NavCenterStyle,
          Typo.Heading.h3_bold_title,
          isScrolled && "is-scrolled",
        )}
      >
        {center}
      </div>
      <div className={cs("right", isScrolled && "is-scrolled")}>
        <span className="btn-group">{right}</span>
      </div>
    </Header>
  );
};

export default Nav;
