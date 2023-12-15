import { Cascader as Antd5Cascader, CascaderProps } from "antd5";
import React from "react";

const Cascader: React.FC<CascaderProps> = (props) => (
  <Antd5Cascader {...props} prefixCls="antd5" />
);

export default Cascader;
