export enum BackupSearchActions {
  SET_BACKUP_VM_SEARCH_WORD = "SET_BACKUP_VM_SEARCH_WORD",
}

export type BackupSearchState = {
  backupSearchWord?: string;
};

export type Actions = {
  type: BackupSearchActions.SET_BACKUP_VM_SEARCH_WORD;
  payload: {
    searchWord?: string;
  };
};

export const initialBackupSearchState: BackupSearchState = {};

export const backupSearchReducer = (
  state: BackupSearchState = initialBackupSearchState,
  action: Actions
): BackupSearchState => {
  switch (action.type) {
    case BackupSearchActions.SET_BACKUP_VM_SEARCH_WORD:
      return { ...state, backupSearchWord: action.payload.searchWord };

    default:
      return state;
  }
};
