import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

import { BatchHelper, createBatchMessageMethods } from "../components";
import { antdKit } from "../components/antd";
import { Kit } from "../spec";

interface IProps {
  kit?: Kit;
  message?: {
    batch?: BatchHelper;
  };
}

export const kitContext = createContext<Kit>(antdKit);

const UIKitProvider = (props: PropsWithChildren<IProps>) => {
  const { children, kit = antdKit, message } = props;
  const _kit = useMemo(() => {
    if (message?.batch != null) {
      return {
        ...kit,
        message: createBatchMessageMethods(message.batch),
      };
    }
    return kit;
  }, [kit, message?.batch]);

  return <kitContext.Provider value={_kit}>{children}</kitContext.Provider>;
};

export default UIKitProvider;

export const useUIKit = () => {
  return useContext(kitContext);
};
