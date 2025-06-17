import { css } from "@linaria/core";
import { Color } from "@src/styles/token/color";

export const BasicBanner = css`
  color: ${Color.white.white};
  display: flex;
  gap: 8px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  align-items: center;
  .dashed-btn {
    border-bottom: 1px solid white;
    cursor: pointer;
  }
`;
export const ErrorBanner = css`
  background: ${Color.fill.serious.base};
`;

export const InfoBanner = css`
  background: ${Color.link.outstandingnormal};
`;

export const WarningBanner = css`
  background-color: ${Color.fill.notice.dark};
`;
