import { cx } from "@linaria/core";
import React from "react";

import { Typo } from "../../components/Typo";
import { SidebarSubtitleComponentType } from "../../spec/base";

const SidebarSubtitle: SidebarSubtitleComponentType = (props) => {
  const { title, className } = props;

  return (
    <span className={cx(Typo.Heading.h3_regular_upper, className)}>
      {title}
    </span>
  );
};

export default SidebarSubtitle;
