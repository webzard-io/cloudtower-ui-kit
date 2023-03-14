import React, { createContext, PropsWithChildren, useContext } from "react";

import { antdKit } from "../components/antd";
import { Kit } from "../spec";

interface IProps {
  kit?: Kit;
}

export const kitContext = createContext<Kit>(antdKit);

const UIKitProvider = (props: PropsWithChildren<IProps>) => {
  const { children, kit = antdKit } = props;
  return <kitContext.Provider value={kit}>{children}</kitContext.Provider>;
};

export default UIKitProvider;

export const useUIKit = () => {
  return useContext(kitContext);
};
