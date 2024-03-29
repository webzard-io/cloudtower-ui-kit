import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const Header = styled.header`
  height: 50px;
  border-bottom: 2px solid #edf0f7;
  background: $fills-opaque-primary-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 0 14px;
  position: relative;
  z-index: 10;

  .left,
  .right,
  .center {
    display: flex;
    align-items: center;
    flex: 1;
    flex-shrink: 0;
  }

  .center {
    flex: 0.8;
  }

  .right {
    justify-content: flex-end;

    &.is-scrolled .btn-group:before {
      opacity: 1;
    }

    .btn-group {
      margin-left: 32px;
      position: relative;
      display: flex;
      align-items: center;

      &:before {
        content: "";
        opacity: 0;
        height: 24px;
        width: 1px;
        background: $fills-light-trans-2;
        position: absolute;
        left: -16px;
        top: 50%;
        transform: translateY(-50%);
        transition: opacity 160ms ease;
      }

      > .btn-item {
        transition: all 160ms ease;
        cursor: pointer;
        width: 56px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;

        &:hover {
          box-shadow:
            0px 0px 20px rgba(107, 125, 153, 0.18),
            0px 25px 80px rgba(45, 58, 86, 0.3);
        }

        &:active {
          transform: translateY(2px);
          transition: all 320ms ease;
        }
      }

      > *:not(:first-child) {
        margin-left: 4px;
      }

      .user-icon {
        .user-icon-inner {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: $white;
          font-weight: bold;
          font-size: 12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(
            180deg,
            rgba(0, 136, 255, 0.2) 0%,
            rgba(0, 136, 255, 0.6) 100%
          );
        }
      }
    }

    .create-menu-and-export {
      height: 48px;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 4px;
      margin: 0 -4px;

      &.active {
        .create-menu-in-nav,
        .export-btn {
          transform: translateY(0);
        }
      }

      .create-menu-in-nav,
      .export-btn {
        height: 48px;
        transform: translateY(100%);
        transition:
          transform 240ms ease,
          opacity 80ms ease;
        display: inline-flex;
        align-items: center;
      }

      .export-btn {
        margin-right: 10px;

        .icon-inner {
          width: 32px;
          height: 32px;
          border-radius: 6px;

          &:hover {
            background: rgba(211, 218, 235, 0.6);
          }
        }
      }
    }
  }

  .alert,
  .task {
    position: relative;

    .alert-icon,
    .task-icon {
      width: 56px;
      height: 40px;
      justify-content: center;
    }

    .ant-badge-count {
      right: 16px;
      top: 10px;
    }
  }

  .logo {
    display: inline-flex;
    align-items: center;
  }

  .left {
    position: relative;

    .events-audit-title {
      font-size: 20px;
      line-height: 24px;
      font-weight: bold;
      color: $text-light-super;
      margin: 0px 8px;
    }

    .global-search {
      margin-left: 6px;
    }
  }

  &.global-search-active {
    z-index: 11;

    .left {
      flex: 1;
      margin-right: 32px;

      .global-search {
        display: flex;
        flex: 1;

        .search-input {
          border-color: $blue-60;
          width: 100%;
        }
      }
    }

    .center {
      display: none;
    }

    .right {
      flex: 0 1 auto;
    }
  }

  .ant-badge-count {
    pointer-events: none;
  }
`;

export const NavCenterStyle = css`
  color: $text-terdiary-light;
  position: relative;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:before,
  &:after {
    content: "";
    width: 100%;
    height: 12px;
    position: absolute;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }

  > * {
    height: 48px;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    transition:
      transform 240ms ease,
      opacity 80ms ease;
  }

  .name-text {
    transform: translateY(0);
    opacity: 1;
  }

  .nav-info {
    transform: translateY(100%);
    opacity: 0;
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .scrolled-resource {
      color: $text-light-super;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .scrolled-view {
      color: $text-light-secondary;
      margin-left: 8px;
    }
  }

  &.is-scrolled .name-text {
    transform: translateY(-100%);
    opacity: 0;
    position: absolute;
  }

  &.is-scrolled .nav-info {
    transform: translateY(0);
    opacity: 1;
    position: static;
  }
`;
