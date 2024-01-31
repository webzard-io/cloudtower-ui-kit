import { css } from "@linaria/core";
import { Animation } from "@src/styles/token";
import { Color } from "@src/styles/token/color";

export const DescriptionStyle = css`
  color: ${Color.text.neutral.secondary};
  font-size: 12px;
`;

export const FlexFullContentStyle = css`
  min-width: 0;
  flex: 1;
`;

export const BaseProgressStyle = css`
  &.ant-progress {
    width: 220px;
  }
`;

export const ProgressStyle = css`
  .ant-progress.ant-progress-status-active .ant-progress-bg::before {
    content: "";
    display: block;
    height: 8px;
    background: ${Color.gradient.loading};
    animation: ${Animation.loading};
    opacity: 1;
  }

  @keyframes loading {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }
`;
