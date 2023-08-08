import React, {
  Fragment,
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
import { EagleReduxContext } from "./EagleReduxContextProvider";

interface IProps {}

const KitStoreProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  return <Fragment> {children}</Fragment>;
};

export default KitStoreProvider;

export const useKitDispatch = () => {
  const ctx = useContext(window.EagleReduxContext ?? EagleReduxContext);
  const useHook = createDispatchHook<KitRootState, Actions>(ctx);
  return useHook();
};

export const useKitSelector = <Selected extends unknown>(
  selector: (state: KitRootState) => Selected,
  equalityFn?: (previous: Selected, next: Selected) => boolean
) => {
  const ctx = useContext(window.EagleReduxContext ?? EagleReduxContext);
  const useHook = createSelectorHook<KitRootState, Actions>(ctx);
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
