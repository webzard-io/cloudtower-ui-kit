import { css } from "@linaria/core";
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
    background: linear-gradient(90deg, #0080ff 0%, #9ecfff 50%, #0080ff 100%);
    animation: loading 1600ms ease-out infinite;
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
