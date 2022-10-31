export declare enum BackupSearchActions {
    SET_BACKUP_VM_SEARCH_WORD = "SET_BACKUP_VM_SEARCH_WORD"
}
export declare type BackupSearchState = {
    backupSearchWord?: string;
};
export declare type Actions = {
    type: BackupSearchActions.SET_BACKUP_VM_SEARCH_WORD;
    payload: {
        searchWord?: string;
    };
};
export declare const initialBackupSearchState: BackupSearchState;
export declare const backupSearchReducer: (state: BackupSearchState | undefined, action: Actions) => BackupSearchState;
