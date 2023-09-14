import { css, LinariaClassName } from "@linaria/core";
export const Size: Record<"small" | "medium", LinariaClassName> = {
  small: css`
    padding: 0 8px;
  `,
  medium: css`
    padding: 2px 8px;
  `,
};

export const TagStyle = css`
  margin: 0;
`;
