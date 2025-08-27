import React from "react";
import { css, cx } from "@linaria/core";
import { SmallDialog, SmallDialogProps } from "@src/core/SmallDialog";
import { Typo } from "../Typo";

const MediumDialogStyle = css`
  --footer-height: 96px;
  --header-height: 80px;
  --modal-content-width: 720px;
  --modal-content-min-height: 200px;
  --modal-content-max-height: calc(
    100vh - 136px - var(--header-height) - var(--footer-height)
  );
  --modal-header-padding: 36px 60px 0;
  --modal-content-padding-y: 36px;
  --modal-content-padding-x: 60px;
  --modal-footer-padding: 0 60px;
`;

export const MediumDialog: React.FC<SmallDialogProps> = ({
  className,
  ...restProps
}) => {
  return (
    <SmallDialog
      TitleRender={({ title }) => (
        <span className={Typo.Display.d1s_bold_title}>{title}</span>
      )}
      className={cx(MediumDialogStyle, className)}
      {...restProps}
    />
  );
};
