import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { createDispatchHook, createSelectorHook, Provider } from "react-redux";

import type {
  Actions,
  IModalProps,
  KitRootState,
  ModalType,
} from "../../store";
import { ModalActions } from "../../store";
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

export const usePopMoal = () => {
  const dispatch = useKitDispatch();
  return useCallback(() => {
    dispatch({
      type: ModalActions.POP_MODAL,
    });
  }, [dispatch]);
};

export const useCloseModal = () => {
  const dispatch = useKitDispatch();
  return useCallback(
    (id: number) => {
      dispatch({
        type: ModalActions.CLOSE_MODAL,
        id,
      });
    },
    [dispatch]
  );
};

export const usePushModal = () => {
  const dispatch = useKitDispatch();
  return useCallback(
    <K extends keyof IModalProps>(modal: ModalType<IModalProps[K]>) => {
      dispatch({
        type: ModalActions.PUSH_MODAL,
        payload: modal,
      });
    },
    [dispatch]
  );
};
