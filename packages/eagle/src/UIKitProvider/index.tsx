import React, { PropsWithChildren, useContext } from "react";

import { antdKit } from "../components/antd";
import { Kit, kitContext } from "../spec";

interface IProps {
  kit?: Kit;
}

const UIKitProvider = (props: PropsWithChildren<IProps>) => {
  const { children, kit = antdKit } = props;
  return <kitContext.Provider value={kit}>{children}</kitContext.Provider>;
};

export default UIKitProvider;

export const useUIKit = () => {
  return useContext(kitContext);
};
