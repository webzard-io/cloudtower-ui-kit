import { css } from "@linaria/core";

export const Content = css`
  flex: 1;
  width: 100%;
  background-color: $white;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .tab-menu:not(.is-overview) {
    overflow: inherit;
  }

  .table-wrapper {
    overflow: auto;
    min-height: 150px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .table-content {
      overflow: hidden;

      .ant-table-empty {
        .ant-table-expanded-row-fixed {
          overflow: visible;
        }
      }

      .table-init-loading {
        padding-bottom: 100%;
      }

      .empty-table:not(.table-init-loading) {
        /* FIXME(junjia): Temporary value */
        padding: 30% 0;
      }

      .ant-table-container {
        display: flex;
        flex-direction: column;

        .ant-table-header {
          flex: none;
        }
      }
      /* for loading antd table inside resource page, set its z-index to 0 */
      .ant-table-wrapper > .ant-spin-nested-loading > div > .ant-spin {
        z-index: 0;
      }
    }
  }
`;

export const ContentNoPadding = css`
  padding: 0;
`;

export const ContentHaveBGColor = css`
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 108px, #edf0f7 480px);
`;

export const Title = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 8px;

  &.sidebar-active {
    color: $text-terdiary-light;
  }
  .title-content {
    word-break: break-all;
    font-size: 24px;
    line-height: 40px;
    color: $blue-100;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .title-info {
      display: inline-block;
      padding: 3px 16px 3px 12px;
      border-radius: 12px;
      margin: 0 0 15px 5px;
    }

    .INITIALIZING {
      background-color: rgba(0, 136, 255, 0.1);
    }

    .CONNECTED_ERROR,
    .SESSION_EXPIRED {
      background: rgba(255, 74, 74, 0.1);
    }
  }
`;

export const ClusterTitle = css`
  display: flex;
  align-items: flex-end;
  .cluser-name {
    margin-left: 15px;
    margin-bottom: 5px;
    padding-left: 10px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: $text-light-tertiary;
    border-left: 1px solid $text-light-tertiary;
    &:hover {
      color: $text-light-general;
    }
  }
`;

export const Toolbar = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0px;

  .export-button {
    margin-left: auto;
  }
`;

export const DropdownDeleteItem = css`
  color: $red-60 !important;
  border-top: 1px solid $strokes-translucent-1-light;
  &.no-border {
    border-top: none;
  }

  &:hover {
    background-color: rgba($red-60, 0.1) !important;
    color: $red-60 !important;
  }
`;

export const DisconnectCluster = css`
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 7px 12px;
  background: rgba(255, 74, 74, 0.1);
  margin-bottom: 8px;
  .disconnect-cluster-info {
    display: flex;
    flex-direction: row;
  }
  .icon-wrapper {
    margin-top: 1.5px;
    margin-right: 10px;
    align-items: flex-start;
  }
  .msg {
    color: $text-light-serious;
  }
  .edit-cluster {
    font-size: 12px;
    line-height: 18px;
    height: 18px;
  }
`;

export const PageTitle = css``;

export const UnderlineTooltip = css`
  &.content {
    color: $text-light-primary;
    border-bottom: 1px dashed rgba(107, 128, 167, 0.6);
    cursor: pointer;
  }
  &.gray {
    color: $text-light-secondary;
  }
`;
