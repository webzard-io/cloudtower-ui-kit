import { Anchor as AntdAnchor } from "antd5";
import React from "react";

import { Antd5AnchorComponentType } from "./Antd5Anchor.type";

const Antd5Anchor: Antd5AnchorComponentType = (props) => (
  <AntdAnchor {...props} />
);

Antd5Anchor.Link = AntdAnchor.Link;

export default Antd5Anchor;

export * from "./Antd5Anchor.type";
