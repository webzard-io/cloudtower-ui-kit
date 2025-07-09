import { Tree } from "antd5";
import React from "react";

import { Antd5TreeProps } from "./Antd5Tree.type";

export const Antd5Tree: React.FC<Antd5TreeProps> = (props) => {
  return <Tree {...props} />;
};
