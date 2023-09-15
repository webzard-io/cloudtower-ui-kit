import { css, LinariaClassName } from "@linaria/core";
export const Size: Record<"small" | "medium", LinariaClassName> = {
  small: css`
    padding: 0 8px;
    height: 18px;
  `,
  medium: css`
    padding: 2px 8px;
    height: 24px;
  `,
};

export const TagStyle = css`
  margin: 0;
`;

export const IconStyle = css`
  margin-right: 4px;
  height: 16px;
`;
