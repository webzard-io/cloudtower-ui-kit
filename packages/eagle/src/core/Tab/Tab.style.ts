import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import { Typo } from "../Typo";

export const TabMenuWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  &.medium {
    .tab-bar {
      height: 32px;

      .common-tab-bar {
        height: 32px;

        .tab-item-title {
          height: 32px;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          padding-right: 16px;
          padding-left: 16px;
          font-size: 16px;
        }
      }
    }
  }

  &.small {
    .tab-bar {
      height: 24px;

      .common-tab-bar {
        height: 24px;

        .tab-item-title {
          height: 24px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          padding-right: 12px;
          padding-left: 12px;
          font-size: 14px;
        }
      }
    }
  }

  .tab-bar {
    max-width: 100%;
    display: flex;
    place-items: center;
    border-bottom: 1px solid $fills-trans-terdiary-light;

    .common-tab-bar {
      overflow: hidden;
      display: flex;
      place-items: center;

      .tab-item-title {
        &:first-child:not(.__selected):not(:hover) {
          padding-left: 0px;
        }
      }

      & + .tab-item-title {
        margin-left: 12px;
        position: relative;

        &::before {
          content: "";
          width: 1px;
          height: 24px;
          background: $strokes-light-trans-3;
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    .tab-item-title {
      flex-shrink: 0;
      display: flex;
      place-items: center;
      cursor: pointer;
      color: $text-neutral-secondary;
      transition:
        color 100ms ease-out,
        background-color 100ms ease-out,
        padding-left 320ms ease 80ms;

      &:hover {
        padding-left: 16px;
        color: $text-light-general;
        background: $fill-outstanding-lighthover;
      }

      & + .tab-item-title {
        margin-left: 2px;
      }

      &.more {
        &:not(.__selected) {
          width: 16px;
          height: 16px;
          padding: 0;
          border-radius: 2px;
          margin-left: 8px;
        }

        &.__selected.tab-title-text {
          margin-left: 8px;
        }
      }

      &.__selected {
        padding-left: 16px;
        background: $fills-light-general-general-light;
        color: $text-light-general;
      }

      &.__hidden {
        display: none;
      }
    }
  }
`;

export const TabTitleElStyle = css`
  &.ant-dropdown-open {
    color: $text-light-general;
    background: $fills-light-trans-3;
  }
`;

export const MoreThanTooltipStyle = css`
  cursor: default;
  & .menu-wrapper {
    min-width: 160px;
    max-width: 400px;
    padding: 6px;
    background: $white;
    box-shadow:
      0px 0px 10px rgba(107, 125, 153, 0.18),
      0px 12px 40px rgba(45, 58, 86, 0.3);
    border-radius: 8px;
    max-height: calc(100vh - 250px);
    overflow: auto;

    & .tab-menu-item {
      display: flex;
      place-items: center;
      width: var(--itemWidth);

      & + .tab-menu-item {
        margin-top: 8px;
      }

      &.__selected {
        padding: 6px;
        background: $fills-light-general-general-light;
        color: $text-light-general;

        &${Typo.Label.l1_bold_title} {
          @include Inter(bold !important);
        }
      }

      &.ant-dropdown-menu-item {
        padding: 5px 12px;
        border-radius: 4px;
      }

      &.ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):hover {
        color: $text-light-general;
        background: $fills-light-trans-3;
      }

      &-text {
        text-align: left;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export const IconStyle = css`
  margin: auto;
  cursor: pointer;
  line-height: normal;
  height: 16px;
  margin-right: 3px;

  .icon-inner {
    display: block;
    height: 16px;
  }
`;
