import { ClipboardCopy16GradientGrayIcon } from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import Tooltip from "@src/core/Tooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import { CopyTooltipProps } from "./CopyTooltip.typs";
export type { CopyTooltipProps };

const CopyTooltip = React.forwardRef<HTMLSpanElement, CopyTooltipProps>(
  (props, ref) => {
    const { t } = useParrotTranslation();

    const {
      text,
      beforeTooltip = t("common.click_to_copy"),
      afterTooltip = t("common.copy_done"),
      children = <Icon src={ClipboardCopy16GradientGrayIcon} />,
      tooltipProps,
      className,
    } = props;
    const [tooltipText, setTooltipText] = useState(beforeTooltip);

    return (
      <span
        ref={ref}
        onMouseEnter={() => setTooltipText(beforeTooltip)}
        className={className}
      >
        <Tooltip {...tooltipProps} title={tooltipText}>
          <CopyToClipboard
            text={text}
            onCopy={() => setTooltipText(afterTooltip)}
          >
            {children}
          </CopyToClipboard>
        </Tooltip>
      </span>
    );
  }
);

export default CopyTooltip;
