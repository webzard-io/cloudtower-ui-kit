import { css } from "@linaria/core";

export const BlankStateWrapper = css`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $gray-a30-10;
  &.large {
    max-width: 648px;
  }
  &.medium {
    max-width: 412px;
  }
  &.gray {
    background-color: $fills-trans-primary-light;
  }
  &.white {
    background-color: $fills-light-light-white;
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
