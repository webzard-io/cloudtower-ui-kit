import Button from "@src/core/Button";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, { useState } from "react";

import { CopyButtonProps } from "./CopyButton.type";
import CopyTooltip from "./CopyTooltip";
export type { CopyButtonProps };

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  buttonText,
  tooltipText,
}) => {
  const { t } = useParrotTranslation();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = async () => {
    try {
      setTooltipVisible(true);

      setTimeout(() => {
        setTooltipVisible(false);
      }, 1000);
    } catch (err) {
      // error
    }
  };

  return (
    <CopyTooltip
      tooltipProps={{ visible: tooltipVisible }}
      text={text}
      afterTooltip={
        tooltipText ? tooltipText : t("common.has_copied_to_clipboard")
      }
    >
      <Button onClick={handleCopy}>
        {buttonText ? buttonText : t("common.copy")}
      </Button>
    </CopyTooltip>
  );
};

export default CopyButton;
