import { css } from "@linaria/core";
import { Alert as AntdAlert } from "antd";
import cs from "classnames";
import React from "react";

import { AlertComponentType } from "../../spec";
import { getAlertIcon } from "../../utils";
import Icon from "../Icon";

const MessageWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & .action {
    margin-left: 16px;
  }
`;

const AlertStyle = css`
  .ant-alert-message {
    width: 100%;
  }
`;

const Alert: AlertComponentType = ({
  type,
  icon,
  showIcon = true,
  className,
  onClose,
  closeText,
  action,
  message,
  ...props
}) => {
  const _icon = <Icon alt={type} src={getAlertIcon(type)} />;
  const _type = type === "normal" ? "info" : type;
  return (
    <AntdAlert
      {...props}
      className={cs(AlertStyle, type ? `alert-${type}` : "", className, {
        action,
      })}
      type={_type}
      message={
        <div className={MessageWrapperStyle}>
          <span style={{ flex: 1 }}>{message}</span>
          {action ? <span className={cs("action")}>{action}</span> : null}
        </div>
      }
      icon={icon || _icon}
      showIcon={showIcon}
      onClose={onClose}
      closeText={closeText}
      closable={!!onClose}
    />
  );
};

export default Alert;
