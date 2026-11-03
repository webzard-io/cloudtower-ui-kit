import { css } from "@linaria/core";
import { Color } from "@src/styles/token/color";

export const BannerWrapper = css`
  & + & > div {
    border-top: 1px solid ${Color.text.neutral.ontint};
  }
`;

export const BasicBanner = css`
  color: ${Color.text.neutral.ontint};
  display: grid;
  grid-template-columns: minmax(max-content, 1fr) minmax(0, auto) minmax(
      max-content,
      1fr
    );
  align-items: center;
  height: 40px;
  padding: 0 12px;
  box-sizing: border-box;

  button,
  .banner-action {
    color: inherit;
    font: inherit;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 24px;
    &:focus-visible {
      outline: 2px solid ${Color.text.neutral.ontint};
      outline-offset: 2px;
    }
  }

  .banner-content {
    grid-column: 2;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    > .icon-wrapper {
      flex-shrink: 0;
    }
  }

  .banner-message {
    min-width: 0;
  }

  .banner-action {
    padding: 2px 8px;
    background: rgba(255, 255, 255, 0.16);
    &:hover {
      background: rgba(255, 255, 255, 0.28);
    }
    &:active {
      background: rgba(255, 255, 255, 0.16);
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5);
    }
  }

  .banner-pagination {
    margin-right: 12px;
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    .banner-count {
      opacity: 0.8;
    }
    button {
      padding: 4px;
      background: transparent;
      .icon-wrapper {
        opacity: 0.8;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.28);
        .icon-wrapper {
          opacity: 1;
        }
      }
    }
  }

  .banner-close {
    margin-left: 12px;
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
    width: 24px;
    padding: 4px;
    background: transparent;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;
export const ErrorBanner = css`
  background: ${Color.fill.serious.base};
`;
export const InfoBanner = css`
  background: ${Color.fill.outstanding.base};
`;
export const WarningBanner = css`
  background: ${Color.fill.notice.dark};
`;
