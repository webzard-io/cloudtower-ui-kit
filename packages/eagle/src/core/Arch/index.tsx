import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

import { ArchComponentType } from "./arch.type";

const Arch: ArchComponentType = ({
  architecture,
  "data-testid": dataTestId,
}) => {
  const { t } = useParrotTranslation();
  let text = "";
  if (architecture) {
    text = t(`components.Architecture_${architecture}`);
  }
  return <span data-testid={dataTestId}>{text}</span>;
};

export default Arch;

export * from "./arch.type";
