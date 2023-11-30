import { css } from "@linaria/core";

export const LoadingWrapper = css`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0.2;
`;

export const LoadingLine1 = css`
  position: absolute;
  width: 5px;
  height: 48px;
  left: 9.33px;
  top: 40.5px;

  background: linear-gradient(180deg, #0080ff 0%, rgba(0, 128, 255, 0.16) 100%);
  border-radius: 5px;
  transform: rotate(-128deg);
  transform-origin: top left;

  animation: loading-indicator1 1100ms ease-out infinite;
`;

export const LoadingLine2 = css`
  position: absolute;
  width: 5px;
  height: 48px;
  left: 40.8px;
  top: 8.4px;

  background: linear-gradient(180deg, #0080ff 0%, rgba(0, 128, 255, 0.16) 100%);
  border-radius: 5px;
  transform: rotate(-8deg);
  transform-origin: top left;

  animation: loading-indicator2 1100ms ease-out infinite;
`;
export const LoadingLine3 = css`
  position: absolute;
  width: 5px;
  height: 48px;
  left: 52.9px;
  top: 51.8px;

  background: linear-gradient(180deg, #0080ff 0%, rgba(0, 128, 255, 0.16) 100%);
  border-radius: 5px;
  transform: rotate(112deg);
  transform-origin: top left;

  animation: loading-indicator3 1100ms ease-out infinite;
`;
