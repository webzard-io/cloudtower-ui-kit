import React from "react";
import { useTranslation } from "react-i18next";

import { ArchComponentType } from "../../spec";

const Arch: ArchComponentType = (props) => {
  const { t } = useTranslation();
  const { architecture } = props;
  let text = "";
  if (architecture) {
    text = t(`components.Architecture_${architecture}`);
  }
  return <span>{text}</span>;
};

export default Arch;
