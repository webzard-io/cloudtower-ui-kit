import { css } from "@linaria/core";

export const MessageWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  & .action {
    margin-left: 16px;
  }
`;

export const AlertStyle = css`
  &.ant-alert-closable {
    padding-right: 12px;

    .ant-alert-close-icon {
      height: fit-content;
      margin-left: 16px;
    }
  }

  .ant-alert-message {
    flex: 1;
  }
`;
