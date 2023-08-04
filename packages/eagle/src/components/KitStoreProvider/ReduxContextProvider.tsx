import React, { createContext, PropsWithChildren } from "react";
import { ReactReduxContextValue } from "react-redux";

import { Actions, KitRootState, UIKitStore } from "../../store";

const defaultContext = createContext<
  ReactReduxContextValue<KitRootState, Actions>
>({
  store: UIKitStore,
  storeState: UIKitStore.getState(),
});

export const ReduxContext = createContext(defaultContext);

interface IProps {
  reduxContext?: React.Context<ReactReduxContextValue<KitRootState, Actions>>;
}

const ReduxContextProvider = (props: PropsWithChildren<IProps>) => {
  const { children, reduxContext = defaultContext } = props;
  return (
    <ReduxContext.Provider value={reduxContext}>
      {children}
    </ReduxContext.Provider>
  );
};

export default ReduxContextProvider;
