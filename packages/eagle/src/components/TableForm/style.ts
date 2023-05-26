import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const TitleStyle = css`
  height: 22px;
  margin-bottom: 4px;
  color: rgba(44, 56, 82, 0.75);
`;

export const SubtitleStyle = css`
  color: rgba(44, 56, 82, 0.6);
  line-height: 32px;
  height: 32px;
  margin-bottom: 0;
`;

export const BodyCellTextStyle = css`
  line-height: 32px;
  margin-bottom: 0;
`;

export const BodyCellIconStyle = css`
  line-height: 32px;
  margin-right: 6px;
`;

export const CheckboxStyle = css`
  & .ant-checkbox {
    height: 32px;
  }
`;

export const TableFormWrapper = styled.div`
  .ant-list {
    .eagle-table-form-header {
      display: flex;
      padding: 8px;
      & {
        align-items: inherit;
      }
      flex-wrap: nowrap;
      justify-content: flex-start;
      background: rgba(237, 241, 250, 0.6);
      font-size: 14px;
      color: rgba(44, 56, 82, 0.75);
      border: 1px solid rgba(225, 230, 241, 0.6);
      border-radius: 5px;
    }
    .eagle-table-form-row {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;
      padding: 8px;
      border: none;
      &:hover {
        background-color: $fills-light-trans-1;
      }
      &.isDragging {
        background-color: $fills-light-general-general-light;
      }
    }
    .eagle-table-form-cell {
      flex: 1 0 0;

      &:not(:last-child) {
        margin-right: 8px;
      }
    }
    .ant-list-item-action {
      min-width: 24px;
      align-self: center;
    }
    .delete-row-icon.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const AddRowButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  button.ant-btn {
    padding: 2px 8px;
    height: 24px;
  }
  & > span.maximum-desc {
    display: none;
    margin-left: 8px;
    color: $text-secondary-light;
    &.disabled {
      display: inline;
    }
  }
`;

export const DraggableHandleWrapper = styled.div`
  width: 24px;
  height: 24px;
  padding: 4px;
  align-self: center;
`;
