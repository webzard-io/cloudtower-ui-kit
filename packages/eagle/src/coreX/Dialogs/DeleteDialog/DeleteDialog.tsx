import { css, cx } from "@linaria/core";
import { SmallDialog } from "@src/core/SmallDialog/SmallDialog";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

import { DeleteDialogProps } from "./DeleteDialog.type";

const ContentStyle = css`
  color: $text-light-primary;
`;

const DialogStyle = css`
  .ant-modal-body {
    min-height: 160px;
  }
`;

const SecondaryDescStyle = css`
  margin-top: 4px;
  color: $text-light-secondary;
`;

export const DeleteDialog: React.FC<DeleteDialogProps> = (props) => {
  const { t } = useParrotTranslation();
  const {
    title,
    description,
    secondaryDesc,
    cancelText = t("common.cancel"),
    okText = t("common.delete"),
    onOk,
    onCancel,
    className,
    confirmLoading,
    error,
    showFooterErrorIcon,
  } = props;

  return (
    <SmallDialog
      title={title}
      showOk={true}
      onOk={onOk}
      onCancel={onCancel}
      className={cx(DialogStyle, className)}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{
        danger: true,
      }}
      confirmLoading={confirmLoading}
      error={error}
      showFooterErrorIcon={showFooterErrorIcon}
    >
      {description && (
        <div className={cx(ContentStyle, Typo.Label.l2_regular)}>
          {description}
        </div>
      )}
      {secondaryDesc && (
        <div className={cx(SecondaryDescStyle, Typo.Label.l4_regular)}>
          {secondaryDesc}
        </div>
      )}
    </SmallDialog>
  );
};
