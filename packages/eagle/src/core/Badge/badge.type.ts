import { BadgeProps } from "antd/lib/badge";

type BadgeTypeProps = "warning" | "error" | "info";

export type BadgeComponentType = React.FC<
  BadgeProps & { type?: BadgeTypeProps }
>;
