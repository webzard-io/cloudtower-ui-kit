import { combineReducers, createStore } from "redux";

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
import {
  Actions as TableActionType,
  initialTableState,
  tableReducer,
  TableState,
} from "./table";

export { ChartActions } from "./chart";
export { ModalActions } from "./modal";
export { TableActions } from "./table";

export type KitRootState = {
  chart: ChartState;
  modal: ModalState;
  table: TableState;
};

const appReducer = combineReducers({
  chart: chartReducer,
  modal: modalReducer,
  table: tableReducer,
});

export type Actions =
  | ModalActionType
  | ChartActionType
  | TableActionType
  | {
      type: "RESET";
    };
export const rootReducer = (
  state: KitRootState | undefined,
  action: Actions
) => {
  if (action.type === "RESET") {
    state = {
      modal: initialModalState,
      chart: initialChartState,
      table: initialTableState,
    };
  }
  return appReducer(state, action as any);
};

export const store = createStore(rootReducer);

export function pushModal<K extends keyof IModalProps>(
  modal: ModalType<IModalProps[K]>
) {
  store.dispatch({
    type: ModalActions.PUSH_MODAL,
    // eslint-disable-next-line
    payload: modal as any,
  });
}

export function popModal() {
  store.dispatch({
    type: ModalActions.POP_MODAL,
  });
}

export function closeModal(id: number) {
  store.dispatch({
    type: ModalActions.CLOSE_MODAL,
    id,
  });
}

export type GetModalProps<K extends keyof IModalProps> = IModalProps[K] &
  CloseCb;

export * from "./chart";
export * from "./modal";
export * from "./table";
