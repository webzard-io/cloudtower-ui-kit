import React, { createContext, PropsWithChildren } from "react";
import {
  createDispatchHook,
  createSelectorHook,
  Provider,
  ReactReduxContextValue,
} from "react-redux";

import { Actions, RootState, store } from "../store";

const ctx = createContext<ReactReduxContextValue<RootState, Actions>>({
  store: store,
  storeState: store.getState(),
});

interface IProps {}

const KitProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;

  return (
    <Provider context={ctx} store={store}>
      {children}
    </Provider>
  );
};

export default KitProvider;

export const useKitDispatch = createDispatchHook<RootState>(ctx);
export const useKitSelector = createSelectorHook<RootState>(ctx);
