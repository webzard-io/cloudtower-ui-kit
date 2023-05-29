import { Alert as AntdAlert } from "antd";
import cs from "classnames";
import React from "react";

import { AlertComponentType } from "../../spec";
import { getAlertIcon } from "../../utils";
import Icon from "../Icon";

const Alert: AlertComponentType = ({
  type,
  icon,
  showIcon = true,
  className,
  onClose,
  closeText,
  ...props
}) => {
  const _icon = <Icon alt={type} src={getAlertIcon(type)} />;
  const _type = type === "normal" ? "info" : type;
  return (
    <AntdAlert
      {...props}
      className={cs(type ? `alert-${type}` : "", className)}
      type={_type}
      icon={icon || _icon}
      showIcon={showIcon}
      onClose={onClose}
      closeText={closeText}
      closable={!!onClose}
    />
  );
};

export default Alert;
