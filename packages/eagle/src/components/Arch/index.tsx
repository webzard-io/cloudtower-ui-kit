import { parrotI18n } from "@cloudtower/parrot";
import React from "react";

import { ArchComponentType } from "../../spec";

const Arch: ArchComponentType = (props) => {
  const { architecture } = props;
  let text = "";
  if (architecture) {
    text = parrotI18n.t(`enum.Architecture_${architecture}`);
  }
  return <span>{text}</span>;
};

export default Arch;
