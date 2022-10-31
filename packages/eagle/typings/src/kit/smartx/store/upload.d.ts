import { UploadResourceType, UploadTaskStatus } from "@cloudtower/eagle/generated/react-hooks";
declare type UploadTask = {
    id: string;
    type: UploadResourceType;
    clusterIds: string[];
    file: File;
    name: string;
    chunk_size: number;
    current_chunk: number;
    status: UploadTaskStatus;
    started_at: Date;
    image_ids: string[];
    finished_at: Date | null;
    meta_file?: File;
};
export declare type UploadState = {
    uploadTasks: UploadTask[];
};
export declare enum UploadActions {
    START_TASK = "START_TASK",
    UPDATE_TASK = "UPDATE_TASK",
    REMOVE_TASK = "REMOVE_TASK"
}
declare type UPLOAD_START_TASK = {
    type: UploadActions.START_TASK;
    payload: UploadTask;
} | {
    type: UploadActions.UPDATE_TASK;
    payload: Partial<UploadTask> & {
        id: UploadTask["id"];
    };
} | {
    type: UploadActions.REMOVE_TASK;
    payload: {
        id: string;
    };
};
export declare type Actions = UPLOAD_START_TASK;
export declare const initialUploadState: UploadState;
export declare const uploadReducer: (state: UploadState | undefined, action: Actions) => UploadState;
export {};
