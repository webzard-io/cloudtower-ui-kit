import "antd";
import "recharts";

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare module "recharts" {
  export interface PolarAngleAxisProps {
    domain: [number, number];
    radiusAxisId?: string | number;
  }

  export interface RadialBarProps {
    stackId?: string;
    background?: boolean;
    dataKey: string | number;
  }
}
