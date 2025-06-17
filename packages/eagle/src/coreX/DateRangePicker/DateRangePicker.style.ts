import { css } from "@linaria/core";
import { styled } from "@linaria/react";

const CalendarWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: $white;
  overflow: auto;
`;

const CalendarYearWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 8px;
  height: 44px;
  flex-shrink: 0;

  .year-number {
    &-input {
      width: 54px;
      padding: 4px;
      margin-right: 9px;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
    }

    &-text {
      cursor: pointer;
      margin-right: 4px;
    }
  }

  .year-control {
    display: flex;
    align-items: center;
    gap: 8px;

    .ant-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $fills-light-trans-1;
    }
  }
`;

const CalendarWeekWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, auto);
  list-style: none;
  padding: 0 12px;
  margin: unset;
  height: 40px;
  gap: 4px;
  border-bottom: 1px solid $fills-trans-terdiary-light;
  flex-wrap: wrap;
  flex-shrink: 0;

  li {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: $text-light-secondary;
  }
`;

const CalendarMonthWrapper = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    .month-container {
      header {
        padding: 4px 12px;
        position: sticky;
        top: 0;
        background: $white;
        transition: all 0.2s ease-in-out;
        z-index: 2;

        &.pinned {
          box-shadow:
            0px 4px 12px rgba(225, 230, 241, 0.4),
            inset 0px -1px 0px rgba(225, 230, 241, 0.6);
        }
      }

      .dates-in-month {
        display: grid;
        grid-template-columns: repeat(7, auto);
        gap: 4px 0;
        padding: 4px 12px;

        .date-block {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          &.highlight {
            border-color: #e6f4ff;
            background: #e6f4ff;

            &.first-highlight {
              position: relative;
              background: $white;

              &::after {
                content: "";
                position: absolute;
                right: 0;
                top: 0;
                width: calc(50% + 20px);
                height: 100%;
                background: #e6f4ff;
                border-top-left-radius: 50%;
                border-bottom-left-radius: 50%;
              }
            }

            &.last-highlight {
              position: relative;
              background: $white;

              &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: calc(50% + 20px);
                height: 100%;
                background: #e6f4ff;
                border-top-right-radius: 50%;
                border-bottom-right-radius: 50%;
              }

              &:last-child::after {
                width: 40px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }

          & + .highlight {
            border-radius: unset;
          }

          &:hover > .date {
            border: 1px solid $text-light-general;
            cursor: pointer;
            background: $white;
          }

          & > .date {
            width: 38px;
            height: 38px;
            line-height: 36px;
            text-align: center;
            border-radius: 50%;
            color: $text-light-primary;
            border: 1px solid transparent;
            transition:
              background,
              border 0.2s ease-in-out;
            position: relative;
            z-index: 1;

            &.blank {
              background: transparent;
            }

            &.today {
              color: $text-light-general;
              border-color: $strokes-light-outstanding-light;
            }

            &.highlight {
              border-color: #e6f4ff;
            }

            &:hover {
              border-color: $text-light-general;
              cursor: pointer;
              background: $white;
            }

            &.checked {
              background: $text-light-general;
              color: $white;
            }

            &.disabled {
              cursor: not-allowed;
              border-color: transparent;
              background: $fills-light-opaque-3;
              color: $text-quaternary-light;
            }
          }
        }
      }
    }
  }
`;

export const CalendarStyle = {
  Wrapper: CalendarWrapper,
  Year: CalendarYearWrapper,
  Week: CalendarWeekWrapper,
  Month: CalendarMonthWrapper,
};

const InputTimeWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  .input-time {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    border: 1px solid $fills-light-opaque-3;
    transition: all 0.1s ease-in-out;
    padding: 4px 8px;
    background: $white;
    border-radius: 5px;

    &.focus {
      border-color: $strokes-light-outstanding;
      box-shadow: 0px 0px 0px 4px rgba(0, 136, 255, 0.16);
    }

    &.error {
      border-color: $fills-light-serious-serious;

      &.focus {
        box-shadow: 0px 0px 0px 4px $fills-light-serious-serious-light-active;
      }
    }

    input {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      border: none;
      outline: none;
      width: 23px;
      height: 20px;
      text-align: center;
      padding: 0;
      color: $text-light-primary;

      &::placeholder {
        color: $text-light-tertiary;
      }

      &:disabled {
        background: inherit;
      }

      &:focus,
      &:active {
        border: none;
        outline: none;
      }
    }

    .connect-symbol {
      margin: 0 2px;
      color: $text-light-tertiary;

      &.inputted {
        color: $text-light-primary;
      }
    }
  }

  .error-message {
    color: #f0483e;
    margin-top: 4px;
  }
`;

export const InputTimeStyle = {
  Wrapper: InputTimeWrapper,
};

const AbsoluteTimeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .date-range-picker-calendar {
    flex: 1;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const AbsoluteTimeSectionWrapper = styled.div`
  padding: 8px 12px;
  box-shadow: inset 0px 1px 0px rgba(211, 218, 235, 0.3);

  .time-input-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .time-input-container {
      display: flex;
      align-items: flex-end;
      gap: 8px;

      .start-time,
      .end-time,
      .to {
        color: $text-light-secondary;

        p {
          margin: 0;
          margin-bottom: 2px;
        }
      }

      .start-time.validate-failed,
      .to.validate-failed {
        padding-bottom: 18px;
      }

      .to {
        line-height: 34px;
      }

      .input-time {
        height: 32px;
        padding: 6px 3px;
      }
    }

    .ant-btn.validate-failed {
      margin-bottom: 18px;
    }
  }

  .time-input-error {
    color: $fills-light-serious-serious;
  }
