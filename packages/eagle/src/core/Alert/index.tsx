import {
  XmarkRemove16RegularPrimaryCapsOffIcon,
  XmarkRemove16RegularTertiaryCapsOffIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Icon from "@src/core/Icon";
import { getAlertIcon } from "@src/utils";
import { Alert as AntdAlert } from "antd";
import cs from "classnames";
import React from "react";

import { AlertComponentType } from "./alert.type";

const MessageWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & .action {
    margin-left: 16px;
  }
`;

const AlertStyle = css`
  &.ant-alert-closable {
    padding-right: 12px;

    .ant-alert-close-icon {
      height: fit-content;
      margin-left: 16px;
    }
  }

  .ant-alert-message {
    flex: 1;
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
  closable,
  ...props
}) => {
  const _icon = <Icon alt={type} src={getAlertIcon(type)} />;
  const _type = type === "normal" ? "info" : type;
  const _closable = closable || Boolean(onClose) || Boolean(closeText);

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

export * from "./alert.type";
