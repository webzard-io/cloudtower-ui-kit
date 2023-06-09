import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const TitleStyle = css`
  margin-bottom: 4px;
  color: $text-secondary-light;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SubtitleStyle = css`
  color: rgba(44, 56, 82, 0.6);
  line-height: 32px;
  height: 32px;
  margin-bottom: 0;
  &.primary,
  &.info {
    color: $text-light-general;
  }
  &.warning {
    color: #ffa500;
  }
  &.success {
    color: $text-light-positive;
  }
  &.danger,
  &.error {
    color: $text-light-serious;
  }
  &.normal {
    color: $text-secondary-light;
  }
`;

export const BodyCellTextStyle = css`
  margin-bottom: 0;
  color: $text-light-primary;
`;

export const BodyCellIconStyle = css`
  line-height: 32px;
  margin-right: 6px;
`;

export const BodyCellTextWrapper = styled.div`
  &.with-description {
    height: 24px;
    flex: 1;
    position: relative;
    top: -7px;
  }
  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const TableFormWrapper = styled.div`
  border: 1px solid $strokes-light-trans-2;
  border-radius: 8px;
  overflow: auto;
  .ant-list {
    position: relative;
    .eagle-table-form-header {
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      padding: 8px;
      & {
        align-items: inherit;
      }
      flex-wrap: nowrap;
      justify-content: flex-start;
      background: $fills-light-opaque-1;
      font-size: 14px;
      color: $text-secondary-light;
      border-bottom: 1px solid $fills-light-trans-2;
    }
    .eagle-table-form-row {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 8px;
      border: none;
      .row-description {
        flex-basis: 100%;
        margin: 12px 0 0;
        order: 99;
        color: $text-secondary-light;
      }
      .row-error-message {
        color: $text-light-serious;
        flex-basis: 100%;
        order: 98;
        margin: 12px 0 0;
      }
      &:hover {
        background-color: $fills-light-trans-1;
      }
      &.isDragging {
        background-color: $fills-light-general-general-light;
      }
    }
    .eagle-table-form-cell {
      flex: 1 0 0;
      overflow: hidden;
      .cell-description {
        color: $text-secondary-light;
        margin: 0;
      }

      @mixin text-align-style($align-position) {
        & > * {
          text-align: $align-position;
        }
        .ant-form-item-control-input-content {
          &,
          & > * {
            text-align: $align-position;
          }
        }
      }

      &.align-center {
        @include text-align-style(center);
      }
      &.align-left {
        @include text-align-style(left);
      }
      &.align-right {
        @include text-align-style(right);
      }

      &:not(:last-of-type) {
        margin-right: 8px;
      }
    }
    .ant-list-item-action {
      padding: 4px;
      width: 24px;
      height: 24px;
      overflow: hidden;
      li {
        padding: 0;
      }
    }
    .delete-row-icon.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &.size-default {
      .ant-list-item-action {
        margin: 0;
      }
      .eagle-table-form-cell {
        .ant-input,
        .ant-select-selector {
          border-radius: 5px;
          font-size: 12px;
        }
        .ant-input {
          padding: 2px 8px;
        }
        .ant-input-affix-wrapper {
          font-size: inherit;
        }

        .ant-form-item-control-input {
          min-height: 24px;
          font-size: 12px;
          position: relative;
        }
      }
    }
  }
  &.row-split-by-border {
    .eagle-table-form-row {
      border-bottom: 1px solid $fills-light-trans-2;
    }
  }
  &.row-split-by-zebraMarking {
    .draggable-container {
      & > :nth-child(2n) {
        background-color: $fills-trans-primary-light;
      }
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
  margin-right: 8px;
`;
