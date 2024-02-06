import { SwitchProps } from "@src/core/Switch/switch.type";

export type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : TComponent extends React.Component<infer Props>
  ? Props
  : never;

export type SwitchWithTextProps =
  //TODO: use SwitchProps directly
  PropsFrom<React.FC<SwitchProps>> & {
    text?: {
      checked: React.ReactNode;
      unchecked: React.ReactNode;
    };
  };
