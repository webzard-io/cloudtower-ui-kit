import React, { useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { kitContext } from "../UIKitProvider";
import { TooltipProps } from "../spec";
import Icon from "../components/Icon";
import clipboardCopy from "../components/images/1-clipboard-copy-16-gradient-gray.svg";

const CopyTooltip = React.forwardRef<
  HTMLSpanElement,
  {
    text: string;
    beforeTooltip?: string;
    afterTooltip?: string;
    tooltipProps?: Omit<TooltipProps, "title">;
    children?: React.ReactNode;
  }
>((props, ref) => {
  const { t } = useTranslation();
  const {
    text,
    beforeTooltip = t("common.click_to_copy"),
    afterTooltip = t("common.copy_done"),
    children = <Icon src={clipboardCopy} />,
    tooltipProps,
  } = props;
  const kit = useContext(kitContext);
  const [tooltipText, setTooltipText] = useState(beforeTooltip);

  return (
    <span ref={ref} onMouseEnter={() => setTooltipText(beforeTooltip)}>
      <kit.tooltip {...tooltipProps} title={tooltipText}>
        <CopyToClipboard
          text={text}
          onCopy={() => setTooltipText(afterTooltip)}
        >
          {children}
        </CopyToClipboard>
      </kit.tooltip>
    </span>
  );
});

export default CopyTooltip;
