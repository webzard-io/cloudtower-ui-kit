import { ProgressComponentType } from "@src/spec";
import { Progress as AntdProgress } from "antd";
import React from "react";

const Progress: ProgressComponentType = (props) => <AntdProgress {...props} />;

export default Progress;
