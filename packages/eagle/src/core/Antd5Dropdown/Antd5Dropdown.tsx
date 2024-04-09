import { Dropdown } from "antd5";
import React from "react";

import { Antd5DropdownProps } from "./Antd5Dropdown.type";

export const Antd5Dropdown: React.FC<Antd5DropdownProps> = (props) => {
  return <Dropdown {...props} />;
};
