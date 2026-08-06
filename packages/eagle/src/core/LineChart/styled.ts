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
    font-size: 12px;
    margin-left: 8px;
  }
`;

export const LegendItemsStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 8px;
  }

  &.deselected,
  &.hovering {
    opacity: 0.3;

    &:not(.hoverering-self) .color-block {
      background: #b4beca !important;
      border-radius: 2px;
    }
  }
  &.hoverering-self {
    opacity: 1;
  }
  .dropdown-trigger {
    margin-left: 12px;
  }
  .legend-name {
    color: $text-light-primary;
  }
  .icon-suffix-wrapper {
    display: flex;
    align-items: center;
    margin-left: 4px;
  }
`;

export const LegendItemsStyleDropdown = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  cursor: pointer;

  &.deselected,
  &.hovering {
    opacity: 0.3;

    &:not(.hoverering-self) .color-block {
      background: #b4beca !important;
      border-radius: 2px;
    }
  }
  .legend-name {
    color: $text-light-primary;
  }
  &.hoverering-self {
    opacity: 1;
  }
  .icon-suffix-wrapper {
    margin-left: 4px;
    display: flex;
    align-items: center;
  }
`;

export const ColorBlockStyle = css`
  display: inline-block;
  height: 8px;
  width: 8px;
  margin-right: 6px;
  border-radius: 2px;
`;

export const ExtraResource = css`
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin: 0;
  }
`;

export const LineChartWrapper = styled.div`
  position: relative;

  &.hidden-xaxis .pointer-wrapper {
    bottom: -12px;
  }

  .metric-toolbar {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    .metric-extra {
      display: flex;
      flex-shrink: 0;
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
    font-size: 12px;
    color: $white;
    transform: translateX(-50%);
    z-index: 2;
  }
`;


export const ChartContentWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ThresholdTooltipOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, calc(-100% - 12px));
  pointer-events: none;
  z-index: 1;
`;

export const TooltipWrapper = styled.div`
  min-width: 200px;
  background-color: $fill-neutral-trans-8;
  border-radius: 4px;
  box-shadow: 0px 1px 4px 0px rgba(29, 50, 108, 0.6);
  padding: 8px;
`;

export const TooltipColumn = styled.div`
  display: flex;
  align-items: center;
  background-color: unset;
  color: $text-neutral-ontint;
  justify-content: space-between;
  font-size: 12px;
  padding-top: 6px;

  &:first-child {
    padding-top: 3px;
  }
  &:last-child {
    padding-bottom: 3px;
  }
  .column-value {
    color: $text-neutral-ontint;
    margin-left: 8px;
  }
`;

export const LineChartColorBlockStyle = css`
  display: inline-block;
  height: 8px;
  width: 8px;
  margin-right: 8px;
  border-radius: 2px;
  &.borderd {
    border: 1px solid $stroke-neutral-white;
  }
`;
