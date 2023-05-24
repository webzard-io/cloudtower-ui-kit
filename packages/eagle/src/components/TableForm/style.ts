import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const BatchInputListBodyItemStyle = css`
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  flex-wrap: nowrap !important;
  padding: 0 6px !important;
  padding-top: 10px !important;
  border: 1px solid transparent !important;
`;

export const BatchInputListHeaderItemStyle = css`
  display: flex;
  padding: 6px !important;
  & {
    align-items: inherit;
  }
  flex-wrap: nowrap !important;
  justify-content: flex-start !important;
  background: rgba(237, 241, 250, 0.6);
  font-size: 14px;
  color: rgba(44, 56, 82, 0.75);
  border: 1px solid rgba(225, 230, 241, 0.6);
  border-radius: 5px;
`;

export const BatchInputListBodyCellStyle = css`
  flex: 1 1 0;
  min-width: 0;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const BatchInputListHeaderCellStyle = css`
  flex: 1 1 0;
  min-width: 0;
  white-space: nowrap;
  color: #00122e;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

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
  line-height: 32px !important;
  margin-right: 6px;
`;

export const CheckboxStyle = css`
  & .ant-checkbox {
    height: 32px !important;
  }
`;

export const TableFormWrapper = styled.div``;

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
