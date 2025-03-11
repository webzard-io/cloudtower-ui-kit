import { css, cx } from "@linaria/core";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

import { Typo } from "../../Typo";
import SmallDialog from "../SmallDialog";
import { DeleteDialogProps } from "./DeleteDialog.type";

const ContentStyle = css`
  color: $text-light-primary;
`;

const HelperTextStyle = css`
  margin-top: 8px;
  color: $text-light-secondary;
`;

export const DeleteDialog: React.FC<DeleteDialogProps> = (props) => {
  const { t } = useParrotTranslation();
  const {
    title,
    description,
    helperText,
    cancelText = t("common.cancel"),
    okText = t("common.delete"),
    onOk,
    onCancel,
    className,
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
    >
      {description && (
        <div className={cx(ContentStyle, Typo.Label.l2_regular)}>
          {description}
        </div>
      )}
      {helperText && (
        <div className={cx(HelperTextStyle, Typo.Label.l3_regular)}>
          {helperText}
        </div>
      )}
    </SmallDialog>
  );
};
