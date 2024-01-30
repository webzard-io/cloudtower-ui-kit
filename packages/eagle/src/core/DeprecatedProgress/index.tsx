import { Progress as AntdProgress } from "antd";
import { ProgressProps } from "antd/lib/progress";
import React from "react";

const Progress: React.FC<ProgressProps> = (props) => (
  <AntdProgress {...props} />
);

export default Progress;
