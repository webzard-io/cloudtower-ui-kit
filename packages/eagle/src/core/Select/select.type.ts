import {
  KitLegacySelectProps,
  LooseFieldRenderProps,
} from "@src/core/LegacySelect";
import React from "react";

export type KitSelectProps = KitLegacySelectProps & {
  /** 是否正在加载 Select 组件的值 */
  isLoadingValue?: boolean;
};

export type SelectComponentType<
  V = any,
  T extends HTMLElement = HTMLElement,
> = React.FunctionComponent<LooseFieldRenderProps<V, T> & KitSelectProps>;
