import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

import { ArchComponentType } from "./arch.type";

const Arch: ArchComponentType = (props) => {
  const { t } = useParrotTranslation();
  const { architecture } = props;
  let text = "";
  if (architecture) {
    text = t(`components.Architecture_${architecture}`);
  }
  return <span>{text}</span>;
};

export default Arch;

export * from "./arch.type";
