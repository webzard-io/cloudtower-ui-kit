import { TooltipProps } from "@src/core/Tooltip/tooltip.type";

export type TruncateTextWithTooltipType = {
  text: string;
  textWrapperCls?: string;
} & Omit<TooltipProps, "title">;
