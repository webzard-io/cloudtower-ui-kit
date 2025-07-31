import { css, cx } from "@linaria/core";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

import { SmallDialog } from "@src/core/SmallDialog/SmallDialog";
import { DeleteDialogProps } from "./DeleteDialog.type";

const ContentStyle = css`
  color: $text-light-primary;
`;

const SecondaryDescStyle = css`
  margin-top: 8px;
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
  } = props;

  return (
    <SmallDialog
      title={title}
      showOk={true}
      onOk={onOk}
      onCancel={onCancel}
      className={className}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{
        danger: true,
      }}
      confirmLoading={confirmLoading}
    >
      {description && (
        <div className={cx(ContentStyle, Typo.Label.l2_regular)}>
          {description}
        </div>
      )}
      {secondaryDesc && (
        <div className={cx(SecondaryDescStyle, Typo.Label.l3_regular)}>
          {secondaryDesc}
        </div>
      )}
    </SmallDialog>
  );
};
