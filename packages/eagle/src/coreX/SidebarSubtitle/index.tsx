import { cx } from "@linaria/core";
import { Typo } from "@src/core/Typo";
import React from "react";

import { SidebarSubtitleComponentType } from "./sidebarSubtitle.type";

const SidebarSubtitle: SidebarSubtitleComponentType = (props) => {
  const { title, className } = props;

  return (
    <span className={cx(Typo.Heading.h3_regular_upper, className)}>
      {title}
    </span>
  );
};

export default SidebarSubtitle;

export * from "./sidebarSubtitle.type";
