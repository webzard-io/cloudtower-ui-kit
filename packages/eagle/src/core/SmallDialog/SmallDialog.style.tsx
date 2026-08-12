import { css } from "@linaria/core";
import { Color } from "@src/styles/token/color";

export const DialogStyle = css`
  --footer-height: 80px;
  --modal-content-width: 492px;
  --modal-content-min-height: 160px;
  --modal-content-max-height: calc(
    100vh - 80px
  ); // Only consider vertical margins（top 40px, bottom 40px）, do not subtract header and footer height
  --modal-header-padding: 32px 40px 0;
  --modal-content-padding-top: 32px;
  --modal-content-padding-bottom: 32px;
  --modal-content-padding-x: 40px;
  --modal-footer-padding: 0 40px;
  --modal-empty-footer-height: 32px;

  padding-bottom: 0;

  .ant-modal-content {
    background: $backgrounds-light-primary;
    border-radius: 16px;
    max-width: var(--modal-content-width);
    min-width: var(--modal-content-width);
    max-height: var(
      --modal-content-max-height
    ); // Set the max height for the entire modal
    display: flex;
    flex-direction: column; // Use flexbox layout
  }

  .ant-modal-header {
    padding: var(--modal-header-padding);
    border-bottom: none;
    border-radius: 16px 16px 0 0;
    flex-shrink: 0; // Prevent header from being compressed
    .ant-modal-title {
      color: ${Color.text.neutral.primary};
      margin-right: 28px;
    }
  }

  .ant-modal-close {
    right: 48px;
    top: 24px;
  }

  .ant-modal-body {
    padding: var(--modal-content-padding-top) var(--modal-content-padding-x)
      var(--modal-content-padding-bottom);
    padding-right: calc(
      var(--modal-content-padding-x) - 6px
    ); // Reserve 6px width for scrollbar
    min-height: var(--modal-content-min-height);
    flex: 1; // Take up remaining space
    min-height: 0; // Allow flex item to shrink below content height
    overflow-y: auto;
    overflow-x: hidden;
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

  .ant-modal-footer {
    height: var(--footer-height);
    padding: var(--modal-footer-padding);
    margin-top: 0;
    border-top: none;
    box-shadow: 0px 1px 0px 0px #e1e6f199 inset;
    flex-shrink: 0; // Prevent footer from being compressed
    .ant-btn-quiet {
      color: ${Color.text.neutral.secondary};
      font-weight: 700;
    }
  }

  &.no-footer {
    .ant-modal-body {
      padding-bottom: 0;
    }
    .ant-modal-footer {
      box-shadow: none;
      height: var(--modal-empty-footer-height);
      content: "";
    }
  }
`;

export const FooterStyle = css`
  display: flex;
  gap: 16px;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  &.has-error {
    justify-content: space-between;
  }
`;

export const ErrorTextStyle = css`
  color: ${Color.text.colorful.serious};
  text-align: left;
  .icon-wrapper {
    align-self: baseline;
    padding-top: 2px;
  }
`;

export const CloseIconStyle = css`
  padding: 8px;
  border-radius: 50%;
  &:hover {
    background: ${Color.fill.neutral["trans-2"]};
    transition: 0.3s ease-out;
  }
`;

export const ModelTitleSkeletonStyle = css`
  width: 132px;
  height: 24px;
`;

export const ModelContentSkeletonStyle = css`
  width: 100%;
  height: 100%;
  .skeleton-wrapper {
    width: 100%;
    height: 32px;
  }
`;

export const ModelInitializingErrorStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${Color.text.neutral.quaternary};
`;
