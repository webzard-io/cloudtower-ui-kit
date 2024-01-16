import { cx } from "@linaria/core";
import { Typo } from "@src/core/Typo";
import { SidebarSubtitleComponentType } from "@src/spec/base";
import React from "react";

const SidebarSubtitle: SidebarSubtitleComponentType = (props) => {
  const { title, className } = props;

  return (
    <span className={cx(Typo.Heading.h3_regular_upper, className)}>
      {title}
    </span>
  );
};

export default SidebarSubtitle;
