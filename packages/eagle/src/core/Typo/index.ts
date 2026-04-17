import { css } from "@linaria/core";

const d1_bold_title = css`
  @include Inter(bold);
  font-size: 32px;
  line-height: 40px;
`;
const d1s_bold_title = css`
  @include Inter(bold);
  font-size: 24px;
  line-height: 32px;
`;
const d1s_regular_title = css`
  @include Inter();
  font-size: 24px;
  line-height: 32px;
`;
const d1_regular_title = css`
  @include Inter();
  font-size: 32px;
  line-height: 40px;
`;
const d2_bold_title = css`
  @include Inter(bold);
  font-size: 20px;
  line-height: 24px;
`;
const d2_regular_title = css`
  @include Inter();
  font-size: 20px;
  line-height: 24px;
`;
const d3_bold_title = css`
  @include Inter(bold);
  font-size: 18px;
  line-height: 22px;
`;
const d3_regular_title = css`
  @include Inter();
  font-size: 18px;
  line-height: 22px;
`;
const h1_bold_title = css`
  @include Inter(bold);
  font-size: 16px;
  line-height: 22px;
`;
const h1_regular_title = css`
  @include Inter();
  font-size: 16px;
  line-height: 22px;
`;
const h2_bold_title = css`
  @include Inter(bold);
  font-size: 14px;
  line-height: 20px;
`;
const h2_regular_title = css`
  @include Inter();
  font-size: 14px;
  line-height: 20px;
`;
const h3_bold_title = css`
  @include Inter(bold);
  font-size: 12px;
  line-height: 18px;
`;
const h3_regular_title = css`
  @include Inter();
  font-size: 12px;
  line-height: 18px;
`;
const h3_bold_upper = css`
  @include Inter(bold);
  @include Uppercase();
  font-size: 12px;
  line-height: 18px;
`;
const h3_regular_upper = css`
  @include Inter();
  @include Uppercase();
  font-size: 12px;
  line-height: 18px;
`;
const l1_regular = css`
  @include Inter();
  font-size: 16px;
  line-height: 24px;
`;
const l1_bold = css`
  @include Inter(bold);
  font-size: 16px;
  line-height: 24px;
`;
const l1_regular_upper = css`
  @include Inter();
  @include Uppercase();
  font-size: 16px;
  line-height: 24px;
`;
const l1_bold_upper = css`
  @include Inter(bold);
  @include Uppercase();
  font-size: 16px;
  line-height: 24px;
`;
const l2_regular = css`
  @include Inter();
  font-size: 14px;
  line-height: 22px;
`;
const l2_medium = css`
  @include Inter(500);
  font-size: 14px;
  line-height: 22px;
`;
const l2_bold = css`
  @include Inter(bold);
  font-size: 14px;
  line-height: 22px;
`;
const l2_bold_strikethrough = css`
  @include Inter(bold);
  text-decoration-line: line-through;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  font-size: 14px;
  line-height: 22px;
`;
const l2_regular_upper = css`
  @include Inter();
  @include Uppercase();
  font-size: 14px;
  line-height: 22px;
`;
const l2_bold_upper = css`
  @include Inter(bold);
  @include Uppercase();
  font-size: 14px;
  line-height: 22px;
`;
const l3_regular = css`
  @include Inter();
  font-size: 13px;
  line-height: 20px;
`;
const l3_semibold = css`
  @include Inter(600);
  font-size: 13px;
  line-height: 20px;
`;
const l3_bold = css`
  @include Inter(bold);
  font-size: 13px;
  line-height: 20px;
`;
const l3_regular_upper = css`
  @include Inter();
  @include Uppercase();
  font-size: 13px;
  line-height: 20px;
`;
const l3_bold_upper = css`
  @include Inter(bold);
  @include Uppercase();
  font-size: 13px;
  line-height: 20px;
`;
const l4_regular = css`
  @include Inter();
  font-size: 12px;
  line-height: 18px;
`;
const l4_medium = css`
  @include Inter(500);
  font-size: 12px;
  line-height: 18px;
`;
const l4_bold = css`
  @include Inter(bold);
  font-size: 12px;
  line-height: 18px;
`;
const l4_regular_upper = css`
  @include Inter();
  @include Uppercase();
  font-size: 12px;
  line-height: 18px;
`;
const l4_bold_upper = css`
  @include Inter(bold);
  @include Uppercase();
  font-size: 12px;
  line-height: 18px;
`;
const f1_regular = css`
  @include Inter();
  font-size: 13px;
  line-height: 20px;
`;
const f2_regular = css`
  @include Inter();
  font-size: 12px;
  line-height: 18px;
`;
const t1_regular_mono = css`
  @include Inter();
  @include Monospace();
  font-size: 13px;
  line-height: 20px;
`;
const t1_regular_slash = css`
  @include Inter();
  @include Slashed();
  font-size: 13px;
  line-height: 20px;
`;
const t2_regular_mono = css`
  @include Inter();
  @include Monospace();
  font-size: 12px;
  line-height: 18px;
`;
const t2_medium_mono = css`
  @include Inter(500);
  @include Monospace();
  font-size: 12px;
  line-height: 18px;
`;
const t2_regular_slash = css`
  @include Inter();
  @include Slashed();
  font-size: 12px;
  line-height: 18px;
`;
const t2_medium_slash = css`
  @include Inter(500);
  @include Slashed();
  font-size: 12px;
  line-height: 18px;
`;
const t16_bold_slash = css`
  @include Inter(bold);
  @include Slashed();
  font-size: 16px;
  line-height: 24px;
`;

