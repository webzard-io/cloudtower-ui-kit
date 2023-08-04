import { useCallback } from "react";
import { combineReducers, createStore } from "redux";

import { useKitDispatch } from "../components/KitStoreProvider";
import {
  Actions as ChartActionType,
  chartReducer,
  ChartState,
  initialChartState,
} from "./chart";
import {
  Actions as ModalActionType,
  CloseCb,
  IModalProps,
  initialModalState,
  ModalActions,
  modalReducer,
  ModalState,
  ModalType,
} from "./modal";

export { ChartActions } from "./chart";
export { ModalActions } from "./modal";

export type KitRootState = {
  chart: ChartState;
  modal: ModalState;
};

const appReducer = combineReducers({
  chart: chartReducer,
  modal: modalReducer,
});

export type Actions =
  | ModalActionType
  | ChartActionType
  | {
      type: "RESET_UI_KIT_STORE";
    };
export const rootReducer = (
  state: KitRootState | undefined,
  action: Actions
) => {
  if (action.type === "RESET_UI_KIT_STORE") {
    state = {
      modal: initialModalState,
      chart: initialChartState,
    };
  }
  return appReducer(state, action as any);
};

export const UIKitStore = createStore(rootReducer);

/**
 * @deprecated
 */
export function pushModal<K extends keyof IModalProps>(
  modal: ModalType<IModalProps[K]>,
  store = UIKitStore
) {
  store.dispatch({
    type: ModalActions.PUSH_MODAL,
    payload: modal,
  });
}

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

/**
 * @deprecated
 */
export function popModal(store = UIKitStore) {
  store.dispatch({
    type: ModalActions.POP_MODAL,
  });
}

export const usePopMoal = () => {
  const dispatch = useKitDispatch();
  return useCallback(() => {
    dispatch({
      type: ModalActions.POP_MODAL,
    });
  }, [dispatch]);
};

/**
 * @deprecated
 */
export function closeModal(id: number, store = UIKitStore) {
  store.dispatch({
    type: ModalActions.CLOSE_MODAL,
    id,
  });
}

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

export type GetModalProps<K extends keyof IModalProps> = IModalProps[K] &
  CloseCb;

export * from "./chart";
export * from "./modal";
