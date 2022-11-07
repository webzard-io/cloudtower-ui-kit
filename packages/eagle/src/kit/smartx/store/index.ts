import { combineReducers, createStore } from "redux";

import {
  Actions as BackupSearchActionType,
  backupSearchReducer,
  BackupSearchState,
  initialState as initialBackupSearchState,
} from "./backup";
import {
  Actions as ChartActionType,
  chartReducer,
  ChartState,
  initialState as initialChartState,
} from "./chart";
import {
  Actions as EverouteActionType,
  everouteReducer,
  EverouteState,
  initialState as initialEverouteState,
} from "./everoute";
import {
  Actions as GlobalSearchActionType,
  globalSearchReducer,
  GlobalSearchState,
  initialState as initialGlobalSearchState,
} from "./globalSearch";
import {
  Actions as ModalActionType,
  CloseCb,
  initialState as initialModalState,
  Modal,
  ModalActions,
  ModalProps,
  modalReducer,
  ModalState,
} from "./modal";
import {
  Actions as NavActionType,
  initialState as initialNavState,
  navReducer,
  NavState,
} from "./nav";
import {
  Actions as TableActionType,
  initialState as initialTableState,
  tableReducer,
  TableState,
} from "./table";
import {
  Actions as TaskActionType,
  initialState as initialTaskState,
  taskReducer,
  TaskState,
} from "./task";
import {
  Actions as UploadActionType,
  initialState as initialUploadState,
  uploadReducer,
  UploadState,
} from "./upload";

export { BackupSearchActions } from "./backup";
export { ChartActions } from "./chart";
export { EverouteActions } from "./everoute";
export { GloablSearchActions } from "./globalSearch";
export { ModalActions } from "./modal";
export { NavActions } from "./nav";
export { TableActions } from "./table";
export { TaskActions } from "./task";
export { UploadActions } from "./upload";

export type RootState = {
  chart: ChartState;
  modal: ModalState;
  upload: UploadState;
  table: TableState;
  task: TaskState;
  globalSearch: GlobalSearchState;
  nav: NavState;
  everoute: EverouteState;
  backupSearch: BackupSearchState;
};

const appReducer = combineReducers({
  chart: chartReducer,
  modal: modalReducer,
  upload: uploadReducer,
  table: tableReducer,
  task: taskReducer,
  globalSearch: globalSearchReducer,
  nav: navReducer,
  everoute: everouteReducer,
  backupSearch: backupSearchReducer,
});

export type Actions =
  | ModalActionType
  | ChartActionType
  | UploadActionType
  | TableActionType
  | TaskActionType
  | GlobalSearchActionType
  | NavActionType
  | EverouteActionType
  | BackupSearchActionType
  | {
      type: "RESET";
    };
export const rootReducer = (state: RootState | undefined, action: Actions) => {
  if (action.type === "RESET") {
    state = {
      modal: initialModalState,
      chart: initialChartState,
      upload: initialUploadState,
      table: initialTableState,
      task: initialTaskState,
      globalSearch: initialGlobalSearchState,
      nav: initialNavState,
      everoute: initialEverouteState,
      backupSearch: initialBackupSearchState,
    };
  }
  return appReducer(state, action as any);
};

export const store = createStore(rootReducer);

export function pushModal<K extends keyof ModalProps>(
  modal: Modal<ModalProps[K]>
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

export type GetModalProps<K extends keyof ModalProps> = ModalProps[K] & CloseCb;
