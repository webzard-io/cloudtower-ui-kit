import React from "react";

import useParrotTranslation from "../../hooks/useParrotTranslation";
import { ArchComponentType } from "../../spec";

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
