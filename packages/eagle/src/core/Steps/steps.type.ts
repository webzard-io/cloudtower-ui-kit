export type StepProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  title: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export type IStepsProps = {
  className?: string;
  current?: number;
  direction?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  onChange?: (current: number) => void;
  stepsConfig: Array<StepProps>;
  containerClassname?: string;
  disabled?: boolean;
  preview?: boolean;
};
