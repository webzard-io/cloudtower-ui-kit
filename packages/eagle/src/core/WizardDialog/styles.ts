import { css } from "@linaria/core";
import { Color } from "@src/styles/token";

export const StepStyle = css`
  display: flex;
  justify-content: flex-end;
`;
export const PrevIconStyle = css`
  margin-right: 8px;
`;
export const StepContentStyle = css`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export const RightPanelStyle = css`
  &.right {
    overflow: auto;
    padding-right: 2px;
    width: calc(192px + 6px + 2px);
    height: fit-content;
    max-height: calc(100vh - 300px);
    scrollbar-gutter: stable;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: ${Color.stroke.neutral["trans-1"]};
    }
    &::-webkit-scrollbar-thumb {
      background: ${Color.stroke.neutral["trans-3"]};
      border-radius: 8px;
    }
  }
`;
