import { Progress as AntdProgress } from "antd";
import React from "react";

import { ProgressComponentType } from "../../spec";

const Progress: ProgressComponentType = (props) => <AntdProgress {...props} />;

export default Progress;
