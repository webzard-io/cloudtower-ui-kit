import {
  Actions,
  IModalProps,
  KitRootState,
  ModalActions,
  ModalType,
  rootReducer,
  UIKitStore,
} from "@src/store";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";
import {
  createDispatchHook,
  createSelectorHook,
  Provider,
  ReactReduxContextValue,
} from "react-redux";
import { createStore } from "redux";

const ctx = createContext<ReactReduxContextValue<KitRootState, Actions>>({
  store: UIKitStore,
  storeState: UIKitStore.getState(),
});

interface IProps {}

const KitStoreProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;

  const storeRef = useRef(createStore(rootReducer));

  return (
    <Provider context={ctx} store={storeRef.current}>
      {children}
    </Provider>
  );
};

export default KitStoreProvider;

export const useKitDispatch = createDispatchHook<KitRootState, Actions>(ctx);
export const useKitSelector = createSelectorHook<KitRootState, Actions>(ctx);
export const usePushModal = () => {
  const dispatch = useKitDispatch();
  const pushModal = useCallback(
    <K extends keyof IModalProps>(modal: ModalType<IModalProps[K]>) => {
      dispatch({
        type: ModalActions.PUSH_MODAL,
        payload: modal,
      });
    },
    [dispatch],
  );
  return pushModal;
};

export const useCloseModal = () => {
  const dispatch = useKitDispatch();
  const closeModal = useCallback(
    (id: number) => {
      dispatch({
        type: ModalActions.CLOSE_MODAL,
        id,
      });
    },
    [dispatch],
  );
  return closeModal;
};

export const usePopModal = () => {
  const dispatch = useKitDispatch();
  const popModal = useCallback(() => {
    dispatch({
      type: ModalActions.POP_MODAL,
    });
  }, [dispatch]);
  return popModal;
};

export const useResetModal = () => {
  const dispatch = useKitDispatch();
  const resetModal = useCallback(() => {
    dispatch({
      type: ModalActions.RESET_MODAL,
    });
  }, [dispatch]);
  return resetModal;
};