// CLEAR UNKNOWN STYLES
const l1_regular_title = css`
  @include Inter();
  font-size: 16px;
  line-height: 24px;
`;
const l1_bold_title = css`
  @include Inter(bold);
  font-size: 16px;
  line-height: 24px;
`;
const l2_regular_title = css`
  @include Inter();
  font-size: 14px;
  line-height: 22px;
`;
const l2_bold_title = css`
  @include Inter(bold);
  font-size: 14px;
  line-height: 22px;
`;
const l3_regular_title = css`
  @include Inter();
  font-size: 13px;
  line-height: 20px;
`;
const l3_semibold_title = css`
  @include Inter(600);
  font-size: 13px;
  line-height: 20px;
`;
const l3_bold_title = css`
  @include Inter(bold);
  font-size: 13px;
  line-height: 20px;
`;
const l4_regular_title = css`
  @include Inter();
  font-size: 12px;
  line-height: 18px;
`;
const l4_medium_title = css`
  @include Inter(500);
  font-size: 12px;
  line-height: 18px;
`;
const l4_bold_title = css`
  @include Inter(bold);
  font-size: 12px;
  line-height: 18px;
`;
const f1_regular_title = css`
  @include Inter();
  font-size: 13px;
  line-height: 20px;
`;
const f2_regular_title = css`
  @include Inter();
  font-size: 12px;
  line-height: 18px;
`;
const u1 = css`
  @include Inter();
  font-size: 10px;
  line-height: 12px;
`;

