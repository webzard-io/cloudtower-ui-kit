import { KitSelectProps, LooseFieldRenderProps } from "@src/core/Select";
import React from "react";

type KitNewSelectProps = KitSelectProps & {
  /** 是否正在加载 Select 组件的值 */
  isLoadingValue?: boolean;
};

export type NewSelectComponentType<
  V = any,
  T extends HTMLElement = HTMLElement,
> = React.FunctionComponent<LooseFieldRenderProps<V, T> & KitNewSelectProps>;
