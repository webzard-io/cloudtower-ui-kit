import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { ArchComponentType } from "@src/spec";
import React from "react";
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
