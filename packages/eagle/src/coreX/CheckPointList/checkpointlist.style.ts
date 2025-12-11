import { css } from "@linaria/core";

export const CheckPointListStyle = css`
  background: #fff;
  width: 100%;
  border: none;
  border-radius: 0;
  .ant-list {
    padding: 12px;
  }
  .ant-list-item {
    padding: 4px 0;
  }
  .ant-alert {
    margin-left: 24px;
  }
  header {
    border-bottom: 1px solid rgba(211, 218, 235, 0.6);
    font-size: 12px;
    color: rgba(29, 50, 108, 1);
    font-weight: 700;
    padding: 6px 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .switch-text {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 18, 46, 1);
    }
  }
  &.border {
    border-radius: 8px;
    border: 1px solid rgba(228, 233, 242, 1);
    header {
      border-bottom: none;
      background: rgba(225, 230, 241, 0.6);
    }
  }
`;

export const CheckPointItemStyle = css`
  .ant-list-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .icon-wrapper {
    align-self: flex-start;
    margin-top: calc((18px - 16px) / 2);
  }
  .description {
    flex: 1 1 0;
    min-width: 0;
    margin-left: 8px;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  .ant-space,
  .ant-flex {
    flex-shrink: 0;
    align-self: flex-start;
    margin-top: calc((18px - 18px) / 2);
  }
`;

export const EmptyWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