`;

export const AbsoluteTimeStyle = {
  Wrapper: AbsoluteTimeWrapper,
  Time: AbsoluteTimeSectionWrapper,
};

const RelativeTimeWrapper = styled.div`
  min-width: 162px;

  .ant-input-affix-wrapper {
    width: 100% !important;
    border-width: 0 0 1px 0 !important;
    border-color: $strokes-light-trans-2;
    border-radius: 0;

    & + .past-time-list {
      margin-top: 8px;
    }
  }

  .past-time-list {
    list-style: none;
    padding: 0;
    margin-top: 12px;
    margin-bottom: 12px;

    li {
      padding: 5px 8px;
      border-radius: 5px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        background: $fills-interaction-light-outstanding-hover;
        color: $text-light-general;
      }

      &:active {
        background: $fills-interaction-light-outstanding-active;
        color: $text-light-general;
      }

      &.selected {
        background: $fills-interaction-light-outstanding-active;
        color: $text-light-general;

        .highlight {
          color: $text-light-general;
        }
      }

      &.disabled {
        background: $fills-light-trans-1;
        color: $text-light-tertiary;
        cursor: not-allowed;
      }

      & + li {
        margin-top: 2px;
      }
    }
  }
`;

export const RelativeTimeStyle = {
  Wrapper: RelativeTimeWrapper,
};

const DateRangePickerWrapper = styled.div`
  min-width: 392px;

  &.date-range-picker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: $white;
    border-radius: 5px;
    border: 1px solid $strokes-light-trans-3;
    transition: all 0.2s ease-in-out;

    .default-calendar-icon {
      display: inline-flex;
    }

    .hover-calendar-icon {
      display: none;
    }

    &:hover,
    &.active {
      border-color: $strokes-light-outstanding;
      box-shadow: 0px 0px 0px 4px rgba(0, 136, 255, 0.16);

      .default-calendar-icon {
        display: none;
      }

      .hover-calendar-icon {
        display: inline-flex;
      }
    }

    &.large {
      height: 40px;
      line-height: 40px;
      padding: 0 12px 0 16px;

      // Used to modify the position of the Popover.
      // Because the Popover doesn't wrap the entire input field but the internal element, we can change the position of the Popover by changing the style of the internal element so as not to cause too much adjustment of the element structure
      .date-input-content {
        padding-left: 40px;
        transform: translateX(-40px);
      }
    }

    &.medium {
      height: 32px;
      line-height: 32px;
      padding: 0 8px 0 12px;

      .date-input-content {
        padding-left: 36px;
        transform: translateX(-36px);
      }
    }

    .date-input-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      color: $text-light-primary;

      .concat-symbol-block {
        color: $text-light-tertiary;
      }

      input {
        border: none;
        outline: none;
        width: 162px;
        padding: 0;
        height: 22px;
        line-height: 22px;
        text-align: center;

        &::placeholder {
          color: $text-light-tertiary;
          text-align: center;
        }

        &:disabled {
          background: inherit;
        }

        &:hover,
        &:focus,
        &:active {
          border: none;
          outline: none;
          box-shadow: none;
        }
      }
    }

    .past-time-icon {
      cursor: pointer;
    }
  }
`;

const DateRangePickerPopover = css`
  .ant-popover-inner {
    border-radius: 8px;
  }

  .ant-popover-inner-content {
    .tab-menu {
      .tab-bar {
        padding: 12px 12px 0 12px;
      }

      .tab-menu-item-medium.tab-menu-item:first-child {
        padding-left: 16px;
      }

      .tab-menu-item {
        margin-right: 0;

        & + .tab-menu-item {
          margin-left: 2px;
        }
      }
    }

    .relative-time-container {
      max-height: 470px;
      overflow: auto;

      ul {
        padding: 0 12px;
      }
    }

    .absolute-time-container {
      height: 470px;
      overflow: auto;
    }
  }
`;

const DateRangePickerHistory = styled.div`
  min-width: 200px;

  header {
    border-bottom: 1px solid $strokes-light-trans-2;
    padding: 8px 12px;
    color: $text-light-secondary;
  }

  ul {
    list-style: none;
    padding: 12px;

    li {
      padding: 5px 8px;
      border-radius: 5px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        background: $fills-interaction-light-outstanding-hover;
        color: $text-light-general;
      }

      &:active {
        background: $fills-interaction-light-outstanding-active;
        color: $text-light-general;
      }

      & + li {
        margin-top: 2px;
      }
    }
  }
`;

export const DateRangePickerStyle = {
  Wrapper: DateRangePickerWrapper,
  Popover: DateRangePickerPopover,
  History: DateRangePickerHistory,
};

export const ResetPopoverStyle = css`
  padding: 0;

  .ant-popover-arrow {
    display: none;
  }

  .ant-popover-inner-content {
    padding: 0;
  }
`;
