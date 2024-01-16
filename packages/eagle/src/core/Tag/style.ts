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
    color: $text-neutral-primary;
    background-color: $fill-neutral-trans-1;
    border: 1px solid $stroke-neutral-trans-2;
    word-break: break-all;
    display: inline;
    white-space: normal;
  }
`;
