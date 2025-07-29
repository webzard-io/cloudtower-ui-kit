import { css } from "@linaria/core";

export const ImmersiveDialogStyle = css`
  &.ant-modal {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    padding-bottom: 0;
    margin: 0 auto;
    top: 10px;
    transform: none;

    .ant-modal-close {
      right: 24px;
      top: 24px;

      .ant-modal-close-x {
        width: 40px;
        height: 40px;
      }
    }

    .ant-modal-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .ant-modal-header {
      padding: 60px 0 40px 0;
      border: 0;
    }

    .ant-modal-body {
      padding: 0;
      flex: 1;
      min-height: 0;
    }

    .ant-modal-footer {
      border-top: 1px solid rgba(225, 230, 241, 0.6);
      padding: 24px 0 60px 0;
    }
  }
`;
export const CloseIconStyle = css`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: $fill-neutral-trans-2;
  }
`;
export const TitleStyle = css`
  color: $gray-120;
`;
export const NormalStyle = css`
  &.ant-modal {
    .ant-modal-content {
      padding: 0 40px;
    }
  }
`;
export const WizardStyle = css`
  &.ant-modal {
    .ant-modal-header {
      padding: 60px 0 40px 0;
      width: 648px;
      margin: 0 auto;
    }

    .ant-modal-footer {
      width: 648px;
      margin: 0 auto;
    }
  }
`;
export const BodyStyle = css`
  height: calc(100% - 40px);

  .middle {
    height: 100%;
    overflow: auto;
  }
`;
export const WizardBodyStyle = css`
  display: flex;
  gap: 60px;
  justify-content: center;

  .left {
    width: 192px;
    overflow: auto;
  }

  .middle {
    width: 648px;
    overflow: auto;
  }

  .right {
    width: 192px;
    overflow: auto;
  }
`;
export const StepStyle = css`
  display: flex;
  justify-content: flex-end;
`;
export const FooterStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
export const FooterButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
`;
export const FooterButtonRightStyle = css`
  flex-shrink: 0;
`;
export const ErrorStyle = css`
  color: $red-60;
  display: flex;
  align-items: center;
`;
