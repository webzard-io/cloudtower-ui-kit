import {
  ArrowChevronDownSmall16BlueIcon,
  ArrowChevronUpSmall16BlueIcon,
  XmarkRemove16RegularPrimaryCapsOffIcon,
  XmarkRemove16RegularTertiaryCapsOffIcon,
} from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import Link from "@src/core/Link";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { getAlertIcon } from "@src/utils";
import { Alert as AntdAlert } from "antd";
import cs from "classnames";
import React, { useCallback, useState } from "react";

import { AlertStyle, MessageWrapperStyle } from "./alert.style";
import { AlertComponentType } from "./alert.type";

const Alert: AlertComponentType = ({
  type,
  icon,
  showIcon = true,
  className,
  onClose,
  closeText,
  action,
  message,
  description,
  closable,
  expandConfig,
  "data-testid": dataTestId,
  ...props
}) => {
  const { t } = useParrotTranslation();
  const _icon = <Icon alt={type} src={getAlertIcon(type)} />;
  const _type = type === "normal" ? "info" : type;
  const _closable = closable || Boolean(onClose) || Boolean(closeText);

  const [internalExpanded, setInternalExpanded] = useState(
    expandConfig?.defaultExpanded ?? false,
  );

  const isControlled = expandConfig?.expanded !== undefined;
  const expanded = isControlled ? expandConfig!.expanded! : internalExpanded;

  const handleToggle = useCallback(() => {
    const next = !expanded;
    if (!isControlled) {
      setInternalExpanded(next);
    }
    expandConfig?.onExpandChange?.(next);
  }, [expanded, isControlled, expandConfig?.onExpandChange]);

  const showExpandToggle = expandConfig && description;

  const expandToggle = showExpandToggle ? (
    <Link
      onClick={handleToggle}
      data-testid="alert-expand-toggle"
      suffixIcon={
        <Icon
          src={
            expanded
              ? ArrowChevronUpSmall16BlueIcon
              : ArrowChevronDownSmall16BlueIcon
          }
        />
      }
    >
      {expanded ? t("components.alert_collapse") : t("components.alert_expand")}
    </Link>
  ) : null;

  return (
    <AntdAlert
      {...props}
      data-testid={dataTestId}
      className={cs(AlertStyle, type ? `alert-${type}` : "", className, {
        action: action || expandToggle,
      })}
      type={_type}
      message={
        <div className={MessageWrapperStyle}>
          <div style={{ flex: 1 }}>
            {message}
            {showExpandToggle && expanded ? <div>{description}</div> : null}
          </div>
          {action ? <span className={cs("action")}>{action}</span> : null}
          {expandToggle ? (
            <span className={cs("action")}>{expandToggle}</span>
          ) : null}
        </div>
      }
      description={expandConfig ? undefined : description}
      icon={icon || _icon}
      showIcon={showIcon}
      onClose={onClose}
      closeText={
        closeText ||
        (_closable && (
          <Icon
            src={XmarkRemove16RegularTertiaryCapsOffIcon}
            hoverSrc={XmarkRemove16RegularPrimaryCapsOffIcon}
          />
        ))
      }
      closable={_closable}
    />
  );
};

export default Alert;

export * from "./alert.style";
export * from "./alert.type";
