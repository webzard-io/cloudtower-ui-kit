import React, { PropsWithChildren, useContext, useMemo } from "react";
import { createDispatchHook, createSelectorHook, Provider } from "react-redux";

import type { Actions, KitRootState } from "../../store";
import { ReduxContext } from "./ReduxContextProvider";

interface IProps {}

const KitStoreProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  const reduxContext = useContext(ReduxContext);
  const store = useContext(reduxContext);
  return (
    <Provider context={reduxContext} store={store.store}>
      {children}
    </Provider>
  );
};

export default KitStoreProvider;

export const useKitDispatch = () => {
  const ctx = useContext(ReduxContext);
  const useHook = useMemo(
    () => createDispatchHook<KitRootState, Actions>(ctx),
    [ctx]
  );
  return useHook();
};

export const useKitSelector = <Selected extends unknown>(
  selector: (state: KitRootState) => Selected,
  equalityFn?: (previous: Selected, next: Selected) => boolean
) => {
  const ctx = useContext(ReduxContext);
  const useHook = useMemo(
    () => createSelectorHook<KitRootState, Actions>(ctx),
    [ctx]
  );
  return useHook(selector, equalityFn);
};