export const Typo = {
  Display: {
    d1_bold_title,
    d1s_bold_title,
    d1s_regular_title,
    d1_regular_title,
    d2_bold_title,
    d2_regular_title,
    d3_bold_title,
    d3_regular_title,
  },
  Heading: {
    h1_bold_title,
    h1_regular_title,
    h2_bold_title,
    h2_regular_title,
    h3_bold_title,
    h3_regular_title,
    h3_bold_upper,
    h3_regular_upper,
  },
  Label: {
    l1_bold,
    l1_bold_title,
    l1_bold_upper,
    l1_regular,
    l1_regular_title,
    l1_regular_upper,
    l2_bold,
    l2_bold_strikethrough,
    l2_bold_title,
    l2_bold_upper,
    l2_regular,
    l2_regular_title,
    l2_regular_upper,
    l2_medium,
    l3_bold,
    l3_semibold,
    l3_bold_title,
    l3_bold_upper,
    l3_regular,
    l3_regular_title,
    l3_semibold_title,
    l3_regular_upper,
    l4_bold,
    l4_bold_title,
    l4_bold_upper,
    l4_regular,
    l4_medium,
    l4_regular_title,
    l4_medium_title,
    l4_regular_upper,
  },
  Footnote: {
    f1_regular,
    f1_regular_title,
    f2_regular,
    f2_regular_title,
  },
  Tabular: {
    t1_regular_mono,
    t1_regular_slash,
    t2_regular_mono,
    t2_medium_mono,
    t2_regular_slash,
    t2_medium_slash,
    t16_bold_slash,
  },
  UNKNOWN: {
    u1,
  },
} as const;

export const FIGMA_TO_TYPO = {
  "Display/display1-bold-sc": d1_bold_title,
  "Display/display1s-bold-sc": d1s_bold_title,
  "Display/display1s-regular-sc": d1s_regular_title,
  "Display/display1-regular-sc": d1_regular_title,
  "Display/display2-bold-sc": d2_bold_title,
  "Display/display2-regular-sc": d2_regular_title,
  "Display/display3-bold-sc": d3_bold_title,
  "Display/display3-regular-sc": d3_regular_title,
  "Heading/h1-bold-sc": h1_bold_title,
  "Heading/h1-regular-sc": h1_regular_title,
  "Heading/h2-bold-sc": h2_bold_title,
  "Heading/h2-regular-sc": h2_regular_title,
  "Heading/h3-bold-sc": h3_bold_title,
  "Heading/h3-regular-sc": h3_regular_title,
  "Heading/h3-bold-uppercase-sc": h3_bold_upper,
  "Heading/h3-regular-uppercase-sc": h3_regular_upper,
  "Label/label1-regular-sc": l1_regular,
  "Label/label1-bold-sc": l1_bold,
  "Label/label1-regular-uppercase-sc": l1_regular_upper,
  "Label/label1-bold-uppercase-sc": l1_bold_upper,
  "Label/label2-regular-sc": l2_regular,
  "Label/label2-medium-sc": l2_medium,
  "Label/label2-bold-sc": l2_bold,
  "Label/label2-bold-strikethrough-sc": l2_bold_strikethrough,
  "Label/label2-regular-uppercase-sc": l2_regular_upper,
  "Label/label2-bold-uppercase-sc": l2_bold_upper,
  "Label/label3-regular-sc": l3_regular,
  "Label/label3-semibold-sc": l3_semibold,
  "Label/label3-bold-sc": l3_bold,
  "Label/label3-regular-uppercase-sc": l3_regular_upper,
  "Label/label3-bold-uppercase-sc": l3_bold_upper,
  "Label/label4-regular-sc": l4_regular,
  "Label/label4-medium-sc": l4_medium,
  "Label/label4-bold-sc": l4_bold,
  "Label/label4-regular-uppercase-sc": l4_regular_upper,
  "Label/label4-bold-uppercase-sc": l4_bold_upper,
  "Footnote/footnote1-regular-sc": f1_regular,
  "Footnote/footnote2-regular-sc": f2_regular,
  "Tabular Num/tnum1-regular-monospace-sc": t1_regular_mono,
  "Tabular Num/tnum1-regular-slashed0-sc": t1_regular_slash,
  "Tabular Num/tnum2-regular-monospace-sc": t2_regular_mono,
  "Tabular Num/tnum2-medium-monospace-sc": t2_medium_mono,
  "Tabular Num/tnum2-regular-slashed0-sc": t2_regular_slash,
  "Tabular Num/tnum2-medium-slashed0-sc": t2_medium_slash,
  "Tabular Num/tnum16-bold-slashed0-sc": t16_bold_slash,
} as const;

export type FigmaTypographyName = keyof typeof FIGMA_TO_TYPO;
