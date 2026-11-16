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

export const NameTagStyle = css`
  &.ant-tag.ant-tag-gray {
    font-weight: 700;
    color: var(--text-neutral-primary);
    background-color: var(--fill-neutral-trans-1);
    border: 1px solid var(--stroke-neutral-trans-2);
    word-break: break-all;
    display: inline;
    white-space: normal;
  }
`;
