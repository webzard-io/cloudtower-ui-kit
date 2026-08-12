import { css } from "@linaria/core";
import { Color } from "@src/styles/token/color";

export const ImmersiveDialogStyle = css`
  --modal-to-viewport-margin: 10px;
  --modal-body-padding-bottom: 40px;
  --modal-footer-height: 124px;
  --modal-empty-footer-height: 40px;

  &.ant-modal {
    height: calc(100% - var(--modal-to-viewport-margin) * 2);
    width: calc(100% - var(--modal-to-viewport-margin) * 2);
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
      flex-shrink: 0; // Prevent header from being compressed
    }

    .ant-modal-body {
      padding: 0;
      flex: 1; // Take up remaining space
      min-height: 0; // Allow flex item to shrink below content height
      overflow-y: auto;
      scrollbar-gutter: stable;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: ${Color.stroke.neutral["trans-1"]};
      }
      &::-webkit-scrollbar-thumb {
        background: ${Color.stroke.neutral["trans-3"]};
        border-radius: 8px;
      }
    }

    &.initializing-error {
      .ant-modal-body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }

    .initializing-title {
      height: 40px;
    }

    .ant-modal-footer {
      border-top: 1px solid rgba(225, 230, 241, 0.6);
      height: var(--modal-footer-height);
      padding: 24px 0 60px 0;
    }

    &.no-footer {
      .ant-modal-body {
        padding-bottom: 0;
        .middle {
          padding-bottom: 0;
        }
      }
      .ant-modal-footer {
        padding: 0;
        border-top: none;
        height: var(--modal-empty-footer-height);
        content: "";
      }
    }
  }
`;
export const MultiAreaStyle = css`
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
export const CloseIconStyle = css`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: $fill-neutral-trans-2;
    transition: 0.3s ease-out;
  }
`;
export const TitleStyle = css`
  color: $gray-120;
`;
export const FullContentStyle = css`
  &.ant-modal {
    .ant-modal-body {
      padding-left: 40px;
      padding-right: 40px;
    }
    .ant-modal-footer,
    .ant-modal-header {
      margin-left: 40px;
      margin-right: 40px;
    }
  }
`;
export const BodyStyle = css`
  position: relative;
  .middle {
    height: 100%;
    overflow: auto;
    padding-bottom: var(--modal-body-padding-bottom);
  }
`;
export const MultiAreaBodyStyle = css`
  --left-width: 192px;
  --right-width: 192px;
  --content-width: 648px;
  --content-margin: 60px;
  --modal-body-padding: calc(
    (
        100% - var(--content-width) - var(--left-width) - var(--right-width) - var(
            --content-margin
          ) * 2
      ) / 2
  );
  --side-panel-margin-top: 140px;
  & > .left {
    width: var(--left-width);
    overflow: auto;
    position: fixed;
    left: var(--modal-body-padding);
    top: calc(var(--modal-to-viewport-margin) + var(--side-panel-margin-top));
  }

  & > .middle {
    width: var(--content-width);
    overflow: auto;
    margin: auto;
  }

  & > .right {
    width: var(--right-width);
    overflow: auto;
    position: fixed;
    right: var(--modal-body-padding);
    top: calc(var(--modal-to-viewport-margin) + var(--side-panel-margin-top));
  }
`;
export const FooterStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 40px;
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
  height: 32px;
`;
export const ErrorIconStyle = css`
  margin-right: 4px;
  flex-shrink: 0;
`;
export const ErrorTextStyle = css`
  align-self: flex-start;
  margin-top: 5px;
`;
export const CancelButtonStyle = css`
  &.ant-btn-quiet {
    --color: #{$text-neutral-secondary};
  }
`;
