import { css, cx } from "@linaria/core";
import { SmallDialog } from "@src/core/SmallDialog";
import React from "react";

import { Typo } from "../Typo";
import { MediumDialogProps } from "./MediumDialog.type";

const MediumDialogStyle = css`
  --footer-height: 96px;
  --modal-content-width: 720px;
  --modal-content-min-height: 200px;
  --modal-header-padding: 40px 60px 8px;
  --modal-content-padding-top: 24px;
  --modal-content-padding-bottom: 32px;
  --modal-content-padding-x: 60px;
  --modal-footer-padding: 0 60px;

  &.content-full.ant-modal {
    height: calc(100vh - 80px);
    width: calc(100vw - 160px);
    .ant-modal-content {
      width: 100%;
      height: 100%;
      max-width: unset;
      max-height: unset;
      display: flex;
      flex-direction: column;
    }
    .ant-modal-body {
      flex: 1;
    }
  }

  .initializing-title {
    height: 32px;
  }
`;

export const MediumDialog: React.FC<MediumDialogProps> = ({
  className,
  isContentFull = false,
  ...restProps
}) => {
  return (
    <SmallDialog
      TitleRender={({ title }) => (
        <span className={Typo.Display.d1s_bold_title}>{title}</span>
      )}
      className={cx(
        MediumDialogStyle,
        isContentFull && "content-full",
        className,
      )}
      initializingSkeletonRows={3}
      width={isContentFull ? "calc(100vw - 160px)" : 720}
      {...restProps}
    />
  );
};
