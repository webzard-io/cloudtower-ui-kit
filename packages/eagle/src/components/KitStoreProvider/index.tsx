import { Actions, KitRootState, store } from "@cloudtower/eagle";
import React, { createContext, PropsWithChildren } from "react";
import {
  createDispatchHook,
  createSelectorHook,
  Provider,
  ReactReduxContextValue,
} from "react-redux";

const ctx = createContext<ReactReduxContextValue<KitRootState, Actions>>({
  store: store,
  storeState: store.getState(),
});

interface IProps {}

const KitStoreProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;

  return (
    <Provider context={ctx} store={store}>
      {children}
    </Provider>
  );
};

export default KitStoreProvider;

export const useKitDispatch = createDispatchHook<KitRootState, Actions>(ctx);
export const useKitSelector = createSelectorHook<KitRootState, Actions>(ctx);
