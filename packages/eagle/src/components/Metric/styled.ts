import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const MetricPlaceholderWrapper = styled.div`
  color: $text-light-secondary;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .link {
    color: $text-light-general;
    cursor: pointer;
  }
`;

export const MetricLegendTabStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .name-toolbar {
    width: 100%;
    display: flex;
    line-height: 30px;
    padding: 0 16px;
    justify-content: space-between;
    .metric-extra {
      display: flex;
      font-size: 12px;
      align-items: center;

      .info-item {
        color: $gray-60;
      }
      .info-item + .info-item {
        margin-left: 10px;
      }

      .menu-trigger {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .content {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .single-content {
    height: 65px;
  }
`;

export const LegendStyle = css`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  .ant-dropdown-trigger {
    margin-left: auto;
    font-size: 12px;
  }
`;

export const LegendItemStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 20px;
  }
  &.deselected {
    opacity: 0.4;

    .color-block {
      background: #b4beca !important;
    }
  }
`;

export const ColorBlockStyle = css`
  display: inline-block;
  height: 8px;
  width: 8px;
  margin-right: 8px;
`;

export const ExtraResource = css`
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin: 0;
  }
`;

export const MetricWrapper = styled.div`
  position: relative;

  &.hidden-xaxis .pointer-wrapper {
    bottom: -12px;
  }

  .metric-toolbar {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    margin: 0 16px;

    .metric-extra {
      display: flex;
      font-size: 12px;
      align-items: center;

      .info-item {
        color: $gray-60;
      }
      .info-item + .info-item {
        margin-left: 10px;
      }

      .menu-trigger {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .recharts-xAxis {
    font-size: 12px;
  }

  .pointer-wrapper {
    position: absolute;
    bottom: 10px;
    padding: 0 8px;
    border-radius: 4px;
    font-size: 12px;
    color: $white;
    background: rgba(0, 0, 0, 0.75);
    transform: translateX(-50%);
  }
`;

export const TooltipWrapper = styled.div`
  min-width: 200px;
`;

export const TooltipColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.75);
  color: #b4beca;
  font-size: 12px;
  padding: 3px 6px;

  &:first-child {
    padding-top: 3px;
  }
  &:last-child {
    padding-bottom: 3px;
  }
  .column-value {
    color: $white;
    margin-left: 8px;
  }
`;
