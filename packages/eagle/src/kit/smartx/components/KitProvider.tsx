import React, { createContext, PropsWithChildren } from "react";
import {
  createDispatchHook,
  createSelectorHook,
  Provider,
  ReactReduxContextValue,
} from "react-redux";

import { Actions, KitRootState, store } from "../store";

const ctx = createContext<ReactReduxContextValue<KitRootState, Actions>>({
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

export const useKitDispatch = createDispatchHook<KitRootState>(ctx);
export const useKitSelector = createSelectorHook<KitRootState>(ctx);
