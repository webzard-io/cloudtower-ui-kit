import { css } from "@linaria/core";

export const BlankStateWrapper = css`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(0, 21, 64, 0.3);
  &.large {
    max-width: 648px;
  }
  &.medium {
    max-width: 412px;
  }
  &.gray {
    background-color: $fill-neutral-trans-1;
  }
  &.white {
    background-color: $fill-neutral-lightwhite;
  }
  .title {
    margin-bottom: 4px;
  }
  .title,
  .desc {
    word-break: break-all;
    text-align: center;
  }
  .action-button.middle {
    margin-top: 16px;
  }
  .action-button.small {
    margin-top: 8px;
  }
`;
