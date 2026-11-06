import { css } from "@linaria/core";

export const CheckPointListStyle = css`
  background: $fill-neutral-white;
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
    border-bottom: 1px solid $stroke-neutral-trans-2;
    font-size: 12px;
    color: $text-neutral-super;
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
      color: $text-neutral-primary;
    }
  }
  &.border {
    border-radius: 8px;
    border: 1px solid $stroke-neutral-opaque-2;
    header {
      border-bottom: none;
      background: $stroke-neutral-trans-1;
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
    margin-top: 1px; /* 1px: (18-16)/2,  18 is the height of the icon, 16 is the height of the icon */
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
    margin-top: 0px; /* 0px: (18-18)/2,  18 is the height of the tag, 18 is the line-height */
  }
`;

export const EmptyWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
