import React, { createContext, PropsWithChildren } from "react";
import { ReactReduxContextValue } from "react-redux";

import { Actions, KitRootState, UIKitStore } from "../../store";

const defaultContext = createContext<
  ReactReduxContextValue<KitRootState, Actions>
>({
  store: UIKitStore,
  storeState: UIKitStore.getState(),
});

export const EagleReduxContext = createContext(defaultContext);

interface IProps {
  reduxContext?: React.Context<ReactReduxContextValue<KitRootState, Actions>>;
}

const EagleReduxContextProvider = (props: PropsWithChildren<IProps>) => {
  const { children, reduxContext = defaultContext } = props;
  window.EagleReduxContext = EagleReduxContext;

  return (
    <EagleReduxContext.Provider value={reduxContext}>
      {children}
    </EagleReduxContext.Provider>
  );
};

export default EagleReduxContextProvider;
